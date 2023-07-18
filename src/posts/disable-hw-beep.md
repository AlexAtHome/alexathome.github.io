---
title: Disable the pc speaker Linux
layout: blog
tags:
    - post
    - linux
date: 2021-11-09
---

```bash
sudo rmmod pcspkr
```
<!-- excerpt -->

If you want to keep the setting persistent, create a file `/etc/modprobe.d/blacklist.conf` with the following contents:
```
blacklist pcspkr
```
