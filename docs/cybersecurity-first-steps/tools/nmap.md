# Nmap

## Goal

Understand what Nmap is and how to use it safely on your own devices.

## Plain-English explanation

Nmap is a network scanning tool.

It can help you find devices, open ports, and services on a network.

As a beginner, think of Nmap as a tool that asks:

What is on this network, and what is listening?

## Safety rule

Only scan:

- Your own computer
- Your own router
- Your own devices
- A lab system
- A system you clearly have permission to test

Do not scan random websites, public networks, school networks, or work networks.

## Check if Nmap is installed

    nmap --version

## Scan your own computer

    nmap 127.0.0.1

## Find your router IP

    ip route

Look for the line that starts with:

    default via

Example:

    default via 192.168.0.1

## Scan your own router

Replace this example IP with your actual router IP:

    nmap 192.168.0.1

## Reading results

You may see results like:

    PORT    STATE SERVICE
    80/tcp  open  http
    443/tcp open  https

This means the device has web services listening.

That does not automatically mean it is unsafe.

It means those ports are open.

## Stop and check

You are ready to continue when:

- [ ] You know what Nmap does.
- [ ] You scanned only your own computer or router.
- [ ] You understand what an open port means.
- [ ] You know not to scan systems without permission.

## What to do next

Continue to Wireshark.
