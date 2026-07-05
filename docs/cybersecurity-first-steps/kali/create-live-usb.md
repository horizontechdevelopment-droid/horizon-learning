---
title: Create a Live USB
module: Kali Linux
lesson: 6
difficulty: Beginner
estimated_time: 30–45 minutes
last_reviewed: 2026-07
platform_support: Platform-Aware
prerequisites:
  - Download Kali
tags:
  - kali
  - live-usb
  - windows
  - linux
  - macos
  - beginner
---

# Lesson 6: Create a Live USB

**Estimated Time:** 30–45 minutes

**Difficulty:** Beginner

**Platform Support:** Windows, Linux, macOS

---

## Learning Objectives

By the end of this lesson, you should be able to:

- Explain what a live USB is.
- Understand why creating a live USB erases the USB drive.
- Choose the correct instructions for your operating system.
- Create a Kali live USB using a beginner-friendly tool.
- Avoid the most common live USB mistakes.

---

## Goal

Create a USB drive that can boot into Kali Linux without installing Kali permanently on your computer.

---

## Why This Matters

A live USB lets you try Kali without replacing your current operating system.

This is a good beginner option because you can explore Kali, use the terminal, and follow beginner labs without committing to a full installation.

!!! warning

    Creating a live USB will erase the selected USB drive.

    Do not use a USB drive that contains important files.

---

## Plain-English Explanation

Normally, your computer starts from its internal drive.

That internal drive usually starts Windows, Linux, or macOS.

A live USB lets your computer start from the USB drive instead.

The USB drive contains Kali Linux, so the computer can temporarily run Kali from the USB.

This does **not** mean Kali is installed permanently.

---

## New Terms

- **Live USB:** A USB drive that can start an operating system.
- **Boot:** Start the computer.
- **Bootable:** Able to start a computer.
- **ISO:** A disk image file used to create bootable media.
- **Flash:** Write an operating system image to a USB drive.
- **USB writing tool:** A program that writes an ISO file to a USB drive correctly.

---

## Before You Start

You need:

- The Kali ISO file from Lesson 5.
- A USB drive you are willing to erase.
- A computer running Windows, Linux, or macOS.
- A USB writing tool.

!!! tip

    If you have multiple USB drives plugged in, remove the ones you are not using.

    This reduces the chance of selecting the wrong drive.

---

## Choose Your Platform

This task can be completed on Windows, Linux, or macOS.

Choose the section that matches the computer you are currently using.

---

# Windows

## Recommended beginner tools

On Windows, beginner-friendly options include:

- Balena Etcher
- Rufus

Kali’s official Windows USB documentation includes both Etcher and Rufus options. :contentReference[oaicite:1]{index=1}

For beginners, Balena Etcher is often simpler because it has fewer choices.

Rufus is also popular and powerful, but it shows more options.

---

## Windows Steps

1. Insert the USB drive.

2. Open Balena Etcher or Rufus.

3. Select the Kali ISO file.

4. Select the USB drive.

5. Carefully confirm the selected USB drive.

6. Start the write or flash process.

7. Confirm the warning that the USB drive will be erased.

8. Wait until the tool says the process is complete.

9. Safely eject the USB drive.

!!! warning

    The most important step is selecting the correct USB drive.

    If you choose the wrong drive, you can erase the wrong device.

---

# Linux

## Recommended beginner tools

Linux users may have several options depending on their distribution.

Common graphical tools include:

- Balena Etcher
- Popsicle
- GNOME Disks
- KDE ISO Image Writer
- Linux Mint USB Image Writer

Kali’s official Linux USB documentation includes a terminal-based `dd` method, but that method can erase the wrong drive if used incorrectly. :contentReference[oaicite:2]{index=2}

For beginners, a graphical USB writing tool is usually safer.

---

## Linux Mint

Linux Mint often includes a tool called:

    USB Image Writer

Basic steps:

1.  Insert the USB drive.

2.  Open the application menu.

3.  Search for:

        USB Image Writer

4.  Open USB Image Writer.

5.  Select the Kali ISO file.

6.  Select the USB drive.

7.  Confirm the selected drive is correct.

8.  Start writing the image.

9.  Wait until the process finishes.

10. Safely eject the USB drive.

---

## Pop!\_OS

Pop!\_OS may use a tool called:

    Popsicle

Basic steps:

1.  Insert the USB drive.

2.  Open the application menu.

3.  Search for:

        Popsicle

4.  Open Popsicle.

5.  Select the Kali ISO file.

6.  Select the USB drive.

7.  Confirm the selected drive is correct.

8.  Start the write process.

9.  Wait until it finishes.

10. Safely eject the USB drive.

---

## GNOME-based Linux distributions

Some Linux systems include:

    GNOME Disks

Basic steps:

1.  Insert the USB drive.

2.  Open Disks.

3.  Select the USB drive from the left side.

4.  Open the menu.

5.  Choose an option like:

        Restore Disk Image

6.  Select the Kali ISO file.

7.  Confirm the USB drive is correct.

8.  Start the restore/write process.

9.  Wait until it finishes.

10. Safely eject the USB drive.

---

## KDE-based Linux distributions

Some KDE systems may include:

    KDE ISO Image Writer

Basic steps:

1. Insert the USB drive.

2. Open KDE ISO Image Writer.

3. Select the Kali ISO file.

4. Select the USB drive.

5. Confirm the USB drive is correct.

6. Start writing.

7. Wait until complete.

8. Safely eject the USB drive.

---

## Advanced Linux option: dd

The `dd` command can create a live USB, but it is dangerous for beginners because it can overwrite the wrong disk.

This guide does **not** recommend `dd` for first-time learners.

!!! warning

    Do not use `dd` unless you understand Linux disk names and are certain which device is your USB drive.

    Choosing the wrong device can erase important data.

---

# macOS

## Recommended beginner tool

For macOS beginners, the simplest option is usually:

- Balena Etcher

Kali’s official macOS USB documentation includes both Etcher and terminal-based methods. :contentReference[oaicite:3]{index=3}

For beginners, use Etcher first.

---

## macOS Steps with Balena Etcher

1. Insert the USB drive.

2. Open Balena Etcher.

3. Select the Kali ISO file.

4. Select the USB drive.

5. Carefully confirm the selected USB drive.

6. Start the flash process.

7. Enter your macOS password if prompted.

8. Wait until the process finishes.

9. Eject the USB drive safely.

---

## Advanced macOS option

macOS can also create bootable USB drives from the terminal.

This is an advanced method.

It is not recommended for first-time learners because selecting the wrong disk can erase data.

!!! warning

    Terminal-based disk writing on macOS can erase the wrong drive if used incorrectly.

    Use a graphical tool first unless you are comfortable identifying disks safely.

---

# After Writing the USB

When the process finishes, the USB drive may look strange to your operating system.

Windows, Linux, or macOS may show warnings, extra partitions, or unreadable sections.

This can be normal.

The USB is now designed to boot Kali, not act like a normal storage drive.

---

# Common Mistakes

- Selecting the wrong USB drive.
- Using a USB drive that contains important files.
- Copying the ISO file onto the USB instead of writing/flashing it.
- Removing the USB before the process completes.
- Panicking when the USB looks strange afterward.
- Choosing advanced terminal methods too early.

---

!!! note "Don't Worry About Installing Kali Yet"

    You may notice that Kali includes options to install the operating system.

    For this course, we are intentionally **not** installing Kali yet.

    We'll spend time learning in the Live environment first.

    After you've become comfortable with Kali, we'll compare all of the available installation methods so you can make an informed decision.

# Troubleshooting

## The USB writing tool does not see the USB drive

Try:

- Reinsert the USB drive.
- Try another USB port.
- Restart the USB writing tool.
- Try another USB drive.

## The process fails

Try:

- Re-download the Kali ISO.
- Try a different USB drive.
- Use another USB writing tool.
- Make sure no other program is using the USB drive.

## The USB looks unreadable afterward

This may be normal.

A bootable Linux USB may not look like a regular storage drive.

---

# Try It Yourself

Create a Kali live USB using the section for your operating system.

Write down:

- Operating system used:
- Tool used:
- USB drive size:
- Did the process finish successfully?
- Any error messages:

---

# Reflection Questions

Try answering these without looking back:

1. Why does creating a live USB erase the USB drive?
2. Why is selecting the correct USB drive important?
3. Why is copying the ISO file normally not enough?
4. Why are graphical tools recommended for beginners?
5. What should you do if the USB looks strange afterward?

---

# Stop and Check

You are ready to continue when:

- [ ] You understand the USB drive was erased.
- [ ] You selected the correct USB drive.
- [ ] The writing tool completed successfully.
- [ ] You safely removed or ejected the USB drive.
- [ ] You are ready to boot from the USB.

---

# Lesson Summary

In this lesson you learned:

- A live USB lets you run Kali without permanently installing it.
- Creating a live USB erases the selected USB drive.
- Windows, Linux, and macOS can all create live USB drives.
- Beginners should prefer graphical USB writing tools.
- The USB may look unusual afterward, and that can be normal.

---

# What To Do Next

Continue to **Lesson 7 – First Boot**.

In the next lesson, you will learn how to start your computer from the Kali USB.
