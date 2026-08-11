const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VERSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const MAX_RESOURCE_BYTES = 25 * 1024 * 1024;
const MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'text/plain',
  'text/csv',
  'application/octet-stream',
]);

function safeId(value, field) {
  if (!ID_PATTERN.test(value)) throw new Error(`invalid_${field}`);
  return value;
}

export function safeFilename(value) {
  const filename = String(value ?? '').trim();
  if (!filename || filename.length > 180 || /[\\/\r\n\0]/.test(filename)) throw new Error('invalid_filename');
  const safe = filename.replace(/[^A-Za-z0-9._-]/g, '_').replace(/^\.+/, '');
  if (!safe) throw new Error('invalid_filename');
  return safe;
}

export function validateContent(content, contentType, resourceKind) {
  const bytes = content instanceof Uint8Array ? content : new Uint8Array(content);
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_RESOURCE_BYTES) throw new Error('invalid_resource_size');
  if (!MIME_TYPES.has(contentType)) throw new Error('unsupported_content_type');
  if (resourceKind === 'pdf' && contentType !== 'application/pdf') throw new Error('resource_type_mismatch');
  if (resourceKind === 'xlsx' && contentType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    throw new Error('resource_type_mismatch');
  }
  if (resourceKind === 'zip' && contentType !== 'application/zip') throw new Error('resource_type_mismatch');
  if (contentType === 'application/pdf' && new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') {
    throw new Error('content_signature_mismatch');
  }
  if ((resourceKind === 'xlsx' || resourceKind === 'zip') && !(bytes[0] === 0x50 && bytes[1] === 0x4b)) {
    throw new Error('content_signature_mismatch');
  }
  return bytes;
}

export function resourceStorageKey(courseId, resourceId, versionId, filename) {
  safeId(courseId, 'course_id');
  safeId(resourceId, 'resource_id');
  if (!VERSION_ID_PATTERN.test(versionId)) throw new Error('invalid_version_id');
  return `courses/${courseId}/resources/${resourceId}/${versionId}/${safeFilename(filename)}`;
}

export function resourceStorage(bucket) {
  if (!bucket) throw new Error('resource_storage_unavailable');
  return {
    async put(key, content, metadata) {
      return bucket.put(key, content, { httpMetadata: { contentType: metadata.contentType } });
    },
    async get(key) {
      return bucket.get(key);
    },
    async exists(key) {
      return (await bucket.head(key)) !== null;
    },
    async delete(key) {
      return bucket.delete(key);
    },
  };
}

export function attachmentHeader(filename) {
  return `attachment; filename="${safeFilename(filename)}"`;
}
