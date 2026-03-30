const WHATSAPP_NUMBER = '27813421958';
const ORDER_EMAIL = 'sirdaniel@example.com';

function readCartFromStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

let cart = readCartFromStorage();
window.cart = Array.isArray(window.cart) ? window.cart : cart;

function syncCart() {
  if (Array.isArray(window.cart)) {
    cart = window.cart;
  } else {
    cart = readCartFromStorage();
    window.cart = cart;
  }

  return cart;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.cart = cart;
}

function formatMoney(value) {
  return `R ${Number(value || 0).toLocaleString('en-ZA')}`;
}

function cartTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.price || 0), 0);
}

function buildOrderMessage(items = syncCart()) {
  const lines = ['Hello Sir Daniel, I would like a quote for the following selected items:'];

  items.forEach((item, index) => {
    const detail = item.service ? ` (${item.service})` : '';
    lines.push(`${index + 1}. ${item.name}${detail}`);
  });

  lines.push('Please share the quotation and next available installation date.');
  return lines.join('\n');
}

function updateCartUI() {
  const items = syncCart();
  const count = document.getElementById('cart-count');
  const total = document.getElementById('cart-total');

  if (count) {
    count.textContent = String(items.length);
  }

  if (total) {
    total.textContent = formatMoney(cartTotal(items));
  }
}

function addToCart(name, price, service = 'Premium installation') {
  syncCart();

  const alreadySelected = cart.some(item => item.name === name);
  if (alreadySelected) {
    updateCartUI();
    return false;
  }

  cart.push({ name, price: Number(price) || 0, service });
  saveCart();
  updateCartUI();
  return true;
}

function removeItem(index) {
  syncCart();
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

function clearCart() {
  cart = [];
  window.cart = cart;
  saveCart();
  displayCart();
}

function sendWhatsApp() {
  syncCart();
  if (!cart.length || typeof window.open !== 'function') {
    return;
  }

  const encodedMessage = encodeURIComponent(buildOrderMessage(cart));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

function displayCart() {
  syncCart();
  const container = document.getElementById('cart-items');

  if (!container) {
    updateCartUI();
    return;
  }

  container.innerHTML = '';

  if (!cart.length) {
    container.innerHTML = '<div class="empty-state">Your quote cart is empty. Add your favourite packages from the products page to get started.</div>';
    updateCartUI();
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';

    const itemCopy = document.createElement('div');
    itemCopy.className = 'item-copy';
    itemCopy.innerHTML = `
      <h4>${item.name}</h4>
      <p>${item.service || 'Premium installation'}</p>
    `;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-btn';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(index));

    row.appendChild(itemCopy);
    row.appendChild(removeButton);
    container.appendChild(row);
  });

  const message = buildOrderMessage(cart);
  const encodedMessage = encodeURIComponent(message);
  const encodedEmailBody = encodeURIComponent(`${message}\n\nName:\nPhone:\nPreferred installation date:`);

  const summary = document.createElement('div');
  summary.className = 'cart-summary';
  summary.innerHTML = `
    <strong>${cart.length} item(s) selected for quote</strong>
    <p>Once you're happy with your shortlist, send it directly for confirmation.</p>
  `;

  const actions = document.createElement('div');
  actions.className = 'cart-actions';
  actions.innerHTML = `
    <a class="action-link whatsapp" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}" target="_blank" rel="noopener noreferrer">Send via WhatsApp</a>
    <a class="action-link email" href="mailto:${ORDER_EMAIL}?subject=${encodeURIComponent('New Quote Request')}&body=${encodedEmailBody}">Send via Email</a>
  `;

  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.className = 'remove-btn';
  clearButton.textContent = 'Clear cart';
  clearButton.addEventListener('click', clearCart);

  actions.appendChild(clearButton);
  container.appendChild(summary);
  container.appendChild(actions);
  updateCartUI();
}

window.addToCart = addToCart;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.sendWhatsApp = sendWhatsApp;
window.displayCart = displayCart;

updateCartUI();
displayCart();