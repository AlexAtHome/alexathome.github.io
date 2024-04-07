---
title: How to change the sudo password prompt
tags:
  - post
  - linux
date: 2024-01-11
---

## System-wide change

Open the file `/etc/sudoers` and simply add this line:

```plain
Defaults passprompt="󰯄 Password: "
```

You can change the `passprompt` as you see fit.

The change will apply when you start a new shell session.

## Local change

If you want to change the prompt only to your user account, you need to `export` the `SUDO_PROMPT` env variable.

```sh
export SUDO_PROMPT="Custom prompt here: "
```

To revert the change, use the `unset` command.

```sh
unset SUDO_PROMPT
```

## Show asterisks while typing the password

In `/etc/sudoers`, find the line

```plain
Defaults env_reset
```

and add `,pwfeedback` in the end.

```plain
Defaults env_reset,pwfeedback
```

## `sudo` that insults you for making mistakes

You can add this line to `/etc/sudoers` to make `sudo` insult you when you type in an incorrect password.

```plain
Defaults insults
```
