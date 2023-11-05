---
title: Restoring Windows 10 boot loader
tags:
    - post
    - windows
date: 2021-11-09
---
<!-- excerpt -->

1. Find or create a bootable USB drive with Windows. You can download an ISO on official Windows website.
2. Boot in the drive, choose the installator's language and after that press "Restore system".
3. Open `cmd.exe`
4. Find how the partition with Windows is marked
```cmd
diskpart
> LIST VOLUME
> EXIT
```
4. Let's say it's a C disk (as usual). Now you need to run `bcdboot` program.
```cmd
bcdboot C:\windows
```
Now you can close `cmd.exe` and reboot.
