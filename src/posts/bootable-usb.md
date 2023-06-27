---
title: Make a bootable USB drive with dd
layout: blog
tags:
    - post
    - linux
date: 2021-11-09
---
<!-- excerpt -->
Use `lsblk` to check the partition name of our USB drive. 
```bash
lsblk
```

The output will be something like this.
```
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
...
sdc           8:32   1  14.4G  0 disk 
├─sdc1        8:33   1   1.4G  0 part 
├─sdc2        8:34   1   9.9M  0 part 
└─sdc3        8:35   1  20.9M  0 part 
```

In my case, my USB drive has the partition `/dev/sdc`.

Now all we have to do is:

```bash
sudo dd bs=4M if=/path/to/fedora.iso of=/dev/sdc status=progress oflag=sync
```
You use the appropriate path to your USB drive instead of `/dev/sdc`.

Then we wait until the program finishes writing. Then you can eject the device.
