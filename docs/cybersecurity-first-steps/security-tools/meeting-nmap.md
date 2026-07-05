---
title: Meeting Nmap
module: Your First Security Tools
lesson: 23
difficulty: Beginner
estimated_time: 35–45 minutes
last_reviewed: 2026-07
platform_support: Kali Linux
prerequisites:
  - Why Kali Includes So Many Tools
tags:
  - nmap
  - networking
  - reconnaissance
  - beginner
---

# Guide 23: Meeting Nmap

**Estimated Time:** 35–45 minutes

**Difficulty:** Beginner

---

## Have You Ever Wondered...

...how a cybersecurity professional can discover what devices are connected to a network?

Or how they determine which services a computer is offering?

One of the most widely used tools for answering those questions is **Nmap**.

Today, you'll meet Nmap and learn what it is designed to do.

---

## Learning Objectives

By the end of this guide, you should be able to:

- Explain what Nmap is.
- Understand what Nmap is designed to do.
- Recognize common situations where Nmap is useful.
- Perform a simple scan of your own computer.
- Understand the importance of using Nmap responsibly.

---

## Goal

Learn what Nmap is, why professionals use it, and how to perform your first safe scan.

---

## Why This Matters

Before you can protect a network, you first need to understand what's connected to it.

Nmap helps answer questions such as:

- What devices are on this network?
- Is a computer responding?
- Which services appear to be available?

Nmap doesn't magically find security problems.

It gathers information that helps you understand a network.

---

## Plain-English Explanation

Imagine walking through a neighborhood.

You aren't looking inside houses.

You're simply observing:

- Which houses exist.
- Which lights are on.
- Which doors appear to be open.

Nmap works in a similar way.

It gathers information about systems that respond on a network.

---

## New Terms

- Nmap
- Host
- Scan
- Target
- Open Port

---

# What Is Nmap?

Nmap stands for:

**Network Mapper**

It is one of the world's most widely used network discovery tools.

Professionals use Nmap to:

- Discover devices.
- Learn about network services.
- Troubleshoot networks.
- Inventory systems.
- Verify configurations.
- Perform authorized security assessments.

---

# What Nmap Does

Nmap sends carefully constructed network requests.

It then analyzes the responses.

From those responses, it can determine useful information such as:

- Whether a device is online.
- Which ports appear to be open.
- Which services may be running.

Remember:

Nmap reports what it observes.

It does **not** decide whether something is good or bad.

That's where human understanding comes in.

---

# Your First Safe Scan

Today we'll scan **your own computer**.

Run:

    nmap localhost

or

    nmap 127.0.0.1

Both commands tell Nmap to examine your own machine.

Depending on your system, you may see:

- Open ports
- Closed ports
- Service names

Don't worry if your output looks different from someone else's.

Different computers run different services.

---

# Reading the Results

You might see something like:

    PORT     STATE  SERVICE

    22/tcp   open   ssh

This tells us:

- Port 22 responded.
- The port appears to be open.
- Nmap believes the service is SSH.

Notice what Nmap is doing.

It is reporting observations.

It isn't attacking anything.

---

!!! tip "Learning Tip"

    Don't try to memorize port numbers today.

    Focus on understanding what Nmap is showing you.

---

!!! info "Looking Under the Hood"

    Nmap works by sending network traffic and analyzing how devices respond.

    Different responses reveal different information about a system.

---

!!! info "Why Professionals Do This"

    Network administrators frequently use Nmap to verify that expected services are running and to identify unexpected services that may require attention.

---

## Using Nmap Responsibly

Nmap is an extremely useful tool.

Like many professional tools, it should only be used responsibly.

Only scan:

- Systems you own.
- Systems you have explicit permission to assess.
- Authorized training environments.

Never assume permission.

When in doubt, ask first.

---

## Try It Yourself

Run:

    nmap localhost

Read the output carefully.

Ask yourself:

- Did Nmap find any open ports?
- Which services were identified?
- Were you surprised by the results?

Don't worry if you don't recognize every service.

We'll learn about many of them throughout your cybersecurity journey.

---

## Reflection Questions

Without looking back:

1. What does Nmap stand for?
2. What is Nmap designed to do?
3. What is an open port?
4. Why should you only scan systems you own or are authorized to assess?
5. What surprised you about your first scan?

---

!!! success "Memory Helper"

    Nmap

    → Network discovery

    Host

    → Device

    Scan

    → Gather information

    Open Port

    → Service accepting connections

---

!!! warning "Common Beginner Mistake"

    Beginners sometimes believe Nmap is a hacking tool.

    Nmap is primarily an information gathering and network discovery tool.

    How someone chooses to use information is what matters.

---

!!! example "Real-World Example"

    Imagine walking through a parking lot.

    You notice which cars are present.

    You notice whether their lights are on.

    You're observing—not interfering.

    Nmap works in a similar way by observing network responses.

---

!!! note "Progress, Not Perfection"

    You are not expected to understand every line of Nmap's output today.

    The important thing is recognizing that Nmap helps you understand a network through careful observation.

---

## Looking Ahead

Now that you've met Nmap, you'll meet another essential cybersecurity tool.

Instead of discovering devices, the next tool lets you observe network communication itself.

That tool is **Wireshark**.

---

## Stop and Check

You are ready to continue when:

- [ ] You know what Nmap is.
- [ ] You understand what Nmap is designed to do.
- [ ] You can perform a basic scan of your own computer.
- [ ] You understand why permission matters.
- [ ] You recognize that Nmap reports observations rather than making security decisions.

---

## Guide Summary

In this guide you learned:

- Nmap stands for Network Mapper.
- Nmap discovers and observes network information.
- Nmap can identify responding hosts and open ports.
- A simple localhost scan is a safe way to begin learning.
- Nmap should only be used on systems you own or are authorized to assess.

---

## What To Do Next

Continue to **Meeting Wireshark**.
