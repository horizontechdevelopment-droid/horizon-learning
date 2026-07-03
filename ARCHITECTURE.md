# Horizon Learning Architecture

Version: 1.0

---

# Purpose

This document explains how the Horizon Learning repository is organized and how the project is intended to grow.

Horizon Learning is a living technology curriculum built from Markdown-first content.

The same source content should eventually support:

- Website pages
- Downloadable PDFs
- Interactive PDFs
- Printable worksheets
- Future learning portal content
- Future study tools

---

# Repository Overview

    horizon-learning/
    ├── docs/
    ├── internal/
    ├── mkdocs.yml
    ├── requirements.txt
    ├── README.md
    ├── LICENSE
    └── ARCHITECTURE.md

---

# Public Content

Public learner-facing content lives in:

    docs/

This includes:

- Home page
- About page
- Teaching philosophy
- Learning framework
- Learning paths
- Downloads
- Updates
- Changelog
- Style guide, if intentionally published

MkDocs builds the `docs/` directory into the public static website.

---

# Internal Operating Manual

Internal project standards live in:

    internal/

These documents are not intended to be published as learner-facing website pages.

They define how Horizon Learning is created, reviewed, maintained, and improved.

Current internal areas:

    internal/
    ├── standards/
    ├── templates/
    ├── workflows/
    ├── checklists/
    └── design/

---

# Standards

Standards define quality expectations.

Examples:

- Curriculum standard
- Writing standard
- Terminology standard
- Knowledge graph standard
- Diagram standard

---

# Templates

Templates define repeatable content structures.

Examples:

- Lesson template
- Lab template
- Checklist template
- Glossary template

---

# Workflows

Workflows define repeatable project processes.

Examples:

- Publishing workflow
- Review workflow
- Update workflow
- Release workflow

---

# Checklists

Checklists define quality gates.

Examples:

- Lesson review checklist
- Release checklist
- PDF review checklist

---

# Design

Design documents define the Horizon Learning visual and educational experience.

Examples:

- Design system
- Diagram guidelines
- Screenshot standards
- Accessibility expectations

---

# Build Process

Horizon Learning currently uses MkDocs.

Source content:

    Markdown files

Build tool:

    MkDocs with Material for MkDocs

Build command:

    mkdocs build

Output directory:

    site/

The `site/` directory is generated output and should not be committed.

---

# Deployment Plan

The intended deployment flow is:

    Local development
        ↓
    Git commit
        ↓
    Push to GitHub
        ↓
    Cloudflare Pages build
        ↓
    Public website

Future public domain:

    learn.horizontechdevelopment.com

---

# Content Philosophy

Markdown files are the source of truth.

Presentation may change over time, but the educational content should remain portable.

This means Horizon Learning should not be locked into one website framework forever.

Future systems may include:

- PDF generation
- Interactive workbook generation
- Search improvements
- Learning portal
- Progress tracking
- Notes
- AI study assistant

---

# Learning Path Structure

Learning paths should be organized into modules.

Example:

    cybersecurity-first-steps/
    ├── getting-started/
    ├── kali/
    ├── linux-basics/
    ├── networking/
    ├── tools/
    ├── labs/
    └── resources/

Each learning path should include:

- Overview
- Modules
- Lessons
- Labs
- Checklists
- Glossary
- Downloads, when available

---

# Lesson Structure

Lessons should follow the canonical lesson template in:

    internal/templates/lesson-template.md

Lessons should include:

- YAML metadata
- Estimated time
- Difficulty
- Prerequisites
- Learning objectives
- Plain-English explanation
- Practice
- Reflection
- Stop and check
- Lesson summary
- Next lesson

---

# Maintenance Philosophy

Horizon Learning is a living curriculum.

Lessons should be reviewed regularly for:

- Accuracy
- Broken links
- Updated software
- Screenshots
- Better explanations
- Learner feedback

---

# Future Tooling

Future tooling may live in:

    tooling/

Possible tools:

- PDF generator
- Link checker
- Markdown validator
- Lesson metadata validator
- Image optimizer
- Changelog generator
- Knowledge graph builder

---

# Long-Term Architecture

The long-term architecture should support:

- Static public website
- Downloadable resources
- Interactive PDFs
- Learning portal
- Progress tracking
- Concept relationships
- Personalized learning recommendations

The repository should remain organized enough that new learning paths can be added without restructuring the project.

---

# Guiding Rule

Content should be useful, portable, maintainable, and learner-first.
