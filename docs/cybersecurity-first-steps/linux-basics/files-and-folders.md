---
course_id: cybersecurity-first-steps
module_id: cfs-linux
lesson_id: cfs-linux-files-and-folders
title: Files and Folders
content_type: lesson
progress_required: true
order: 120
---

﻿---
title: Files and Folders
module: Learning Your Way Around Linux
lesson: 11
difficulty: Beginner
estimated_time: 25–35 minutes
last_reviewed: 2026-07
platform_support: Kali-Specific
prerequisites:
  - Terminal Basics
tags:
  - linux
  - files
  - folders
  - directories
  - beginner
---

# Lesson 11: Files and Folders

**Estimated Time:** 25–35 minutes

**Difficulty:** Beginner

**Platform Support:** Kali Linux

---

## Learning Objectives

By the end of this lesson, you should be able to:

- Explain how Linux organizes files.
- Understand the difference between a file and a directory.
- Navigate between directories.
- List the contents of directories.
- Understand absolute and relative paths.

---

## Goal

Learn how Linux stores information and how to move around the file system.

---

## Why This Matters

Everything in Linux is organized into directories.

If you know where you are, you'll rarely feel lost.

Many cybersecurity tools expect you to know where files are stored.

Understanding the file system is one of the biggest confidence boosters for new Linux users.

---

## Plain-English Explanation

Think of your computer like a filing cabinet.

The cabinet contains drawers.

The drawers contain folders.

The folders contain documents.

Linux works the same way.

Directories (folders) hold files and other directories.

---

## New Terms

- File
- Directory
- Path
- Root Directory
- Home Directory
- Absolute Path
- Relative Path

---

## The Linux File System

At the very top is the root directory.

It is written as:

    /

Everything else starts here.

For example:

    /

        home/

            kali/

                Documents/

                Downloads/

                Pictures/

---

!!! info "Behind the Curtain"

    Unlike Windows, Linux does not use drive letters like C:\ or D:\.

    Everything begins at the single root directory:

        /

---

## Your Home Directory

Most of your work will happen inside:

    /home/kali

This is your personal workspace.

Think of it as your office inside a larger building.

---

## Step 1: Where Am I?

Run:

    pwd

You should see something similar to:

    /home/kali

---

## Step 2: What's Here?

Run:

    ls

You should see files and folders in your current location.

---

## Step 3: Move Into a Folder

Run:

    cd Documents

If the folder exists, you will move into it.

Check your location:

    pwd

---

## Step 4: Go Back

Run:

    cd ..

The two dots mean:

> Go up one directory.

Run:

    pwd

You should be back where you started.

---

## Step 5: Return Home

No matter where you are, you can return home with:

    cd ~

The tilde (`~`) is a shortcut for your home directory.

---

## Absolute vs Relative Paths

An absolute path starts from the root.

Example:

    /home/kali/Documents

A relative path starts from your current location.

Example:

    Documents

Both may reach the same destination.

---

## Common Commands

| Command   | Purpose                |
| --------- | ---------------------- |
| pwd       | Show current directory |
| ls        | List files             |
| cd folder | Enter folder           |
| cd ..     | Go up one level        |
| cd ~      | Return home            |

---

## Try It Yourself

Practice this sequence:

    pwd

    ls

    cd Documents

    pwd

    cd ..

    pwd

    cd ~

    pwd

Try saying what each command does before pressing Enter.

---

## Reflection Questions

1. What is the root directory?
2. What is your home directory?
3. What does `cd ..` do?
4. What is the difference between an absolute path and a relative path?
5. Why is knowing your current directory important?

---

## Common Mistakes

- Forgetting spaces in commands.
- Trying to enter a folder that does not exist.
- Confusing files with directories.
- Thinking `cd ..` deletes something.

---

## Troubleshooting

### "No such file or directory"

Double-check the folder name.

Linux is case-sensitive.

`Documents` and `documents` are different.

### Lost?

Run:

    pwd

Then:

    ls

These two commands will help you figure out where you are.

---

## Stop and Check

You are ready to continue when:

- [ ] You can explain what a directory is.
- [ ] You can use `pwd`.
- [ ] You can use `ls`.
- [ ] You can use `cd`.
- [ ] You understand the difference between absolute and relative paths.

---

## Lesson Summary

In this lesson you learned:

- Linux organizes everything into directories.
- The root directory is `/`.
- Your home directory is where most of your work will happen.
- `pwd`, `ls`, and `cd` are fundamental navigation commands.
- Absolute and relative paths describe locations in different ways.

---

## What To Do Next

Continue to **Lesson 12 – Useful Commands**.

You'll build on today's navigation skills by learning several safe commands you'll use throughout the rest of the course.
