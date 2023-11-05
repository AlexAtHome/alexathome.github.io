---
title: Scaling Gnome login screen on HiDPI display
source: https://askubuntu.com/questions/906797/scaling-gnome-login-screen-on-hidpi-display
tags:
    - post
    - linux
date: 2021-11-09
updatedAt: 2023-03-03
---

Usually GDM tries to calculate the scaling factor by itself, but it doesn't always work well.
<!-- excerpt -->
Open a schema from glib-2:

```shell
sudo vim /usr/share/glib-2.0/schemas/org.gnome.desktop.interface.gschema.xml
```

Find the following segment of code:
```xml
<key name="scaling-factor" type="u">
<default>0</default>
```
and replace the value of `<default>` with 2 (or 3, or 4 - whatever is to your liking). 0 will make GDM try to set `scaling-factor` automatically.

Save and quit the file. Then run the following command:
```shell
sudo glib-compile-schemas /usr/share/glib-2.0/schemas
```
Done! Now log out and verify that the scaling has changed.
