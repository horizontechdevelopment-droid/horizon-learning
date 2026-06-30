# Files and Folders

## Goal

Understand how files and folders are organized in Linux.

## Why this matters

Before using Kali tools, you need to understand where files are saved, how to move between folders, and how Linux paths work.

This helps you avoid getting lost in the terminal.

## Plain-English explanation

Linux stores files in folders, just like Windows.

The difference is that Linux uses a different folder structure and a different path style.

In Windows, a path might look like:

    C:\Users\Name\Downloads

In Linux, a path might look like:

    /home/kali/Downloads

Linux uses forward slashes:

    /

Windows usually uses backslashes:

    \

## New terms

- **File:** A saved item, such as a note, image, program, or download.
- **Folder:** A container that holds files or other folders.
- **Directory:** Another word for folder.
- **Path:** The location of a file or folder.
- **Home folder:** Your personal user folder.
- **Root directory:** The top of the Linux file system.

## Important Linux locations

Top of the file system:

    /

Home folders:

    /home

Kali user's home folder:

    /home/kali

Shortcut for your home folder:

    ~

Downloads folder:

    ~/Downloads

Temporary files:

    /tmp

System configuration files:

    /etc

## Step 1: Find where you are

Run:

    pwd

This shows your current directory.

You may see:

    /home/kali

## Step 2: List what is in the folder

Run:

    ls

This lists files and folders in the current directory.

## Step 3: Create a practice folder

Run:

    mkdir linux-practice

This creates a folder named:

    linux-practice

## Step 4: Move into the practice folder

Run:

    cd linux-practice

Now check your location:

    pwd

You should see something ending with:

    linux-practice

## Step 5: Create a practice file

Run:

    touch notes.txt

This creates an empty file named:

    notes.txt

Now list the folder:

    ls

You should see:

    notes.txt

## Step 6: Move back one folder

Run:

    cd ..

This moves you up one level.

Run:

    pwd

You should be back in the folder above `linux-practice`.

## Be careful with delete commands

The command:

    rm

deletes files.

Do not use delete commands unless you understand what you are deleting.

This guide will avoid unnecessary delete commands while you are starting.

## Try it yourself

Practice this sequence:

    pwd
    mkdir linux-practice
    cd linux-practice
    touch notes.txt
    ls
    cd ..
    pwd

If the folder already exists, Linux may say that it cannot create it again.

That is okay.

## Common mistakes

- Confusing `/` and `\`
- Forgetting which folder you are currently in
- Typing a folder name incorrectly
- Using spaces in folder names before understanding how spaces work in the terminal
- Deleting files too quickly

## Troubleshooting

If you see:

    No such file or directory

It usually means Linux cannot find the file or folder you typed.

Check:

- Spelling
- Capitalization
- Whether you are in the right folder

## Stop and check

You are ready to continue when:

- [ ] You understand that Linux paths use `/`.
- [ ] You know that `~` means your home folder.
- [ ] You can create a folder.
- [ ] You can move into and out of folders.
- [ ] You can create a simple file.
- [ ] You know to be careful with delete commands.

## Summary

Linux organizes files in directories.

You learned how to check your location, list files, create a folder, move into it, create a file, and move back.

## What to do next

Continue to Lesson 10: Useful Commands.