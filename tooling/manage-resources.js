import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sha256Hex } from '../src/resource-service.js';
import { resourceStorageKey, safeFilename, validateContent } from '../src/resource-storage.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const wrangler = join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
const bucketName = 'horizon-learning-resources';
const temporarySql = join(root, '.wrangler', 'resource-management.sql');
const argv = process.argv.slice(2);
const action = argv.shift();
if (argv.includes('--remote')) throw new Error('Remote resource management is disabled in Session 3');

function flags(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 2) {
    const name = values[index];
    if (!name?.startsWith('--') || values[index + 1] === undefined) throw new Error(`Invalid argument: ${name}`);
    parsed[name.slice(2)] = values[index + 1];
  }
  return parsed;
}

function quoted(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replaceAll("'", "''")}'`;
}

function runWrangler(args, capture = false) {
  const result = spawnSync(process.execPath, [wrangler, ...args], {
    cwd: root,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
  if (result.status !== 0) throw new Error(`Wrangler failed with status ${result.status}`);
  return result.stdout;
}

function d1Rows(sql) {
  const output = runWrangler([
    'd1', 'execute', 'horizon-learning', '--local', '--json', '--command', sql,
  ], true);
  const parsed = JSON.parse(output);
  return parsed[0]?.results ?? [];
}

async function d1File(sql) {
  await mkdir(dirname(temporarySql), { recursive: true });
  await writeFile(temporarySql, sql, 'utf8');
  try {
    runWrangler(['d1', 'execute', 'horizon-learning', '--local', '--file', temporarySql]);
  } finally {
    await rm(temporarySql, { force: true });
  }
}

const options = flags(argv);

if (action === 'list') {
  const rows = d1Rows(`
    SELECT r.id, c.slug AS course_id, r.slug, r.title, r.resource_kind,
           r.published, r.current_version_id
    FROM course_resources r JOIN courses c ON c.id = r.course_id
    ORDER BY c.slug, r.sort_order, r.id
  `);
  console.log(JSON.stringify(rows, null, 2));
} else if (action === 'create') {
  const course = d1Rows(`SELECT id FROM courses WHERE slug = ${quoted(options.course)} LIMIT 1`)[0];
  if (!course) throw new Error('course_not_found');
  const legacy = ['pdf', 'xlsx', 'checklist', 'worksheet'].includes(options.type) ? options.type : 'other';
  const now = new Date().toISOString();
  await d1File(`
    INSERT INTO course_resources (
      id, course_id, slug, title, description, resource_type, version,
      storage_key, published, sort_order, created_at, updated_at,
      module_id, resource_kind, current_version_id
    ) VALUES (
      ${quoted(options.id)}, ${quoted(course.id)}, ${quoted(options.slug)}, ${quoted(options.title)},
      ${quoted(options.description ?? '')}, ${quoted(legacy)}, '1.0', NULL, 0,
      ${Number(options.order ?? 0)}, ${quoted(now)}, ${quoted(now)},
      ${quoted(options.module)}, ${quoted(options.type)}, NULL
    );
  `);
} else if (action === 'add-version') {
  const resource = d1Rows(`
    SELECT r.id, c.slug AS course_id, r.resource_kind
    FROM course_resources r JOIN courses c ON c.id = r.course_id
    WHERE r.id = ${quoted(options.resource)} LIMIT 1
  `)[0];
  if (!resource) throw new Error('resource_not_found');
  if (d1Rows(`
    SELECT id FROM course_resource_versions
    WHERE resource_id = ${quoted(resource.id)} AND version_label = ${quoted(options.version)}
  `).length) throw new Error('duplicate_version_label');
  const filePath = resolve(root, options.file);
  const filename = safeFilename(options.filename ?? basename(filePath));
  const bytes = validateContent(await readFile(filePath), options['content-type'], resource.resource_kind);
  const versionId = crypto.randomUUID();
  const key = resourceStorageKey(resource.course_id, resource.id, versionId, filename);
  const checksum = await sha256Hex(bytes);
  runWrangler([
    'r2', 'object', 'put', `${bucketName}/${key}`, '--local',
    '--file', filePath, '--content-type', options['content-type'],
  ]);
  const now = new Date().toISOString();
  try {
    await d1File(`
      INSERT INTO course_resource_versions (
        id, resource_id, version_label, storage_key, original_filename,
        content_type, byte_size, sha256, published, release_notes, created_at, published_at
      ) VALUES (
        ${quoted(versionId)}, ${quoted(resource.id)}, ${quoted(options.version)}, ${quoted(key)},
        ${quoted(filename)}, ${quoted(options['content-type'])}, ${bytes.byteLength}, ${quoted(checksum)},
        0, ${quoted(options.notes ?? '')}, ${quoted(now)}, NULL
      );
    `);
  } catch (error) {
    try {
      runWrangler(['r2', 'object', 'delete', `${bucketName}/${key}`, '--local']);
    } catch {
      // Preserve the D1 error; cleanup is deliberately best effort and local only.
    }
    throw error;
  }
  console.log(JSON.stringify({ versionId, checksum, byteSize: bytes.byteLength }, null, 2));
} else if (action === 'publish') {
  const now = new Date().toISOString();
  await d1File(`
    BEGIN TRANSACTION;
    UPDATE course_resource_versions
      SET published = 1, published_at = COALESCE(published_at, ${quoted(now)})
      WHERE id = ${quoted(options.version)} AND resource_id = ${quoted(options.resource)};
    UPDATE course_resources
      SET current_version_id = ${quoted(options.version)}, published = 1, updated_at = ${quoted(now)}
      WHERE id = ${quoted(options.resource)};
    COMMIT;
  `);
} else if (action === 'unpublish') {
  await d1File(`UPDATE course_resources SET published = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ${quoted(options.resource)};`);
} else if (action === 'retire-version') {
  await d1File(`
    UPDATE course_resource_versions SET published = 0
    WHERE id = ${quoted(options.version)} AND resource_id = ${quoted(options.resource)};
  `);
} else {
  throw new Error('Usage: list | create | add-version | publish | unpublish | retire-version');
}
