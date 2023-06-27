---
title: Scaling Gnome login screen on HiDPI display
source: https://askubuntu.com/questions/906797/scaling-gnome-login-screen-on-hidpi-display
layout: blog
tags:
    - post
    - linux
date: 2021-11-09
updatedAt: 2023-03-03
---

Обычно GDM пытается сам получить scaling factor, но получается у него, как я понял, не всегда.
<!-- excerpt -->
Открываем схему из glib-2:

```shell
sudo vim /usr/share/glib-2.0/schemas/org.gnome.desktop.interface.gschema.xml
```

Ищем следующий кусок кода:
```xml
<key name="scaling-factor" type="u">
<default>0</default>
```
и меняем значение `<default>` на 2 (или 3, или 4 - как больше нравится). 0 здесь означает, что GDM попытается определить `scaling-factor` самостоятельно.

Сохраняем файл и закрываем его. Запускаем команду:
```shell
sudo glib-compile-schemas /usr/share/glib-2.0/schemas
```
Готово. Можно завершить сеанс и проверить, что масштабирование увеличено.
