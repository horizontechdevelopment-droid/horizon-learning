# IP Addresses and Ports

## Goal

Understand what IP addresses and ports are.

## Plain-English explanation

An IP address identifies a device on a network.

A port identifies a specific service or program on that device.

A simple way to think about it:

- IP address = building address
- Port = door number
- Service = what is behind the door

## New terms

- **IP address:** A number used to identify a device on a network.
- **Private IP address:** An address used inside a home or local network.
- **Public IP address:** An address used on the internet.
- **Port:** A numbered network doorway.
- **Service:** A program listening on a port.

## Private IP examples

Home networks often use addresses like:

    192.168.0.10
    192.168.1.25
    10.0.0.15

Your router is often something like:

    192.168.0.1
    192.168.1.1
    10.0.0.1

## Common ports

Web traffic:

    80

Secure web traffic:

    443

SSH remote login:

    22

DNS name lookup:

    53

Windows file sharing:

    445

## Why ports matter

Open ports can tell you what a device is offering on the network.

For example, if a device has port 80 open, it may have a web page or admin interface.

If a port is open, that does not automatically mean something is unsafe.

It means something is listening.

## Safe beginner task

Find your own IP address:

    ip addr

Look for the active network adapter.

You may see an IP address like:

    192.168.0.25

## Stop and check

You are ready to continue when:

- [ ] You understand what an IP address is.
- [ ] You understand what a port is.
- [ ] You know open ports do not automatically mean danger.
- [ ] You understand that scans should only be run on your own devices or lab systems.

## What to do next

Continue to Kali Tools Overview.

