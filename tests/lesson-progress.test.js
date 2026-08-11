import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Miniflare } from 'miniflare';
import {
  parseLessonMetadata,
  syncLessonCatalog,
  validateLessonCatalog,
} from '../src/lesson-catalog.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const docsRoot = join(root, 'docs', 'cybersecurity-first-steps');
const workerPath = join(root, 'src', 'index.js');
const securityPath = join(root, 'src', 'security.js');
const baseUrl = 'https://horizon-learning.test';
const courseId = 'cybersecurity-first-steps';
const password = 'Session2-Integration!9zQ';

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  }));
  return nested.flat();
}

async function loadCatalog() {
  const files = await markdownFiles(docsRoot);
  return validateLessonCatalog((await Promise.all(files.map(async (path) => (
    parseLessonMetadata(await readFile(path, 'utf8'), relative(join(root, 'docs'), path))
  )))).filter(Boolean));
}

async function applyMigration(db, name) {
  const sql = (await readFile(join(root, 'migrations', name), 'utf8')).replaceAll('\r\n', '\n');
  const statements = sql.split(';').map((statement) => statement.trim()).filter(Boolean);
  await db.batch(statements.map((statement) => db.prepare(statement)));
}

function cookieFrom(response) {
  return response.headers.get('Set-Cookie')?.split(';', 1)[0] ?? '';
}

describe('lesson metadata', () => {
  test('parses the canonical metadata convention', () => {
    const lesson = parseLessonMetadata(`---
course_id: cybersecurity-first-steps
module_id: cfs-kali
lesson_id: cfs-kali-example
title: Example Lesson
content_type: lesson
progress_required: true
order: 10
---
# Example`, 'cybersecurity-first-steps/kali/example.md');
    assert.deepEqual(lesson, {
      id: 'cfs-kali-example',
      courseId,
      moduleId: 'cfs-kali',
      sourcePath: 'cybersecurity-first-steps/kali/example.md',
      title: 'Example Lesson',
      contentType: 'lesson',
      progressRequired: true,
      published: true,
      sortOrder: 10,
    });
  });

  test('discovers 35 unique progress-bearing learning-path pages', async () => {
    const lessons = await loadCatalog();
    assert.equal(lessons.length, 35);
    assert.equal(new Set(lessons.map((lesson) => lesson.id)).size, 35);
    assert.deepEqual(new Set(lessons.map((lesson) => lesson.moduleId)), new Set([
      'cfs-getting-started', 'cfs-kali', 'cfs-linux', 'cfs-networking', 'cfs-security-tools',
    ]));
  });

  test('fails clearly on duplicate lesson IDs', () => {
    const lesson = {
      id: 'cfs-kali-duplicate', courseId, moduleId: 'cfs-kali',
      sourcePath: 'one.md', title: 'One', contentType: 'lesson',
      progressRequired: true, published: true, sortOrder: 1,
    };
    assert.throws(
      () => validateLessonCatalog([lesson, { ...lesson, sourcePath: 'two.md' }]),
      /Duplicate lesson_id cfs-kali-duplicate/
    );
  });
});

describe('lesson progress integration', { concurrency: false }, () => {
  let mf;
  let db;
  let catalog;
  let firstCookie;
  let secondCookie;
  let firstUserId;

  async function request(method, path, { cookie, origin } = {}) {
    const headers = {};
    if (cookie) headers.Cookie = cookie;
    if (origin) headers.Origin = origin;
    const response = await mf.dispatchFetch(`${baseUrl}${path}`, { method, headers });
    return { response, data: await response.json() };
  }

  async function register(email) {
    const response = await mf.dispatchFetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return { response, data: await response.json(), cookie: cookieFrom(response) };
  }

  before(async () => {
    mf = new Miniflare({
      compatibilityDate: '2026-06-23',
      modules: [
        { type: 'ESModule', path: workerPath },
        { type: 'ESModule', path: securityPath },
      ],
      modulesRoot: root,
      d1Databases: { DB: 'session-2-integration' },
    });
    db = await mf.getD1Database('DB');
    await applyMigration(db, '0001_account_course_foundation.sql');
    await applyMigration(db, '0002_lesson_progress_foundation.sql');
    catalog = await loadCatalog();
    await syncLessonCatalog(db, catalog, '2026-08-11T00:00:00.000Z');
    const first = await register('session2-first@example.invalid');
    const second = await register('session2-second@example.invalid');
    firstCookie = first.cookie;
    secondCookie = second.cookie;
    firstUserId = first.data.user.id;
  });

  after(async () => {
    await mf?.dispose();
  });

  test('syncs the catalog by stable ID', async () => {
    const row = await db.prepare('SELECT COUNT(*) AS count FROM lessons').first();
    assert.equal(row.count, 35);
    assert.deepEqual(await syncLessonCatalog(db, catalog), { synced: 35 });
    const afterRow = await db.prepare('SELECT COUNT(*) AS count FROM lessons').first();
    assert.equal(afterRow.count, 35);
  });

  test('serves the published lesson catalog without authentication', async () => {
    const result = await request('GET', `/api/courses/${courseId}/lessons`);
    assert.equal(result.response.status, 200);
    assert.equal(result.data.lessons.length, 35);
    assert.equal(result.data.lessons[0].id, 'cfs-getting-started-learning-path');
  });

  test('requires a valid session for progress reads and writes', async () => {
    const summary = await request('GET', `/api/progress/${courseId}`);
    const mutation = await request('PUT', '/api/progress/cfs-kali-what-is-kali/view');
    assert.equal(summary.response.status, 401);
    assert.equal(mutation.response.status, 401);
    assert.deepEqual(summary.data, { error: 'authentication_required' });
    assert.deepEqual(mutation.data, { error: 'authentication_required' });
  });

  test('starts with zero progress and resumes the first required lesson', async () => {
    const result = await request('GET', `/api/progress/${courseId}`, { cookie: firstCookie });
    assert.equal(result.response.status, 200);
    assert.equal(result.data.completed, 0);
    assert.equal(result.data.total, 35);
    assert.equal(result.data.percentage, 0);
    assert.equal(result.data.last_viewed_lesson, null);
    assert.equal(result.data.resume_lesson.id, 'cfs-getting-started-learning-path');
  });

  test('records first and repeated views without duplicate rows', async () => {
    const id = 'cfs-getting-started-what-is-cybersecurity';
    assert.equal((await request('PUT', `/api/progress/${id}/view`, { cookie: firstCookie })).response.status, 200);
    assert.equal((await request('PUT', `/api/progress/${id}/view`, { cookie: firstCookie })).response.status, 200);
    const row = await db.prepare(`
      SELECT COUNT(*) AS count, MIN(started_at) AS started_at
      FROM lesson_progress WHERE user_id = ? AND lesson_id = ?
    `).bind(firstUserId, id).first();
    assert.equal(row.count, 1);
    const summary = await request('GET', `/api/progress/${courseId}`, { cookie: firstCookie });
    assert.equal(summary.data.last_viewed_lesson.id, id);
    assert.equal(summary.data.resume_lesson.id, id);
  });

  test('completes a lesson idempotently and completion implies started', async () => {
    const id = 'cfs-getting-started-learning-path';
    const first = await request('PUT', `/api/progress/${id}/complete`, { cookie: firstCookie });
    const second = await request('PUT', `/api/progress/${id}/complete`, { cookie: firstCookie });
    assert.equal(first.response.status, 200);
    assert.equal(second.response.status, 200);
    assert.ok(first.data.progress.started_at);
    assert.ok(first.data.progress.last_viewed_at);
    assert.equal(second.data.progress.completed_at, first.data.progress.completed_at);
    const row = await db.prepare('SELECT COUNT(*) AS count FROM lesson_progress WHERE user_id = ? AND lesson_id = ?')
      .bind(firstUserId, id).first();
    assert.equal(row.count, 1);
  });

  test('rejects unknown and unpublished lessons', async () => {
    const unknown = await request('PUT', '/api/progress/not-a-lesson/view', { cookie: firstCookie });
    assert.equal(unknown.response.status, 404);
    const hidden = { ...catalog[0], id: 'cfs-hidden-test', sourcePath: 'hidden-test.md', published: false };
    await syncLessonCatalog(db, [hidden]);
    const unpublished = await request('PUT', '/api/progress/cfs-hidden-test/complete', { cookie: firstCookie });
    assert.equal(unpublished.response.status, 404);
  });

  test('enforces user isolation and derives identity only from the session', async () => {
    const secondSummary = await request('GET', `/api/progress/${courseId}`, { cookie: secondCookie });
    assert.equal(secondSummary.data.completed, 0);
    assert.equal(secondSummary.data.lessons.every((lesson) => lesson.completed_at === null), true);
    const firstSummary = await request('GET', `/api/progress/${courseId}`, { cookie: firstCookie });
    assert.equal(firstSummary.data.completed, 1);
  });

  test('rejects cross-origin progress mutations', async () => {
    const result = await request('PUT', '/api/progress/cfs-kali-what-is-kali/view', {
      cookie: firstCookie,
      origin: 'https://attacker.example',
    });
    assert.equal(result.response.status, 403);
    assert.deepEqual(result.data, { error: 'invalid_origin' });
  });

  test('calculates course and module summaries from current required lessons', async () => {
    await request('PUT', '/api/progress/cfs-kali-what-is-kali/complete', { cookie: firstCookie });
    await request('PUT', '/api/progress/cfs-kali-download/complete', { cookie: firstCookie });
    const summary = await request('GET', `/api/progress/${courseId}`, { cookie: firstCookie });
    assert.equal(summary.data.completed, 3);
    assert.equal(summary.data.total, 35);
    assert.equal(summary.data.percentage, 9);
    const kali = summary.data.modules.find((module) => module.module_id === 'cfs-kali');
    assert.deepEqual(kali, { module_id: 'cfs-kali', completed: 2, total: 6, percentage: 33 });
  });

  test('new Kali lessons recalculate progress without changing existing rows', async () => {
    const beforeProgress = await db.prepare('SELECT COUNT(*) AS count FROM lesson_progress WHERE user_id = ?')
      .bind(firstUserId).first();
    const before = await request('GET', `/api/progress/${courseId}`, { cookie: firstCookie });
    const added = {
      ...catalog.find((lesson) => lesson.moduleId === 'cfs-kali'),
      id: 'cfs-kali-new-safe-topic',
      sourcePath: 'cybersecurity-first-steps/kali/new-safe-topic.md',
      title: 'A New Safe Topic',
      sortOrder: 85,
    };
    await syncLessonCatalog(db, [added]);
    const after = await request('GET', `/api/progress/${courseId}`, { cookie: firstCookie });
    const afterProgress = await db.prepare('SELECT COUNT(*) AS count FROM lesson_progress WHERE user_id = ?')
      .bind(firstUserId).first();
    assert.equal(after.data.total, before.data.total + 1);
    assert.equal(after.data.completed, before.data.completed);
    assert.ok(after.data.percentage < before.data.percentage);
    assert.equal(afterProgress.count, beforeProgress.count);
    assert.equal(after.data.lessons.find((lesson) => lesson.id === added.id).completed_at, null);
  });

  test('title and path changes preserve progress attached to stable identity', async () => {
    const original = catalog.find((lesson) => lesson.id === 'cfs-kali-what-is-kali');
    const changed = {
      ...original,
      title: 'Renamed Kali Introduction',
      sourcePath: 'cybersecurity-first-steps/kali/moved/introduction.md',
    };
    await syncLessonCatalog(db, [changed]);
    const lesson = await db.prepare('SELECT title, source_path FROM lessons WHERE id = ?').bind(original.id).first();
    const progress = await db.prepare('SELECT completed_at FROM lesson_progress WHERE user_id = ? AND lesson_id = ?')
      .bind(firstUserId, original.id).first();
    assert.deepEqual(lesson, { title: changed.title, source_path: changed.sourcePath });
    assert.ok(progress.completed_at);
  });
});
