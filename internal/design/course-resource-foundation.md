# Global Course Resource and Download Foundation

## Stable identity and versions

`course_resources.id` is the permanent public identity used by course pages and bookmarks. A resource owns append-oriented `course_resource_versions` rows. Filenames, version labels, checksums, MIME types, sizes, and R2 keys belong to versions and are never public identity.

Course pages link only to `/api/resources/<resource-id>/download`. Publishing a replacement changes the current version pointer transactionally without changing that URL.

Supported resource kinds are PDF, XLSX, checklist, worksheet, lab sheet, reference, printable, ZIP, and other. The model is global and uses the existing course relationship; `module_id` is optional metadata.

## Publication

- Resources and versions begin as drafts.
- Uploading a version does not publish it.
- Publishing marks the selected owned version published and switches the stable resource pointer in one D1 batch/transaction.
- A trigger rejects a current pointer to a missing, draft, or wrong-resource version.
- Current versions cannot be retired or deleted until a replacement becomes current.
- Unpublishing a resource hides it without deleting its versions or current pointer.

## Storage boundary

The Worker uses the `RESOURCES` R2 binding through `resource-storage.js`. Internal keys are generated as:

`courses/<course-id>/resources/<resource-id>/<version-id>/<safe-filename>`

Public APIs never accept or return storage keys. Production will require an R2 bucket named `horizon-learning-resources` (or an environment-specific configured name) bound as `RESOURCES`. Session 3 creates no remote bucket.

## Cache behavior

The stable download endpoint resolves D1 on every request and returns the active binary with `Cache-Control: public, max-age=60, must-revalidate` plus a checksum ETag. A newly published version therefore becomes visible at the same URL after at most the short cache interval. Version objects can later support immutable version-specific delivery without changing the stable API contract.

## Public API contract

Public resource DTOs expose stable ID, slug, title, description, kind, optional module, stable download URL, and selected current-version metadata. They never expose D1 layout, storage keys, bucket names, or credentials.

## Local management

`npm run resources:local -- <command>` supports `list`, `create`, `add-version`, `publish`, `unpublish`, and `retire-version`. It always supplies Wrangler's `--local`; `--remote` is explicitly rejected. Files are size-limited, filenames and IDs are validated, PDF/ZIP signatures and MIME types are checked, SHA-256 is computed, and object keys are generated internally.

If a newly uploaded object's D1 version insert fails, the service and local management workflow make a best-effort deletion of only that generated key, then rethrow the original D1 error. A cleanup failure never masks the metadata failure.
