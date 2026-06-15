/**
 * SPEED·ST cart — stored in sessionStorage, checkout via /api/create-checkout
 */
const CART_KEY = 'speedst-cart';

function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function cartCount() {
  return getCart().reduce((n, item) => n + (item.quantity || 1), 0);
}

function updateCartBadge() {
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = cartCount();
  });
}

function addToCart(productId, variantId, note) {
  const cart = getCart();
  const existing = cart.find(
    i => i.productId === productId && i.variantId === variantId && (i.note || '') === (note || '')
  );
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      productId,
      variantId,
      quantity: 1,
      note: note || ''
    });
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  return cart;
}

function updateCartQuantity(index, quantity) {
  const cart = getCart();
  if (!cart[index]) return cart;
  if (quantity < 1) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quantity;
  }
  saveCart(cart);
  return cart;
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => {
    const product = typeof getProduct === 'function' ? getProduct(item.productId) : null;
    if (!product) return sum;
    return sum + product.price * (item.quantity || 1);
  }, 0);
}

async function startCheckout() {
  const cart = getCart();
  if (!cart.length) throw new Error('Your cart is empty');

  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cart })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Checkout failed — try again');
  }
  if (!data.url) throw new Error('No checkout URL returned');
  window.location.href = data.url;
}

if (typeof window !== 'undefined') {
  window.getCart = getCart;
  window.saveCart = saveCart;
  window.cartCount = cartCount;
  window.updateCartBadge = updateCartBadge;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateCartQuantity = updateCartQuantity;
  window.clearCart = clearCart;
  window.cartSubtotal = cartSubtotal;
  window.startCheckout = startCheckout;
  document.addEventListener('DOMContentLoaded', updateCartBadge);
}
