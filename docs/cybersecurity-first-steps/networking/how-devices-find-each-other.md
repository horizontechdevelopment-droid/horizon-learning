---
title: How Devices Find Each Other (DNS)
module: Understanding Networks
lesson: 20
difficulty: Beginner
estimated_time: 30–40 minutes
last_reviewed: 2026-07
platform_support: Universal
prerequisites:
  - Understanding IP Addresses
  - Understanding Ports
tags:
  - networking
  - dns
  - internet
  - beginner
---

# Guide 20: How Devices Find Each Other (DNS)

**Estimated Time:** 30–40 minutes

**Difficulty:** Beginner

---

## Have You Ever Wondered...

...why you can type:

    openai.com

instead of something like:

    172.64.154.211

Most people don't memorize IP addresses.

Instead, computers use a system called the **Domain Name System (DNS)** to translate easy-to-remember names into IP addresses.

---

## Learning Objectives

By the end of this guide, you should be able to:

- Explain what DNS is.
- Understand why DNS exists.
- Describe what happens when you visit a website.
- Recognize the relationship between domain names and IP addresses.

---

## Goal

Understand how computers find websites using names instead of numbers.

---

## Why This Matters

Imagine trying to remember the phone number of every person you've ever called.

Most people don't.

Instead, they save names in their contacts.

DNS works in much the same way.

Instead of remembering IP addresses, we remember names.

---

## Plain-English Explanation

Computers communicate using IP addresses.

People prefer names.

DNS connects the two.

When you type:

    example.com

your computer asks a DNS server:

> "What IP address belongs to this name?"

The DNS server replies with the correct IP address.

Your computer can then communicate with the website.

---

## New Terms

- Domain Name
- DNS
- DNS Server
- Hostname
- Resolution

---

# A Simple Example

Imagine you want to visit:

    openai.com

Your computer does **not** automatically know where that website is.

Instead, it asks a DNS server:

> "What's the IP address for openai.com?"

The DNS server responds with the correct address.

Only then does your computer begin communicating with the website.

---

# Why Not Just Use IP Addresses?

You certainly can.

But imagine trying to remember hundreds of addresses like:

    203.0.113.42

instead of:

    example.com

Names are easier for people.

Numbers are easier for computers.

DNS allows both to work together.

---

# Where Does DNS Come From?

Your device usually learns which DNS server to use from your:

- Home router
- Internet Service Provider (ISP)
- Manual configuration (less common for beginners)

You don't need to configure DNS yourself to understand how it works.

---

!!! tip "Learning Tip"

    Think of DNS as the Internet's contact list.

    You remember names.

    Your computer looks up the numbers.

---

!!! info "Looking Under the Hood"

    DNS requests usually happen very quickly.

    Most of the time, you don't even notice they're happening before a website loads.

---

!!! info "Why Professionals Do This"

    Network administrators often check DNS first when a website won't load.

    Sometimes the website is working perfectly—the problem is simply that the name isn't resolving correctly.

---

## Try It Yourself

Open a terminal and type:

    ping openai.com

_(You don't need to let it run for long. Press **Ctrl + C** to stop it.)_

Notice that the command displays an IP address before sending any network traffic.

That's DNS in action.

If `ping` isn't available or is blocked on your system, don't worry. We'll explore more networking tools later in the course.

---

## Reflection Questions

Without looking back:

1. What does DNS stand for?
2. Why does DNS exist?
3. What is the difference between a domain name and an IP address?
4. Why do people prefer names?
5. Why do computers still need IP addresses?

---

!!! success "Memory Helper"

    Domain Name

    → Easy for people to remember

    IP Address

    → Used by computers

    DNS

    → Translates names into IP addresses

---

!!! warning "Common Beginner Mistake"

    Many beginners think a website's name is the same thing as its IP address.

    They are different.

    DNS connects the two.

---

!!! example "Real-World Example"

    Think about your phone's contacts.

    You tap:

    **Mom**

    instead of remembering a ten-digit phone number.

    DNS performs a similar job for computers.

---

!!! note "Progress, Not Perfection"

    You don't need to understand every detail of DNS today.

    The important idea is simple:

    Names are for people.

    IP addresses are for computers.

---

## Looking Ahead

You've learned:

- Devices have IP addresses.
- Applications use ports.
- DNS helps computers find one another using names.

Next, we'll put everything together by exploring your own home network and seeing how all of these pieces work together.

---

## Stop and Check

You are ready to continue when:

- [ ] You understand what DNS does.
- [ ] You know why domain names exist.
- [ ] You understand that computers still communicate using IP addresses.
- [ ] You can explain DNS in your own words.

---

## Lesson Summary

In this guide you learned:

- DNS stands for Domain Name System.
- DNS translates domain names into IP addresses.
- People remember names more easily than numbers.
- Computers still rely on IP addresses to communicate.
- DNS makes the Internet much easier to use.

---

## What To Do Next

Continue to **Understanding Your Home Network**.

You'll bring together everything you've learned in this module and see how the devices in your own home communicate with one another.
