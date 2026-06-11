---
title: "How a PHP 8.3 Upgrade Broke My Magento Docker Environment"
date: "2026-06-11"
description: "A debugging journey into a 502 Bad Gateway error caused by mixing old Nginx images with newer PHP images in Mark Shust's Magento Docker setup."
tags: ["Magento 2", "Docker", "Nginx", "PHP-FPM", "Troubleshooting"]
---

If you've worked with Magento 2 on Docker, you've probably come across [Mark Shust's Docker setup](https://github.com/markshust/docker-magento). I've used it on multiple projects and it's usually rock solid.

Recently, while upgrading one of my local environments to PHP 8.3, I ran into a strange issue that took much longer to figure out than I'd like to admit.

The site wouldn't load at all. Every request was returning a **502 Bad Gateway**.

Looking at the Nginx logs, I found this:

```text
[crit] 30#30: *8 connect() to unix:/sock/docker.sock failed (2: No such file or directory) while connecting to upstream
```

Nginx was trying to connect to PHP-FPM through `/sock/docker.sock`, but that socket didn't exist.

At first glance it looked like PHP-FPM wasn't running, but when I checked the PHP container logs everything looked healthy:

```text
[11-Jun-2026 10:02:24] NOTICE: fpm is running, pid 1
[11-Jun-2026 10:02:24] NOTICE: ready to handle connections
```

PHP was clearly running and ready to accept requests.

So where was the socket?

## The First Clue

I jumped into the PHP container and checked the contents of the `/sock` directory:

```bash
docker exec -it <php-container> ls -la /sock
```

Instead of `docker.sock`, I saw this:

```text
srw-rw---- 1 app app 0 Jun 11 10:39 phpfpm.sock
```

That immediately raised a question.

Why was Nginx looking for `docker.sock` while PHP was creating `phpfpm.sock`?

## The Strange Part

What made this even more confusing was that I had another machine running the exact same project.

Same codebase. Same `docker-compose.yml`. Same PHP version.

And that environment was working perfectly.

When I checked the `/sock` directory on the working machine, I found both sockets:

```text
docker.sock
phpfpm.sock
```

Now I was even more confused. Why did one machine have `docker.sock` while the other didn't?

## Finding the Real Problem

After digging through the [docker-magento repository](https://github.com/markshust/docker-magento) and comparing image versions, I finally noticed something important.

My environment was using:

```yaml
PHP:   markoshust/magento-php:8.3-fpm
Nginx: markoshust/magento-nginx:1.18-7
```

The PHP image was relatively new. The Nginx image was several versions behind.

That version mismatch turned out to be the entire problem.

## What Changed?

Newer versions of the docker-magento images introduced a dedicated Xdebug architecture.

Instead of running everything through a single PHP-FPM process, the stack now uses separate PHP-FPM containers for normal requests and Xdebug-enabled requests — a `phpfpm` container and a `phpfpm-xdebug` container running side by side. Nginx routes between them based on a cookie.

Because of that architectural change, the socket names changed as well. Older images used:

```text
/sock/docker.sock
```

Newer images use:

```text
/sock/phpfpm.sock
/sock/phpfpm-xdebug.sock
```

My PHP 8.3 container was creating the newer socket files, while my older Nginx container was still hardcoded to look for `docker.sock`.

As soon as I understood that, the 502 error finally made sense.

## Why Did the Other Machine Work?

The answer was Docker volumes.

The socket directory is stored in a shared volume:

```yaml
sockdata:/sock
```

Docker volumes survive container rebuilds and image upgrades.

At some point, that working environment had been set up with older images that generated `docker.sock`. Later, the PHP image was upgraded and started generating `phpfpm.sock`, but the old `docker.sock` file remained in the volume.

That stale file effectively hid the version mismatch and made the environment appear healthy.

On my fresh setup, there was no historical socket file left behind, so the problem became immediately visible.

## The Fix

The proper fix wasn't renaming sockets manually or creating symlinks.

The fix was making sure the Nginx and PHP images belonged to the same generation of the docker-magento stack.

### Step 1: Upgrade the Nginx Image

I updated the Nginx image to a modern version:

```yaml
app:
    image: markoshust/magento-nginx:1.28-0
```

Previously it was:

```yaml
app:
    image: markoshust/magento-nginx:1.18-7
```

### Step 2: Update the Nginx Configuration

Newer Nginx images use a variable called `$fastcgi_backend` to dynamically choose the correct PHP-FPM socket. It's defined using a `map` block that reads the `XDEBUG_SESSION` cookie and points to the right upstream accordingly.

In my custom Nginx configuration I had:

```nginx
fastcgi_pass fastcgi_backend;
```

which needed to become:

```nginx
fastcgi_pass $fastcgi_backend;
```

That small `$` matters. Without it, Nginx treats the value as a literal upstream name rather than a variable, and the routing breaks.

### Step 3: Recreate the Containers

After updating the image and configuration:

```bash
docker compose down
bin/start
```

The environment came back up immediately and the 502 errors disappeared.

## Final Thoughts

This wasn't a Magento issue. It wasn't a PHP issue. And it wasn't even really a Docker issue.

It was a compatibility issue caused by mixing container images from different generations of the docker-magento stack.

The lesson for me was simple: when upgrading PHP versions or any docker-magento component, make sure the supporting images are upgraded together. Nginx and PHP-FPM are tightly coupled in this setup, and something as small as a socket name change can completely break communication between them.

One way to avoid this in future: pin both the PHP and Nginx image versions together in a `.env` file so they always get updated as a pair rather than independently.

Hopefully this saves someone else a few hours of staring at a missing `docker.sock` and wondering where it went.

---

## References

While debugging this issue, these resources helped me understand what had changed between image versions:

- **Docker Magento Repository**: [https://github.com/markshust/docker-magento](https://github.com/markshust/docker-magento)
- **Docker Magento compose.yaml**: [https://github.com/markshust/docker-magento/blob/master/compose/compose.yaml](https://github.com/markshust/docker-magento/blob/master/compose/compose.yaml)
- **Docker Magento Release Notes**: [https://github.com/markshust/docker-magento/releases](https://github.com/markshust/docker-magento/releases)

The changes around PHP-FPM socket handling and the dedicated Xdebug container architecture become much clearer when comparing older and newer image versions in the release notes.
