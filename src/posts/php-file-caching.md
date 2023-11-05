---
title: Caching files with query parameters in PHP
tags:
    - post
    - php
date: 2021-11-09
---
TL;DR: The trick is using the file's actual last modification date from file system, formatting it and putting as query parameter.
<!-- excerpt -->

1. Declare a function `useCss()` that will return a `<link>` declaration that accepts a CSS file URL as an argument. The URL should be relative to the `$_SERVER['DOCUMENT_ROOT']`.

```php
function useCss($link) {
  $dateTemplate = 'd-m-Y_G:i:s';
  $cacheQuery = date($dateTemplate, filemtime($_SERVER['DOCUMENT_ROOT'].'/'.$link));
  return "<link rel='stylesheet' href='/{$link}?{$cacheQuery}' />";
}
```

2. Replace the tags `<link>` in your template with the new function:

```php
<head>
<?=useCss('css/styles.css'); ?>
</head>
```

You can create another function for Javascript files that works the same way.

```php
function useJs($link, $type = "text/javascript") {
  $dateTemplate = 'd-m-Y_G:i:s';
  $cacheQuery = date($dateTemplate, filemtime($_SERVER['DOCUMENT_ROOT'].'/'.$link));
  return "<script src='/{$link}?{$cacheQuery}' type='{$type}'></script>";
}
```

The result should look like this:

```php
<?php
function useCss($link) {
  $anticache = date('d-m-Y_G:i:s', filemtime($_SERVER['DOCUMENT_ROOT'].'/'.$link));
  return "<link rel='stylesheet' href='/{$link}?{$anticache}' />\n";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>

  <?=useCss('css/libs.css'); ?>
  <?=useCss('css/styles.css'); ?>
</head>
<body>
  <h1>What a wonderful world!</h1>

  <?=useJs('js/main.js'); ?>
</body>
</html>
```
