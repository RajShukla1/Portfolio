---
title: "Fixing Magento 2 Docker 502 Bad Gateway Error: Image Mismatch"
date: "2026-06-11"
description: "Learn how to troubleshoot and fix a 502 Bad Gateway error in a Magento 2 Docker environment caused by an Nginx and PHP-FPM image version mismatch."
tags: ["Magento 2", "Docker", "Nginx", "PHP-FPM", "Troubleshooting", "502 Bad Gateway"]
---

If you've worked with Magento 2 on Docker, you've probably come across [Mark Shust's Docker setup](https://github.com/markshust/docker-magento). I've used it on multiple projects and it's usually rock solid.

Recently, my system ran into some memory issues, so I decided to do a clean sweep: I pruned my Docker images and volumes, and spun everything back up with `docker compose up -d`. 

That's when I ran into a strange issue that took much longer to figure out than I'd like to admit. My environment had already been running perfectly fine on PHP 8.3, but suddenly the site wouldn't load at all. Every request was returning a **502 Bad Gateway**.

![Magento 2 Docker 502 Bad Gateway Error](/images/502.png "Screenshot of a 502 Bad Gateway Error caused by Nginx and PHP-FPM mismatch")

If you're relatively new to Docker or server administration, a 502 error can feel like a brick wall. But a 502 simply means one server (acting as a proxy) received an invalid response—or no response—from the upstream server it's trying to talk to. In our Magento Docker stack, Nginx is the proxy, and PHP-FPM is the upstream server.

Here is exactly how you should approach debugging this, step-by-step.

### Step 1: Check the Nginx Proxy Logs for 502 Errors

Since the 502 error is served by Nginx, Nginx knows exactly *why* it threw that error. Your first move is always to check the Nginx container's error logs:

```bash
# Depending on your setup, the container name might be nginx, app, or web.
docker compose logs app
```

In my logs, I found this specific critical error:

```text
[crit] 30#30: *8 connect() to unix:/sock/docker.sock failed (2: No such file or directory) while connecting to upstream
```

This single line gives us three massive clues:
1. **`connect() ... failed`**: Nginx is trying to pass the request to the next service in the chain.
2. **`unix:/sock/docker.sock`**: Nginx is configured to communicate with PHP via a Unix socket file located at `/sock/docker.sock` (instead of a TCP network port like `9000`).
3. **`No such file or directory`**: The socket file simply doesn't exist.

### Step 2: Verify the Magento PHP-FPM Container

Nginx is complaining it can't reach PHP. So, the next logical question is: Is PHP even running? Did it crash?

Let's check the PHP container logs:

```bash
docker compose logs phpfpm
```

Here is what I saw:

```text
[11-Jun-2026 10:02:24] NOTICE: fpm is running, pid 1
[11-Jun-2026 10:02:24] NOTICE: ready to handle connections
```

PHP was perfectly healthy and waiting for work. It hadn't crashed.

### Step 3: Investigate the Nginx and PHP-FPM Socket Connection

We know Nginx is specifically looking for a file at `/sock/docker.sock`. We know PHP is running. In this Docker setup, the `/sock` directory is a shared Docker volume mounted into both the Nginx and PHP containers so they can communicate.

I decided to jump into the PHP container to see what was actually inside that shared directory:

```bash
docker exec -it <php-container-name> ls -la /sock
```

Instead of the `docker.sock` that Nginx was so desperately looking for, I saw this:

```text
srw-rw---- 1 app app 0 Jun 11 10:39 phpfpm.sock
```

### Step 4: Identifying the Socket Mismatch

This was the "Aha!" moment.

- Nginx was hardcoded to look for `docker.sock`.
- PHP was configured to create and listen on `phpfpm.sock`.

They were physically incapable of talking to each other because they disagreed on the filename. But why would two services in the same pre-packaged boilerplate disagree on something so fundamental?

## The Strange Part: Why One Environment Worked

What made this even more confusing was that I had another machine running the exact same project.

Same codebase. Same `docker-compose.yml`. Same PHP version.

And that environment was working perfectly.

When I checked the `/sock` directory on the working machine, I found only:

```text
docker.sock
```

Now I was even more confused. Why did one machine have `docker.sock` while the other didn't?

## Finding the Root Cause: Docker Image Version Mismatch

After digging through the [docker-magento repository](https://github.com/markshust/docker-magento) and comparing image versions, I finally noticed something important.

My environment was using:

```yaml
PHP:   markoshust/magento-php:8.3-fpm
Nginx: markoshust/magento-nginx:1.18-7
```

The PHP image was relatively new. The Nginx image was several versions behind.

That version mismatch turned out to be the entire problem.

## What Changed in the Magento Docker Images?

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

## Why Did the Other Machine Work with Stale Volumes?

The answer was Docker volumes.

The socket directory is stored in a shared volume:

```yaml
sockdata:/sock
```

Docker volumes survive container rebuilds and image upgrades.

At some point, that working environment had been set up with older images that generated `docker.sock`. Later, the PHP image was upgraded and started generating `phpfpm.sock`, but the old `docker.sock` file remained in the volume.

That stale file effectively hid the version mismatch and made the environment appear healthy.

Because I had just **pruned my Docker volumes** due to the memory issue, my fresh setup wiped out that historical `docker.sock` file. With the stale file gone, the mismatch between my older Nginx image and my newer PHP image became immediately visible.

## How to Fix the Magento 2 Docker 502 Error

The proper fix wasn't renaming sockets manually or creating symlinks.

The fix was making sure the Nginx and PHP images belonged to the same generation of the docker-magento stack.

### Step 1: Upgrade the Nginx Docker Image

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

### Step 2: Update the Magento Nginx Configuration

Newer Nginx images use a variable called `$fastcgi_backend` to dynamically choose the correct PHP-FPM socket. The actual routing logic is baked directly into the custom Nginx image provided by `docker-magento`. 

If you look at the raw Nginx configuration file in the [docker-magento GitHub repo (`images/nginx/1.28/conf/default.conf`, Lines 9-12)](https://github.com/markshust/docker-magento/blob/master/images/nginx/1.28/conf/default.conf#L9-L12), you can see exactly how this works:

```nginx
map $cookie_XDEBUG_SESSION $fastcgi_backend {
  default fastcgi_phpfpm;
  PHPSTORM fastcgi_phpfpm_xdebug;
}
```

This `map` block reads the `XDEBUG_SESSION` cookie. If the cookie exists, it sets `$fastcgi_backend` to the Xdebug socket. If it doesn't, it defaults to the standard PHP-FPM socket. My older Nginx image simply didn't have this map block.

To make this work in your local project, you need to update Magento's `nginx.conf` file. In my configuration, I had:

```nginx
fastcgi_pass fastcgi_backend;
```

which needed to become:

```nginx
fastcgi_pass $fastcgi_backend;
```

That small `$` matters. Without it, Nginx treats the value as a literal upstream name rather than a variable, and the routing breaks.

**Wait, doesn't Mark Shust's setup do this automatically?**
Yes, newer versions of the `docker-magento` stack include a helper script called `bin/setup-nginx` (introduced in [commit 80cc78d](https://github.com/markshust/docker-magento/commit/80cc78d1fef6cbcfda1d9226bd1fae041019501a)) that rewrites this line for you automatically. 

However, because I only bumped the image versions in my `compose.yaml` file and didn't run `bin/update` to fetch the latest helper scripts, my local `bin/` directory was out of date. I didn't even have the `bin/setup-nginx` file on my system! This is why I had to add the `$` symbol manually.

### Step 3: Recreate the Docker Containers

After updating the image and configuration:

```bash
docker compose down
bin/start
```

The environment came back up immediately and the 502 errors disappeared.

## Final Thoughts on Magento Docker Troubleshooting

This wasn't a Magento issue. It wasn't a PHP issue. And it wasn't even really a Docker issue.

It was a compatibility issue caused by mixing container images from different generations of the docker-magento stack.

The lesson for me was two-fold:
1. **Docker volumes hide sins.** A stale volume can make a misconfigured environment appear perfectly healthy until you are forced to prune it.
2. **Web servers aren't just "dumb pipes".** When upgrading PHP versions or any docker-magento component, make sure the supporting images (like Nginx) are upgraded together. In this stack, they are tightly coupled. 

One way to avoid this in future: pin both the PHP and Nginx image versions together in a `.env` file so they always get updated as a pair rather than independently. Also, remember that changing image versions in your compose file doesn't automatically update your local `bin/` helper scripts!

Hopefully this saves someone else a few hours of staring at a missing `docker.sock` and wondering where it went.

---

## References

While debugging this issue, these resources helped me understand what had changed between image versions:

- **Docker Magento Repository**: [https://github.com/markshust/docker-magento](https://github.com/markshust/docker-magento)
- **Docker Magento compose.yaml**: [https://github.com/markshust/docker-magento/blob/master/compose/compose.yaml](https://github.com/markshust/docker-magento/blob/master/compose/compose.yaml)
- **Docker Magento Release Notes**: [https://github.com/markshust/docker-magento/releases](https://github.com/markshust/docker-magento/releases)

The changes around PHP-FPM socket handling and the dedicated Xdebug container architecture become much clearer when comparing older and newer image versions in the release notes.
