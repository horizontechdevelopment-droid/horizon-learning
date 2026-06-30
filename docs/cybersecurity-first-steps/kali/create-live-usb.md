# Create a Live USB

## Goal

Create a USB drive that can boot into Kali Linux.

## Why this matters

A live USB lets you try Kali without replacing Windows.

This is a good beginner option because it gives you a safe way to explore Kali before deciding whether you want a more permanent setup later.

## Plain-English explanation

Normally, your computer boots from its internal drive and starts Windows.

A live USB lets the computer start from the USB drive instead.

The USB contains Kali Linux, so the computer can run Kali temporarily.

## Important warning

Creating a live USB will erase the USB drive.

Do not use a USB drive that has important files on it.

Before continuing, copy anything important off the USB drive.

## New terms

- **Live USB:** A USB drive that can start an operating system.
- **Boot:** Start the computer.
- **Bootable:** Able to start a computer.
- **ISO writing tool:** A program that writes an ISO file to a USB drive correctly.
- **Rufus:** A popular Windows tool for creating bootable USB drives.
- **Balena Etcher:** Another tool used to create bootable USB drives.

## What you need

- The Kali ISO file from Lesson 5
- A USB drive
- A Windows computer
- A USB writing tool such as Rufus or Balena Etcher

## Step 1: Choose a USB writing tool

On Windows, two common options are:

- Rufus
- Balena Etcher

Rufus is commonly used for bootable USB drives on Windows.

Balena Etcher has a simpler interface and works on multiple operating systems.

Either can work.

## Step 2: Insert the USB drive

Plug the USB drive into the computer.

Wait a few seconds for Windows to recognize it.

If Windows asks what you want to do with the drive, close that message.

## Step 3: Open the USB writing tool

Open Rufus or Balena Etcher.

The tool should show available USB drives.

## Step 4: Select the Kali ISO

Choose the Kali ISO file you downloaded in Lesson 5.

Make sure you select the Kali file, not a random download.

## Step 5: Select the correct USB drive

This is the most important step.

Check the USB drive name, size, and drive letter.

Make sure you are selecting the USB drive you want to erase.

If you are unsure, stop.

Remove any extra USB drives to avoid selecting the wrong one.

## Step 6: Start the write process

Start the write process.

The tool may warn you that the USB drive will be erased.

That warning is expected.

Confirm only if you are sure the correct USB drive is selected.

## Step 7: Wait until it finishes

Do not remove the USB drive while it is being written.

Wait until the tool says the process is complete.

This may take several minutes.

## Step 8: Safely remove the USB drive

When the tool says it is done, safely eject the USB drive from Windows.

The USB drive is now a Kali live USB.

## Common mistakes

- Selecting the wrong USB drive
- Removing the USB drive before the process finishes
- Trying to copy the ISO file directly to the USB instead of writing it with a tool
- Using a USB drive that contains important files
- Assuming the USB is broken because Windows cannot read it normally afterward

## Why Windows may act strange afterward

After creating a Linux live USB, Windows may not show the USB drive normally.

This can be expected.

The USB was formatted in a way meant for booting Kali, not for normal Windows file storage.

## Stop and check

You are ready to continue when:

- [ ] You understand the USB drive was erased.
- [ ] You selected the correct USB drive.
- [ ] The writing tool completed successfully.
- [ ] You safely removed the USB drive.
- [ ] You are ready to boot from the USB.

## What to do next

Continue to Lesson 7: First Boot.