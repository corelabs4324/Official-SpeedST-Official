# Stripe setup

This site uses **Stripe Checkout Sessions** (multi-item cart), **not** individual Payment Links.

→ **Follow [STRIPE-SETUP.md](./STRIPE-SETUP.md)** for full instructions.

Quick summary:
1. Create **Products + Prices** in Stripe Dashboard (copy `price_…` IDs)
2. Paste IDs into **`data/stripe-prices.json`**
3. Deploy on **Vercel** (not GitHub Pages alone)
4. Set `STRIPE_SECRET_KEY` and `SITE_URL` in Vercel environment variables
