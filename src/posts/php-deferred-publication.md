---
title: Deferred display of content with PHP
date: 2021-11-09
tags:
    - post
    - php
---

Sometimes you just need to publish some content on your website made with PHP at the speicific date and time.
<!-- excerpt -->
You can do it automatically by placing it right now but hiding it under the `if` statement where you check the current time.

```php
<?php
$today = strtotime(date("Y-m-d"));
$publish_date = strtotime("2017-11-01");

if ($publish_date <= $today): ?>
    <p>Deferred HTTP content</p>
<?php else:
    # nothing will be displayed
endif; ?>
```

You can also use the [`date_default_timezone_set`](https://www.php.net/manual/en/function.date-default-timezone-set.php) function to set the timezone if you need to take it into account.
