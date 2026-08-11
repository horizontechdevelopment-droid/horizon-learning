import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Miniflare } from 'miniflare';

const workerPath = fileURLToPath(new URL('../src/index.js', import.meta.url));
const securityPath = fileURLToPath(new URL('../src/security.js', import.meta.url));
const migrationPath = fileURLToPath(new URL('../migrations/0001_account_course_foundation.sql', import.meta.url));
const baseUrl = 'https://horizon-learning.test';
const password = 'Session1-Integration!9zQ';
const firstEmail = 'session1-integration@example.invalid';
const secondEmail = 'session1-integration-2@example.invalid';

let mf;
let db;
let firstCookie;
let firstUserId;
let secondCookie;

function cookieFrom(response) {
  return response.headers.get('Set-Cookie')?.split(';', 1)[0] ?? '';
}

async function request(method, path, { body, cookie, origin } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (cookie) headers.Cookie = cookie;
  if (origin) headers.Origin = origin;
  const response = await mf.dispatchFetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  return { response, data };
}

describe('account and course integration', { concurrency: false }, () => {
  before(async () => {
    mf = new Miniflare({
      compatibilityDate: '2026-06-23',
      modules: [
        { type: 'ESModule', path: workerPath },
        { type: 'ESModule', path: securityPath },
      ],
      modulesRoot: fileURLToPath(new URL('..', import.meta.url)),
      d1Databases: { DB: 'session-1-integration' },
    });
    db = await mf.getD1Database('DB');
    const migration = (await readFile(migrationPath, 'utf8')).replaceAll('\r\n', '\n');
    const statements = migration.split(';').map((statement) => statement.trim()).filter(Boolean);
    await db.batch(statements.map((statement) => db.prepare(statement)));
  });

  after(async () => {
    await mf?.dispose();
  });

  test('rejects JSON bodies over 64 KiB', async () => {
    const { response, data } = await request('POST', '/api/auth/register', {
      body: { email: 'large@example.invalid', password: `ValidPassword!${'x'.repeat(70 * 1024)}` },
    });
    assert.equal(response.status, 413);
    assert.deepEqual(data, { error: 'request_body_too_large' });
  });

  test('registers a normalized account and creates a hashed session', async () => {
    const { response, data } = await request('POST', '/api/auth/register', {
      body: { email: `  ${firstEmail.toUpperCase()}  `, password },
    });
    assert.equal(response.status, 201);
    assert.equal(data.user.email, firstEmail);
    firstUserId = data.user.id;
    firstCookie = cookieFrom(response);
    assert.match(response.headers.get('Set-Cookie'), /; HttpOnly; Secure; SameSite=Lax;/);

    const user = await db.prepare('SELECT email, password_hash FROM users WHERE id = ?').bind(firstUserId).first();
    assert.equal(user.email, firstEmail);
    assert.match(user.password_hash, /^pbkdf2-sha256\$310000\$/);
    assert.equal(user.password_hash.includes(password), false);
    const rawToken = firstCookie.slice('hl_session='.length);
    assert.equal(await db.prepare('SELECT id FROM sessions WHERE token_hash = ?').bind(rawToken).first(), null);
  });

  test('rejects normalized duplicate registration', async () => {
    const { response, data } = await request('POST', '/api/auth/register', {
      body: { email: ` ${firstEmail.toUpperCase()} `, password },
    });
    assert.equal(response.status, 409);
    assert.deepEqual(data, { error: 'account_already_exists' });
    const row = await db.prepare('SELECT COUNT(*) AS count FROM users WHERE email = ?').bind(firstEmail).first();
    assert.equal(row.count, 1);
  });

  test('rejects invalid login without creating a session', async () => {
    const beforeRow = await db.prepare('SELECT COUNT(*) AS count FROM sessions').first();
    const { response, data } = await request('POST', '/api/auth/login', {
      body: { email: firstEmail, password: 'WrongPassword!999' },
    });
    const afterRow = await db.prepare('SELECT COUNT(*) AS count FROM sessions').first();
    assert.equal(response.status, 401);
    assert.deepEqual(data, { error: 'invalid_credentials' });
    assert.equal(afterRow.count, beforeRow.count);
  });

  test('creates a session on valid login and serves /api/me', async () => {
    const login = await request('POST', '/api/auth/login', { body: { email: firstEmail, password } });
    assert.equal(login.response.status, 200);
    firstCookie = cookieFrom(login.response);
    const me = await request('GET', '/api/me', { cookie: firstCookie });
    assert.equal(me.response.status, 200);
    assert.deepEqual(me.data.user, { id: firstUserId, email: firstEmail });
    assert.equal('password_hash' in me.data.user, false);
  });

  test('enforces server-side session expiry', async () => {
    const login = await request('POST', '/api/auth/login', { body: { email: firstEmail, password } });
    const expiringCookie = cookieFrom(login.response);
    const rawToken = expiringCookie.slice('hl_session='.length);
    const { hashSessionToken } = await import('../src/security.js');
    await db.prepare('UPDATE sessions SET expires_at = ? WHERE token_hash = ?')
      .bind('2000-01-01T00:00:00.000Z', await hashSessionToken(rawToken)).run();
    const me = await request('GET', '/api/me', { cookie: expiringCookie });
    assert.equal(me.response.status, 401);
    assert.deepEqual(me.data, { error: 'authentication_required' });
  });

  test('starts My Learning empty and adds a course idempotently', async () => {
    const initial = await request('GET', '/api/my-learning', { cookie: firstCookie });
    assert.deepEqual(initial.data, { courses: [] });
    const firstAdd = await request('PUT', '/api/my-learning/cybersecurity-first-steps', { cookie: firstCookie });
    const secondAdd = await request('PUT', '/api/my-learning/cybersecurity-first-steps', { cookie: firstCookie });
    assert.equal(firstAdd.response.status, 200);
    assert.equal(secondAdd.response.status, 200);
    const rows = await db.prepare('SELECT COUNT(*) AS count FROM user_courses WHERE user_id = ?').bind(firstUserId).first();
    assert.equal(rows.count, 1);
  });

  test('removes a course while preserving history and can re-add it', async () => {
    const removed = await request('DELETE', '/api/my-learning/cybersecurity-first-steps', { cookie: firstCookie });
    assert.equal(removed.response.status, 200);
    const hidden = await request('GET', '/api/my-learning', { cookie: firstCookie });
    assert.deepEqual(hidden.data, { courses: [] });
    const history = await db.prepare('SELECT active, removed_at FROM user_courses WHERE user_id = ?').bind(firstUserId).first();
    assert.equal(history.active, 0);
    assert.ok(history.removed_at);

    const readded = await request('PUT', '/api/my-learning/cybersecurity-first-steps', { cookie: firstCookie });
    assert.equal(readded.response.status, 200);
    const active = await db.prepare('SELECT active, removed_at FROM user_courses WHERE user_id = ?').bind(firstUserId).first();
    assert.equal(active.active, 1);
    assert.equal(active.removed_at, null);
  });

  test('isolates My Learning state between two users', async () => {
    const registration = await request('POST', '/api/auth/register', { body: { email: secondEmail, password } });
    secondCookie = cookieFrom(registration.response);
    const secondLearning = await request('GET', '/api/my-learning', { cookie: secondCookie });
    assert.deepEqual(secondLearning.data, { courses: [] });
    await request('DELETE', '/api/my-learning/cybersecurity-first-steps', { cookie: secondCookie });
    const firstLearning = await request('GET', '/api/my-learning', { cookie: firstCookie });
    assert.equal(firstLearning.data.courses.length, 1);
    assert.equal(firstLearning.data.courses[0].slug, 'cybersecurity-first-steps');
  });

  test('rejects cross-origin mutation requests', async () => {
    const evilOrigin = 'https://attacker.example';
    const cases = [
      request('POST', '/api/auth/register', { origin: evilOrigin, body: { email: 'csrf@example.invalid', password } }),
      request('POST', '/api/auth/login', { origin: evilOrigin, body: { email: firstEmail, password } }),
      request('POST', '/api/auth/logout', { origin: evilOrigin, cookie: firstCookie }),
      request('PUT', '/api/my-learning/cybersecurity-first-steps', { origin: evilOrigin, cookie: firstCookie }),
      request('DELETE', '/api/my-learning/cybersecurity-first-steps', { origin: evilOrigin, cookie: firstCookie }),
    ];
    for (const result of await Promise.all(cases)) {
      assert.equal(result.response.status, 403);
      assert.deepEqual(result.data, { error: 'invalid_origin' });
    }
  });

  test('logout revokes server state and rejects replay', async () => {
    const rawToken = firstCookie.slice('hl_session='.length);
    const { hashSessionToken } = await import('../src/security.js');
    const tokenHash = await hashSessionToken(rawToken);
    assert.ok(await db.prepare('SELECT id FROM sessions WHERE token_hash = ?').bind(tokenHash).first());
    const logout = await request('POST', '/api/auth/logout', { cookie: firstCookie });
    assert.equal(logout.response.status, 200);
    assert.equal(await db.prepare('SELECT id FROM sessions WHERE token_hash = ?').bind(tokenHash).first(), null);
    const replay = await request('GET', '/api/me', { cookie: firstCookie });
    assert.equal(replay.response.status, 401);
    assert.deepEqual(replay.data, { error: 'authentication_required' });
  });
});
