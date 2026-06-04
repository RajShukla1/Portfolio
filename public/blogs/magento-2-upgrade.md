# How a Magento 2 Upgrade Broke Our Multi-Website Setup (And Why the Problem Wasn't Magento)

A few weeks ago, I was working on a Magento 2 upgrade for a project that hosts multiple websites under a single Magento installation.

The upgrade itself went smoothly. Deployment completed successfully, Magento commands ran without errors, and our initial testing didn't reveal any major issues.

A little later, however, we discovered that the secondary website was redirecting to the default website.

What made this issue particularly interesting was that the root cause wasn't inside Magento at all.

## Project Setup

The project contained two websites:
- Default Website
- Secondary Website

Before the upgrade, both websites were serving different storefronts correctly.

After the upgrade, the default website continued to work as expected, but requests to the secondary domain eventually started redirecting to the default website.

## Why the Issue Was Confusing

What made this issue difficult to troubleshoot was that our initial testing passed.

We didn't miss testing the secondary website. As part of our deployment verification, we tested both websites and both appeared to be working correctly.

The redirect issue only surfaced later during additional testing.

Because of this, we suspected that some form of caching might have been masking the problem during the first round of verification. It could have been browser cache, Cloudflare cache, or another layer serving cached responses.

While we never conclusively identified which cache layer was involved, the delayed appearance of the issue created the impression that the deployment had been successful and that both websites were functioning normally.

As a result, our investigation initially focused on whether something had changed after deployment rather than on the deployment itself.

## Checking Magento Configuration

Since the issue involved website routing, Magento configuration became our first suspect.

We reviewed:
- Websites
- Store Groups
- Store Views
- Base URLs
- Store configurations

Everything looked correct.

The secondary website still existed, the domains were configured properly, and the store hierarchy matched what we expected.

We also considered whether a configuration value had been changed accidentally after deployment, but nothing seemed out of place.

At this point, Magento wasn't giving us any useful clues.

## Is the Redirect Really Coming From Magento?

Instead of continuing to search through Magento configuration, we decided to answer a simpler question:

Was the redirect actually happening inside Magento?

To test this, we created a simple HTML file inside the `pub` directory: `test.html`.

When we accessed the file through both domains, it loaded successfully.

This immediately told us that:
- DNS was working
- Domains were resolving correctly
- Nginx was serving requests correctly
- Requests were reaching the Magento `pub` directory

Nothing pointed to a DNS or web server routing issue.

The successful HTML test pushed us to the conclusion that Nginx was working fine for static files—DNS and domains were perfectly fine.

However, since everything was absolutely correct in the Magento configuration, we decided to trace the complete request flow from the very beginning.

## Looking Beyond Magento

We shifted our focus back to the web server configuration and started reviewing exactly how requests were being passed to Magento.

One useful command during the investigation was:

```bash
nginx -T
```

This allowed us to inspect the final configuration Nginx was actually using.

While reviewing the active configuration, we noticed that the settings responsible for identifying the Magento website were missing.

One factor that delayed the investigation was that I didn't realize the project's `nginx.conf.sample` had been customized in the past.

The multi-website setup had been implemented before I worked on this area of the project, and the Nginx configuration was historically maintained by another developer. Because of that, I initially treated `nginx.conf.sample` as a standard Magento file rather than a file containing project-specific customizations.

That assumption turned out to be important.

## The Real Root Cause

The breakthrough came when we compared the current configuration with what existed before the upgrade.

During the Magento upgrade, `nginx.conf.sample` had been updated.

The project previously contained custom multi-website configuration that relied on values such as:

```nginx
MAGE_RUN_CODE
MAGE_RUN_TYPE
```

These parameters tell Magento which website should handle an incoming request.

Before the upgrade, Nginx correctly passed the website information to Magento.

After the upgrade, those custom settings were no longer present.

As a result, Magento could no longer identify the secondary website correctly and defaulted to the primary website instead, causing the unexpected redirects.

In hindsight, the behavior made perfect sense.

Magento wasn't broken.

Magento was simply receiving incomplete information from the web server.

## The Fix

Once we identified the missing configuration, the solution was straightforward.

We restored the required parameters:

```nginx
fastcgi_param MAGE_RUN_CODE secondary_website_code;
fastcgi_param MAGE_RUN_TYPE website;
```

Then we validated and reloaded Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

The issue disappeared immediately.

The secondary website started loading correctly, and requests were no longer redirected to the default website.

## Lessons Learned

### 1. Don't Assume the Upgrade Is the Root Cause
The problem appeared after the Magento upgrade, but Magento itself wasn't responsible.
The upgrade indirectly caused the issue by replacing a configuration file that contained project-specific customizations.

### 2. Isolate Components
The simple HTML test was extremely valuable.
By testing outside Magento, we were able to confirm Nginx was working fine at a basic level, which eventually forced us to look at the complete request flow and discover the root cause.

### 3. Multi-Website Setups Depend on Server Configuration
In Magento multi-website environments, web server configuration is just as important as Magento configuration.
Even with a perfectly configured Magento instance, missing `MAGE_RUN_CODE` and `MAGE_RUN_TYPE` values can break website routing.

### 4. Review Customized Files During Upgrades
It's easy to focus on code and database changes during an upgrade.
However, projects often contain customized versions of files that ship with Magento. Those customizations should always be identified, documented, and reviewed during upgrade work.

## Conclusion

What initially looked like a Magento website configuration issue turned out to be a web server configuration problem caused by changes to a customized `nginx.conf.sample` file during the upgrade process.

The investigation moved from Magento configuration checks to a simple HTML test, and finally to a full Nginx configuration and request flow review before the actual cause became clear.

In the end, the fix was only a few lines of configuration, but finding those lines required understanding exactly where the request flow was breaking.

Sometimes the fastest way to solve a Magento problem is to stop looking at Magento and start looking at everything around it.
