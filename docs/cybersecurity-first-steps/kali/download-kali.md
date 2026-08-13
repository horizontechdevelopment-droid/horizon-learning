---
course_id: cybersecurity-first-steps
module_id: cfs-kali
lesson_id: cfs-kali-download
title: Download Kali
content_type: lesson
progress_required: true
order: 50
---

# Download Kali

## Goal

Download Kali Linux safely from the official source.

## Why this matters

Kali Linux should only be downloaded from the official Kali website.

Downloading operating system files from random websites is risky because the file could be outdated, modified, or unsafe.

## Plain-English explanation

Kali is downloaded as an ISO file.

An ISO file is a disk image. Think of it as a packaged snapshot of an entire installation disc. Instead of receiving a physical Kali DVD, you download one `.iso` file that contains the files and structure needed to start or install the operating system.

Downloading the ISO does **not** install Kali. The ISO is the source image that another tool will use in the next step.

In the next lesson, that ISO file will be used to create a live USB.

## Understanding ISO files

The `.iso` at the end of a filename tells you what kind of file it is.

For example, a Kali download may have a name similar to:

    kali-linux-example-live-amd64.iso

The exact filename and version will change over time, but the `.iso` extension identifies it as an ISO disk image.

### An ISO is not a normal app

On many computers, you can double-click an application installer such as an `.exe` or `.msi` file and follow setup instructions.

An ISO is different. It is not normally something you open and run like an application.

An ISO can be used in several ways:

- **Write or flash it to a USB drive** to create bootable media.
- **Attach it to a virtual machine** so the virtual computer can treat it like an inserted disc.
- **Mount it** so you can inspect the files stored inside it.

For this course, you will write the Kali live ISO to a USB drive.

### Copying an ISO is not the same as flashing it

A common beginner mistake is to copy the `.iso` file onto a USB drive using normal file copy and paste.

That usually does **not** create a bootable Kali USB.

A flashing tool writes the ISO's disk structure to the USB so the computer can boot from it. The next lesson will walk through that process.

Flashing a USB normally overwrites the target drive, so always make sure you select the correct USB device before starting.

### Installer images and live images

Linux projects may offer more than one kind of ISO.

An **installer image** is primarily designed to install the operating system onto a computer's storage drive.

A **live image** is designed so the computer can start the operating system directly from removable media, such as a USB drive, without requiring a permanent installation first.

This beginner path uses the Kali **live image**.

### File extensions do not convert files

Changing a filename from one extension to another does not change what the file actually contains.

For example, renaming:

    kali-linux-example.iso

to:

    kali-linux-example.zip

does not turn the ISO into a ZIP archive.

The extension is a label that helps the operating system and applications recognize the file format.

### ISO files work across platforms

Windows, Linux, and macOS can all work with ISO files.

The exact tools and steps may differ between operating systems, but the ISO itself is still the same type of disk image.

## New terms

- **ISO:** A disk image file that contains the files and structure of a disc and can be used to create bootable media or provide installation media to a virtual machine.
- **Disk image:** A file that represents the contents and structure of a storage medium.
- **Flash/write:** To copy a disk image to a USB drive in a way that recreates its bootable structure.
- **Mount:** To make the contents of a disk image available to the operating system so the files inside can be viewed.
- **Live USB:** A USB drive that can start an operating system without installing it permanently.
- **Official source:** The real website maintained by the project or company that makes the software.
- **Download mirror:** A server that hosts a copy of a file. Mirrors can be legitimate, but beginners should start from the official download page.
- **Checksum/hash:** A calculated value that can be compared with the value published by the software provider to help verify that a downloaded file matches the original.

## What you need

- A computer with internet access
- A USB drive for the next lesson
- Enough storage space for the ISO file
- Time for the download to finish

## Step 1: Go to the official Kali website

Open a web browser.

Search for:

    Kali Linux official download

Make sure the result goes to the official Kali website:

    kali.org

Do not use random download sites.

## Step 2: Open the Downloads page

On the Kali website, open the Downloads section.

You may see several options.

For this beginner path, the goal is to create a live USB, not install Kali permanently.

Look for the live image option.

## Step 3: Choose the live image

Choose the live image for your computer type.

Most modern Windows laptops use 64-bit Intel or AMD processors.

That is usually listed as:

    64-bit

or:

    amd64

The term `amd64` does not mean it only works on AMD computers. It is commonly used to mean 64-bit Intel/AMD compatible systems.

## Step 4: Download the ISO

Download the ISO file.

Save it somewhere easy to find, such as:

    Downloads

Do not rename the file yet.

## Step 5: Wait for the download to finish

The file may be large.

Let the download finish completely before moving to the next lesson.

If the download fails, delete the partial file and download it again.

## Step 6: Understand verification

Kali publishes values that can be used to verify downloaded images.

One common form of verification uses a checksum, such as SHA-256. Your computer calculates a value from the ISO you downloaded, and you compare that result with the value published by Kali.

If the values match, it gives you strong evidence that the file you downloaded matches the file Kali published and was not corrupted during the download.

You do not need to memorize how checksums work yet. The important ideas are:

- Download operating-system images from the official source.
- A checksum can help verify that a downloaded ISO matches the published image.
- A checksum is different from simply checking the filename.
- If a verification result does not match, do not use the image. Download it again from the official source and investigate the mismatch.

A later guide can walk through the exact verification commands for each supported operating system.

## Common mistakes

- Downloading from an unofficial website
- Downloading the installer when the lesson expects the live image
- Deleting the ISO before creating the USB
- Forgetting where the file was saved
- Trying to open the ISO like a normal app
- Copying the ISO onto a USB with normal copy and paste and expecting the USB to become bootable
- Renaming the file extension and assuming that converts the file
- Flashing the wrong USB drive

## Stop and check

You are ready to continue when:

- [ ] You downloaded Kali from the official Kali website.
- [ ] You downloaded the live image.
- [ ] You know where the ISO file is saved.
- [ ] The download finished completely.
- [ ] You understand that an ISO is a disk image, not a normal application installer.
- [ ] You understand that downloading the ISO does not install Kali.
- [ ] You understand that the ISO must be written or flashed to the USB, not simply copied onto it.
- [ ] You understand that a checksum can help verify a downloaded ISO.

## What to do next

Continue to Lesson 6: Create a Live USB.