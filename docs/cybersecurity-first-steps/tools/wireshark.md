# Wireshark

## Goal

Understand what Wireshark is and what it is used for.

## Plain-English explanation

Wireshark is a network traffic analyzer.

It lets you view packets moving through a network connection.

A packet is a small piece of network communication.

Wireshark can look intimidating at first because it shows a lot of information.

As a beginner, the goal is not to understand every detail.

The goal is to learn that network activity can be observed and studied.

## New terms

- **Packet:** A small piece of network communication.
- **Capture:** Recording network packets.
- **Interface:** A network connection, such as Wi-Fi or Ethernet.
- **Protocol:** A rule system for communication, such as DNS, HTTP, or TCP.
- **Filter:** A way to narrow down what Wireshark shows.

## Safety rule

Only capture traffic on networks and devices you own or have permission to monitor.

Do not capture traffic on public Wi-Fi, school networks, work networks, or someone else's network.

## Beginner exercise

Open Wireshark.

Choose your active network interface.

Start a capture.

Open a website in the browser.

Stop the capture.

Look for common protocols such as:

- DNS
- TCP
- TLS
- HTTP
- HTTPS

## Useful display filters

Show DNS traffic:

    dns

Show HTTP traffic:

    http

Show traffic involving an IP address:

    ip.addr == 192.168.0.1

Replace the IP address with the one you are studying.

## What you should notice

You may see many packets even when you are not doing much.

Computers communicate in the background all the time.

This is normal.

## Common mistakes

- Trying to understand every packet immediately
- Capturing on networks without permission
- Forgetting to stop the capture
- Assuming all traffic is suspicious

## Stop and check

You are ready to continue when:

- [ ] You know Wireshark is used to inspect network traffic.
- [ ] You know what a packet is.
- [ ] You can start and stop a capture.
- [ ] You can use a simple display filter.
- [ ] You understand permission matters.

## What to do next

Continue to Home Wi-Fi Security Check.

