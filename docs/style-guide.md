# Horizon Learning Style Guide

This style guide defines how Horizon Learning lessons should be written.

The goal is consistency, clarity, and beginner-friendly education.

## Standard lesson structure

Each lesson should use this structure when possible:

1. Goal
2. Why this matters
3. Plain-English explanation
4. New terms
5. Prerequisites
6. Step-by-step walkthrough
7. Try it yourself
8. Common mistakes
9. Troubleshooting
10. Stop and check
11. Summary
12. What to do next

Not every lesson needs every section, but most lessons should follow this pattern.

## Writing rules

### Assume the learner is new

Do not assume the reader knows Linux, networking, programming, cybersecurity, Git, Docker, or command-line tools.

If a term is important, explain it.

### Keep paragraphs short

Long blocks of text are harder to read, especially on mobile.

Prefer short paragraphs.

### Avoid unnecessary jargon

Use technical terms when needed, but explain them.

Bad:

    Enumerate exposed services on the target host.

Better:

    List the services that are available on the device you are allowed to test.

### Explain commands before or after showing them

Do not show commands without context.

Bad:

    ip addr

Better:

    Run this command to show network address information:

        ip addr

### Avoid “simply”

Do not say:

    Simply run this command.

A step may not feel simple to a beginner.

Instead say:

    Run this command.

Then explain what it does.

### Avoid shame

Do not write in a way that makes beginners feel bad for not knowing something.

Avoid phrases like:

- Obviously
- Everyone knows
- It should be easy
- Just do this
- Simple

### Use plain-English examples

Whenever possible, compare technical ideas to familiar ideas.

Example:

An IP address is like a device address on a network.

A port is like a specific door at that address.

### Use safe boundaries

Security lessons must clearly explain what is allowed.

For cybersecurity content, include permission reminders before hands-on labs.

### Prefer small steps

Break large tasks into smaller steps.

A beginner should be able to follow the page without guessing.

## Checkpoint style

Use checklists for checkpoints.

Example:

You are ready to continue when:

- [ ] You understand what the command does.
- [ ] You ran it successfully.
- [ ] You know what result to expect.
- [ ] You know what to do next.

## Lab style

Labs should include:

- Goal
- Permission requirement
- What you need
- Steps
- Expected result
- How to record findings
- Common mistakes
- Stop and check

## Safety language for cybersecurity

Use this wording when needed:

Only test systems, networks, accounts, and devices that you own or have clear permission to test.

If you are unsure whether you have permission, stop.

## Mobile-friendly writing

Many learners may read lessons on a phone before practicing on a computer.

To support mobile readers:

- Keep sections short
- Use clear headings
- Use bullet lists when helpful
- Avoid very wide tables
- Avoid long code blocks when possible
- Keep steps numbered and direct

## Tone

The tone should be:

- Clear
- Calm
- Practical
- Encouraging
- Direct
- Beginner-friendly

The tone should not be:

- Condescending
- Overly academic
- Overly casual
- Fear-based
- Sensationalized