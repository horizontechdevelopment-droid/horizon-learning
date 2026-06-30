# Useful Commands

## Goal

Learn beginner Linux commands that are useful in Kali.

## Why this matters

Kali includes many advanced tools, but the basic Linux commands still matter.

If you can navigate, read help, and understand basic output, the advanced tools will be easier to learn later.

## Plain-English explanation

Commands are typed instructions.

You do not need to memorize every command right away.

The goal is to learn a few useful commands and understand how to ask Linux for help.

## New terms

- **Command:** An instruction typed into the terminal.
- **Option:** Extra information that changes how a command behaves.
- **Argument:** The thing a command works on, such as a file or folder.
- **Manual page:** Built-in help documentation for a command.
- **Process:** A running program.

## Navigation commands

Show current folder:

    pwd

List files:

    ls

List files with details:

    ls -l

Change folder:

    cd folder-name

Go back one folder:

    cd ..

Go to your home folder:

    cd ~

## File and folder commands

Create a folder:

    mkdir practice

Create an empty file:

    touch notes.txt

View a text file:

    cat notes.txt

Copy a file:

    cp notes.txt notes-copy.txt

Rename or move a file:

    mv notes.txt new-name.txt

Delete a file:

    rm new-name.txt

Use `rm` carefully. It deletes files.

## System information commands

Show current user:

    whoami

Show computer name:

    hostname

Show network information:

    ip addr

Show running processes:

    ps aux

## Help commands

Show a command manual:

    man command-name

Example:

    man ls

Show quick help:

    command-name --help

Example:

    nmap --help

## Understanding command structure

Many commands follow this pattern:

    command option target

Example:

    ls -l /home/kali

In that example:

- `ls` is the command
- `-l` is an option
- `/home/kali` is the target

## Safe beginner practice

Create a practice folder:

    mkdir command-practice

Move into it:

    cd command-practice

Create a notes file:

    touch notes.txt

List the folder:

    ls -l

Go back:

    cd ..

## Common mistakes

- Trying to memorize too many commands at once
- Forgetting that Linux is case-sensitive
- Running delete commands too quickly
- Not reading error messages
- Copying advanced commands without understanding them

## Troubleshooting

If you do not know what a command does, try:

    command-name --help

Or:

    man command-name

If the manual page opens, press:

    q

to quit.

## Stop and check

You are ready to continue when:

- [ ] You can move between folders.
- [ ] You can create a folder.
- [ ] You can create a file.
- [ ] You understand the pattern `command option target`.
- [ ] You know how to ask a command for help.
- [ ] You understand that delete commands should be used carefully.

## Summary

You learned basic commands for navigation, files, system information, and help.

These commands are the foundation for using Kali more confidently.

## What to do next

Continue to Lesson 11: Networking Basics.