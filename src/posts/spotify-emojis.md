---
title: Displaying Emojis in Spotify and other Electron apps on Linux
source: https://victor.kropp.name/blog/emoji-on-linux/
tags:
    - post
    - linux
date: 2021-11-09
---

Works well in Spotify installed both from an apt repo and Flatpak. I didn't check the snap version.
<!-- excerpt -->
1. Install the font with color emojis (e.g. Noto Color Emoji).

2. Now you need to let the system know about the emoji symbols. You need to create the file `~/.config/fontconfig/fonts.conf` with the following content:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
    <family>serif</family>
    <prefer>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>
</fontconfig>
```

3. Apply the configuration with the `fc-cache -f -v` command.
4. Restart the app if it's running.

![Screenshot of Spotify with working emojis](src/images/spotify/emojis.png)

## Flatpak

Follow the same instructions, but the file `fonts.conf` should be created at `~/.var/app/com.spotify.Client/config/fontconfig`. Or even create a symlink, like so:
```sh
ln -s ~/.config/fontconfig/fonts.conf ~/.var/app/com.spotify.Client/config/fontconfig/fonts.conf
```
