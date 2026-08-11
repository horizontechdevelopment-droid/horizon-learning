const REQUIRED_FIELDS = [
  'course_id',
  'module_id',
  'lesson_id',
  'title',
  'content_type',
  'progress_required',
  'order',
];
const CONTENT_TYPES = new Set(['lesson', 'module_intro', 'review', 'milestone']);
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function scalar(value) {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/^(['"])(.*)\1$/, '$2');
}

export function parseLessonMetadata(markdown, sourcePath) {
  const normalized = String(markdown).replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) return null;
  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) throw new Error(`Unclosed front matter: ${sourcePath}`);
  const metadata = {};
  for (const line of normalized.slice(4, end).split('\n')) {
    const match = line.match(/^([a-z_]+):\s*(.*?)\s*$/);
    if (match) metadata[match[1]] = scalar(match[2]);
  }
  if (!('lesson_id' in metadata)) return null;
  for (const field of REQUIRED_FIELDS) {
    if (metadata[field] === undefined || metadata[field] === '') {
      throw new Error(`Missing ${field} in ${sourcePath}`);
    }
  }
  for (const field of ['course_id', 'module_id', 'lesson_id']) {
    if (!ID_PATTERN.test(metadata[field])) throw new Error(`Invalid ${field} in ${sourcePath}`);
  }
  if (!CONTENT_TYPES.has(metadata.content_type)) throw new Error(`Invalid content_type in ${sourcePath}`);
  if (typeof metadata.progress_required !== 'boolean') throw new Error(`Invalid progress_required in ${sourcePath}`);
  if (!Number.isInteger(metadata.order) || metadata.order < 0) throw new Error(`Invalid order in ${sourcePath}`);
  return {
    id: metadata.lesson_id,
    courseId: metadata.course_id,
    moduleId: metadata.module_id,
    sourcePath: sourcePath.replaceAll('\\', '/'),
    title: metadata.title,
    contentType: metadata.content_type,
    progressRequired: metadata.progress_required,
    published: metadata.published !== false,
    sortOrder: metadata.order,
  };
}

export function validateLessonCatalog(lessons) {
  const ids = new Map();
  const paths = new Set();
  for (const lesson of lessons) {
    if (ids.has(lesson.id)) {
      throw new Error(`Duplicate lesson_id ${lesson.id}: ${ids.get(lesson.id)} and ${lesson.sourcePath}`);
    }
    if (paths.has(lesson.sourcePath)) throw new Error(`Duplicate source_path: ${lesson.sourcePath}`);
    ids.set(lesson.id, lesson.sourcePath);
    paths.add(lesson.sourcePath);
  }
  return lessons;
}

export async function syncLessonCatalog(db, lessons, now = new Date().toISOString()) {
  validateLessonCatalog(lessons);
  const statement = db.prepare(`
    INSERT INTO lessons (
      id, course_id, module_id, source_path, title, content_type,
      progress_required, published, sort_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      course_id = excluded.course_id,
      module_id = excluded.module_id,
      source_path = excluded.source_path,
      title = excluded.title,
      content_type = excluded.content_type,
      progress_required = excluded.progress_required,
      published = excluded.published,
      sort_order = excluded.sort_order,
      updated_at = excluded.updated_at
  `);
  await db.batch(lessons.map((lesson) => statement.bind(
    lesson.id,
    lesson.courseId,
    lesson.moduleId,
    lesson.sourcePath,
    lesson.title,
    lesson.contentType,
    lesson.progressRequired ? 1 : 0,
    lesson.published ? 1 : 0,
    lesson.sortOrder,
    now,
    now
  )));
  return { synced: lessons.length };
}
