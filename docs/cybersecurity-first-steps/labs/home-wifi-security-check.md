# Home Wi-Fi Security Check

## Goal

Perform a safe beginner security check of your own home Wi-Fi network.

## Plain-English explanation

This is not a hacking exercise.

This is a basic safety review of your own Wi-Fi and router settings.

The goal is to find weak settings and improve them.

## Permission requirement

Only do this on a home network you own or are allowed to manage.

Do not perform this check on someone else's Wi-Fi, public Wi-Fi, school Wi-Fi, or work Wi-Fi.

## What you need

- Your own home Wi-Fi network
- Access to the router admin page
- Router admin username and password
- A notebook or notes app
- Optional: Kali Linux live USB

## Step 1: Identify your router

On Linux or Kali, run:

    ip route

Look for:

    default via

Example:

    default via 192.168.0.1

The IP address after `default via` is usually your router.

Write it down.

## Step 2: Open the router page

In a browser, go to your router IP.

Example:

    http://192.168.0.1

Or:

    https://192.168.0.1

Log in only if this is your router or you have permission.

## Step 3: Check Wi-Fi encryption

Look for wireless or Wi-Fi settings.

Check the security mode.

Better options:

- WPA3
- WPA2
- WPA2/WPA3 mixed mode

Bad or outdated options:

- WEP
- Open network with no password

## Step 4: Check Wi-Fi password strength

A better Wi-Fi password is:

- Long
- Not easy to guess
- Not based on names, birthdays, pets, or addresses
- Not reused from another account

## Step 5: Check router admin password

The router admin password should not be the default password.

If it still uses the default password, change it.

This is different from the Wi-Fi password.

## Step 6: Check firmware updates

Look for a firmware, update, or system section.

If an update is available, read the router manufacturer's instructions before installing it.

Do not unplug the router during a firmware update.

## Step 7: Review connected devices

Look for a page called:

- Connected devices
- Clients
- Attached devices
- Device list

Write down anything you recognize.

If you see something unfamiliar, do not panic.

It could be a phone, TV, printer, game console, smart device, or guest device.

## Step 8: Consider a guest network

A guest network can be useful for:

- Visitors
- Smart TVs
- Smart home devices
- Devices you do not fully trust

## Simple findings report

Write down:

- Router IP:
- Wi-Fi security mode:
- Router admin password changed? yes/no
- Firmware checked? yes/no
- Number of connected devices:
- Guest network enabled? yes/no
- Anything suspicious or confusing:

## Stop and check

You completed this lab when:

- [ ] You found your router IP.
- [ ] You checked Wi-Fi security mode.
- [ ] You checked router admin password status.
- [ ] You checked for firmware updates.
- [ ] You reviewed connected devices.
- [ ] You wrote down your findings.

## What to do next

Continue to First Nmap Scan.

