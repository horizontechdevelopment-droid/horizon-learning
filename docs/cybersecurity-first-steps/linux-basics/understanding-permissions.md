---
title: Understanding Permissions
module: Learning Your Way Around Linux
lesson: 15
difficulty: Beginner
estimated_time: 30–40 minutes
last_reviewed: 2026-07
platform_support: Kali-Specific
prerequisites:
  - Creating and Managing Files
tags:
  - linux
  - permissions
  - sudo
  - ownership
  - security
  - beginner
---

# Guide 15: Understanding Permissions

**Estimated Time:** 30–40 minutes

**Difficulty:** Beginner

**Platform Support:** Kali Linux

---

## Have You Ever Wondered...

...why Linux sometimes says:

    Permission denied

Even when you're the only person using the computer?

Linux protects files and folders to help prevent accidental changes, malware, and unauthorized access.

In this guide, you'll learn why permissions exist and how they help keep a Linux system secure.

---

## Learning Objectives

By the end of this guide, you should be able to:

- Explain why Linux uses permissions.
- Understand the concepts of users, groups, and others.
- Read a basic permission listing.
- Understand what `sudo` does.
- Recognize common permission-related errors.

---

## Goal

Learn why Linux protects files and how permissions help keep systems secure.

---

## Why This Matters

Imagine if every program could change every file on your computer.

A simple mistake—or malicious software—could damage your operating system in seconds.

Linux permissions help prevent that.

They are one of the biggest reasons Linux systems are known for their stability and security.

---

## Plain-English Explanation

Think of a building.

Some rooms are open to everyone.

Some rooms are for employees only.

Some rooms are locked.

Linux works in a similar way.

Every file and directory has rules that determine who can:

- Read it
- Change it
- Run it

---

## New Terms

- User
- Group
- Owner
- Permissions
- Read
- Write
- Execute
- Root
- sudo

---

# Every File Has an Owner

When a file is created, Linux records who owns it.

That owner usually has more control over the file than other users.

This helps prevent accidental or unauthorized changes.

---

# Users, Groups, and Others

Linux permissions are divided into three categories:

- Owner
- Group
- Others

Think of them like this:

| Category | Meaning                                  |
| -------- | ---------------------------------------- |
| Owner    | The person who created or owns the file  |
| Group    | A collection of users with shared access |
| Others   | Everyone else                            |

---

# The Three Basic Permissions

Linux uses three basic permissions.

### Read (r)

Allows someone to view a file.

---

### Write (w)

Allows someone to modify a file.

---

### Execute (x)

Allows a program or script to run.

---

# Viewing Permissions

Run:

    ls -l

You may see something like:

    -rw-r--r-- 1 kali kali 125 Jul 6 notes.txt

Don't worry about understanding every character today.

The important idea is:

Linux is showing who can read, write, or use the file.

We'll explore this in more detail in a future learning path.

---

!!! info "Looking Under the Hood"

    Every file stores permission information as part of its metadata.

    When you try to open, change, or run a file, Linux checks those permissions before allowing the action.

---

# What is sudo?

Some tasks require administrator privileges.

Instead of logging in as the administrator all the time, Linux allows authorized users to temporarily perform administrative tasks using:

    sudo

Think of it as asking Linux:

> "Please run this one command with administrator privileges."

---

!!! warning

    Do not use `sudo` simply because a command fails.

    First understand **why** administrator privileges are required.

    Using `sudo` unnecessarily can make mistakes much more serious.

---

# What Does "Permission Denied" Mean?

You may eventually see an error like:

    Permission denied

This usually means one of three things:

- You don't own the file.
- You don't have permission to perform that action.
- Administrator privileges are required.

The message is protecting your system—not trying to frustrate you.

---

!!! tip "Learning Tip"

    When you see an error message, read it carefully.

    Linux usually tells you exactly what went wrong.

    Understanding the message is often the first step toward solving the problem.

---

!!! info "Why Professionals Do This"

    Experienced Linux users avoid using administrator privileges unless they are actually needed.

    Working as a normal user helps prevent accidental system changes and improves security.

---

## Try It Yourself

Run:

    ls -l

Look at the first column of each line.

Notice that every file has permission information.

Next, run:

    whoami

Confirm which user you are currently using.

Finally, think about why Linux might restrict certain actions.

---

## Reflection Questions

Without looking back:

1. Why does Linux use permissions?
2. What are the three permission categories?
3. What do read, write, and execute mean?
4. What does `sudo` do?
5. Why is "Permission denied" often a good thing?

---

!!! success "Memory Helper"

    Remember:

    Owner
    → Usually has the most control

    Group
    → Shared access

    Others
    → Everyone else

    Read
    → View

    Write
    → Modify

    Execute
    → Run

---

!!! warning "Common Beginner Mistake"

    Many beginners think:

        Permission denied

    means Linux is broken.

    In reality, Linux is usually protecting the system from accidental or unauthorized changes.

---

!!! example "Real-World Example"

    Imagine a shared office.

    Employees can edit their own documents.

    Managers can access additional information.

    Visitors can only view public documents.

    Linux permissions work in a very similar way.

---

!!! note "Progress, Not Perfection"

    You are not expected to memorize Linux permissions today.

    The goal is simply to understand why they exist and recognize the basic concepts.

---

## Looking Ahead

Congratulations!

You've completed the technical lessons in this module.

Next, you'll review what you've learned and celebrate an important milestone in your Linux journey.

---

## Stop and Check

You are ready to continue when:

- [ ] You understand why Linux uses permissions.
- [ ] You know the difference between owner, group, and others.
- [ ] You understand read, write, and execute permissions.
- [ ] You know what `sudo` does.
- [ ] You understand why "Permission denied" is often a helpful message.

---

## Lesson Summary

In this guide you learned:

- Linux protects files using permissions.
- Every file has an owner.
- Permissions are divided into owner, group, and others.
- Read, write, and execute determine what users can do.
- `sudo` temporarily grants administrator privileges.
- Permission errors usually protect the system rather than indicate a problem.

---

## What To Do Next

Continue to **Module 3 Review**.

You'll review the concepts you've learned before moving on to **Understanding Networks**.
