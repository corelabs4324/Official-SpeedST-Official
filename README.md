# SPEED·ST Website

Static website for SPEED·ST — blackout plates, underglow kits, interior glow packs, stickers, and bundles.

**Checkout:** shopping cart + **Stripe Checkout** (pay for multiple items in one transaction).

## Pages

| Page | File |
|------|------|
| Homepage | `index.html` |
| Shop all | `shop.html` |
| Bundles | `bundles.html` |
| Blackout Plates | `blackout-plates.html` |
| Underglow | `underglow.html` |
| Interior Glow | `interior-glow.html` |
| Stickers | `stickers.html` |
| Meets & Collabs | `meets.html` |
| Product detail | `product.html?id=<product-id>` |
| Cart + checkout | `cart.html` |

## Local preview

```bash
ruby -run -e httpd . -p 8080
```

Visit `http://localhost:8080` — cart works locally; checkout needs `vercel dev` (see below).

## Checkout (multi-item cart)

1. Customer adds products from any product page → **Add to cart**
2. Opens **cart.html** → adjust quantities
3. **Checkout with Stripe** → one payment for everything
4. Promo code **SpeedST10** can be entered on Stripe's checkout page

**Setup:** see **[STRIPE-SETUP.md](./STRIPE-SETUP.md)** — create Stripe Price IDs, paste into `data/stripe-prices.json`, deploy on Vercel.

> GitHub Pages hosts the HTML/CSS/JS only. The checkout API (`api/create-checkout.js`) requires **Vercel** (free tier works).

## Deploy (recommended: Vercel + GitHub)

1. Push this folder to GitHub (you already have `SpeedST-Official`)
2. [vercel.com](https://vercel.com) → Import your GitHub repo
3. Add environment variables: `STRIPE_SECRET_KEY`, `SITE_URL`
4. Deploy — Vercel gives you a live URL

Custom domain: Vercel → Settings → Domains.

## Project structure

```
├── index.html
├── shop.html, cart.html, product.html, bundles.html, …
├── css/                    Styles
├── js/
│   ├── catalog.js          Products & prices
│   └── cart.js             Cart + checkout redirect
├── api/
│   └── create-checkout.js  Stripe serverless function (Vercel)
├── data/
│   └── stripe-prices.json  Paste Stripe Price IDs here
├── assets/                 Images
├── STRIPE-SETUP.md         Stripe + Vercel instructions
└── package.json            Stripe SDK for API route
```

## Replacing images

Drop PNG/JPG files into `assets/` and update paths in `js/catalog.js` and HTML files.
