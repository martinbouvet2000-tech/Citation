/* ─────────── LUMIÈRE Shopify theme — global JS ─────────── */

const formatMoney = (cents) => {
  return (cents / 100).toFixed(2).replace('.', ',') + ' €';
};

/* ─── Toast ─── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
window.showToast = showToast;

/* ─── Cart drawer ─── */
const drawer = document.getElementById('CartDrawer');
const overlay = document.getElementById('DrawerOverlay');

function openCart() {
  drawer?.classList.add('open');
  overlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  drawer?.classList.remove('open');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}
window.openCart = openCart;
window.closeCart = closeCart;

document.querySelectorAll('.cart-toggle').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); openCart(); }));
document.getElementById('CartClose')?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);

/* ─── Cart state via Shopify AJAX API ─── */
async function fetchCart() {
  const res = await fetch('/cart.js', { headers: { 'Accept': 'application/json' } });
  return res.json();
}

async function addToCart(variantId, quantity = 1) {
  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity }] })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.description || 'Erreur d\'ajout');
    }
    await refreshCart();
    openCart();
    return true;
  } catch (e) {
    showToast(e.message || 'Erreur d\'ajout au panier');
    return false;
  }
}
window.addToCart = addToCart;

async function changeCartItem(line, quantity) {
  const res = await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ line, quantity })
  });
  if (res.ok) await refreshCart();
}
window.changeCartItem = changeCartItem;

async function removeCartItem(line) {
  await changeCartItem(line, 0);
}
window.removeCartItem = removeCartItem;

async function refreshCart() {
  const cart = await fetchCart();
  renderCartDrawer(cart);
  updateCartCount(cart.item_count);
}
window.refreshCart = refreshCart;

function updateCartCount(count) {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
}

function renderCartDrawer(cart) {
  const itemsEl = document.getElementById('CartItems');
  const footerEl = document.getElementById('CartFooter');
  if (!itemsEl) return;

  if (cart.item_count === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <p>Votre panier est vide</p>
        <a href="/collections/all" class="btn btn-ghost" onclick="closeCart()">Découvrir la gamme</a>
      </div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  itemsEl.innerHTML = cart.items.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.product_title)}" loading="lazy">` : ''}
      </div>
      <div class="cart-item-info">
        <h4><a href="${item.url}">${escapeHtml(item.product_title)}</a></h4>
        <span style="font-size:0.78rem;color:var(--ink-3)">${item.variant_title && item.variant_title !== 'Default Title' ? escapeHtml(item.variant_title) : ''}</span>
        <div class="qty">
          <button onclick="changeCartItem(${idx + 1}, ${item.quantity - 1})" aria-label="Diminuer">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeCartItem(${idx + 1}, ${item.quantity + 1})" aria-label="Augmenter">+</button>
        </div>
      </div>
      <div>
        <div class="cart-item-price">${formatMoney(item.final_line_price)}</div>
        <button class="cart-item-remove" onclick="removeCartItem(${idx + 1})">Retirer</button>
      </div>
    </div>
  `).join('');

  const totalEl = document.getElementById('CartTotal');
  if (totalEl) totalEl.textContent = formatMoney(cart.total_price);
  if (footerEl) footerEl.style.display = 'block';
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;' }[s]));
}

/* ─── Add to cart form ─── */
document.addEventListener('submit', async (e) => {
  const form = e.target.closest('form[data-add-to-cart]');
  if (!form) return;
  e.preventDefault();
  const fd = new FormData(form);
  const variantId = fd.get('id');
  const quantity = parseInt(fd.get('quantity') || '1', 10);
  const btn = form.querySelector('[type="submit"]');
  if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Ajout en cours…'; }
  const ok = await addToCart(variantId, quantity);
  if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Ajouter au panier'; }
});

/* ─── Quick add (collection card +) ─── */
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-quick-add]');
  if (!btn) return;
  e.preventDefault();
  const variantId = btn.dataset.variantId;
  if (!variantId) return;
  btn.disabled = true;
  await addToCart(variantId, 1);
  btn.disabled = false;
});

/* ─── Quantity stepper ─── */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-qty-change]');
  if (!btn) return;
  const input = btn.parentElement.querySelector('input[type="number"]');
  if (!input) return;
  const delta = parseInt(btn.dataset.qtyChange, 10);
  const newVal = Math.max(1, parseInt(input.value || '1', 10) + delta);
  input.value = newVal;
  input.dispatchEvent(new Event('change', { bubbles: true }));
});

/* ─── FAQ accordion ─── */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question');
  q?.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ─── Mobile menu ─── */
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

/* ─── Product image gallery ─── */
document.querySelectorAll('.product-media-thumbs img').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const main = document.querySelector('.product-media-main img');
    if (!main) return;
    const newSrc = thumb.dataset.full || thumb.src;
    main.src = newSrc;
    document.querySelectorAll('.product-media-thumbs img').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

/* ─── Variant picker (product page) ─── */
document.querySelectorAll('[data-variant-picker]').forEach(picker => {
  picker.addEventListener('change', () => {
    const form = picker.closest('form');
    if (!form) return;
    const selects = form.querySelectorAll('select[data-option-index]');
    const selected = Array.from(selects).map(s => s.value);
    const variants = JSON.parse(form.dataset.variants || '[]');
    const match = variants.find(v => JSON.stringify(v.options) === JSON.stringify(selected));
    const idInput = form.querySelector('input[name="id"]');
    const priceEl = document.querySelector('[data-product-price]');
    const ctaBtn = form.querySelector('.product-cta');
    if (match) {
      if (idInput) idInput.value = match.id;
      if (priceEl) priceEl.textContent = formatMoney(match.price);
      if (ctaBtn) {
        ctaBtn.disabled = !match.available;
        ctaBtn.textContent = match.available ? 'Ajouter au panier' : 'Épuisé';
      }
    }
  });
});

/* ─── Init cart count on load ─── */
fetchCart().then(cart => updateCartCount(cart.item_count)).catch(() => {});
