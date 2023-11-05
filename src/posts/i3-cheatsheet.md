---
title: i3wm cheatsheet
source: https://www.youtube.com/watch?v=j1I63wGcvU4&list=PL5ze0DjYv5DbCv9vNEzFmP6sU7ZmkGzcf
tags:
    - post
    - linux
date: 2021-11-09
updatedAt: 2023-06-28
---

My own i3 cheatsheet.
<!-- excerpt -->

# Basics

The mod key (`$mod`) - is the primary key that is part of pretty much every hotkey in i3. Usually the `$mod` key is `Super` (<kbd>Win</kbd>), and it's recommended to leave it as it is. I tried using the <kbd>L Alt</kbd> key, but at the time i3 key had some problems.

## Arrow heys
In i3, besides of the arrow keys you can use the following keys:

<table style="width: min-content;">
  <tbody>
    <tr>
      <td><kbd>J</kbd></td>
      <td><kbd>K</kbd></td>
      <td><kbd>L</kbd></td>
      <td><kbd>;</kbd></td>
    </tr>
    <tr>
      <td><kbd>&larr;</kbd></td>
      <td><kbd>&darr;</kbd></td>
      <td><kbd>&uarr;</kbd></td>
      <td><kbd>&rarr;</kbd></td>
    </tr>
  </tbody>
</table>

It's kinda like arrow keys in Vim, but shifted by one key to the right.

## Apps (basics)
- <kbd>$mod</kbd>+<kbd>Enter</kbd> - terminal. By default it's gonna try to open `urxvt`
- <kbd>$mod</kbd>+<kbd>D</kbd> - dmenu (app menu)

## Window management
- <kbd>$mod</kbd>+<kbd>Shift</kbd>+<kbd>Q</kbd> - close the current window.
- <kbd>$mod</kbd>+<kbd>V</kbd> - vertical mode. All windows will be arranged vertically.
- <kbd>$mod</kbd>+<kbd>E</kbd> - tiling mode. All window well be arranged in their own tiles.
- <kbd>$mod</kbd>+<kbd>W</kbd> - tab mode. New windows will be opened in the horizontal tabs in one pane.
- <kbd>$mod</kbd>+<kbd>S</kbd> - stacking mode. Same as mode, but the arrangement will be vertical - as a stack.
- <kbd>$mod</kbd>+<kbd>R</kbd> - resize mode.
- <kbd>$mod</kbd>+<kbd>Shift</kbd>+<kbd>&larr;</kbd>/<kbd>&darr;</kbd>/<kbd>&uarr;</kbd>/<kbd>&rarr;</kbd> - move the window to specified direction.
- <kbd>$mod</kbd>+<kbd>&larr;</kbd>/<kbd>&darr;</kbd>/<kbd>&uarr;</kbd>/<kbd>&rarr;</kbd> - focus on the window at the specified direction.

## Resize mode
- there will be the label `resize` in the left corner of the statusbar
- <kbd>$mod</kbd>+<kbd>&larr;</kbd> - expand the window to the left
- <kbd>$mod</kbd>+<kbd>&rarr;</kbd> - expand the window to the right
- <kbd>$mod</kbd>+<kbd>&uarr;</kbd> - expand the window upwards
- <kbd>$mod</kbd>+<kbd>&darr;</kbd> - expand the window downwards
- <kbd>Esc</kbd> - quit the resize mode

## Session
- <kbd>$mod</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> - quit the session
- <kbd>$mod</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> - reload the i3 config
-   
  ```shell
  i3lock # locks the screen
  ```  
  To unlock the screen, you have to just type your password on the keyboard.

## Workspaces
- <kbd>$mod</kbd>+<kbd>Shift</kbd>+<kbd>0-9</kbd> - create a workplace on the specified slot
- <kbd>$mod</kbd>+<kbd>0-9</kbd> - switch to a workplace on the specified slot

# Configuration
When you launch i3 for the first time, the setup wizard will be opened, and it will propose to create a config file. If you somehow skipped it, you can do it re-launch the wizard:
```sh
i3-config-wizard
```
The new configuration will be located at `~/.config/i3/config`.

Now you have to edit the config to your preference and, when you're done, reload the config by pressing <kbd>$mod</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>.

- `bindsym $mod+shift+l exec i3lock` - binds the hotkey on executing a shell command.
- `exec rhythmbox` - executes a shell command on creating the i3 session. You can use it for apps auto-start.
- `exec_always rhythmbox` - executes a shell command on every i3 config reload.

## Font
You can change the font of the title bars and i3bar with the following line.
```
font pango:JetBrainsMono Nerd Font 8
```

## Wallpaper

### `feh`
Install `feh`
```sh
# ubuntu, debian
sudo apt install feh
# fedora
sudo dnf install feh
# archlinux
sudo pacman -S feh
```
In i3 config, add the line
```
exec_always feh --bg-scale /home/$USER/Pictures/wallpaper.jpg
```

### `nitrogen`
```sh
# ubuntu, debian
sudo apt install nitrogen
# fedora
sudo dnf install nitrogen
# archlinux
sudo pacman -S nitrogen
```
In i3 config, add the line
```
exec --no-startup-id nitrogen --restore
```
Now launch `nitrogen` via terminal or `dmenu` and choose a wallpaper for each monitor you have, choose the filling mode and press the "Apply" button.

## HiDPI

[Source](https://yulistic.gitlab.io/2018/08/hidpi-configuration-of-i3-wm-in-manjarolinux/)

Just create a file `~/.Xresources` add a line
```
Xft.dpi: 144 ## Or 192 for the 200% scale (perfect for 4K monitors)
```

## Keyboard layout switch
In the i3 config, add a line
```
exec --no-startup-id "setxkbmap -layout us,ru -option grp:win_space_toggle"
```
In the file `/etc/X11/xorg.conf.d/00-keyboard.conf`, find the `InputClass` section and add a line to its end:

```diff
Section "InputClass"
    Identifier "system-keyboard"
    MatchIsKeyboard "on"
    Option "XkbLayout" "us,ru"
    Option "XkbVariant" ","
+   Option "XkbOptions" "grp:win_space_toggle,terminate:ctrl_alt_bksp,grp_led:scroll,numpad:microsoft"
EndSection
```
If you'd like to use <kbd>Alt</kbd> + <kbd>Shift</kbd> instead of<kbd>Win</kbd> + <kbd>Spacebar</kbd>, replace the `win_space_toggle` part with `alt_shift_toggle`. You can see the full list of hotkeys in `xkeyboard-config` manual.
```sh
man xkeyboard-config
```

## Change the default terminal

By default, `i3-sensible-terminal` is launched. It basically tries to launch multiple terminals you could have. [Here's the list of those terminals](https://man.archlinux.org/man/i3-sensible-terminal.1#DESCRIPTION).

You can just set a `$TERMINAL` variable and use `exec $TERNINAL` in every hotkey where you need to launch a terminal.
```
set $TERMINAL alacritty
bindsym $mod+Return exec $TERMINAL
```

## Lock scren
```
bindsym $mod+l exec i3lock
```
If you want to use a default <kbd>$mod</kbd> + <kbd>L</kbd> hotkey, you will have to disable the <kbd>JKL:</kbd> keys for navigation between the windows.
You can also use `i3-nagbar` for a prompt with <kbd>Mod</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd>.
```diff
-bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'Do you really want to exit i3?' -B 'Yes, exit i3' 'i3-msg exit'"
+bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'Do you really want to exit i3?' -B 'Yes, exit i3' 'i3-msg exit' -B 'Lock screen' 'i3lock'"
```
You can use the following flags with `i3lock`:
- `-c #ff0000` - background color (it's white by default)
- `-i path/to/image.png` - background image
- `-u` - removes the password indicator

`man i3lock` for more information.

