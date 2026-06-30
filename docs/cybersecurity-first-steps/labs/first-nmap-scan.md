# First Nmap Scan

## Goal

Run a safe beginner Nmap scan against your own computer or router.

## Plain-English explanation

Nmap can show which ports are open on a device.

This helps you understand what services a device may be offering on the network.

This lab keeps the target small and safe.

## Permission requirement

Only scan a device you own or have permission to test.

Good beginner targets:

- Your own Kali computer
- Your own router
- A spare lab computer
- A virtual machine you created

Do not scan:

- Public websites
- School networks
- Work networks
- Public Wi-Fi
- Neighbor devices
- Random internet addresses

## Step 1: Confirm Nmap is installed

Run:

    nmap --version

If Nmap prints version information, it is installed.

## Step 2: Scan your own computer

Run:

    nmap 127.0.0.1

This scans your own computer.

## Step 3: Read the results

You may see something like:

    PORT    STATE SERVICE
    22/tcp  open  ssh
    80/tcp  open  http

This means those ports are open on the target.

If you see no open ports, that is okay.

## Step 4: Find your router IP

Run:

    ip route

Look for:

    default via

Example:

    default via 192.168.0.1

Your router IP is probably the address after `default via`.

## Step 5: Scan your own router

Replace this example IP with your actual router IP:

    nmap 192.168.0.1

## Step 6: Write down findings

Record:

- Target scanned:
- Open ports:
- Services shown:
- Anything confusing:
- Anything to research later:

## What results mean

Open ports are not automatically bad.

They mean something is listening.

The next step is learning whether that service is expected, updated, and properly protected.

## Common mistakes

- Scanning networks without permission
- Assuming every open port is dangerous
- Running advanced scan options too early
- Not writing down findings
- Forgetting which target was scanned

## Stop and check

You completed this lab when:

- [ ] You ran `nmap --version`.
- [ ] You scanned `127.0.0.1`.
- [ ] You scanned only your own router or allowed device.
- [ ] You wrote down the results.
- [ ] You understand open ports are not automatically bad.

## What to do next

Continue to Beginner Lab Roadmap.

