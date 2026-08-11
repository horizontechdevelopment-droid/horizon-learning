PRAGMA foreign_keys = ON;

ALTER TABLE course_resources ADD COLUMN module_id TEXT;
ALTER TABLE course_resources ADD COLUMN resource_kind TEXT NOT NULL DEFAULT 'other'
  CHECK (resource_kind IN (
    'pdf', 'xlsx', 'checklist', 'worksheet', 'lab_sheet',
    'reference', 'printable', 'zip', 'other'
  ));
ALTER TABLE course_resources ADD COLUMN current_version_id TEXT;

UPDATE course_resources SET resource_kind = resource_type;

CREATE TABLE IF NOT EXISTS course_resource_versions (
  id TEXT PRIMARY KEY,
  resource_id TEXT NOT NULL,
  version_label TEXT NOT NULL,
  storage_key TEXT NOT NULL UNIQUE,
  original_filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
  sha256 TEXT NOT NULL CHECK (length(sha256) = 64),
  published INTEGER NOT NULL DEFAULT 0 CHECK (published IN (0, 1)),
  release_notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  published_at TEXT,
  UNIQUE(resource_id, version_label),
  FOREIGN KEY (resource_id) REFERENCES course_resources(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_course_resource_versions_resource
  ON course_resource_versions(resource_id, created_at);

CREATE TRIGGER IF NOT EXISTS trg_resource_current_version_valid
BEFORE UPDATE OF current_version_id ON course_resources
WHEN NEW.current_version_id IS NOT NULL
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM course_resource_versions v
    WHERE v.id = NEW.current_version_id
      AND v.resource_id = NEW.id
      AND v.published = 1
  ) THEN RAISE(ABORT, 'current version must be a published version of this resource') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_resource_current_version_not_retired
BEFORE UPDATE OF published ON course_resource_versions
WHEN OLD.published = 1 AND NEW.published = 0
BEGIN
  SELECT CASE WHEN EXISTS (
    SELECT 1 FROM course_resources r WHERE r.current_version_id = OLD.id
  ) THEN RAISE(ABORT, 'cannot retire a current resource version') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_resource_current_version_not_deleted
BEFORE DELETE ON course_resource_versions
BEGIN
  SELECT CASE WHEN EXISTS (
    SELECT 1 FROM course_resources r WHERE r.current_version_id = OLD.id
  ) THEN RAISE(ABORT, 'cannot delete a current resource version') END;
END;
