const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function loadPriceMap() {
  const file = path.join(process.cwd(), 'data', 'stripe-prices.json');
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const map = {};
  for (const [key, value] of Object.entries(raw)) {
    if (key.startsWith('_')) continue;
    if (value) map[key] = value;
  }
  return map;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured on the server' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const priceMap = loadPriceMap();
  const line_items = [];
  const orderNotes = [];

  for (const item of items) {
    const { productId, variantId, quantity = 1, note = '' } = item;
    if (!productId || !variantId) {
      return res.status(400).json({ error: 'Each item needs productId and variantId' });
    }

    const key = `${productId}:${variantId}`;
    const priceId = priceMap[key];
    if (!priceId) {
      return res.status(400).json({
        error: `Missing Stripe Price ID for ${key}. Add it to data/stripe-prices.json`
      });
    }

    line_items.push({
      price: priceId,
      quantity: Math.max(1, Math.min(99, Number(quantity) || 1))
    });

    if (note) {
      orderNotes.push(`${productId} (${variantId}): ${note}`);
    }
  }

  const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      allow_promotion_codes: true,
      success_url: `${siteUrl}/cart.html?success=1`,
      cancel_url: `${siteUrl}/cart.html?cancelled=1`,
      metadata: orderNotes.length ? { order_notes: orderNotes.join(' | ').slice(0, 500) } : undefined,
      shipping_address_collection: { allowed_countries: ['AU', 'NZ', 'US', 'CA', 'GB'] }
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return res.status(500).json({ error: err.message || 'Stripe checkout failed' });
  }
};
