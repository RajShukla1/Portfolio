# Fixing Nginx "no port in upstream fastcgi_backend" Error in Magento Docker

If you use Mark Shust's excellent docker-magento setup, you may occasionally run into a situation where the Nginx container crashes immediately after startup.

Checking the container logs reveals an error similar to:

```text
nginx: [emerg] no port in upstream "fastcgi_backend" in /var/www/html/nginx.conf:50
```

Since this is an `[emerg]` level configuration error, Nginx fails validation and exits before the container can fully start.

What makes this issue particularly confusing is that the same Magento `nginx.conf.sample` file may work perfectly in older projects while failing in newer ones.

After comparing the generated Nginx configurations between two Docker image versions, I discovered that the root cause was a change in how PHP-FPM routing is handled inside the container.

## The Environment

The issue appeared when using:

```text
markshust/magento-nginx:1.28-0
```

while older projects that worked correctly were running:

```text
markshust/magento-nginx:1.18-7
```

The Magento configuration file contained the standard directives:

```nginx
fastcgi_pass fastcgi_backend;
```

which have existed in Magento's default `nginx.conf.sample` for years.

## Investigating the Difference

To understand why one environment worked and the other failed, I inspected the generated Nginx configuration inside both containers:

```bash
docker compose exec app cat /etc/nginx/conf.d/default.conf
```

### Older Image: 1.18-7

The older image generated:

```nginx
upstream fastcgi_backend {
  server unix:/sock/docker.sock;
}
```

This meant Magento's configuration:

```nginx
fastcgi_pass fastcgi_backend;
```

worked exactly as expected because `fastcgi_backend` existed as a valid Nginx upstream.

### Newer Image: 1.28-0

The newer image generated:

```nginx
upstream fastcgi_phpfpm {
  server unix:/sock/phpfpm.sock;
}

upstream fastcgi_phpfpm_xdebug {
  server unix:/sock/phpfpm-xdebug.sock;
}

map $cookie_XDEBUG_SESSION $fastcgi_backend {
  default fastcgi_phpfpm;
  PHPSTORM fastcgi_phpfpm_xdebug;
}
```

Notice what's missing:

```nginx
upstream fastcgi_backend {
    ...
}
```

The upstream no longer exists.

Instead, `fastcgi_backend` is now an Nginx variable populated by a `map` directive.

This allows requests to be dynamically routed to either the normal PHP-FPM container or the Xdebug-enabled PHP-FPM container depending on the browser cookie.

## Why the Error Occurs

When Nginx sees:

```nginx
fastcgi_pass fastcgi_backend;
```

it interprets `fastcgi_backend` as a literal upstream name.

In older images that upstream existed.

In newer images it does not.

As a result, Nginx fails validation and throws:

```text
nginx: [emerg] no port in upstream "fastcgi_backend"
```

before startup can complete.

## The Fix

Update all occurrences of:

```nginx
fastcgi_pass fastcgi_backend;
```

to:

```nginx
fastcgi_pass $fastcgi_backend;
```

The `$` tells Nginx to evaluate the variable rather than look for an upstream with that name.

In Magento's default `nginx.conf.sample`, there are typically three occurrences that need to be updated.

### Restart Nginx

After saving the file, restart the Nginx container:

```bash
docker compose restart app
```

or restart whichever service is running the `markshust/magento-nginx` image in your environment.

## Final Thoughts

The interesting part of this issue wasn't the fix itself—it was understanding why older projects continued working while newer projects failed with the exact same Magento configuration.

The answer turned out to be a change in the generated Nginx configuration between Docker image versions. Older images exposed a literal `fastcgi_backend` upstream, while newer images use a variable-based routing mechanism to support dynamic PHP-FPM and Xdebug switching.

If you encounter:

```text
nginx: [emerg] no port in upstream "fastcgi_backend"
```

while using newer versions of the Mark Shust Nginx image, checking `/etc/nginx/conf.d/default.conf` is a good first step. It quickly reveals whether your Magento configuration is referencing an upstream that no longer exists.
