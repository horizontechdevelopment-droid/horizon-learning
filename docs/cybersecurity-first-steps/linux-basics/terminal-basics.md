# Terminal Basics

## Goal

Learn what the terminal is, why Kali uses it, and how to run a few safe beginner commands.

## Why this matters

Many cybersecurity tools are controlled from the terminal.

If the terminal feels confusing, Kali will feel confusing.

This lesson builds the basic comfort needed before using tools like Nmap.

## Plain-English explanation

The terminal is a text-based way to control the computer.

Instead of clicking buttons, you type commands.

A command is an instruction.

The computer reads the command, does what it was told, and then shows output.

## New terms

- **Terminal:** A window where you type commands.
- **Command:** An instruction typed into the terminal.
- **Prompt:** The text shown before where you type.
- **Output:** The response shown after a command runs.
- **Directory:** Another word for folder.
- **Current directory:** The folder you are currently working in.

## What the prompt means

When you open the terminal, you may see something like:

    kali@kali:~$

This is called the prompt.

It usually shows:

- Your username
- The computer name
- Your current location
- A symbol showing the terminal is waiting for a command

You do not need to fully understand every part yet.

For now, just know that the prompt means:

    The terminal is ready.

## Step 1: Open the terminal

In Kali, open the terminal by:

1. Looking for the terminal icon.
2. Or opening the application menu.
3. Searching for Terminal.
4. Clicking the Terminal app.

## Step 2: Run your first command

Type:

    pwd

Press Enter.

This command means:

    print working directory

It shows where you are in the file system.

You may see something like:

    /home/kali

That means you are in the Kali user's home folder.

## Step 3: List files and folders

Type:

    ls

Press Enter.

This command lists files and folders in your current directory.

If nothing appears, that may mean the folder is empty.

## Step 4: Clear the screen

Type:

    clear

Press Enter.

This clears the terminal screen.

It does not delete files.

It only cleans up what you see in the terminal window.

## Step 5: Check your username

Type:

    whoami

Press Enter.

This shows the current user.

You may see:

    kali

## Important safety rule

Do not copy and paste random commands from the internet.

Some commands can delete files, change settings, install unsafe software, or break things.

If you do not understand what a command does, pause and look it up first.

## Try it yourself

Run these commands in order:

    pwd
    ls
    whoami
    clear

Then run:

    pwd

Notice that `clear` did not move you or delete anything.

## Common mistakes

- Typing uppercase letters when the command should be lowercase
- Forgetting to press Enter
- Thinking `clear` deletes files
- Copying commands without understanding them
- Getting nervous when the terminal shows a lot of text

## Troubleshooting

If a command says:

    command not found

Check for spelling mistakes.

Linux commands are usually lowercase.

For example:

    pwd

is not the same as:

    PWD

## Stop and check

You are ready to continue when:

- [ ] You can open the terminal.
- [ ] You can run `pwd`.
- [ ] You can run `ls`.
- [ ] You can run `whoami`.
- [ ] You understand that commands should not be blindly copied.

## Summary

The terminal is a way to control Linux by typing commands.

You learned how to find your current folder, list files, clear the screen, and check your username.

## What to do next

Continue to Lesson 9: Files and Folders.