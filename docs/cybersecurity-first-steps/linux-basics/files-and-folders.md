# Files and Folders

## Goal

Understand how files and folders are organized in Linux.

## Plain-English explanation

Linux stores files in folders, just like Windows.

The difference is that Linux uses a different folder structure and different path style.

In Windows, you may see paths like:

    C:\Users\Name\Downloads

In Linux, paths look like:

    /home/kali/Downloads

## New terms

- **File:** A saved item, such as a text file, image, or program.
- **Folder:** A container that holds files or other folders.
- **Directory:** Another word for folder.
- **Path:** The location of a file or folder.
- **Home folder:** Your personal user folder.

## Important Linux folders

Root of the system:

    /

User home folders:

    /home

Current user home folder:

    ~

Common downloads folder:

    ~/Downloads

System settings:

    /etc

Temporary files:

    /tmp

## Useful commands

Show current folder:

    pwd

List files:

    ls

List files with details:

    ls -l

Show hidden files:

    ls -a

Create a folder:

    mkdir practice

Move into the folder:

    cd practice

Create an empty file:

    touch notes.txt

Remove an empty file:

    rm notes.txt

## Be careful with delete commands

Linux usually does exactly what you tell it to do.

Be careful with:

    rm

The `rm` command deletes files.

Do not use delete commands unless you understand what you are deleting.

## Stop and check

You are ready to continue when:

- [ ] You understand that Linux paths use `/`.
- [ ] You know that `~` means your home folder.
- [ ] You can create a folder.
- [ ] You can move into and out of folders.
- [ ] You know to be careful with delete commands.

## What to do next

Continue to Useful Commands.

