---
title: Understanding Ports
module: Understanding Networks
lesson: 19
difficulty: Beginner
estimated_time: 30–40 minutes
last_reviewed: 2026-07
platform_support: Universal
prerequisites:
  - Understanding IP Addresses
tags:
  - networking
  - ports
  - tcp
  - udp
  - beginner
---

# Guide 19: Understanding Ports

**Estimated Time:** 30–40 minutes

**Difficulty:** Beginner

---

## Have You Ever Wondered...

...how your computer knows whether incoming information belongs to your web browser, your email program, or an online game?

An IP address gets information to the correct device.

Ports help deliver that information to the correct application on that device.

---

## Learning Objectives

By the end of this guide, you should be able to:

- Explain what a network port is.
- Understand why ports exist.
- Recognize several common port numbers.
- Understand the relationship between IP addresses and ports.

---

## Goal

Understand how ports help computers organize network communication.

---

## Why This Matters

An IP address tells information which computer to reach.

A port tells it where to go once it gets there.

Without ports, computers couldn't run multiple network applications at the same time.

---

## Plain-English Explanation

Imagine an apartment building.

The street address gets your package to the building.

The apartment number tells the delivery driver which apartment should receive it.

Networking works the same way.

IP Address

↓

Correct device

Port

↓

Correct application

---

## New Terms

- Port
- Service
- TCP
- UDP

---

# What Is a Port?

A network port is simply a numbered communication endpoint.

Think of it like a doorway for a specific application.

Different applications listen on different ports.

---

# Why Ports Exist

Imagine your computer is running:

- A web browser
- Email
- Discord
- Steam
- Spotify

All of these applications communicate over the network.

Ports help Linux (and other operating systems) know which application should receive each piece of information.

---

# Common Port Numbers

Here are a few examples.

| Port | Common Service |
| ---: | -------------- |
|   22 | SSH            |
|   53 | DNS            |
|   80 | HTTP           |
|  443 | HTTPS          |

Don't worry about memorizing these today.

You'll encounter them naturally as you continue learning.

---

# IP Address + Port

Think of it this way.

IP Address

↓

Find the computer.

Port

↓

Find the application.

Both are needed for successful communication.

---

## TCP and UDP

Most network communication uses one of two protocols:

### TCP

TCP focuses on reliable communication.

If information is lost, TCP asks for it again.

Examples include:

- Websites
- Email
- File transfers

---

### UDP

UDP focuses on speed.

It does not wait for missing information.

Examples include:

- Voice calls
- Video streaming
- Online gaming

For now, simply remember that both are common ways for applications to communicate.

---

!!! tip "Learning Tip"

    Don't try to memorize dozens of port numbers.

    Learn what ports are first.

    The commonly used ports will become familiar naturally through practice.

---

!!! info "Looking Under the Hood"

    Applications "listen" on ports.

    When information arrives for a particular port, the operating system delivers it to the application that's listening there.

---

!!! info "Why Professionals Do This"

    Network administrators often look at open ports to understand what services are running on a computer.

    Cybersecurity professionals do the same thing during authorized security assessments.

---

## Try It Yourself

Think about the applications running on your computer.

Examples might include:

- Web browser
- Music player
- Discord
- Steam
- Email client

Every network-enabled application uses one or more ports when communicating.

You don't need to identify the port numbers yet.

Just recognize that each application communicates differently.

---

## Reflection Questions

1. What does an IP address identify?
2. What does a port identify?
3. Why do computers need ports?
4. Name one common port number.
5. What is one difference between TCP and UDP?

---

!!! success "Memory Helper"

    IP Address

    → Find the device

    Port

    → Find the application

    TCP

    → Reliable communication

    UDP

    → Fast communication

---

!!! warning "Common Beginner Mistake"

    Beginners often think ports are physical connectors.

    Network ports are numbers used by software, not the USB or Ethernet ports on your computer.

---

!!! example "Real-World Example"

    Imagine calling a large company.

    The company's main phone number gets you to the building.

    An extension number connects you to a specific employee.

    IP addresses are like the main phone number.

    Ports are like the extension numbers.

---

!!! note "Progress, Not Perfection"

    Very few professionals memorize every port number.

    Understanding why ports exist is much more important than memorizing numbers.

---

## Looking Ahead

Now you understand:

- Devices have IP addresses.
- Applications use ports.

Next you'll learn how computers find websites using names instead of numbers.

---

## Stop and Check

You are ready to continue when:

- [ ] You know what a port is.
- [ ] You understand why ports exist.
- [ ] You know the difference between an IP address and a port.
- [ ] You recognize a few common port numbers.
- [ ] You understand the basic idea of TCP and UDP.

---

## Lesson Summary

In this guide you learned:

- Ports identify applications running on a device.
- IP addresses identify devices.
- Computers use both addresses and ports for communication.
- TCP emphasizes reliability.
- UDP emphasizes speed.

---

## What To Do Next

Continue to **How Devices Find Each Other (DNS)**.
