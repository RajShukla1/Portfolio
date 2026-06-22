# Phantom CLS in Lighthouse: How to Hunt Down and Fix Invisible Layout Shifts

**2026-06-29 · 4 min read · By Raj Pawan Shukla**

Have you ever run a Google Lighthouse audit, stared at a failing Cumulative Layout Shift (CLS) score, and thought: 
*"But nothing on the page is moving!"*

Welcome to what many developers informally call Phantom CLS.

Unlike obvious layout shifts — where a slow-loading image pushes an entire paragraph down the screen — phantom CLS happens in the blink of an eye. The shift is so subtle or so fast that users barely notice it, but Lighthouse and Chrome's performance tools still record it.

Recently, while optimizing the Newport Fasteners ecommerce platform, I encountered a series of these invisible shifts. Here's how I tracked them down and fixed them.

## What Causes Phantom CLS?

The two most common culprits are:

1. **Lazy-loaded images above the fold:** Deferring images that are meant to be visible immediately.
2. **Client-side injected scripts:** JavaScript rendering UI components slightly after the initial HTML is painted, with no space reserved for them.

Both showed up in this investigation.

## Case 1: The Lazy-Loaded Hero Banner

The homepage featured a large promotional banner that was being lazy-loaded. On fast connections, the image arrived so quickly that nobody noticed the shift visually — yet Lighthouse consistently flagged it.

The real problem was that the browser had no information to reserve space for the banner early in the rendering process. When the image eventually loaded, it introduced a subtle shift.

### The Fix

Remove `loading="lazy"` from above-the-fold images, add `fetchpriority="high"`, and add a `<link rel="preload">` in the document `<head>`. Always include explicit `width` and `height` so the browser can reserve the correct space before the image arrives.

```html
<!-- Before -->
<img src="hero-banner.jpg" loading="lazy" alt="Promo" />

<!-- After -->
<link rel="preload" as="image" href="hero-banner.jpg" />

<img
  src="hero-banner.jpg"
  fetchpriority="high"
  width="1200"
  height="400"
  alt="Promo"
/>
```

That completely eliminated the layout shift for that section.

## Case 2: Render-Blocking UI Scripts

The product pages were experiencing tiny micro-shifts during the initial render. The culprits were `df_add_to_cart_hyva.min.js` and `nouislider.min.js` — scripts responsible for the Add to Cart button and price range slider.

Both initialized slightly after the initial HTML was parsed. Because the containers didn't reserve space beforehand, nearby elements shifted once the components became fully interactive. The movements were almost impossible to notice during normal browsing, but Lighthouse still recorded them.

### The Fix

Two changes together solved it.

Reserve space with CSS so the layout stays stable regardless of when the JavaScript executes:

```css
.price-slider-container {
  min-height: 60px;
}

.add-to-cart-wrapper {
  min-height: 48px;
}
```

Defer non-critical scripts so the browser continues parsing and rendering without waiting for them:

```html
<!-- Before -->
<script src="df_add_to_cart_hyva.min.js"></script>
<script src="nouislider.min.js"></script>

<!-- After -->
<script src="df_add_to_cart_hyva.min.js" defer></script>
<script src="nouislider.min.js" defer></script>
```

Note that deferring alone doesn't fix CLS — it can even expose layout gaps more clearly if space isn't reserved. Both changes are needed.

## How to Debug Phantom CLS

Don't trust your eyes — trust the tools.

- **Chrome DevTools Performance Panel:** Record a page load and inspect the Experience track. Chrome highlights exactly which DOM nodes shifted and when.
- **Web Vitals Extension:** Logs layout shifts in real time, making it much easier to catch problematic components during development.
- **Test on throttled connections:** Phantom CLS often hides behind fast hardware and local servers. Throttle your network to Fast 3G in DevTools — shifts that are invisible on broadband become obvious immediately.

## The Takeaway

Core Web Vitals measure real moments of user frustration. Even movements too fast to consciously notice can make a page feel unstable.

Fixing phantom CLS requires a shift in mindset: stop thinking about how the page looks when it's finished loading, and start thinking about the millisecond-by-millisecond journey the browser takes to get there.

Reserve your space. Load hero content early. Defer heavy scripts responsibly.

Your users — and your Lighthouse score — will thank you.
