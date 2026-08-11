# Horizon Learning Account and Course Foundation

Status: Approved for implementation
Branch: feature/account-course-foundation

## Product rules

- Horizon Learning remains free and accessible to all.
- Public course content is readable without an account.
- Accounts exist for My Learning, saved progress, resume state, and personalization.
- There is no commerce, paid enrollment, or purchase-entitlement layer in the core platform.
- Markdown remains the educational source of truth.
- Published PDFs, spreadsheets, checklists, labs, and other companion files are global course resources.
- Resource files are versioned independently from the course content.

## Current canonical course

The current top-level course is:

- course_id: cybersecurity-first-steps
- title: Cybersecurity First Steps

Kali Linux is currently a module inside this course. Companion Kali PDFs and spreadsheets should initially attach to this course and may use module metadata to indicate that they specifically support the Kali module.

## Stable content identity

Course structure must not depend on navigation order, visible guide numbers, filenames, or titles for permanent identity.

Each trackable lesson should eventually carry stable metadata such as:

- course_id
- module_id
- lesson_id
- title
- status

Example:

- course_id: cybersecurity-first-steps
- module_id: cfs-kali
- lesson_id: cfs-kali-010

Lesson IDs are immutable once published. A lesson may be renamed or moved without changing its ID. Retired lessons retain their identity so saved learner history is not destroyed.

Adding new lessons or sections to the Kali module must not require a database schema migration. New published lesson IDs simply become available to the progress system.

## Data model foundation

### users

Stores learner account identity and authentication state fields.

### sessions

Stores revocable server-side sessions. Session tokens are random, opaque values presented through secure cookies. Only a one-way digest of a session token should be stored in D1.

### courses

Stores stable course records and public metadata. Course access is not a paid entitlement.

### user_courses

Stores the learner's My Learning selection state. Removing a course from My Learning must not erase historical progress.

### course_resources

Stores metadata for global downloadable resources such as:

- course PDFs
- XLSX companion workbooks
- checklists
- lab sheets
- printable reference material

The database stores resource metadata and object-storage keys, not binary file contents.

### lesson_progress

Deferred to the next implementation slice. Progress records will use stable lesson IDs and should remain valid when lesson names, paths, or navigation order change.

## Resource delivery direction

Binary course resources should eventually be stored in Cloudflare R2. D1 should store metadata including at minimum:

- resource_id
- course_id
- optional module_id
- title
- resource_type
- version
- storage_key
- published state
- created_at
- updated_at

Horizon Learning is free, so published public resources do not require payment or purchase-entitlement checks.

## Session 1 implementation scope

Implement:

1. Cloudflare Worker application shell.
2. D1 migration infrastructure.
3. users table.
4. sessions table.
5. courses table.
6. user_courses table.
7. course_resources table.
8. Seed record for cybersecurity-first-steps.
9. Account registration.
10. Login.
11. Logout.
12. GET /api/me.
13. Public course listing.
14. My Learning add/remove/list APIs.
15. Generic resource metadata listing API.
16. Tests covering authentication, session isolation, and data integrity.

Deferred from Session 1:

- lesson progress and resume state
- R2 file delivery
- PDF generation
- spreadsheet generation
- password-reset email
- email verification
- UI redesign

## Authentication requirements

- Passwords must never be stored in plaintext.
- Use a password KDF supported safely in the Workers runtime.
- Normalize emails consistently before uniqueness checks.
- Do not reveal whether an email is registered through unnecessarily different login errors.
- Session identifiers must be generated with cryptographically secure randomness.
- Store only a digest of each session identifier in D1.
- Session cookies must be HttpOnly, Secure in production, SameSite=Lax or stricter, and scoped appropriately.
- Logout revokes the server-side session and expires the browser cookie.
- Session expiration must be enforced server-side.
- Authenticated endpoints must derive user identity from the validated session, never from a user ID supplied by the client.

## Acceptance gates

Session 1 is not ready to merge unless all of the following pass locally:

- Existing MkDocs build still succeeds.
- D1 migrations apply cleanly to an empty local database.
- Reapplying migrations does not corrupt the database.
- Duplicate normalized email registration is rejected.
- Correct credentials create a session.
- Incorrect credentials do not create a session.
- GET /api/me rejects missing, expired, revoked, and malformed sessions.
- One user's session cannot access or mutate another user's My Learning data.
- Adding the same course twice is idempotent or safely rejected without duplicate rows.
- Removing a course from My Learning does not delete course content or learner history tables.
- Public course and published resource metadata endpoints work without authentication.
- No secrets, tokens, local D1 data, node_modules, Wrangler state, or environment files are committed.
- No production D1 database or production deployment is created during local validation.

## Guiding rule

The platform must be able to grow the Kali module and all future courses without redesigning authentication, downloads, or learner identity. Content grows through stable metadata; the account system stores learner state against those stable identities.
