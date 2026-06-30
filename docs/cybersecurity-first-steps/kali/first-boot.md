# First Boot

## Goal

Boot into Kali Linux from the live USB.

## Why this matters

Creating the USB does not automatically start Kali.

You still need to tell the computer to boot from the USB drive instead of booting into Windows like normal.

This lesson walks through that process slowly.

## Plain-English explanation

When a computer turns on, it looks for something to start.

Normally, it finds the internal drive and starts Windows.

For this lesson, you will use the boot menu to tell the computer:

    Start from the USB drive this time.

This does not erase Windows.

It only changes what the computer starts from for this boot.

## New terms

- **Boot:** Start the computer.
- **Boot menu:** A temporary menu that lets you choose what device to start from.
- **BIOS/UEFI:** The low-level system menu built into the computer.
- **Live mode:** Running Kali from the USB without installing it.
- **Secure Boot:** A security feature that can sometimes prevent unsigned or unfamiliar operating systems from booting.

## Before you start

Save any open work in Windows.

Close your programs.

Keep the Kali USB plugged in.

## Step 1: Restart the computer

With the Kali USB inserted, restart the computer.

You need to open the boot menu before Windows starts.

## Step 2: Open the boot menu

As soon as the computer starts turning back on, repeatedly tap the boot menu key.

Common boot menu keys include:

- F12
- F11
- F10
- Esc
- Del

The correct key depends on the computer brand.

Common examples:

- Dell: F12
- Lenovo: F12 or Enter, then boot menu
- HP: Esc, then F9
- ASUS: Esc or F8
- Acer: F12
- MSI: F11

If none of these work, search for:

    boot menu key for [computer brand and model]

## Step 3: Choose the USB drive

In the boot menu, look for the USB drive.

It may show the USB brand name, such as SanDisk, Samsung, Kingston, PNY, or another brand.

It may also say:

    UEFI USB

Choose the USB drive.

## Step 4: Choose the Kali live option

After selecting the USB drive, the Kali boot menu should appear.

Choose the live option.

The exact wording may vary, but look for something like:

    Live system

or:

    Kali Live

Do not choose install for this beginner path.

## Step 5: Wait for Kali to load

Kali may take a few minutes to start from USB.

This can be slower than starting Windows from the internal drive.

Wait until the Kali desktop appears.

## Step 6: Confirm you are in Kali

Once the desktop loads, look for:

- Kali logo or wallpaper
- Application menu
- Terminal icon
- Linux-style desktop environment

You are now running Kali from the USB.

## Important note

In normal live mode, changes may not be saved after reboot.

That means if you create files or change settings, they may disappear when you shut down.

This is normal.

Persistence can be added later, but it is not required for the first beginner lessons.

## If the USB does not appear

Try:

- Restarting and opening the boot menu again
- Trying a different USB port
- Recreating the USB
- Removing other USB drives
- Checking whether the USB writing process completed successfully
- Looking up the boot menu key for the exact computer model

## If Kali does not start

Possible causes include:

- The USB was not created correctly
- The wrong boot option was selected
- Secure Boot is blocking the USB
- The download was incomplete
- The computer needs a different boot setting

Do not panic.

This is a common beginner problem.

## Secure Boot note

Some computers have Secure Boot enabled.

Secure Boot is designed to prevent unauthorized operating systems from starting.

If Kali will not boot, Secure Boot may be involved.

Do not change BIOS or UEFI settings unless you are comfortable and understand what you are changing.

If you are unsure, ask for help before changing boot or security settings.

## Getting back to Windows

To return to Windows:

1. Shut down Kali.
2. Remove the USB drive.
3. Turn the computer back on.

The computer should boot back into Windows normally.

## Common mistakes

- Waiting too long to press the boot menu key
- Choosing the internal Windows drive instead of the USB
- Choosing install instead of live mode
- Removing the USB while Kali is running
- Thinking Windows was deleted because Kali started

## Stop and check

You are ready to continue when:

- [ ] You can open the boot menu.
- [ ] You can select the Kali USB.
- [ ] You can start Kali in live mode.
- [ ] You understand this does not erase Windows.
- [ ] You know how to return to Windows.

## What to do next

Continue to Lesson 8: Terminal Basics.