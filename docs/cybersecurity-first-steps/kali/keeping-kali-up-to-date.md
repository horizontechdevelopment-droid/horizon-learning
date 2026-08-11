---
course_id: cybersecurity-first-steps
module_id: cfs-kali
lesson_id: cfs-kali-keep-updated
content_type: lesson
progress_required: true
order: 80
title: Updating Kali Linux
module: Kali Linux
lesson: 8
difficulty: Beginner
estimated_time: 20–30 minutes
last_reviewed: 2026-07
platform_support: Kali-Specific
prerequisites:
  - Starting Kali for the First Time
tags:
  - kali
  - linux
  - updates
  - apt
  - packages
  - beginner
---

# Lesson 8: Updating Kali Linux

**Estimated Time:** 20–30 minutes

**Difficulty:** Beginner

**Platform Support:** Kali Linux

---

## Learning Objectives

By the end of this lesson, you should be able to:

- Explain why updates matter.
- Understand what a package manager does.
- Recognize the difference between updating package lists and installing updates.
- Safely update Kali Linux.
- Understand why live USB changes may not be saved.

---

## Goal

Learn how Kali Linux updates software and how to safely run basic update commands.

---

## Why This Matters

Kali includes many tools.

Those tools change over time.

Updates can fix bugs, improve security, and add newer versions of software.

Before using Kali seriously, it is important to understand how updates work.

!!! warning

    If you are using Kali in normal Live USB mode without persistence, updates may not be saved after reboot.

    That is normal.

    Persistence and installed systems will be covered later.

---

## Plain-English Explanation

Most Linux systems use a package manager.

A package manager helps install, update, and remove software.

On Kali, the package manager is based on Debian's package system.

The command you will use most often is:

    apt

Think of `apt` as a software manager for the terminal.

---

## New Terms

- **Package:** A bundle of software files.
- **Repository:** A trusted software source.
- **Package manager:** A tool that installs and updates software.
- **apt:** A command-line package manager used by Kali and Debian-based Linux systems.
- **Update package list:** Refresh the list of available software versions.
- **Upgrade packages:** Install newer versions of software.

---

## Before You Start

Make sure:

- Kali is running.
- You are connected to the internet.
- You can open the Terminal.

!!! tip

    If you are using a Live USB, this is still useful practice even if the updates disappear after reboot.

    The goal right now is to understand the process.

---

## Step 1: Open the Terminal

Open the Terminal from the Kali desktop.

You should see a prompt waiting for a command.

---

## Step 2: Update the Package List

Run:

    sudo apt update

This does **not** install updates yet.

It asks Kali to check the configured software repositories and refresh the list of available package versions.

You may be asked for a password.

If you are using the default Kali live environment, the default user is often:

    kali

The password is often:

    kali

!!! note

    Default usernames and passwords can change between versions.

    If the default password does not work, check the current official Kali documentation for the version you are using.

---

## Step 3: Read the Output

You may see lines that start with words like:

    Hit
    Get
    Ign
    Err

Beginner meaning:

- `Hit` usually means Kali already has current information from that source.
- `Get` means Kali downloaded updated package information.
- `Err` means something went wrong.
- `Ign` means something was ignored.

Do not panic if the output looks busy.

Linux package managers often show a lot of text.

---

## Step 4: Upgrade Installed Packages

After the package list updates successfully, run:

    sudo apt upgrade

Kali may show a list of packages to upgrade.

It may ask:

    Do you want to continue? [Y/n]

If you are ready to continue, type:

    y

Then press Enter.

---

## Step 5: Wait

Updates may take several minutes.

Do not close the terminal while updates are running.

Do not remove the USB drive while Kali is running.

---

## Step 6: Clean Up Unneeded Packages

Sometimes Linux may tell you that some packages are no longer needed.

You may see a suggestion like:

    sudo apt autoremove

This removes packages that are no longer required.

For now, do not run cleanup commands unless you understand why you are running them.

We will keep this lesson focused on the basic update process.

---

## Important Live USB Note

If you are using Kali in normal live mode, changes usually disappear after reboot.

That means:

- Updates may not remain installed.
- Files may not remain saved.
- Settings may reset.

This is expected.

A normal live USB is meant for temporary use.

!!! info "Behind the Curtain"

    A live USB loads the operating system from the USB drive.

    Unless persistence is configured, changes are stored temporarily and are lost when the system shuts down.

---

## Common Mistakes

- Thinking `apt update` installs updates.
- Closing the terminal while updates are running.
- Removing the USB drive while Kali is running.
- Assuming updates are saved in normal live mode.
- Running random install commands from the internet.

---

## Troubleshooting

## No Internet Connection

If `sudo apt update` fails, first check your internet connection.

Try opening a website in the browser.

If Wi-Fi is not connected, connect to Wi-Fi from the network icon.

---

## Permission Error

If a command says permission denied, make sure you used:

    sudo

before the command.

Example:

    sudo apt update

---

## Lock Error

Sometimes you may see a message about a lock file.

This can happen if another package process is already running.

Wait a few minutes and try again.

Do not delete lock files unless you understand what caused the problem.

---

## Try It Yourself

Run these commands in order:

    sudo apt update
    sudo apt upgrade

Write down:

- Did `apt update` complete successfully?
- Did `apt upgrade` find updates?
- Did Kali ask for confirmation?
- Did anything confuse you?

---

## Reflection Questions

Try answering these without looking back:

1. What does a package manager do?
2. What is the difference between `apt update` and `apt upgrade`?
3. Why do updates matter?
4. Why might updates disappear after rebooting a live USB?
5. Why should you be careful copying install commands from the internet?

---

## Stop and Check

You are ready to continue when:

- [ ] You opened the Terminal.
- [ ] You understand what `apt` does.
- [ ] You understand the difference between `apt update` and `apt upgrade`.
- [ ] You ran the update commands or understand how they work.
- [ ] You understand that Live USB changes may not be saved.

---

## Lesson Summary

In this lesson you learned:

- Kali uses a package manager to update software.
- `sudo apt update` refreshes package information.
- `sudo apt upgrade` installs available updates.
- Live USB changes may not persist after reboot.
- Updates are important, but commands should still be understood before running them.

---

## What To Do Next

Continue to **Lesson 9 – Shutting Down Kali Safely**.

You will learn how to shut down Kali properly and avoid damaging files or removing the USB too early.
