---
title: Xbox controller on Linux via Bluetooth
source: https://www.addictivetips.com/ubuntu-linux-tips/wireless-xbox-one-controllers-on-linux-with-xow/
layout: blog
tags:
    - post
    - linux
    - gaming
date: 2021-11-09
updatedAt: git Last Modified
---

You need to install the `xboxdrv` driver to make it work.
<!-- excerpt -->

In Arch Linux, install `xboxdrv` from AUR.

```sh
yay -S xboxdrv
```

1. Turn on the controller.
2. Hold the <svg class="inline-block mx-1" fill="currentColor" width="1em" height="1em"><use xlink:href="/assets/icons/bootstrap.svg#xbox" /></svg><span class="sr-only">Xbox</span> button until it starts blinking quickly.
3. Turn on the Bluetooth on your PC if its off.
4. Pair the "Xbox One Controller" in the bluetooth settings (either with UI or `bluetoothctl`).
5. Test out the controller in any game, Steam Big Picture mode or any gamepad tester on the internet.

With this driver, the gamepad works flawlessly, without noticeable delays.

