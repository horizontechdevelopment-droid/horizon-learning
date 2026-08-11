# Lesson Identity and Progress Standard

Markdown is the source of truth for the lesson catalog. Every progress-bearing page begins with YAML front matter containing:

```yaml
course_id: cybersecurity-first-steps
module_id: cfs-kali
lesson_id: cfs-kali-what-is-kali
title: What Is Kali?
content_type: lesson
progress_required: true
order: 40
# Optional; defaults to true
published: true
```

Supported `content_type` values are `lesson`, `module_intro`, `review`, and `milestone`.

## Identity rules

- `course_id`, `module_id`, and `lesson_id` use lowercase kebab case.
- IDs are immutable after publication and do not encode guide numbers, filenames, titles, or navigation positions.
- Renaming, moving, or reordering a page changes mutable catalog metadata, never its `lesson_id`.
- A new lesson uses a new unique ID. Adding it requires no schema migration.
- Duplicate lesson IDs are an error and stop catalog synchronization.
- Before removing a published page, set `published: false` and synchronize once so the retained catalog row and learner history are no longer publicly listed.

## Current modules

- `cfs-getting-started`
- `cfs-kali`
- `cfs-linux`
- `cfs-networking`
- `cfs-security-tools`

Instructional lessons, module introductions, reviews, and milestones in the intentional learning path count toward progress. Course overview, labs outside navigation, glossary, checklists, downloads, changelog, and generic informational pages do not.

Run `npm run lessons:sync:local` after applying local migrations to upsert metadata into D1. The sync keys on `lesson_id`, updates mutable title/path/order fields, preserves learner progress, and is deliberately local-only.
