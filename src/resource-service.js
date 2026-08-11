import {
  resourceStorage,
  resourceStorageKey,
  safeFilename,
  validateContent,
} from './resource-storage.js';

const RESOURCE_KINDS = new Set([
  'pdf', 'xlsx', 'checklist', 'worksheet', 'lab_sheet',
  'reference', 'printable', 'zip', 'other',
]);
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;

function requiredId(value, field) {
  if (!ID_PATTERN.test(value)) throw new Error(`invalid_${field}`);
  return value;
}

function legacyType(kind) {
  return new Set(['pdf', 'xlsx', 'checklist', 'worksheet']).has(kind) ? kind : 'other';
}

export async function sha256Hex(bytes) {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return [...digest].map((value) => value.toString(16).padStart(2, '0')).join('');
}

export async function createResource(db, input, now = new Date().toISOString()) {
  requiredId(input.id, 'resource_id');
  requiredId(input.courseId, 'course_id');
  requiredId(input.slug, 'resource_slug');
  if (!RESOURCE_KINDS.has(input.resourceKind)) throw new Error('invalid_resource_kind');
  if (input.moduleId !== null && input.moduleId !== undefined) requiredId(input.moduleId, 'module_id');
  const course = await db.prepare('SELECT id, slug FROM courses WHERE slug = ?').bind(input.courseId).first();
  if (!course) throw new Error('course_not_found');
  await db.prepare(`
    INSERT INTO course_resources (
      id, course_id, slug, title, description, resource_type, version,
      storage_key, published, sort_order, created_at, updated_at,
      module_id, resource_kind, current_version_id
    ) VALUES (?, ?, ?, ?, ?, ?, '1.0', NULL, 0, ?, ?, ?, ?, ?, NULL)
  `).bind(
    input.id, course.id, input.slug, input.title, input.description ?? '',
    legacyType(input.resourceKind), input.sortOrder ?? 0, now, now,
    input.moduleId ?? null, input.resourceKind
  ).run();
  return getManagedResource(db, input.id);
}

export async function getManagedResource(db, resourceId) {
  return db.prepare(`
    SELECT r.id, c.slug AS course_id, r.module_id, r.slug, r.title,
           r.description, r.resource_kind, r.published, r.current_version_id,
           r.sort_order, r.created_at, r.updated_at
    FROM course_resources r
    JOIN courses c ON c.id = r.course_id
    WHERE r.id = ?
  `).bind(resourceId).first();
}

export async function addResourceVersion(db, bucket, input, now = new Date().toISOString()) {
  requiredId(input.resourceId, 'resource_id');
  if (!VERSION_PATTERN.test(input.versionLabel)) throw new Error('invalid_version_label');
  const resource = await getManagedResource(db, input.resourceId);
  if (!resource) throw new Error('resource_not_found');
  const duplicate = await db.prepare(`
    SELECT id FROM course_resource_versions WHERE resource_id = ? AND version_label = ?
  `).bind(resource.id, input.versionLabel).first();
  if (duplicate) throw new Error('duplicate_version_label');
  const filename = safeFilename(input.filename);
  const bytes = validateContent(input.content, input.contentType, resource.resource_kind);
  const versionId = crypto.randomUUID();
  const storageKey = resourceStorageKey(resource.course_id, resource.id, versionId, filename);
  const checksum = await sha256Hex(bytes);
  const storage = resourceStorage(bucket);
  if (await storage.exists(storageKey)) throw new Error('resource_storage_key_collision');
  await storage.put(storageKey, bytes, { contentType: input.contentType });
  try {
    await db.prepare(`
      INSERT INTO course_resource_versions (
        id, resource_id, version_label, storage_key, original_filename,
        content_type, byte_size, sha256, published, release_notes,
        created_at, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, NULL)
    `).bind(
      versionId, resource.id, input.versionLabel, storageKey, filename,
      input.contentType, bytes.byteLength, checksum, input.releaseNotes ?? '', now
    ).run();
  } catch (error) {
    try {
      await storage.delete(storageKey);
    } catch {
      // Preserve the metadata failure; cleanup is deliberately best effort.
    }
    throw error;
  }
  return db.prepare(`
    SELECT id, resource_id, version_label, original_filename, content_type,
           byte_size, sha256, published, release_notes, created_at, published_at
    FROM course_resource_versions WHERE id = ?
  `).bind(versionId).first();
}

export async function publishResourceVersion(db, resourceId, versionId, options = {}) {
  requiredId(resourceId, 'resource_id');
  const now = options.now ?? new Date().toISOString();
  const version = await db.prepare(`
    SELECT id FROM course_resource_versions WHERE id = ? AND resource_id = ?
  `).bind(versionId, resourceId).first();
  if (!version) throw new Error('resource_version_not_found');
  await db.batch([
    db.prepare(`
      UPDATE course_resource_versions
      SET published = 1, published_at = COALESCE(published_at, ?)
      WHERE id = ? AND resource_id = ?
    `).bind(now, versionId, resourceId),
    db.prepare(`
      UPDATE course_resources
      SET current_version_id = ?, published = ?, updated_at = ?
      WHERE id = ?
    `).bind(versionId, options.publishResource === false ? 0 : 1, now, resourceId),
  ]);
  return getManagedResource(db, resourceId);
}

export async function unpublishResource(db, resourceId, now = new Date().toISOString()) {
  await db.prepare('UPDATE course_resources SET published = 0, updated_at = ? WHERE id = ?')
    .bind(now, resourceId).run();
  return getManagedResource(db, resourceId);
}

export async function retireResourceVersion(db, resourceId, versionId) {
  const result = await db.prepare(`
    UPDATE course_resource_versions SET published = 0
    WHERE id = ? AND resource_id = ?
  `).bind(versionId, resourceId).run();
  if (result.meta.changes !== 1) throw new Error('resource_version_not_found');
}
