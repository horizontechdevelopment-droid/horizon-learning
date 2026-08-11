PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  source_path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('lesson', 'module_intro', 'review', 'milestone')),
  progress_required INTEGER NOT NULL DEFAULT 1 CHECK (progress_required IN (0, 1)),
  published INTEGER NOT NULL DEFAULT 1 CHECK (published IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(slug) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_lessons_course_catalog
  ON lessons(course_id, published, sort_order, id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_catalog
  ON lessons(course_id, module_id, published, sort_order, id);

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  started_at TEXT NOT NULL,
  last_viewed_at TEXT NOT NULL,
  completed_at TEXT,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_resume
  ON lesson_progress(user_id, completed_at, last_viewed_at);
