// Stripe Price IDs live in data/stripe-prices.json (format: productId:variantId → price_…)
// Cart checkout uses Stripe Checkout Sessions via /api/create-checkout (deploy on Vercel).
// See STRIPE-SETUP.md — do NOT use Payment Links for multi-item checkout.

/**
 * SPEED·ST product catalog — blackout plates, underglow, interior glow, stickers
 */
const CATALOG = [
  /* ---- BLACKOUT PLATES ---- */
  {
    id: 'plates-single',
    category: 'plates', categoryLabel: 'Blackout Plates',
    title: 'Blackout Plate™ — Single',
    subtitle: 'Remote-controlled blackout overlay, standard or slimline fit',
    price: 263, compareAt: 458,
    image: 'assets/kit-dual.png',
    stripeLink: '', // YOUR_STRIPE_LINK_HERE — or set per variant below
    badge: null,
    featured: true,
    page: 'blackout-plates.html',
    sizes: [
      { id: 'std', label: 'Standard', dim: '372 × 134 mm', note: 'Most AU rear plates', stripeLink: '' },
      { id: 'slim', label: 'Slimline', dim: '372 × 100 mm', note: 'Compact front plates', stripeLink: '' }
    ]
  },
  {
    id: 'plates-dual',
    category: 'plates', categoryLabel: 'Blackout Plates',
    title: 'Blackout Plate™ — Dual',
    subtitle: 'Front + rear set, one remote controls both',
    price: 427, compareAt: 725,
    image: 'assets/kit-dual.png',
    stripeLink: '',
    badge: 'Best value',
    featured: true,
    page: 'blackout-plates.html',
    sizes: [
      { id: 'std-pair', label: 'Standard pair', dim: '2 × 372 × 134 mm', note: 'Both standard', stripeLink: '' },
      { id: 'slim-pair', label: 'Slimline pair', dim: '2 × 372 × 100 mm', note: 'Both slimline', stripeLink: '' },
      { id: 'mixed', label: 'Mixed pair', dim: '1 × Standard + 1 × Slimline', note: 'Front/rear mix', mixedNote: true, stripeLink: '' }
    ]
  },

  /* ---- UNDERGLOW ---- */
  {
    id: 'underglow-v1',
    category: 'underglow', categoryLabel: 'Underglow',
    title: 'Underglow Kit V1',
    subtitle: '4-piece RGB aluminium bars, RF remote, IP68',
    price: 349, compareAt: 449,
    image: 'assets/underglow-kit.png',
    stripeLink: '',
    badge: 'New',
    featured: true,
    page: 'underglow.html',
    sizes: [
      { id: 'sedan', label: 'Sedan / Hatch', dim: '2 × 120 cm + 2 × 90 cm', note: 'Most sedans & hatches', stripeLink: '' },
      { id: 'suv', label: 'SUV / Ute', dim: '2 × 150 cm + 2 × 120 cm', note: 'Long wheelbase', stripeLink: '' }
    ]
  },
  {
    id: 'underglow-pro',
    category: 'underglow', categoryLabel: 'Underglow',
    title: 'Underglow Pro',
    subtitle: 'App control, music sync, chase animations',
    price: 469, compareAt: null,
    image: 'assets/underglow-pro-kit.png',
    sizes: [
      { id: 'pro-sedan', label: 'Sedan / Hatch', dim: '2 × 120 cm + 2 × 90 cm', note: 'Addressable LEDs', stripeLink: '' },
      { id: 'pro-suv', label: 'SUV / Ute', dim: '2 × 150 cm + 2 × 120 cm', note: 'Addressable LEDs', stripeLink: '' }
    ]
  },

  /* ---- INTERIOR GLOW ---- */
  {
    id: 'interior-core',
    category: 'interior', categoryLabel: 'Interior Glow',
    title: 'Interior Glow Pack — Core',
    subtitle: '2 footwell bars + 2 ambient strips, USB-C powered',
    price: 129, compareAt: 179,
    image: 'assets/interior-glow-kit.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'interior-glow.html',
    sizes: [
      { id: 'core', label: 'Core 4-piece', dim: '2 × footwell + 2 × dash strips', note: 'Front cabin', stripeLink: '' }
    ]
  },
  {
    id: 'interior-pro',
    category: 'interior', categoryLabel: 'Interior Glow',
    title: 'Interior Glow Pack — Pro',
    subtitle: 'Full-cabin 8-piece, music sync, app + remote',
    price: 199, compareAt: 259,
    image: 'assets/interior-glow-marketing.png',
    sizes: [
      { id: 'pro8', label: 'Pro 8-piece', dim: '4 × footwell + 4 × ambient strips', note: 'Front + rear cabin', stripeLink: '' }
    ]
  },

  /* ---- STICKERS ---- */
  {
    id: 'sticker-pack-01',
    category: 'stickers', categoryLabel: 'Stickers',
    title: 'Sticker Pack 01',
    subtitle: '7 die-cut vinyl decals — checker, katakana, skull & more',
    price: 29, compareAt: null,
    image: 'assets/sticker-pack.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'stickers.html',
    sizes: [
      { id: 'matte', label: 'Matte black', dim: 'Matte vinyl, 5-year outdoor', note: 'Stealth finish', stripeLink: '' },
      { id: 'gloss', label: 'Gloss', dim: 'Gloss vinyl, 5-year outdoor', note: 'High contrast', stripeLink: '' }
    ]
  },
  {
    id: 'windshield-banner',
    category: 'stickers', categoryLabel: 'Stickers',
    title: 'SPEED·ST Windshield Banner',
    subtitle: '950 × 130 mm sun-strip banner, pre-masked for install',
    price: 39, compareAt: null,
    image: 'assets/sticker-pack.png',
    stripeLink: '',
    badge: null,
    featured: false,
    page: 'stickers.html',
    sizes: [
      { id: 'wob', label: 'White on black', dim: '950 × 130 mm', note: 'Classic', stripeLink: '' },
      { id: 'bow', label: 'Black on white', dim: '950 × 130 mm', note: 'Inverted', stripeLink: '' }
    ]
  },

  /* ---- BUNDLES ---- */
  {
    id: 'bundle-glow-starter',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Glow Starter Pack',
    subtitle: 'Dip your toes — cabin glow + sticker drop',
    description: 'The cheapest way into SPEED·ST. Interior ambient lighting plus our current sticker run — perfect as a gift or first mod.',
    price: 139, compareAt: 158,
    image: 'assets/interior-glow-kit.png',
    stripeLink: '',
    badge: 'Entry',
    featured: false,
    page: 'bundles.html',
    includes: ['1 × Interior Glow Pack — Core', '1 × Sticker Pack 01'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Interior + stickers', note: 'Save $19 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-night-rider',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Night Rider Bundle',
    subtitle: 'Light it up inside and out',
    description: 'Transform your car inside and out while saving compared to purchasing each product individually.',
    price: 349, compareAt: 478,
    image: 'assets/underglow-kit.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'bundles.html',
    includes: ['1 × Underglow Kit V1', '1 × Interior Glow Pack — Core'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Underglow + interior glow', note: 'Save $129 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-exterior',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Exterior Kit',
    subtitle: 'Plate blackout + underglow from the ground up',
    description: 'One plate, full underbody glow. The exterior-only setup for builds that want presence without touching the cabin.',
    price: 529, compareAt: 612,
    image: 'assets/underglow-car.png',
    stripeLink: '',
    badge: null,
    featured: false,
    page: 'bundles.html',
    includes: ['1 × Blackout Plate — Single', '1 × Underglow Kit V1'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Single plate + underglow V1', note: 'Save $83 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-pro-glow',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Pro Glow Bundle',
    subtitle: 'App control, music sync — no plates',
    description: 'Skip the stealth, max the spectacle. Pro underglow and full-cabin interior with app and music sync — our best lighting-only combo.',
    price: 579, compareAt: 668,
    image: 'assets/underglow-pro-kit.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'bundles.html',
    includes: ['1 × Underglow Pro', '1 × Interior Glow Pack — Pro'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Pro underglow + pro interior', note: 'Save $89 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-stealth',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Stealth Build Bundle',
    subtitle: 'Stealth meets style',
    description: 'Combine cutting-edge blackout technology with LED styling to create a truly unique vehicle build.',
    price: 399, compareAt: 456,
    image: 'assets/kit-dual.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'bundles.html',
    includes: ['1 × Blackout Plate — Dual', '1 × Sticker Pack 01'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Dual plates + sticker pack', note: 'Save $57 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-ultimate',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Ultimate Show Car Bundle',
    subtitle: 'Pro lighting + stickers — show-ready',
    description: 'The ultimate lighting package for enthusiasts who want maximum attention, premium effects, and sticker styling.',
    price: 449, compareAt: 697,
    image: 'assets/underglow-car.png',
    stripeLink: '',
    badge: 'Most popular',
    featured: true,
    page: 'bundles.html',
    includes: ['1 × Underglow Pro', '1 × Interior Glow Pack — Pro', '1 × Sticker Pack 01'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Pro underglow + pro interior + stickers', note: 'Save $248 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-night-shift',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Night Shift Bundle',
    subtitle: 'Full car — plates, underglow & cabin glow',
    description: 'Front and rear blackout plates, V1 underglow, and core interior glow. Everything a night build needs without going Pro.',
    price: 749, compareAt: 905,
    image: 'assets/bundle-plates-underglow-interior.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'bundles.html',
    includes: ['1 × Blackout Plate — Dual', '1 × Underglow Kit V1', '1 × Interior Glow Pack — Core'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Dual plates + V1 + core interior', note: 'Save $156 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-full-send',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'Full Send Bundle',
    subtitle: 'Dual plates + Pro underglow + Pro interior',
    description: 'The complete SPEED·ST transformation — blackout front and rear, Pro underglow, and full-cabin NEON-FLOW interior. One checkout, zero compromises.',
    price: 899, compareAt: 1095,
    image: 'assets/bundle-plates-underglow-interior.png',
    stripeLink: '',
    badge: 'Flagship',
    featured: true,
    page: 'bundles.html',
    includes: ['1 × Blackout Plate — Dual', '1 × Underglow Pro', '1 × Interior Glow Pack — Pro'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Dual plates + pro lighting', note: 'Save $196 vs separate', stripeLink: '' }
    ]
  },
  {
    id: 'bundle-god-mode',
    category: 'bundles', categoryLabel: 'Bundles',
    title: 'God Mode Bundle',
    subtitle: 'Everything. Plates, Pro lighting, stickers & banner.',
    description: 'Our biggest kit — dual plates, Pro underglow, Pro interior, sticker pack and windshield banner. For builds that want it all.',
    price: 949, compareAt: 1163,
    image: 'assets/bundle-plates-underglow-interior.png',
    stripeLink: '',
    badge: 'Max save',
    featured: true,
    page: 'bundles.html',
    includes: ['1 × Blackout Plate — Dual', '1 × Underglow Pro', '1 × Interior Glow Pack — Pro', '1 × Sticker Pack 01', '1 × Windshield Banner'],
    sizes: [
      { id: 'bundle', label: 'Complete bundle', dim: 'Full lineup + stickers', note: 'Save $214 vs separate', stripeLink: '' }
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'bundles', label: 'Bundles' },
  { id: 'plates', label: 'Blackout Plates' },
  { id: 'underglow', label: 'Underglow' },
  { id: 'interior', label: 'Interior Glow' },
  { id: 'stickers', label: 'Stickers' }
];

const FREE_SHIPPING_MIN = 250;

function getProduct(id) {
  return CATALOG.find(p => p.id === id);
}

function getStripeLink(product, sizeId) {
  if (!product) return '';
  const size = product.sizes.find(s => s.id === sizeId);
  if (size?.stripeLink) return size.stripeLink;
  return product.stripeLink || '';
}

function formatPrice(n) {
  return '$' + n.toFixed(0);
}

function discountPct(price, compareAt) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round((1 - price / compareAt) * 100);
}

/* Shared product card renderer used by shop + category pages */
function productCardHTML(p) {
  const disc = discountPct(p.price, p.compareAt);
  return `
    <a class="pcard" href="product.html?id=${p.id}">
      ${p.badge ? `<span class="pcard-flag">${p.badge}</span>` : ''}
      <div class="pcard-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
      <div class="pcard-body">
        <span class="pcard-kind">${p.categoryLabel}</span>
        <h3>${p.title}</h3>
        <p>${p.subtitle}</p>
        <div class="pcard-foot">
          <span class="pcard-price">${formatPrice(p.price)}
            ${p.compareAt ? `<s>${formatPrice(p.compareAt)}</s>` : ''}
          </span>
          ${disc ? `<span class="pcard-save">Save ${disc}%</span>` : ''}
        </div>
      </div>
    </a>`;
}

if (typeof window !== 'undefined') {
  window.CATALOG = CATALOG;
  window.CATEGORIES = CATEGORIES;
  window.getProduct = getProduct;
  window.getStripeLink = getStripeLink;
  window.formatPrice = formatPrice;
  window.discountPct = discountPct;
  window.productCardHTML = productCardHTML;
  window.FREE_SHIPPING_MIN = FREE_SHIPPING_MIN;
}
