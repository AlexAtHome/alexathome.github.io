---
title: Arch Linux Installation Guide. The short version.
layout: blog
tags:
    - post
    - linux
date: 2021-11-09
---

This post is the result of me walking into every pitfall on my way to install Arch Linux.
<!-- excerpt -->

It is recommended to follow [the official Arch Linux Installation guide](https://wiki.archlinux.org/title/Installation_guide). But the problem is that it's presented in a way that requires you to read the whole document and every link too thoroughly to understand what are you doing and why. There's no short version. So I tried to make one here.

# Preparation

## Making a bootable USB drive
[Create a bootable USB drive](/bootable-usb) with an [ISO of Arch Linux](https://archlinux.org/download/). Use the boot menu or UEFI/BIOS to boot in.

## Connect to the internet

### Wired
You should be good to go. The wired connection should work right away, even if you use a USB-Ethernet adapter.

### Wi-Fi
Use [`iwctl`](https://wiki.archlinux.org/title/Iwctl) to connect to a wi-fi network.

```sh
# see the list of visible networks
iwctl station wlan0 get-networks
# connect to a visible networks
iwctl station wlan0 connect SSID
# connect to a hidden network
iwctl station wlan0 connect-hidden SSID
```

### Connection check
```sh
ping -c 3 ya.ru
```

## Разметка диска
Let's find the partition where we want to install Arch.
```sh
lsblk
```

In our case, it's `/dev/sda`. 

Now we need to format and re-partition the whole disk. We will use a very user-friendly `cfdisk`.
```sh
cfdisk /dev/sda
```

Let's partition the disk. The interface is really simple. Just follow the instructions on the screen.
- Delete all the partitions on the disk.
    - You don't have to delete the `/home` partition if you already have it and you need to preserve it.
- Create new partitions:
    - a 500 MiB partition - as an EFI partition
    - a 4 GiB [swap](https://wiki.archlinux.org/title/Swap) partition. You can use your own capacity instead.
    - a 30-50 GiB root partition. Usually 50 GiB is enough, but, if in doubt, you can take more.
    - a home partition that takes the rest of the disk.
- Set the partition types
    - `EFI partition` for `/boot`
    - `Linux swap` for the swap partition.
    - Leave the types as they are for other partitions.

Save the new partitioning by pressing the `[ Save ]` button. Confirm the changes.

Then exit the program.

## Disk format

Let's launch `lsblk` again. We will see the following partitions:

- `/dev/sda1`, 500 MiB boot partition.
- `/dev/sda2` for swap
- `/dev/sda3` for root `/`
- `/dev/sda4` for `/home`

The boot partition must have the format of FAT32.
```sh
mkfs.fat -F32 /dev/sda1
```
For a swap partition we will use another command.
```sh
mkswap /dev/sda2
```
For other partitions, we will use the Ext4 format.
```sh
mkfs.ext4 /dev/sda3
mkfs.ext4 /dev/sda4
```

## Mount the partitions
Mount all the partitions, including the swap.
```sh
mount /dev/sda3 /mnt
mount /dev/sda4 /mnt/home --mkdir
mount /dev/sda1 /mnt/boot --mkdir
swapon /dev/sda2
```

<h1 id="installation">Installation</h1>


```sh
pacstrap /mnt base linux linux-firmware sudo vim networkmanager archlinux-keyring zsh iwd
```

You can also install another kernel instead of `linux`. Here's the list of available kernels:
- `linux`
- `linux-lts`
- `linux-hardened`
- `linux-zen`

`pacstrap` might ask you to choose between two or three sources of installation. The default one should work.

# Configuration
Right after the installation we should create a `fstab` file.
```sh
genfstab -U /mnt >> /mnt/etc/fstab
```

Let's move the system's actual root user in the newly installed system.
```sh
arch-chroot /mnt
```
Now we're in the context of installed system, as if we rebooted to the system itself.

## Date, time and timezone
```sh
ln -sf /usr/share/zoneinfo/Continent/City /etc/localtime
hwclock --systohc --utc
```
Now check the current datetime with `date` command.

## Localisation
We will use english as primary language, but will also install some other locales.

Open the `locale.gen` file with `vim`.
```sh
vim /etc/locale.gen
```

Find the strings with needed locales and uncomment them.
```diff
-#en_US.UTF-8
+en_US.UTF-8
# ...
# ...
# ...
-#ru_RU.UTF-8
+ru_RU.UTF-8
```

Save and close the file. Now it's time to generate the locales.
```sh
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

## hosts
Set the hostname. I will choose `mypc`, you can use your own.
```sh
echo mypc > /etc/hostname
```

Open the file `/etc/hosts` with vim and add the following:
```sh
127.0.0.1   localhost
::1         localhost
127.0.1.1   mypc mypc.localdomain
```

If you use a static IP-address, you should use that instead of `127.0.1.1`.

## Kernel initialisation
```sh
mkinitcpio -p linux
```
If you chose another kernel during the [installation](#installation), specify that kernel instead.

## Root password
```sh
passwd
```

## Микрокод
[Read more here](https://wiki.archlinux.org/title/Microcode)

```sh
# if you have an AMD CPU
pacman -S amd-ucode
# if you have an Intel CPU
pacman -S intel-ucode
```

## Boot loader
[All possible boot loaders can be found here](https://wiki.archlinux.org/title/Arch_boot_process#Boot_loader).

### [Grub](https://wiki.archlinux.org/title/GRUB)
```sh
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

### [systemd-boot](https://wiki.archlinux.org/title/Systemd-boot)
Install systemd-boot.

```sh
bootctl install
```

Now we need to configure it.

Open the file `loader.conf`.

```sh
vim /boot/loader/loader.conf
```

```
default arch
timeout 3
console-mode keep
editor no
```
No we should create the entry configs.

```sh
vim /boot/loader/entries/arch.conf
```

```
title    Arch Linux
linux    /vmlinuz-linux
initrd   /amd-ucode.img
initrd   /initramfs-linux.img
options  root="PARTUUID=" rw
```

We should not forget about fallback entries.
```sh
vim /boot/loader/entries/arch-fallback.conf
```

```
title    Arch Linux (fallback)
linux    /vmlinuz-linux
initrd   /amd-ucode.img
initrd   /initramfs-linux-fallback.img
options  root="PARTUUID=" rw
```

For root option value, use PARTUUID from the output of
```sh
blkid /dev/sda3
```

## Turn on the internet
```sh
systemctl enable NetworkManager
```

## Reboot

```sh
exit
umount -R /mnt
reboot
```
Now we wait until we boot into the system.

Then we should log into the root user.

----

# Post installation configuration

## Create an admin user

```sh
useradd -m -g users -G wheel -s /bin/bash username
passwd username
```

Now we'll give sudo rights to all users in `wheel` group.
```sh
export EDITOR=vim
visudo
```
Uncomment the string and save the file.
```diff
# %wheel ALL=(ALL) ALL
```

## Fix the "invalid or corrupted package (PGP signature)" error
```sh
sudo pacman -S archlinux-keyring
sudo pacman -Syu
```

## Sound
We should use pipewire.
```sh
sudo pacman -S pipewire pipewire-{pulse,alsa}
# Chose wireplumber as source Repository
```
However, if we want to use Pulseaudio:
```sh
sudo pacman -S pulseaudio pulseaudio-alsa
```

## Login manager

### lightdm
```sh
sudo pacman -S lightdm lightdm-gtk-greeter
sudo systemctl enable lightdm
```

### greetd
```sh
sudo pacman -S greetd tuigreet
```
Then we need to choose the UI. We have the following options:
- `agreety`
- `tuigreet`
- `dlm`
- `gtkgreet`
- `wlgreet`
- `tuigreet`
- `ddlm`
- `qtgreet`

I will choose `tuigreet`.
```sh
sudo pacman -S tuigreet
```
Now we need to integrate `tuigreet` with `greetd`. Open the file `/etc/greetd/config.toml` with vim.

Set the `command` value as `tuigreet` (or whatever UI you have chosen). Save and close the file.

Now we need to enable `greetd`.

```sh
sudo systemctl enable greetd
```

Some GUI require additional configuration, like `gtkgreet`. [Read more](https://wiki.archlinux.org/title/Greetd#Greeter_configuration)

### gdm
Install `gnome` first. Then:
```sh
systemctl enable --now gdm
```

### Ly
`Ly` is published in AUR, so we need to install `yay` or `paru` first.

After that:
```sh
yay -S ly
sudo systemctl enable --now ly.service
```

## Desktop environment

### XFCE4
```sh
sudo pacman -S xfce4
echo "exec startxfce4" > ~/.xinitrc
```

### i3
```sh
sudo pacman -S i3 lightdm lightdm-gtk-greeter
echo "exec i3"  > ~/.xinitrc
sudo systemctl enable lightdm
```

### sway
```sh
sudo pacman -S sway alacritty dmenu swaylock swayidle
```

### GNOME
```sh
sudo pacman -S gnome power-profiles-daemon gamemode
# optionally
sudo pacman -S gnome-extra
```
Now enable `gdm`.
```
sudo systemctl enable --now gdm.service
```

### KDE
[Read here](https://wiki.archlinux.org/title/KDE).

## Install some software

### `yay`
<https://github.com/Jguer/yay>

```sh
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
yay
```

### `paru`
<https://github.com/morganamilo/paru>

```sh
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
paru
```

### `NetworkManager`

```sh
yay -S networkmanager networkmanager-openvpn nm-connection-editor libnma
sudo systemctl enable --now NetworkManager
```

### Bluetooth

```sh
yay -S bluez bluez-utils
sudo systemctl enable --now bluetooth
```
We can also install the bluez frontend `blueman`.

### Steam
First, enable the `ultilib` repository by uncommenting the whole section in `/etc/pacman.conf`:
```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Install steam and other required packages
```sh
yay -S steam steam-fonts wqy-zenhei lib32-systemd
```
It will ask you to choose the video driver to install along steam. For AMD GPU, it is recommended to choose `vulkan-radeon` and `lib32-vulkan-radeon`.

After the installation, launch Steam and log in. Don't forget to enable Steam Play and Proton to play games for Windows.

### Droidcam

[See the post about installing Droidcam](../droidcam/).

### Fonts

```sh
yay -S wqy-zenhei
```

### Other stuff

```sh
yay -S discord {telegram,signal}-desktop bitwarden keepassxc spotify
```

## Devices

### Xbox One Controller
[xboxdrv](../xbox-one-controller/)
```sh
yay -S xboxdrv
```
