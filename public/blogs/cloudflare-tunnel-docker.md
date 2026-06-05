# Exposing Local Docker Projects to the World with Cloudflare Tunnels

If you've ever needed to show a local development project to a client, or test webhooks from a third-party service like Stripe or PayPal, you know the struggle. 

Historically, the solutions were either risky (messing with router port forwarding) or restrictive (using tools like ngrok, which often require paid plans for custom domains and have session limits).

In my recent projects, I've entirely replaced these old methods with **Cloudflare Tunnels**. It's completely free, allows me to use my own custom domains, and integrates beautifully with my Docker environments.

Here is how I expose my local Dockerized applications to the internet securely, without opening a single port on my firewall.

## What is a Cloudflare Tunnel?

Cloudflare Tunnel (formerly Argo Tunnel) works by running a lightweight daemon (`cloudflared`) inside your infrastructure. Instead of your server listening for incoming connections (which requires opening firewall ports), `cloudflared` creates a secure, outbound connection *to* Cloudflare's edge network.

When a user visits your designated URL, Cloudflare routes the traffic through that pre-existing outbound tunnel to your local machine. 

### Why is this better?
1. **Zero Open Ports**: Your router/firewall remains completely locked down.
2. **Custom Domains**: You can attach the tunnel to any domain you manage on Cloudflare for free (e.g., `dev.yourdomain.com`).
3. **Security**: You get Cloudflare's DDoS protection, SSL certificates, and WAF rules out of the box.

## How I Set This Up

Setting this up just requires a Cloudflare account with a domain added to it. The process is incredibly straightforward now thanks to Cloudflare's Zero Trust Dashboard.

### Step 1: Create the Tunnel
1. Log in to the Cloudflare dashboard and navigate to **Zero Trust**.
2. Go to **Networks** -> **Tunnels** and click **Create a tunnel**.
3. Choose **Cloudflared** and give your tunnel a name (e.g., `local-macbook`).
4. Once created, Cloudflare provides an installation command containing a **Tunnel Token**. I save this token, as I need it for my Docker setup.

### Step 2: Route the Traffic
In the tunnel configuration dashboard, I define the Public Hostname.
- **Subdomain**: `api-dev`
- **Domain**: `yourdomain.com`
- **Service Type**: `HTTP`
- **URL**: `app:80` (This is the internal Docker service name and port of your application).

### Step 3: Integrate with Docker Compose

This is where the magic happens. I don't install anything on my host machine. Instead, I just add `cloudflared` as a service in my existing `docker-compose.yml`.

Here is the setup I typically use:

```yaml
version: '3.8'

services:
  # Your local application (e.g., a Node.js or PHP app)
  app:
    image: nginx:latest
    volumes:
      - ./src:/usr/share/nginx/html
    # Notice we don't even need to expose ports to the host machine!
    # ports:
    #   - "8080:80" 

  # The Cloudflare Tunnel daemon
  tunnel:
    image: cloudflare/cloudflared:latest
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=your_super_long_token_here
    restart: always
    depends_on:
      - app
```

### How this works:
1. The `app` service runs your web server on its internal Docker network port `80`.
2. The `tunnel` service boots up, reads your `TUNNEL_TOKEN`, and connects to Cloudflare.
3. Because both containers are on the same Docker network, when Cloudflare receives a request for `api-dev.yourdomain.com`, it sends it down the tunnel. The tunnel then forwards it to `http://app:80`.

Notice that I completely commented out the `ports` mapping for the `app` service. The application isn't even accessible from `localhost:8080` anymore—it is *only* accessible securely through the Cloudflare Tunnel.

## Summary

By adding just a few lines to my `docker-compose.yml`, I can securely expose my local services to the internet. 

Whether I'm developing Magento instances that require strict URL routing, testing third-party API webhooks, or just sending a preview link to a client, Cloudflare Tunnels provide me with an enterprise-grade solution that takes less than 5 minutes to set up.
