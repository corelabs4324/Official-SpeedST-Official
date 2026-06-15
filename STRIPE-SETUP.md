# Stripe Checkout Setup (multi-item cart)

Your site uses **Stripe Checkout Sessions** — customers add multiple products to the cart and pay **once**.

> **Important:** This needs a serverless function (`api/create-checkout.js`). **GitHub Pages alone won't work** for checkout. Deploy with **Vercel** (free, connects to your GitHub repo).

---

## Step 1 — Create products in Stripe (not Payment Links)

In [Stripe Dashboard](https://dashboard.stripe.com) → **Product catalog** → **+ Add product**

Create a **Stripe Product + Price** for every variant on your site. Use the same names and AUD prices as `js/catalog.js`.

Example for **Blackout Plate Single**:
1. Product name: `Blackout Plate — Single (Standard)`
2. Price: **$263 AUD**, one-time
3. After saving, click the price → copy the **Price ID** (starts with `price_`)

Repeat for every row in the table below.

### Full price ID checklist

Paste each Price ID into `data/stripe-prices.json`:

| Key (don't change) | Product / variant | Price AUD |
|--------------------|-------------------|-----------|
| `plates-single:std` | Blackout Plate Single — Standard | $263 |
| `plates-single:slim` | Blackout Plate Single — Slimline | $263 |
| `plates-dual:std-pair` | Blackout Plate Dual — Standard pair | $427 |
| `plates-dual:slim-pair` | Blackout Plate Dual — Slimline pair | $427 |
| `plates-dual:mixed` | Blackout Plate Dual — Mixed pair | $427 |
| `underglow-v1:sedan` | Underglow V1 — Sedan/Hatch | $349 |
| `underglow-v1:suv` | Underglow V1 — SUV/Ute | $349 |
| `underglow-pro:pro-sedan` | Underglow Pro — Sedan/Hatch | $469 |
| `underglow-pro:pro-suv` | Underglow Pro — SUV/Ute | $469 |
| `interior-core:core` | Interior Glow Core | $129 |
| `interior-pro:pro8` | Interior Glow Pro | $199 |
| `sticker-pack-01:matte` | Sticker Pack — Matte | $29 |
| `sticker-pack-01:gloss` | Sticker Pack — Gloss | $29 |
| `windshield-banner:wob` | Windshield Banner — White on black | $39 |
| `windshield-banner:bow` | Windshield Banner — Black on white | $39 |
| `bundle-night-rider:bundle` | Night Rider Bundle | $349 |
| `bundle-ultimate:bundle` | Ultimate Show Car Bundle | $449 |
| `bundle-stealth:bundle` | Stealth Build Bundle | $399 |

Example entry in `data/stripe-prices.json`:

```json
"plates-single:std": "price_1ABC123xyz",
```

---

## Step 2 — 10% off coupon (SpeedST10)

1. Stripe Dashboard → **Products** → **Coupons** → **+ New coupon**
2. **Percent off:** 10%
3. **Code:** `SpeedST10`
4. Save

Checkout already has **Allow promotion codes** enabled — customers enter the code on Stripe's checkout page.

---

## Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. **Add New Project** → import your `SpeedST-Official` repo
3. Root directory: `/` (or `github-export` if that's where the site files live)
4. **Environment Variables** (Project → Settings → Environment Variables):

| Name | Value |
|------|--------|
| `STRIPE_SECRET_KEY` | Your secret key from Stripe → Developers → API keys (`sk_live_…` or `sk_test_…` for testing) |
| `SITE_URL` | Your live URL, e.g. `https://speedst-official.vercel.app` or your custom domain |

5. Click **Deploy**

Vercel automatically runs `api/create-checkout.js` when someone clicks **Checkout with Stripe**.

---

## Step 4 — Custom domain (optional)

1. Vercel project → **Settings → Domains** → add your domain
2. Update DNS at your registrar (Vercel shows you the records)
3. Update `SITE_URL` env var to your custom domain

---

## How the flow works

1. Customer picks products → **Add to cart**
2. Cart page shows all items, quantities, subtotal
3. **Checkout with Stripe** → your server creates a Checkout Session with all line items
4. Customer pays once on Stripe (can enter **SpeedST10**)
5. Redirect back to `cart.html?success=1`, cart clears

---

## Test mode first

Use **test API keys** (`sk_test_…`) and test card `4242 4242 4242 4242` before going live.

---

## Local testing

```bash
npm install
npx vercel dev
```

Copy `.env.example` to `.env.local` and add your test secret key.
