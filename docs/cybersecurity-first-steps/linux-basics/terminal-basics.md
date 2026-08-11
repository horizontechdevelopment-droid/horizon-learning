---
course_id: cybersecurity-first-steps
module_id: cfs-linux
lesson_id: cfs-linux-terminal-basics
title: Terminal Basics
content_type: lesson
progress_required: true
order: 110
---

﻿---
title: Terminal Basics
module: Getting Comfortable with Linux
lesson: 10
difficulty: Beginner
estimated_time: 20–30 minutes
last_reviewed: 2026-07
platform_support: Kali-Specific
prerequisites:
  - Starting Kali for the First Time
  - Shutting Down Kali Safely
tags:
  - kali
  - linux
  - terminal
  - commands
  - beginner
---

# Lesson 10: Terminal Basics

**Estimated Time:** 20–30 minutes

**Difficulty:** Beginner

**Platform Support:** Kali Linux

---

## Learning Objectives

By the end of this lesson, you should be able to:

- Explain what the terminal is.
- Open the terminal in Kali.
- Understand what a command is.
- Run a few safe beginner commands.
- Recognize basic command output.
- Avoid blindly copying commands from the internet.

---

## Goal

Become comfortable opening the terminal and running your first basic Linux commands.

---

## Why This Matters

Many cybersecurity tools are controlled from the terminal.

If the terminal feels confusing, Kali will feel confusing.

You do not need to become an expert today. The goal is to make the terminal feel less intimidating.

!!! tip

    The terminal is not magic.

    It is just another way to tell the computer what you want it to do.

---

## Plain-English Explanation

The terminal is a text-based way to control the computer.

Instead of clicking buttons, you type commands.

A command is an instruction.

The computer reads the command, does what it was told, and then shows output.

---

## New Terms

- **Terminal:** A window where you type commands.
- **Command:** An instruction typed into the terminal.
- **Prompt:** The text shown before where you type.
- **Output:** The response shown after a command runs.
- **Directory:** Another word for folder.
- **Current directory:** The folder you are currently working in.

---

## What the Prompt Means

When you open the terminal, you may see something like:

    kali@kali:~$

This is called the prompt.

It usually shows:

- Your username
- The computer name
- Your current location
- A symbol showing the terminal is waiting for a command

You do not need to fully understand every part yet.

For now, just know that the prompt means:

> The terminal is ready.

---

## Step 1: Open the Terminal

In Kali, open the terminal by:

1. Looking for the Terminal icon.
2. Or opening the Applications menu.
3. Searching for Terminal.
4. Clicking the Terminal app.

A terminal window should open.

---

## Step 2: Run Your First Command

Type:

    pwd

Press Enter.

This command means:

    print working directory

It shows where you are in the file system.

You may see something like:

    /home/kali

That means you are in the Kali user's home folder.

---

## Step 3: List Files and Folders

Type:

    ls

Press Enter.

This command lists files and folders in your current directory.

If nothing appears, the folder may be empty.

That is normal.

---

## Step 4: Clear the Screen

Type:

    clear

Press Enter.

This clears the terminal screen.

It does not delete files.

It only cleans up what you see in the terminal window.

---

## Step 5: Check Your Username

Type:

    whoami

Press Enter.

This shows the current user.

You may see:

    kali

---

!!! warning

    Do not copy and paste random commands from the internet.

    Some commands can delete files, change settings, install unsafe software, or break things.

    If you do not understand what a command does, pause and look it up first.

---

## Behind the Curtain

When you press Enter, the shell reads your command and tries to run it.

A shell is the program that accepts typed commands and sends them to the operating system.

You do not need to memorize that today.

For now, remember:

> Terminal is the window.
> Shell is the command interpreter inside it.

---

## Try It Yourself

Run these commands in order:

    pwd
    ls
    whoami
    clear
    pwd

Notice that `clear` did not move you or delete anything.

It only cleared the screen.

---

## Reflection Questions

Try answering these without looking back:

1. What is the terminal?
2. What is a command?
3. What does `pwd` show?
4. What does `ls` show?
5. Why should you avoid copying random commands from the internet?

---

## Common Mistakes

- Typing uppercase letters when the command should be lowercase.
- Forgetting to press Enter.
- Thinking `clear` deletes files.
- Copying commands without understanding them.
- Getting nervous when the terminal shows a lot of text.

---

## Troubleshooting

## Command Not Found

If a command says:

    command not found

Check for spelling mistakes.

Linux commands are usually lowercase.

For example:

    pwd

is not the same as:

    PWD

---

## Nothing Happens

Some commands only show output when something important happens.

If the prompt returns and there is no error, the command may have completed successfully.

---

## Stop and Check

You are ready to continue when:

- [ ] You can open the terminal.
- [ ] You can run `pwd`.
- [ ] You can run `ls`.
- [ ] You can run `whoami`.
- [ ] You understand that `clear` only clears the screen.
- [ ] You understand that commands should not be blindly copied.

---

## Lesson Summary

In this lesson you learned:

- The terminal lets you control Linux by typing commands.
- A command is an instruction.
- `pwd` shows your current folder.
- `ls` lists files and folders.
- `whoami` shows the current user.
- `clear` clears the terminal screen.
- Commands should be understood before they are copied and run.

---

## What To Do Next

Continue to **Lesson 11 – Files and Folders**.

Next, you will learn how Linux organizes files and how to move through folders from the terminal.
