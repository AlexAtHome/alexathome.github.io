---
title: How to install Droidcam on Fedora and Arch Linux
tags:
    - post
    - linux
date: 2021-11-09
updatedAt: 2021-11-12
---
<!-- excerpt -->
## Fedora

For Fedora, you basically have to build it from source.

First, install the kernel headers and the C compiler.

```sh 
sudo dnf install kernel-devel gcc make
```

Now we can download the archive from the website and use the installation scripts, which basically install the Droidcam client and the driver.
```sh
wget https://files.dev47apps.net/linux/droidcam_latest.zip
unzip droidcam_latest.zip -d droidcam
cd droidcam
sudo ./install-client
sudo ./install-video
sudo ./install-audio
```

### DKMS

Every time the kernel gets updated, the built Droidcam driver disappears. You will have to re-install it.

You can do it automatically on every update by installing the DKMS.

Let's install the dependencies.
```shell
sudo dnf install android-tools rpm-build dkms
```

Now we can install the DKMS.
```shell
sudo ./install-dkms
```

## Arch Linux

The installation is even more simple in Arch Linux. All you need is a AUR helper like `yay` or `paru`.
```
yay -S linux-headers droidcam
```
