---
title: Fix bugs in Borderlands 3 on Fedora
source: https://www.shernet.com/linux/borderlands-3-on-linux/
tags:
    - post
    - gaming
    - linux
date: 2021-11-09
---

I just wanted to play some Borderlands 3 and faced a few bugs in the first quest. I will list those bugs and how to fix them. Only the *Steam version* is considered here.
<!-- excerpt -->

## Bug #1: In-game videoclips (both TV sets textures and cutscenes, probably)

- you will not see the Lilith's face when she talks to you using the telepathy (she is a siren), like you did in Borderlands 2 with Angel
- the in-game cutscene where Lilith turns on the TV and makes you watch a video. She is supposed to open you the door to the next locaiton when it ends, but it doesn't even start, so you get stuck.
- possibly all Echo-net vids from the antagonists
- all CGI videos

![The screenshot of a soft-locked game](src/images/borderlands-3/game-softlocked.jpg)

The reason is that there's no Media Foundation in the system, since you're trying to play the game on Linux. So you'll have to install it to make the clips work.

On steam, open the game's properties and set the specific Proton version. At the moment of creating this post, Proton 5.13 was used, but you can try the later versions.

![](src/images/borderlands-3/proton-version.png)

Now install the dependencies:

```sh
sudo dnf install git libudev cabextract python2
```

Download and launch the script [`mf-install`](https://github.com/z0z0z/mf-install).
```sh
git clone https://github.com/z0z0z/mf-install
cd mf-install
# Set the used Proton's directory path in the $PROTON env variable
WINEPREFIX="$HOME/.steam/steam/steamapps/compatdata/397540/pfx" \
    PROTON="$HOME/.steam/steam/steamapps/common/Proton 5.13" \
    ./mf-install.sh -proton
cd ..
```

We also should create a symling for `libudev`.
```sh
sudo mkdir -p /usr/lib/x86_64-linux-gnu
sudo ln -svf /usr/lib/libudev.so.1 /usr/lib/x86_64-linux-gnu/libudev.so.0
```

Now we will download the Media Foundation from Microsoft's website and another script - [`mf-installcab`](https://github.com/z0z0z/mf-installcab).
```sh
git clone https://github.com/z0z0z/mf-installcab.git
cd mf-installcab
# The file's size is approximitely 900 MiB
wget http://download.windowsupdate.com/msdownload/update/software/svpk/2011/02/windows6.1-kb976932-x64_74865ef2562006e51d7f9333b4a8d45b7a749dab.exe
mv windows6.1-kb976932-x64_74865ef2562006e51d7f9333b4a8d45b7a749dab.exe windows6.1-KB976932-X64.exe
# Set the used Proton's directory path in the $PROTON env variable.
# And, please, ignore the warnings about non-existent files.
WINEPREFIX="$HOME/.steam/steam/steamapps/compatdata/397540/pfx" PROTON="$HOME/.steam/steam/steamapps/common/Proton 5.13" ./install-mf-64.sh -proton
cp mfplat.dll "$HOME/.steam/steam/steamapps/common/Borderlands 3/OakGame/Binaries/Win64/"
```

Now you can launch Borderlands 3, start a new game and see that all the bugs are now fixed.

If you change the Proton version, you will have to re-install all the scripts above as well as Media Foundation.

## Bug #2: Online Co-op not working

[The reason might be active virtual networks, tunnels or even Docker/Podman containers](https://www.reddit.com/r/linux_gaming/comments/lem3if/does_borderlands_3_coop_work_on_linux/gmr5aj1).

Make sure you turned off the VPN.

See what network interfaces are active.
```sh
ip link
```
![ip link](src/images/borderlands-3/ip-link.png)

In my case, I had the interfaces `virbr0` and `virbr0-nic`. They've been created by `libvirt` and they will be re-created when neccessary. So we can delete them.

```sh
sudo ip link delete virbr0
sudo ip link delete virbr0-nic
```

Also, if you have Docker installed, it will also create its own interface. It's often called `docker0`. Docker will also create it again when it's needed.

```sh
sudo ip link delete docker0
```

Don't forget to stop all active containers.

After that, restart the game and try to connect to your friend's lobby on Shift/Steam. It should work now.

Again, this should work with Steam version. I did not check the Epic Games Store version.

After you restart your computer, you probably will have all the deleted interfaces up again. You will have to delete them every time you want to play the game online.

