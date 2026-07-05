# Horizon Learning Platform Support Standard

Version: 1.0

---

# Purpose

This document defines how Horizon Learning handles operating system differences.

The goal is to avoid assuming that every learner uses the same platform.

Horizon Learning should be approachable for learners using:

- Windows
- Linux
- macOS

When platform-specific steps are required, lessons should clearly separate them.

---

# Core Principle

Teach the concept once.

Branch by platform only when the steps are different.

---

# Supported Platform Labels

Use these labels consistently:

- Windows
- Linux
- macOS

Avoid informal labels like:

- PC
- Mac computer
- Windows machine
- Linux box

Use clear platform names.

---

# Lesson Platform Types

Every lesson should be treated as one of these types.

## Universal

The lesson applies to all learners.

Examples:

- What is cybersecurity?
- What is a network?
- What is an IP address?
- What is a port?

## Platform-Aware

The concept applies to everyone, but the steps differ by operating system.

Examples:

- Creating a live USB
- Opening a terminal
- Finding network information
- Installing software
- Taking screenshots

## Platform-Specific

The lesson only applies to one platform.

Examples:

- Windows PowerShell basics
- Linux file permissions
- macOS Terminal setup

## Tool-Specific

The lesson depends on a tool that may support multiple platforms.

Examples:

- Balena Etcher
- Rufus
- Popsicle
- GNOME Disks
- Wireshark
- Nmap

---

# Standard Platform Section Format

When platform-specific instructions are needed, use this structure:

## Choose Your Platform

This task can be completed on multiple operating systems.

Choose the section that matches the computer you are currently using.

### Windows

Instructions for Windows.

### Linux

Instructions for Linux.

### macOS

Instructions for macOS.

---

# Recommended Tool Priority

When multiple tools can complete the same task, prefer tools in this order:

1. Cross-platform beginner-friendly tool
2. Built-in operating system tool
3. Platform-specific advanced tool
4. Terminal-only method

Example for creating a live USB:

1. Balena Etcher
2. Rufus on Windows
3. USB Image Writer, Popsicle, GNOME Disks, or KDE ISO Image Writer on Linux
4. Terminal `dd` method only as an advanced option with strong warnings

---

# Windows Guidance

Windows instructions should account for:

- PowerShell
- Command Prompt
- Windows Terminal
- File Explorer
- Rufus
- Balena Etcher

Avoid assuming the learner is comfortable with PowerShell unless the lesson has introduced it.

---

# Linux Guidance

Linux instructions should avoid assuming one distribution.

When possible, mention common options:

- Linux Mint USB Image Writer
- Pop!_OS Popsicle
- GNOME Disks
- KDE ISO Image Writer
- Balena Etcher

If a command differs by distribution, explain that package names and software centers may vary.

---

# macOS Guidance

macOS instructions should account for:

- Finder
- Terminal
- Disk Utility
- Balena Etcher

For beginners, prefer graphical tools before terminal methods.

Terminal-based disk writing commands should be treated as advanced because choosing the wrong disk can erase data.

---

# Terminal Guidance

When a lesson says "open a terminal," include platform-specific clarification when needed.

Example:

Open a terminal:

- Windows: PowerShell, Command Prompt, or Windows Terminal
- Linux: Terminal
- macOS: Terminal

---

# Safety Guidance

Platform-specific lessons must warn learners before destructive actions.

Examples:

- Writing an ISO to USB
- Formatting a drive
- Deleting files
- Running commands with administrator privileges
- Changing router settings

Warnings should be plain and direct.

Example:

This will erase the selected USB drive. Make sure you selected the correct drive before continuing.

---

# Accessibility and Mobile Reading

Platform sections should be easy to scan on mobile.

Use:

- Short headings
- Short steps
- Numbered lists
- Clear warnings
- Minimal tables

Avoid large side-by-side comparison tables when a stacked list is easier to read.

---

# Long-Term Goal

Learners should never feel like they are using the "wrong" operating system.

Horizon Learning should guide learners from where they are, not from where we assume they are.
