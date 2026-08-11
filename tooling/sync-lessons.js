import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseLessonMetadata, validateLessonCatalog } from '../src/lesson-catalog.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = join(root, 'docs', 'cybersecurity-first-steps');
const sqlPath = join(root, '.wrangler', 'lesson-catalog-sync.sql');

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  }));
  return nested.flat();
}

function quoted(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function syncSql(lessons) {
  const now = new Date().toISOString();
  return lessons.map((lesson) => `
INSERT INTO lessons (
  id, course_id, module_id, source_path, title, content_type,
  progress_required, published, sort_order, created_at, updated_at
) VALUES (
  ${quoted(lesson.id)}, ${quoted(lesson.courseId)}, ${quoted(lesson.moduleId)},
  ${quoted(lesson.sourcePath)}, ${quoted(lesson.title)}, ${quoted(lesson.contentType)},
  ${lesson.progressRequired ? 1 : 0}, ${lesson.published ? 1 : 0}, ${lesson.sortOrder},
  ${quoted(now)}, ${quoted(now)}
)
ON CONFLICT(id) DO UPDATE SET
  course_id = excluded.course_id,
  module_id = excluded.module_id,
  source_path = excluded.source_path,
  title = excluded.title,
  content_type = excluded.content_type,
  progress_required = excluded.progress_required,
  published = excluded.published,
  sort_order = excluded.sort_order,
  updated_at = excluded.updated_at;
`).join('\n');
}

const files = await markdownFiles(docsRoot);
const lessons = validateLessonCatalog((await Promise.all(files.map(async (path) => (
  parseLessonMetadata(await readFile(path, 'utf8'), relative(join(root, 'docs'), path))
)))).filter(Boolean));
await writeFile(sqlPath, syncSql(lessons), 'utf8');
const wrangler = join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
const result = spawnSync(process.execPath, [
  wrangler,
  'd1', 'execute', 'horizon-learning', '--local', '--file', sqlPath,
], { cwd: root, encoding: 'utf8', stdio: 'inherit' });
await rm(sqlPath, { force: true });
if (result.status !== 0) process.exitCode = result.status ?? 1;
else console.log(`Synced ${lessons.length} lessons to local D1.`);
