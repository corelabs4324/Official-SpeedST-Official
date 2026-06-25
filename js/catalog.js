// Stripe Payment Links live in sizes[].stripeLink (one per variant).
// product.stripeLink is an optional fallback when a product has no size variants.
// See STRIPE-LINKS-MAP.txt for the full product → link mapping.

/**
 * SPEED·ST product catalog — blackout plates, underglow, interior glow, banner
 */
const CATALOG = [
  /* ---- BLACKOUT PLATES ---- */
  {
    id: 'plates-blackout',
    category: 'plates', categoryLabel: 'Blackout Plates',
    title: 'Blackout Plate™',
    subtitle: 'Remote-controlled blackout overlay — single or dual pack, standard or slimline fit',
    price: 249.99,
    image: 'assets/kit-dual.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'blackout-plates.html',
    packs: [
      {
        id: 'single', label: 'Single pack',
        price: 249.99,
        sizes: [
          { id: 'std', label: 'Standard', dim: '372 × 134 mm', note: 'Most AU rear plates', stripeLink: 'https://buy.stripe.com/fZu14p0KO8WEdYu7zC9bO0k' },
          { id: 'slim', label: 'Slimline', dim: '372 × 100 mm', note: 'Compact front plates', stripeLink: 'https://buy.stripe.com/3cIdRb0KO0q83jQ9HK9bO0l' }
        ]
      },
      {
        id: 'dual', label: 'Dual pack',
        price: 399,
        sizes: [
          { id: 'std-pair', label: 'Standard pair', dim: '2 × 372 × 134 mm', note: 'Both standard', stripeLink: 'https://buy.stripe.com/9B600l2SW2yg2fMcTW9bO0m' },
          { id: 'slim-pair', label: 'Slimline pair', dim: '2 × 372 × 100 mm', note: 'Both slimline', stripeLink: 'https://buy.stripe.com/cNi3cxalo0q8cUqaLO9bO0n' },
          { id: 'mixed', label: 'Mixed pair', dim: '1 × Standard + 1 × Slimline', note: 'Front/rear mix', mixedNote: true, stripeLink: 'https://buy.stripe.com/9B64gB3X03Ck2fMaLO9bO0o' }
        ]
      }
    ]
  },

  /* ---- UNDERGLOW ---- */
  {
    id: 'underglow-v1',
    category: 'underglow', categoryLabel: 'Underglow',
    title: 'Underglow Kit',
    subtitle: '4-piece RGB aluminium bars, RF remote, IP68',
    price: 349, compareAt: 449,
    image: 'assets/underglow-kit.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'underglow.html',
    sizes: [
      { id: 'sedan', label: 'Sedan / Hatch', dim: '2 × 120 cm + 2 × 90 cm', note: 'Most sedans & hatches', stripeLink: 'https://buy.stripe.com/14A8wR3X05Ks6w2g689bO0p' },
      { id: 'suv', label: 'SUV / Ute', dim: '2 × 150 cm + 2 × 120 cm', note: 'Long wheelbase', stripeLink: 'https://buy.stripe.com/aFaeVf0KO8WE4nUbPS9bO0q' }
    ]
  },

  /* ---- INTERIOR GLOW ---- */
  {
    id: 'interior-core',
    category: 'interior', categoryLabel: 'Interior Glow',
    title: 'Interior Glow Pack',
    subtitle: '2 footwell bars + 2 ambient strips, USB-C powered',
    price: 99,
    image: 'assets/interior-glow-kit.png',
    stripeLink: '',
    badge: null,
    featured: true,
    page: 'interior-glow.html',
    sizes: [
      { id: 'core', label: '4-piece kit', dim: '2 × footwell + 2 × dash strips', note: 'Front cabin', stripeLink: 'https://buy.stripe.com/eVq8wR5148WE6w22fi9bO0r' }
    ]
  },

  /* ---- WINDSHIELD BANNER ---- */
  {
    id: 'speedst-banner',
    category: 'banner', categoryLabel: 'Banner',
    title: 'SPEED·ST Windshield Banner',
    subtitle: 'Cut-to-size vinyl banner — preset or custom dimensions',
    price: 49,
    image: 'assets/banner.png',
    stripeLink: '',
    badge: null,
    featured: false,
    page: 'product.html',
    sizes: [
      { id: 'std', label: 'Standard windshield', dim: '950 × 130 mm', note: 'Most sedans & hatches', stripeLink: '' },
      { id: 'wide', label: 'Wide', dim: '1200 × 150 mm', note: 'Wider windscreens', stripeLink: '' },
      { id: 'custom', label: 'Custom size', dim: 'Enter your dimensions', note: 'Cut to your specs', customNote: true, stripeLink: '' }
    ]
  }
];

const PRODUCT_ALIASES = {
  'plates-single': 'plates-blackout',
  'plates-dual': 'plates-blackout',
  'underglow-pro': 'underglow-v1',
  'interior-pro': 'interior-core',
  'windshield-banner': 'speedst-banner'
};

const CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'plates', label: 'Blackout Plates' },
  { id: 'underglow', label: 'Underglow' },
  { id: 'interior', label: 'Interior Glow' },
  { id: 'banner', label: 'Banner' }
];

const FREE_SHIPPING_MIN = 250;

function getProduct(id) {
  const resolved = PRODUCT_ALIASES[id] || id;
  return CATALOG.find(p => p.id === resolved);
}

function getActivePack(product, packId) {
  if (!product?.packs?.length) return null;
  return product.packs.find(p => p.id === packId) || product.packs[0];
}

function parseVariantId(product, variantId) {
  if (!product?.packs?.length) {
    const size = product.sizes.find(s => s.id === variantId);
    return size ? { pack: null, size, variantId } : null;
  }
  const pack = product.packs.find(p => variantId.startsWith(p.id + '-'));
  if (!pack) return null;
  const sizeId = variantId.slice(pack.id.length + 1);
  const size = pack.sizes.find(s => s.id === sizeId);
  return size ? { pack, size, variantId } : null;
}

function getVariantPrice(product, variantId) {
  const parsed = parseVariantId(product, variantId);
  if (parsed?.pack) return parsed.pack.price;
  return product?.price || 0;
}

function getVariantCompareAt(product, variantId) {
  const parsed = parseVariantId(product, variantId);
  if (parsed?.pack) return parsed.pack.compareAt;
  return product?.compareAt;
}

function getVariantLabel(product, variantId) {
  const parsed = parseVariantId(product, variantId);
  if (!parsed) return variantId;
  if (parsed.pack) return `${parsed.pack.label} · ${parsed.size.label}`;
  return parsed.size.label;
}

function buildVariantId(product, packId, sizeId) {
  if (product.packs?.length) return `${packId}-${sizeId}`;
  return sizeId;
}

function getStripeLink(product, variantId) {
  if (!product) return '';
  const parsed = parseVariantId(product, variantId);
  if (parsed?.size?.stripeLink) return parsed.size.stripeLink;
  return product.stripeLink || '';
}

function formatPrice(n) {
  if (n == null || Number.isNaN(n)) return '$0';
  const rounded = Math.round(n * 100) / 100;
  if (Math.abs(rounded - Math.round(rounded)) < 0.001) {
    return '$' + Math.round(rounded);
  }
  return '$' + rounded.toFixed(2);
}

function discountPct(price, compareAt) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round((1 - price / compareAt) * 100);
}

function getProductsByLine(category) {
  return CATALOG.filter(p => p.category === category);
}

/* Shared product card renderer used by shop + category pages */
function productCardHTML(p) {
  const fromPrice = p.packs ? Math.min(...p.packs.map(pk => pk.price)) : p.price;
  const fromCompare = p.packs
    ? p.packs.find(pk => pk.price === fromPrice)?.compareAt
    : p.compareAt;
  const disc = discountPct(fromPrice, fromCompare);
  const priceLabel = p.packs ? `From ${formatPrice(fromPrice)}` : formatPrice(p.price);
  const compareLabel = fromCompare ? formatPrice(fromCompare) : '';
  return `
    <a class="pcard" href="product.html?id=${p.id}">
      ${p.badge ? `<span class="pcard-flag">${p.badge}</span>` : ''}
      <div class="pcard-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
      <div class="pcard-body">
        <span class="pcard-kind">${p.categoryLabel}</span>
        <h3>${p.title}</h3>
        <p>${p.subtitle}</p>
        <div class="pcard-foot">
          <span class="pcard-price">${priceLabel}
            ${compareLabel ? `<s>${compareLabel}</s>` : ''}
          </span>
          ${disc ? `<span class="pcard-save">Save ${disc}%</span>` : ''}
        </div>
      </div>
    </a>`;
}

if (typeof window !== 'undefined') {
  window.CATALOG = CATALOG;
  window.CATEGORIES = CATEGORIES;
  window.PRODUCT_ALIASES = PRODUCT_ALIASES;
  window.getProduct = getProduct;
  window.getActivePack = getActivePack;
  window.parseVariantId = parseVariantId;
  window.getVariantPrice = getVariantPrice;
  window.getVariantCompareAt = getVariantCompareAt;
  window.getVariantLabel = getVariantLabel;
  window.buildVariantId = buildVariantId;
  window.getStripeLink = getStripeLink;
  window.formatPrice = formatPrice;
  window.discountPct = discountPct;
  window.getProductsByLine = getProductsByLine;
  window.productCardHTML = productCardHTML;
  window.FREE_SHIPPING_MIN = FREE_SHIPPING_MIN;
}
