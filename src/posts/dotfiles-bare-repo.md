---
title: Store and manage dotfile configs in a bare repository
tags:
    - post
    - productivity
    - linux
    - git
source: https://www.atlassian.com/git/tutorials/dotfiles
---
It's a cool way to store and manage dotfile configuration files.

<!-- excerpt -->

## Create a bare repo

```bash
git init --bare $HOME/.dot
alias dot='/usr/bin/git --git-dir=$HOME/.dot/ --work-tree=$HOME'
dot config --local status.showUntrackedFiles no
echo "alias dot='/usr/bin/git --git-dir=$HOME/.dot/ --work-tree=$HOME'" >> $HOME/.bashrc
dot remote add origin [git-repo-url-here]
dot config --local user.name "John Doe"
dot config --local user.name "johndoe@email.com"
```

## Add files to the repo
```bash
dot add .config/nvim/init.lua
dot commit -m "Add nvim config"
dot add .zshrc
dot commit -m "Add zshrc"
dot push
```

## Migrate dotfiles onto a new system

On a new machine:
```bash
alias dot='/usr/bin/git --git-dir=$HOME/.dot/ --work-tree=$HOME'
echo ".dot" >> .gitignore
git clone --bare [git-repo-url-here] $HOME/.dot
dot config --local status.showUntrackedFiles no  # important
dot checkout
dot config --local user.name "John Doe"
dot config --local user.name "johndoe@email.com"
```