---
course_id: cybersecurity-first-steps
module_id: cfs-kali
lesson_id: cfs-kali-first-boot
title: Starting Kali for the First Time
content_type: lesson
progress_required: true
order: 70
---

﻿---
title: Starting Kali for the First Time
module: Kali Linux
lesson: 7
difficulty: Beginner
estimated_time: 25–35 minutes
last_reviewed: 2026-07
platform_support: Platform-Aware
prerequisites:
  - Download Kali
  - Verify Your Download
  - Create a Live USB
tags:
  - kali
  - boot
  - bios
  - uefi
  - live-usb
  - beginner
---

# Lesson 7: Starting Kali for the First Time

**Estimated Time:** 25–35 minutes

**Difficulty:** Beginner

**Platform Support:** Windows, Linux, and macOS computers using a Kali Live USB

---

## Learning Objectives

By the end of this lesson you should be able to:

- Explain what "booting" means.
- Understand the difference between a Boot Menu and Boot Order.
- Recognize BIOS and UEFI.
- Start your computer from the Kali Live USB.
- Choose the correct boot option.
- Become comfortable with the Kali desktop.

---

## Goal

Start Kali Linux from the Live USB without installing it on your computer.

---

## Why This Matters

This is the moment many new learners are nervous about.

That is completely normal.

The good news is that you are **not** replacing your current operating system.

Today you are simply asking your computer to start from the USB drive instead of its internal drive.

When you remove the USB and restart normally, your computer should return to its usual operating system.

!!! success

    Congratulations!

    You have already completed the hardest preparation steps.

    Now it's time to see Kali Linux for the first time.

---

# Plain-English Explanation

When you press the power button on a computer, it doesn't immediately start Windows, Linux, or macOS.

Instead, the computer first checks its hardware and decides **where to start**.

Normally, it starts from the internal storage drive.

Today, we're going to tell it to start from the Kali USB instead.

That's all "booting from a USB" really means.

---

# New Terms

- Boot
- Bootable USB
- BIOS
- UEFI
- Boot Menu
- Boot Order
- Live System

---

# What Happens When a Computer Starts?

A simplified version looks like this:

```
Power Button

↓

Computer turns on

↓

Hardware is checked

↓

Startup firmware begins

↓

Choose a boot device

↓

Operating system starts
```

Normally, your computer chooses the internal drive.

Today, you'll temporarily choose the Kali USB.

---

# BIOS vs UEFI

You may hear both of these terms.

### BIOS

Older computers commonly used BIOS.

### UEFI

Most modern computers use UEFI.

For this lesson, you only need to know one thing:

Both help your computer start.

You do **not** need to become an expert on firmware today.

!!! tip

    Don't worry if you're unsure whether your computer uses BIOS or UEFI.

    The learning process is nearly identical.

---

# Boot Menu vs Boot Order

These are often confused.

| Boot Menu                 | Boot Order              |
| ------------------------- | ----------------------- |
| Temporary choice          | Permanent preference    |
| Used once                 | Used every startup      |
| Recommended for beginners | Usually leave unchanged |

For this course...

**Use the Boot Menu whenever possible.**

It lets you choose the USB for this startup only.

---

## Why We Are Choosing Live System

The Kali boot menu may show install options.

For this learning path, choose:

    Live System

We are choosing Live System because it lets you explore Kali without making permanent changes to your computer.

Do not choose Installer or Graphical Installer for this course unless a later lesson specifically tells you to.

We will compare long-term setup options later, including persistent USB, virtual machines, dual boot, and full installation.

# Common Boot Menu Keys

Different manufacturers use different keys.

Some common examples include:

- F12
- F11
- F10
- F9
- Esc
- Del

!!! note

    If you're unsure which key your computer uses, check the manufacturer's support page or user manual.

    It is completely normal to look this up.

---

# Secure Boot

Many computers include a feature called Secure Boot.

Secure Boot helps protect the startup process by allowing only trusted boot software to run.

Some computers can boot Kali without any changes.

Others may require additional configuration depending on the hardware and firmware.

For this lesson:

**Do not change Secure Boot settings unless you actually encounter a problem.**

!!! warning

    Avoid disabling security features simply because a tutorial says to.

    Understand **why** a change is needed before making it.

---

# Starting the Kali USB

Insert your Kali USB drive.

Restart the computer.

Open the Boot Menu.

Select the USB drive.

After a few moments, you should see the Kali boot menu.

---

# The Kali Boot Menu

You may see options similar to:

- Live System
- Live System (Failsafe)
- Installer
- Graphical Installer

For this learning path:

**Choose:**

> Live System

This allows you to explore Kali without installing it.

---

!!! info "Behind the Curtain"

    The Live System runs directly from the USB drive.

    Nothing is permanently installed on your internal storage.

    This makes it an excellent way to learn safely.

---

# Welcome to Kali

After Kali finishes loading, take a moment to look around.

You should see:

- Desktop
- Applications menu
- Terminal
- File manager
- Network icon
- Clock
- Power menu

Today, don't worry about learning everything.

Simply become comfortable looking around.

---

# Your First Goal

Try these simple tasks:

- Move the mouse.
- Open the Applications menu.
- Open the Terminal.
- Close the Terminal.
- Open the File Manager.
- Return to the desktop.

That's enough for today.

---

# Common Problems

## The USB Doesn't Appear

Try:

- Reinsert the USB drive.
- Restart the computer.
- Use a different USB port.
- Confirm the USB was written successfully.

---

## The Computer Starts Windows Instead

Usually this means the USB wasn't selected.

Restart and try the Boot Menu again.

---

## Black Screen

Wait several minutes.

If nothing changes:

- Restart.
- Try Live System (Failsafe).
- Verify the USB creation process.

---

## Keyboard Doesn't Work

Try another USB port.

Some very new hardware may require a newer Kali image.

---

# Try It Yourself

Complete the following:

- Boot Kali from the USB.
- Reach the desktop.
- Open the Applications menu.
- Open and close the Terminal.
- Open the File Manager.
- Shut down Kali from the menu.

Do not install Kali.

Simply explore.

---

# Reflection Questions

Without looking back:

1. What does "booting" mean?
2. Why do we use the Boot Menu instead of changing Boot Order?
3. What is Secure Boot?
4. Why are we choosing Live System instead of Installer?
5. Why is using a Live USB a safe way to learn?

---

# Stop and Check

You are ready to continue when:

- [ ] Kali started successfully.
- [ ] You reached the desktop.
- [ ] The mouse works.
- [ ] The keyboard works.
- [ ] You opened the Applications menu.
- [ ] You opened the Terminal.
- [ ] You opened the File Manager.
- [ ] You shut Kali down normally.

---

# Lesson Summary

In this lesson you learned:

- What "booting" means.
- The difference between Boot Menu and Boot Order.
- The purpose of BIOS and UEFI.
- Why we use Live System.
- How to explore Kali without installing it.

---

# What To Do Next

Continue to **Lesson 8 – Updating Kali Linux**.

You'll learn:

- Why updates matter.
- How Linux installs software.
- How package managers work.
- How to safely update Kali.
