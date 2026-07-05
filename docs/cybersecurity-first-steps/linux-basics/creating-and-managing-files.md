---
title: Creating and Managing Files
module: Learning Your Way Around Linux
lesson: 14
difficulty: Beginner
estimated_time: 30–40 minutes
last_reviewed: 2026-07
platform_support: Kali-Specific
prerequisites:
  - Terminal Basics
  - Files and Folders
  - Useful Commands
  - Finding Help
tags:
  - linux
  - files
  - directories
  - mkdir
  - touch
  - cp
  - mv
  - rm
  - rmdir
  - beginner
---

# Guide 14: Creating and Managing Files

**Estimated Time:** 30–40 minutes

**Difficulty:** Beginner

**Platform Support:** Kali Linux

---

## Have You Ever Wondered...

...how people create, organize, rename, and remove files without using a graphical file manager?

Everything you can do with a mouse can also be done from the terminal.

In this guide, you'll learn how to safely create, copy, move, rename, and remove files using a few simple Linux commands.

---

## Learning Objectives

By the end of this guide, you should be able to:

- Create directories.
- Create empty files.
- Copy files.
- Move and rename files.
- Remove files safely.
- Remove empty directories.
- Understand when to use each command.

---

## Goal

Learn the basic file management commands you'll use throughout your Linux journey.

---

## Why This Matters

Every operating system stores information as files and folders.

Knowing how to manage them from the terminal is an important skill for Linux users and cybersecurity professionals.

These same commands will be used throughout the rest of this learning path.

---

## Plain-English Explanation

Think of your computer like a filing cabinet.

Sometimes you need to:

- Create a new folder.
- Create a document.
- Make a copy.
- Rename something.
- Move it somewhere else.
- Throw something away.

Linux provides simple commands for each of these tasks.

---

## New Terms

- Directory
- File
- Copy
- Move
- Rename
- Delete

---

# Our Practice Project

For this guide, we'll create a practice folder and work entirely inside it.

This lets you experiment without worrying about changing important files.

---

# Step 1: Create a Directory

Type:

    mkdir practice

Press **Enter**.

This creates a new directory named:

    practice

Think of it like creating a new folder in Windows or macOS.

---

# Step 2: Enter the Directory

Type:

    cd practice

You are now working inside your new directory.

Confirm your location:

    pwd

---

# Step 3: Create Your First File

Type:

    touch notes.txt

This creates an empty file called:

    notes.txt

List the contents of the directory:

    ls

You should now see:

    notes.txt

---

# Step 4: Make a Copy

Type:

    cp notes.txt backup.txt

Now list the directory again:

    ls

You should see:

    notes.txt

    backup.txt

The original file still exists.

You now have two separate files.

---

# Step 5: Rename a File

The `mv` command can also rename files.

Type:

    mv backup.txt notes-backup.txt

List the directory:

    ls

The file has been renamed.

---

# Step 6: Move a File

Let's create another directory.

Type:

    mkdir archive

Now move the backup file:

    mv notes-backup.txt archive/

The file has moved into the new directory.

You can verify this by running:

    ls

Then:

    ls archive

---

# Step 7: Remove a File

Delete the original file:

    rm notes.txt

List the directory:

    ls

Only the archive directory should remain.

---

!!! warning "Be Careful with rm"

    The `rm` command permanently removes files.

    Unlike many graphical desktop environments, there is usually no Recycle Bin when using `rm`.

    Before pressing **Enter**, take a moment to make sure you're deleting the correct file.

---

# Step 8: Remove an Empty Directory

Return to the main directory:

    cd archive

Delete the backup file:

    rm notes-backup.txt

Go back:

    cd ..

Now remove the empty directory:

    rmdir archive

The `rmdir` command only removes directories that are already empty.

---

!!! tip "Learning Tip"

    Practice these commands in a temporary directory like today's `practice` folder.

    Experimenting in a safe location builds confidence without risking important files.

---

!!! info "Looking Under the Hood"

    Linux doesn't care whether a file was created from the terminal or from a graphical file manager.

    Both methods work with the same underlying file system.

---

!!! info "Why Professionals Do This"

    Many Linux administrators and cybersecurity professionals work on remote systems that don't have a graphical desktop.

    Knowing these commands allows you to manage files anywhere, even over a remote connection.

---

## Try It Yourself

Repeat the following sequence without looking back:

    mkdir practice

    cd practice

    touch notes.txt

    cp notes.txt backup.txt

    mv backup.txt notes-backup.txt

    mkdir archive

    mv notes-backup.txt archive/

    ls

    ls archive

    rm notes.txt

    cd archive

    rm notes-backup.txt

    cd ..

    rmdir archive

Try explaining what each command does before you press **Enter**.

---

## Reflection Questions

Without looking back:

1. What command creates a directory?
2. What command creates an empty file?
3. What is the difference between `cp` and `mv`?
4. Why should you be careful when using `rm`?
5. Why can `rmdir` only remove empty directories?

---

!!! success "Memory Helper"

    Remember these commands:

    `mkdir`
    → Create a directory

    `touch`
    → Create an empty file

    `cp`
    → Copy a file

    `mv`
    → Move or rename a file

    `rm`
    → Remove a file

    `rmdir`
    → Remove an empty directory

---

!!! warning "Common Beginner Mistake"

    New Linux users often confuse:

    `rm`

    with

    `rmdir`

    Remember:

    `rm` removes files.

    `rmdir` removes empty directories.

---

!!! example "Real-World Example"

    Imagine organizing photos after a vacation.

    You might:

    - Create a new folder.
    - Copy your favorite photos.
    - Rename a few pictures.
    - Move them into different folders.
    - Delete duplicates.

    The commands you learned today perform those same tasks from the terminal.

---

!!! note "Progress, Not Perfection"

    Nobody memorizes every Linux command after using it once.

    Focus on understanding what each command does.

    Repetition will build confidence over time.

---

## Looking Ahead

You've learned how to create, copy, move, rename, and remove files safely.

Next, you'll learn why Linux sometimes displays **"Permission denied"** and how the Linux permission system helps protect your files.

---

## Stop and Check

You are ready to continue when:

- [ ] You can create a directory.
- [ ] You can create a file.
- [ ] You can copy a file.
- [ ] You can rename a file.
- [ ] You can move a file.
- [ ] You understand when to use `rm`.
- [ ] You understand when to use `rmdir`.

---

## Lesson Summary

In this guide you learned:

- How to create directories using `mkdir`.
- How to create files using `touch`.
- How to copy files using `cp`.
- How to move and rename files using `mv`.
- How to remove files using `rm`.
- How to remove empty directories using `rmdir`.

These commands form the foundation of working with files in Linux.

---

## What To Do Next

Continue to **Understanding Permissions**.

You'll learn why Linux protects certain files and what causes the familiar **"Permission denied"** message.
