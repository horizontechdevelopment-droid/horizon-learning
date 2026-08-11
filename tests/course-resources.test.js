import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Miniflare } from 'miniflare';
import {
  addResourceVersion,
  createResource,
  publishResourceVersion,
  retireResourceVersion,
  unpublishResource,
} from '../src/resource-service.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const baseUrl = 'https://horizon-learning.test';
const courseId = 'cybersecurity-first-steps';
const pdfMime = 'application/pdf';
const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const pdfV1 = new TextEncoder().encode('%PDF-1.4\nHorizon course guide v1');
const pdfV2 = new TextEncoder().encode('%PDF-1.4\nHorizon course guide v2');
const xlsxV1 = Uint8Array.from([0x50, 0x4b, 0x03, 0x04, 0x48, 0x4c, 0x58, 0x31]);
const xlsxV2 = Uint8Array.from([0x50, 0x4b, 0x03, 0x04, 0x48, 0x4c, 0x58, 0x32]);

async function applyMigration(db, name) {
  const sql = (await readFile(join(root, 'migrations', name), 'utf8')).replaceAll('\r\n', '\n');
  const triggers = [];
  const remaining = sql.replace(/CREATE TRIGGER[\s\S]*?\nEND;/g, (trigger) => {
    triggers.push(trigger);
    return '';
  });
  const statements = remaining.split(';').map((statement) => statement.trim()).filter(Boolean);
  statements.push(...triggers);
  await db.batch(statements.map((statement) => db.prepare(statement)));
}

describe('global course resources', { concurrency: false }, () => {
  let mf;
  let db;
  let bucket;
  let pdfVersion1;
  let pdfVersion2;
  let pdfVersion3;
  let workbookVersion;
  let workbookVersion2;

  async function request(path) {
    return mf.dispatchFetch(`${baseUrl}${path}`);
  }

  before(async () => {
    mf = new Miniflare({
      compatibilityDate: '2026-06-23',
      modules: [
        { type: 'ESModule', path: join(root, 'src', 'index.js') },
        { type: 'ESModule', path: join(root, 'src', 'security.js') },
        { type: 'ESModule', path: join(root, 'src', 'resource-storage.js') },
      ],
      modulesRoot: root,
      d1Databases: { DB: 'session-3-resources' },
      r2Buckets: { RESOURCES: 'session-3-resources' },
    });
    const bindings = await mf.getBindings();
    db = bindings.DB;
    bucket = bindings.RESOURCES;
    await applyMigration(db, '0001_account_course_foundation.sql');
    await applyMigration(db, '0002_lesson_progress_foundation.sql');
    await applyMigration(db, '0003_course_resource_versions.sql');
  });

  after(async () => {
    await mf?.dispose();
  });

  test('creates a stable draft PDF resource', async () => {
    const resource = await createResource(db, {
      id: 'cfs-course-pdf', courseId, slug: 'course-pdf',
      title: 'Cybersecurity First Steps PDF', resourceKind: 'pdf', sortOrder: 10,
    });
    assert.equal(resource.id, 'cfs-course-pdf');
    assert.equal(resource.course_id, courseId);
    assert.equal(resource.published, 0);
    assert.equal(resource.current_version_id, null);
  });

  test('adds a draft PDF version with binary metadata and checksum', async () => {
    pdfVersion1 = await addResourceVersion(db, bucket, {
      resourceId: 'cfs-course-pdf', versionLabel: 'v1.0',
      filename: 'cybersecurity-first-steps-v1.pdf', contentType: pdfMime,
      content: pdfV1, releaseNotes: 'Initial local version',
    });
    assert.equal(pdfVersion1.published, 0);
    assert.equal(pdfVersion1.byte_size, pdfV1.byteLength);
    assert.match(pdfVersion1.sha256, /^[0-9a-f]{64}$/);
    assert.equal(pdfVersion1.content_type, pdfMime);
  });

  test('rejects duplicate version labels without adding another row', async () => {
    await assert.rejects(() => addResourceVersion(db, bucket, {
      resourceId: 'cfs-course-pdf', versionLabel: 'v1.0',
      filename: 'duplicate.pdf', contentType: pdfMime, content: pdfV1,
    }), /duplicate_version_label/);
    const row = await db.prepare(`
      SELECT COUNT(*) AS count FROM course_resource_versions
      WHERE resource_id = 'cfs-course-pdf'
    `).first();
    assert.equal(row.count, 1);
  });

  test('deletes a new R2 object when its metadata insert fails', async () => {
    const before = (await bucket.list()).objects.map((object) => object.key).sort();
    await db.prepare(`
      CREATE TRIGGER force_resource_version_insert_failure
      BEFORE INSERT ON course_resource_versions
      BEGIN
        SELECT RAISE(ABORT, 'forced metadata insert failure');
      END
    `).run();
    try {
      await assert.rejects(() => addResourceVersion(db, bucket, {
        resourceId: 'cfs-course-pdf', versionLabel: 'v1.1',
        filename: 'failed-metadata.pdf', contentType: pdfMime, content: pdfV1,
      }), /forced metadata insert failure/);
    } finally {
      await db.prepare('DROP TRIGGER force_resource_version_insert_failure').run();
    }
    const after = (await bucket.list()).objects.map((object) => object.key).sort();
    assert.deepEqual(after, before);
  });

  test('keeps draft resources out of public listing and metadata', async () => {
    const listing = await request(`/api/courses/${courseId}/resources`);
    assert.deepEqual((await listing.json()).resources, []);
    assert.equal((await request('/api/resources/cfs-course-pdf')).status, 404);
  });

  test('publishes v1 and serves public metadata through a stable URL', async () => {
    await publishResourceVersion(db, 'cfs-course-pdf', pdfVersion1.id);
    const metadata = await request('/api/resources/cfs-course-pdf');
    const body = await metadata.json();
    assert.equal(metadata.status, 200);
    assert.equal(body.resource.id, 'cfs-course-pdf');
    assert.equal(body.resource.download_url, '/api/resources/cfs-course-pdf/download');
    assert.equal(body.resource.current_version.version, 'v1.0');
    assert.equal(JSON.stringify(body).includes('storage_key'), false);
  });

  test('round-trips the published PDF through local R2', async () => {
    const response = await request('/api/resources/cfs-course-pdf/download');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Type'), pdfMime);
    assert.equal(response.headers.get('Content-Disposition'), 'attachment; filename="cybersecurity-first-steps-v1.pdf"');
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), pdfV1);
  });

  test('adds v2 as a draft without changing the stable download', async () => {
    pdfVersion2 = await addResourceVersion(db, bucket, {
      resourceId: 'cfs-course-pdf', versionLabel: 'v2.0',
      filename: 'course-guide-renamed-v2.pdf', contentType: pdfMime, content: pdfV2,
    });
    const response = await request('/api/resources/cfs-course-pdf/download');
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), pdfV1);
    const resource = await db.prepare('SELECT current_version_id FROM course_resources WHERE id = ?')
      .bind('cfs-course-pdf').first();
    assert.equal(resource.current_version_id, pdfVersion1.id);
  });

  test('atomically switches the same stable URL to v2 and preserves v1', async () => {
    await publishResourceVersion(db, 'cfs-course-pdf', pdfVersion2.id);
    const response = await request('/api/resources/cfs-course-pdf/download');
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), pdfV2);
    assert.equal(response.headers.get('Content-Disposition'), 'attachment; filename="course-guide-renamed-v2.pdf"');
    const versions = await db.prepare(`
      SELECT version_label, published FROM course_resource_versions
      WHERE resource_id = ? ORDER BY version_label
    `).bind('cfs-course-pdf').all();
    assert.deepEqual(versions.results, [
      { version_label: 'v1.0', published: 1 },
      { version_label: 'v2.0', published: 1 },
    ]);
  });

  test('rejects a draft version as current', async () => {
    pdfVersion3 = await addResourceVersion(db, bucket, {
      resourceId: 'cfs-course-pdf', versionLabel: 'v3.0',
      filename: 'draft-v3.pdf', contentType: pdfMime, content: pdfV2,
    });
    await assert.rejects(
      () => db.prepare('UPDATE course_resources SET current_version_id = ? WHERE id = ?')
        .bind(pdfVersion3.id, 'cfs-course-pdf').run(),
      /current version must be a published version/
    );
  });

  test('blocks retiring the current version', async () => {
    await assert.rejects(
      () => retireResourceVersion(db, 'cfs-course-pdf', pdfVersion2.id),
      /cannot retire a current resource version/
    );
  });

  test('supports a stable XLSX companion workbook with independent versioning', async () => {
    await createResource(db, {
      id: 'cfs-kali-companion-workbook', courseId, slug: 'kali-companion-workbook',
      title: 'Kali Companion Workbook', resourceKind: 'xlsx', moduleId: 'cfs-kali', sortOrder: 20,
    });
    workbookVersion = await addResourceVersion(db, bucket, {
      resourceId: 'cfs-kali-companion-workbook', versionLabel: 'v1.0',
      filename: 'kali-companion-workbook.xlsx', contentType: xlsxMime, content: xlsxV1,
    });
    await publishResourceVersion(db, 'cfs-kali-companion-workbook', workbookVersion.id);
    const response = await request('/api/resources/cfs-kali-companion-workbook/download');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Type'), xlsxMime);
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), xlsxV1);
  });

  test('updates the workbook behind its stable URL and preserves its old version', async () => {
    workbookVersion2 = await addResourceVersion(db, bucket, {
      resourceId: 'cfs-kali-companion-workbook', versionLabel: 'v1.1',
      filename: 'renamed-kali-workbook.xlsx', contentType: xlsxMime, content: xlsxV2,
    });
    assert.deepEqual(
      new Uint8Array(await (await request('/api/resources/cfs-kali-companion-workbook/download')).arrayBuffer()),
      xlsxV1
    );
    await publishResourceVersion(db, 'cfs-kali-companion-workbook', workbookVersion2.id);
    assert.deepEqual(
      new Uint8Array(await (await request('/api/resources/cfs-kali-companion-workbook/download')).arrayBuffer()),
      xlsxV2
    );
    const row = await db.prepare(`
      SELECT COUNT(*) AS count FROM course_resource_versions WHERE resource_id = ?
    `).bind('cfs-kali-companion-workbook').first();
    assert.equal(row.count, 2);
  });

  test('rejects a current version owned by another resource', async () => {
    await assert.rejects(
      () => db.prepare('UPDATE course_resources SET current_version_id = ? WHERE id = ?')
        .bind(workbookVersion2.id, 'cfs-course-pdf').run(),
      /current version must be a published version of this resource/
    );
    const resource = await db.prepare('SELECT current_version_id FROM course_resources WHERE id = ?')
      .bind('cfs-course-pdf').first();
    assert.equal(resource.current_version_id, pdfVersion2.id);
  });

  test('rolls back publication when an atomic current-version switch fails', async () => {
    await assert.rejects(() => db.batch([
      db.prepare('UPDATE course_resource_versions SET published = 1 WHERE id = ?')
        .bind(pdfVersion3.id),
      db.prepare('UPDATE course_resources SET current_version_id = ? WHERE id = ?')
        .bind(pdfVersion3.id, 'cfs-kali-companion-workbook'),
    ]), /current version must be a published version of this resource/);
    const version = await db.prepare('SELECT published FROM course_resource_versions WHERE id = ?')
      .bind(pdfVersion3.id).first();
    assert.equal(version.published, 0);
  });

  test('returns a clean error when the current storage object is missing', async () => {
    await createResource(db, {
      id: 'cfs-missing-fixture', courseId, slug: 'missing-fixture',
      title: 'Missing Fixture', resourceKind: 'other', sortOrder: 30,
    });
    const version = await addResourceVersion(db, bucket, {
      resourceId: 'cfs-missing-fixture', versionLabel: 'v1', filename: 'missing.txt',
      contentType: 'text/plain', content: new TextEncoder().encode('temporary'),
    });
    await publishResourceVersion(db, 'cfs-missing-fixture', version.id);
    const row = await db.prepare('SELECT storage_key FROM course_resource_versions WHERE id = ?').bind(version.id).first();
    await bucket.delete(row.storage_key);
    const response = await request('/api/resources/cfs-missing-fixture/download');
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: 'resource_file_unavailable' });
  });

  test('unpublishing a resource hides it without deleting version history', async () => {
    await unpublishResource(db, 'cfs-course-pdf');
    assert.equal((await request('/api/resources/cfs-course-pdf')).status, 404);
    assert.equal((await request('/api/resources/cfs-course-pdf/download')).status, 404);
    const row = await db.prepare(`
      SELECT COUNT(*) AS count FROM course_resource_versions WHERE resource_id = ?
    `).bind('cfs-course-pdf').first();
    assert.equal(row.count, 3);
  });

  test('publishing a missing version does not disturb the current pointer', async () => {
    const before = await db.prepare('SELECT current_version_id FROM course_resources WHERE id = ?')
      .bind('cfs-kali-companion-workbook').first();
    await assert.rejects(
      () => publishResourceVersion(db, 'cfs-kali-companion-workbook', crypto.randomUUID()),
      /resource_version_not_found/
    );
    const after = await db.prepare('SELECT current_version_id FROM course_resources WHERE id = ?')
      .bind('cfs-kali-companion-workbook').first();
    assert.deepEqual(after, before);
  });

  test('public listing returns only visible resources with explicit DTOs', async () => {
    const response = await request(`/api/courses/${courseId}/resources`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.resources.length, 2);
    assert.deepEqual(body.resources.map((resource) => resource.id), [
      'cfs-kali-companion-workbook', 'cfs-missing-fixture',
    ]);
    assert.equal(JSON.stringify(body).includes('storage_key'), false);
  });
});
