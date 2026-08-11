---
course_id: cybersecurity-first-steps
module_id: cfs-linux
lesson_id: cfs-linux-finding-help
content_type: lesson
progress_required: true
order: 140
title: Finding Help
module: Learning Your Way Around Linux
lesson: 13
difficulty: Beginner
estimated_time: 25–35 minutes
last_reviewed: 2026-07
platform_support: Kali-Specific
prerequisites:
  - Terminal Basics
  - Files and Folders
  - Useful Commands
tags:
  - linux
  - help
  - documentation
  - man
  - beginner
---

# Guide 13: Finding Help

**Estimated Time:** 25–35 minutes

**Difficulty:** Beginner

**Platform Support:** Kali Linux

---

## Have You Ever Wondered...

...how experienced Linux users seem to know every command?

Here's a secret:

They don't.

Professional Linux users don't memorize thousands of commands.

Instead, they know where to find trustworthy information quickly.

Learning how to find answers is one of the most valuable Linux skills you can develop.

---

## Learning Objectives

By the end of this guide, you should be able to:

- Explain why documentation is important.
- Use Linux manual pages.
- Use built-in help options.
- Search for commands by keyword.
- Develop good habits for finding trustworthy information.

---

## Goal

Learn how to find reliable answers without relying on memorization.

---

## Why This Matters

Linux includes thousands of commands.

Nobody memorizes all of them.

Professionals regularly look up documentation, examples, and command options.

The difference between a beginner and an experienced Linux user often isn't memory—it's knowing where to look.

---

## Plain-English Explanation

Think of Linux documentation like the owner's manual for your car.

You probably don't remember every page.

But you know where to find information when you need it.

Linux works the same way.

Instead of trying to memorize every command, you'll learn how to ask Linux for help.

---

## New Terms

- Manual Page
- Documentation
- Help Option
- Command Option
- Keyword Search
- Built-in Help

---

# The Linux Manual

Linux includes built-in manuals for most commands.

To open a manual page, type:

    man ls

Then press **Enter**.

You should see the manual page for the `ls` command.

You can scroll using:

- Arrow keys
- Page Up
- Page Down

To quit the manual, press:

    q

---

## Using --help

Many commands also provide a quick help screen.

Example:

    ls --help

This displays a shorter explanation than the manual page.

If you only need a reminder of available options, `--help` is often the fastest choice.

---

## Using whatis

The `whatis` command provides a short description of another command.

Example:

    whatis pwd

Example output:

    pwd (1) - print name of current working directory

This is useful when you only need a quick reminder.

---

## Using apropos

What if you don't know the command name?

Use:

    apropos keyword

Example:

    apropos copy

Linux searches its manual pages for related commands.

This is an excellent way to discover tools you didn't know existed.

---

## Comparing Your Options

| Command   | Best Used For        |
| --------- | -------------------- |
| `man`     | Full documentation   |
| `--help`  | Quick reminder       |
| `whatis`  | One-line description |
| `apropos` | Search by topic      |

---

!!! tip "Learning Tip"

    You do not become an expert by memorizing everything.

    You become an expert by knowing how to find reliable information quickly.

---

!!! info "Looking Under the Hood"

    Manual pages are installed on your computer alongside many Linux programs.

    That means you can often read documentation even when you don't have an internet connection.

---

!!! info "Why Professionals Do This"

    Experienced Linux users regularly read documentation before trying unfamiliar commands or options.

    Spending a few minutes reading documentation can prevent mistakes and save a lot of troubleshooting later.

---

## Beyond Built-In Help

The built-in documentation is often the best place to start.

If you still need more information, consider these sources in order:

1. Built-in help (`man`, `--help`, `whatis`)
2. Official project documentation
3. Distribution documentation (such as Kali or Debian)
4. Trusted books or tutorials
5. Community forums
6. AI assistants

When using AI, treat it as a learning partner—not as the final authority.

Always understand commands before running them.

---

## Try It Yourself

Practice the following commands:

    man pwd

Exit by pressing:

    q

Next:

    ls --help

Then:

    whatis ls

Finally:

    apropos network

Notice how each command helps you in a different way.

---

## Reflection Questions

Without looking back:

1. Why don't professionals memorize every Linux command?
2. What does `man` do?
3. When would you use `--help` instead?
4. What does `whatis` show?
5. What is `apropos` useful for?

---

!!! success "Memory Helper"

    Remember these commands:

    `man command`
    → Read the full manual

    `command --help`
    → Quick help

    `whatis command`
    → Short description

    `apropos keyword`
    → Search for commands

---

!!! warning "Common Beginner Mistake"

    Many beginners immediately search random websites and copy commands without understanding them.

    Start with the built-in documentation first.

    If you use information from the internet, prefer official documentation and trusted educational resources.

---

!!! example "Real-World Example"

    Imagine you forget how to copy a file.

    Instead of immediately opening a web browser, try:

        man cp

    or

        cp --help

    In many cases, you'll find the answer in seconds.

---

!!! note "Progress, Not Perfection"

    Nobody memorizes every Linux command.

    Focus on understanding what commands do and where to find trustworthy information.

---

## Looking Ahead

You've learned how to find information when you're unsure about a command.

Next, you'll begin creating, copying, moving, and organizing files from the terminal.

Those are skills you'll use throughout the rest of your Linux journey.

---

## Stop and Check

You are ready to continue when:

- [ ] You can open a manual page.
- [ ] You know how to exit a manual page.
- [ ] You understand when to use `--help`.
- [ ] You understand what `whatis` does.
- [ ] You understand what `apropos` does.
- [ ] You know where to look for trustworthy Linux documentation.

---

## Lesson Summary

In this guide you learned:

- Professionals use documentation regularly.
- Linux includes built-in manuals.
- `man` opens the full manual.
- `--help` provides quick usage information.
- `whatis` gives a short description.
- `apropos` searches for commands by keyword.
- Understanding commands is more important than memorizing them.

---

## What To Do Next

Continue to **Creating and Managing Files**.

You'll begin working with files and directories using safe, practical Linux commands.
