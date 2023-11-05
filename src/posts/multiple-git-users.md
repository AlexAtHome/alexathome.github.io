---
title: Living a double life with multiple Git authors
date: 2020-11-14
source: https://deepsource.io/blog/managing-different-git-profiles/
tags:
    - post
    - productivity
updatedAt: 2023-06-27
---

Sometimes you need to maintain different projects under different names.
<!-- excerpt -->

Consider two projects:
- the first one is from your work. You maintain it using a certain name, certain email and a certain GPG-key for signing your commits.
- the second one is your personal. You want to make commits on it under another name and another email and sign it with another GPG-key.

Here's how we're gonna solve the problem.

1. Have all of your working projects in one directory (e.g. `~/work/`), and any other project in another ones.
2. Open the `~/.gitconfig` in your favorite editor. Add two sections inside of it:
```
[include]
	path = ~/.git-personal.conf

[includeIf "gitdir:~/work/"]
	path = ~/.git-work.conf
```
3. Create two files - `~/.git-personal.conf` and `~/.git-work.conf`

`.git-personal.conf` will have your personal author for your own projects.
```
[user]
	name = Chuck E. Cheese
	email = chucky@mail.me
	signingkey = XXXXXXXXXXXXXXXX
```

`~/.git-work.conf` will contain the git author for your work projects.

```
[user]
	name = Charleston Entertainment Cheese The Third
	email = c.e.cheese@serious-it-company.com
	signingkey = YYYYYYYYYYYYYYYY
```

Now, if you check `git config --global user.email` in `~/work/*` directory and any other directories, you will get different emails.

Keep in mind that, if you will try to `git clone` another project into the `~/work` directory, it may throw an error, because git will think that you're cloning as a personal git author.

