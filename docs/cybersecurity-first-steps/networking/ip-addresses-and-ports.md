---
title: IP Addresses and Ports
module: Networking Basics
lesson: 13
difficulty: Beginner
estimated_time: 25–30 minutes
last_reviewed: 2026-07
prerequisites:
  - Networking Basics
  - Wi-Fi Basics
tags:
  - networking
  - ipv4
  - ipv6
  - ports
  - cybersecurity
---

# Lesson 13: IP Addresses and Ports

**Estimated Time:** 25–30 minutes

**Difficulty:** Beginner

---

## Learning Objectives

By the end of this lesson, you should be able to:

- Explain what an IP address is.
- Explain why every device on a network needs an IP address.
- Describe the difference between public and private IP addresses.
- Explain what a network port is.
- Understand why tools like Nmap scan ports.
- Find your own IP address.

---

## Goal

Understand how devices identify themselves on a network and how applications communicate using ports.

---

## Why This Matters

Almost every networking and cybersecurity tool relies on IP addresses and ports.

Understanding these concepts now will make later lessons—especially Nmap and Wireshark—much easier to understand.

!!! tip

    This is one of the most important lessons in the entire learning path.

    Take your time. You do not need to memorize everything today. Focus on understanding the concepts.

---

## Plain-English Explanation

Imagine you want to mail a package to a friend.

First, you need their street address.

Once the package reaches the correct house, someone still needs to know **which door** to deliver it to.

Computer networks work in a similar way.

- An **IP address** identifies the device.
- A **port** identifies the specific service or application running on that device.

Both are needed for communication.

---

## New Terms

- IP Address
- IPv4
- IPv6
- Public IP Address
- Private IP Address
- DHCP
- Static IP Address
- Port
- Service
- Localhost

---

# What Is an IP Address?

An IP address is a unique network address assigned to a device.

Think of it like a mailing address.

Without an address, other devices would not know where to send information.

Every device connected to a network needs an IP address.

Examples include:

- Computers
- Phones
- Tablets
- Printers
- Smart TVs
- Routers
- Game consoles

---

## IPv4

Most home networks today still primarily use **IPv4**.

Example:

    192.168.1.25

Yours will almost certainly be different.

That is completely normal.

---

## IPv6

As more devices connected to the internet, IPv4 eventually began running out of available addresses.

IPv6 was created to solve that problem.

Example:

    2600:1700:abcd:1234::5

Don't worry about remembering the format yet.

Just recognize that IPv6 exists and you will likely see both IPv4 and IPv6 on modern systems.

!!! note

    Throughout this beginner learning path we will mostly use IPv4 examples because they are easier to recognize and understand.

---

# Public vs Private IP Addresses

There are two types of IP addresses that beginners should know.

## Private IP Address

Private IP addresses exist only inside your own network.

Common ranges include:

    192.168.x.x

    10.x.x.x

    172.16.x.x through 172.31.x.x

These addresses are not directly accessible from the public internet.

Most of the devices in your home use private IP addresses.

---

## Public IP Address

Your public IP address is assigned by your Internet Service Provider (ISP).

This is the address websites see when your home connects to the internet.

Think of it like this:

- Your house has one mailing address.
- Each room inside your house has its own purpose.

The **public IP** is the house.

The **private IP addresses** are the individual rooms.

---

## DHCP

Most home routers automatically assign IP addresses.

This process is called **DHCP** (Dynamic Host Configuration Protocol).

The good news is that you usually don't have to configure anything.

When a new device joins your Wi-Fi network, the router normally assigns it an available address automatically.

---

## Static IP Addresses

Some devices always keep the same address.

Examples include:

- Servers
- Printers
- Network Attached Storage (NAS)
- Security cameras
- Home automation hubs

Keeping the address the same makes these devices easier to find.

---

# What Is a Port?

Now imagine that your IP address gets someone to the correct house.

How do they know which door to use?

Front door?

Garage?

Back door?

Ports work in a similar way.

The IP address identifies the device.

The port identifies the service running on that device.

For example:

- A web server listens on one port.
- A secure website listens on another.
- A DNS server listens on another.

Multiple services can exist on the same computer because they each use different ports.

!!! tip

    IP addresses identify **devices**.

    Ports identify **services** running on those devices.

---

# Common Ports

You do **not** need to memorize these.

You'll become familiar with them naturally as you continue learning.

| Port | Common Service | Purpose |
|------:|----------------|---------|
| 22 | SSH | Remote command-line access |
| 53 | DNS | Domain name lookups |
| 80 | HTTP | Standard web traffic |
| 443 | HTTPS | Encrypted web traffic |

---

# Why Nmap Uses Ports

One of the most common questions in cybersecurity is:

> "What services are running on this device?"

Nmap helps answer that question.

Instead of asking directly, Nmap checks ports to see which ones respond.

If a port is open, it usually means a service is listening there.

That is why understanding ports is important before learning Nmap.

---

# Localhost

Sometimes a computer communicates with itself.

The special IPv4 address:

    127.0.0.1

is called:

**localhost**

Think of localhost as meaning:

> "This computer."

Many developers and administrators use localhost when testing software locally.

---

# Try It Yourself

Open a terminal.

Run:

    ip addr

Look for an IPv4 address similar to:

    192.168.x.x

Your numbers will probably be different.

Write down:

- Your IPv4 address
- Whether you also see an IPv6 address
- The name of your network interface (if shown)

Do **not** post your public IP address online.

---

# Reflection Questions

Without looking back at the lesson, try answering these questions:

1. Why does every device need an IP address?
2. What is the difference between a public IP address and a private IP address?
3. What is a network port?
4. Why does Nmap scan ports?
5. What does localhost mean?

If you struggle to answer one of these, review the lesson before moving on.

---

!!! warning

    Never publish your public IP address unless you understand why you are sharing it.

    Sharing private IP addresses is generally much less sensitive, but you should still be cautious when posting network information publicly.

---

# Common Mistakes

- Thinking an IP address identifies a person.
- Thinking ports are physical connectors.
- Confusing private IP addresses with public IP addresses.
- Assuming every open port is dangerous.
- Thinking localhost refers to the router.

---

# Troubleshooting

If you cannot find an IP address:

- Make sure you are connected to the network.
- Run the command again.
- Read the output slowly.
- Ignore IPv6 for now if it feels overwhelming.

We'll build on IPv6 later in future learning paths.

---

# Stop and Check

You are ready to continue when:

- [ ] You understand what an IP address is.
- [ ] You understand the difference between public and private IP addresses.
- [ ] You know what a network port is.
- [ ] You understand why Nmap scans ports.
- [ ] You found your own IP address.

---

# Lesson Summary

In this lesson you learned:

- Every networked device needs an IP address.
- Public and private IP addresses serve different purposes.
- Ports allow multiple services to communicate on the same device.
- Nmap scans ports to discover available services.
- Localhost refers to the computer itself.

---

# What To Do Next

Continue to **Lesson 14 – Kali Tools Overview**.