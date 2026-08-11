---
course_id: cybersecurity-first-steps
module_id: cfs-networking
lesson_id: cfs-networking-ip-addresses
content_type: lesson
progress_required: true
order: 220
title: Understanding IP Addresses
module: Understanding Networks
lesson: 18
difficulty: Beginner
estimated_time: 30–40 minutes
last_reviewed: 2026-07
platform_support: Universal
prerequisites:
  - What Is a Network?
  - Wi-Fi vs Ethernet
tags:
  - networking
  - ip
  - ipv4
  - lan
  - beginner
---

# Guide 18: Understanding IP Addresses

**Estimated Time:** 30–40 minutes

**Difficulty:** Beginner

---

## Have You Ever Wondered...

...how your computer knows where to send information?

When you open a website, send a message, or print to a network printer, your device needs to know where that information should go.

That's where IP addresses come in.

---

## Learning Objectives

By the end of this guide, you should be able to:

- Explain what an IP address is.
- Understand why every network device needs an address.
- Recognize the difference between public and private IP addresses.
- Identify examples of common home network addresses.

---

## Goal

Understand the purpose of IP addresses and how they allow devices to communicate.

---

## Why This Matters

Imagine trying to mail a letter without knowing the destination address.

It would never arrive.

Networks work the same way.

Every device needs an address so information knows where to go.

---

## Plain-English Explanation

Think of an IP address like a street address.

Your house has an address so people know where to deliver mail.

Your computer has an IP address so other devices know where to send information.

Without addresses, devices wouldn't know who should receive the data.

---

## New Terms

- IP Address
- IPv4
- Public IP Address
- Private IP Address
- Router

---

# Every Device Needs an Address

Every device connected to a network receives an IP address.

Examples include:

- Desktop computers
- Laptops
- Phones
- Tablets
- Smart TVs
- Printers
- Cameras

If a device communicates on the network, it needs an address.

---

# A Typical Home Network

A home network often looks something like this:

```
Internet
    │
    ▼
Router
 ├── Laptop
 ├── Phone
 ├── Desktop
 ├── TV
 └── Printer
```

Each of those devices has its own IP address.

---

# IPv4 Addresses

Most home networks still use IPv4 addresses.

They look like this:

    192.168.1.15

An IPv4 address contains four numbers separated by periods.

Other common examples include:

    192.168.0.100

    10.0.0.50

    172.16.1.25

Don't worry about memorizing these today.

Just recognize the pattern.

---

# Private IP Addresses

Devices inside your home network usually use private IP addresses.

These addresses are only used inside your local network.

Your router keeps track of them.

---

# Public IP Addresses

Your Internet Service Provider assigns your home a public IP address.

This is the address websites see when you visit them.

Think of it as the address for your entire house.

Inside the house, each room has its own location.

Outside the house, everyone uses the same street address.

---

## Public vs Private

| Private IP                               | Public IP                               |
| ---------------------------------------- | --------------------------------------- |
| Used inside your network                 | Used on the Internet                    |
| Assigned by your router                  | Assigned by your ISP                    |
| Not directly reachable from the Internet | Used to communicate with other networks |

---

!!! tip "Learning Tip"

    Don't worry about memorizing address ranges.

    Focus on understanding **why** addresses exist.

---

!!! info "Looking Under the Hood"

    Your router keeps track of which local device requested information from the Internet and sends the replies back to the correct device.

---

!!! info "Why Professionals Do This"

    One of the first things a network administrator checks is a device's IP address.

    If a device doesn't have a valid address, it usually won't be able to communicate properly.

---

## Try It Yourself

Open a terminal and type:

    ip addr

Look for an address assigned to your primary network connection.

You may also use:

    hostname -I

to display your device's IP address.

Don't worry if you see more than one address.

That can happen on some systems.

---

## Reflection Questions

1. Why does every network device need an IP address?
2. What is the difference between a public IP address and a private IP address?
3. Who usually assigns your private IP address?
4. Who usually assigns your public IP address?
5. Can two devices on the same network use the same IP address?

---

!!! success "Memory Helper"

    IP Address

    → Identifies a device

    Private IP

    → Used inside your network

    Public IP

    → Used on the Internet

    Router

    → Connects your network to the Internet

---

!!! warning "Common Beginner Mistake"

    Many beginners think every device has a public IP address.

    In most homes, devices use private IP addresses while the router communicates with the Internet using a public IP address.

---

!!! example "Real-World Example"

    Imagine an apartment building.

    The building has one street address.

    Each apartment has its own number.

    A public IP address is like the building's address.

    Private IP addresses are like the apartment numbers.

---

!!! note "Progress, Not Perfection"

    You don't need to memorize IP address ranges today.

    Understanding their purpose is much more important.

---

## Looking Ahead

Now that every device has an address...

How does one device know which application should receive the information?

The answer is **ports**.

---

## Stop and Check

You are ready to continue when:

- [ ] You know what an IP address is.
- [ ] You understand why every device needs one.
- [ ] You know the difference between public and private IP addresses.
- [ ] You understand the router's role in assigning local addresses.

---

## Lesson Summary

In this guide you learned:

- Every device needs an IP address.
- IP addresses identify devices on a network.
- Home networks use private IP addresses.
- Internet communication uses a public IP address.
- Routers connect local devices to the Internet.

---

## What To Do Next

Continue to **Understanding Ports**.
