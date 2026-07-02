# Horizon Learning Curriculum Graph Standard

Version: 1.0

---

# Purpose

This document defines how lessons relate to one another throughout Horizon Learning.

The curriculum graph is designed to model learning progression rather than technical relationships.

Its purpose is to help learners move through the curriculum naturally while enabling future features such as learning recommendations, progress tracking, and study planning.

---

# Philosophy

Every lesson should answer four questions:

1. What should the learner already know?

2. What does this lesson introduce?

3. What concepts does this reinforce?

4. What lessons naturally come next?

If every lesson answers those questions, the entire curriculum becomes connected.

---

# Lesson Metadata

Every lesson should eventually include curriculum metadata.

Example:

lesson:
    networking-basics

requires:
    - useful-commands

introduces:
    - router
    - modem
    - lan
    - wan

reinforces:
    - terminal
    - linux-navigation

prepares_for:
    - wifi-basics
    - ip-addresses
    - nmap
    - wireshark

difficulty:
    beginner

estimated_time:
    25

---

# Requires

These are concepts a learner should already understand.

A lesson should assume these concepts have already been taught.

---

# Introduces

New concepts that appear for the first time.

Examples:

- Router
- DHCP
- IPv4
- Git Repository
- Bash Script

---

# Reinforces

Previously learned concepts that are practiced again.

Repetition improves long-term retention.

---

# Prepares For

Lessons that naturally build on the current material.

This helps learners understand why they are learning a topic.

---

# Difficulty

Current levels:

Beginner

Intermediate

Advanced

Future versions may introduce additional levels if needed.

---

# Estimated Time

Used for:

- Study planning
- Learning paths
- Future progress tracking

---

# Long-Term Uses

The curriculum graph may eventually support:

- Personalized learning paths
- AI tutoring
- Progress tracking
- Review recommendations
- Study guides
- Printable course maps
- Interactive curriculum visualization

---

# Guiding Principle

Lessons should never feel isolated.

Every lesson should have a clear place within the larger curriculum.
