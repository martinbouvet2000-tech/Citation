/* ─────────── AURÉLIA — Wishlist (localStorage, no account) ─────────── */
(function () {
  var STORAGE_KEY = 'aurelia_wishlist';

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function write(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
    updateCount();
    paintButtons();
    try { window.dispatchEvent(new CustomEvent('aurelia:wishlist:change', { detail: { list: list } })); } catch (e) {}
  }

  function has(id) {
    id = String(id);
    return read().some(function (i) { return String(i.id) === id; });
  }

  function add(item) {
    var list = read();
    if (has(item.id)) return list;
    list.push({
      id: item.id,
      handle: item.handle || '',
      title: item.title || '',
      price: Number(item.price) || 0,
      image: item.image || '',
      ts: Date.now()
    });
    write(list);
    return list;
  }

  function remove(id) {
    id = String(id);
    var list = read().filter(function (i) { return String(i.id) !== id; });
    write(list);
    return list;
  }

  function toggle(item) {
    if (has(item.id)) {
      remove(item.id);
      return false;
    }
    add(item);
    return true;
  }

  function updateCount() {
    var count = read().length;
    document.querySelectorAll('.wishlist-count').forEach(function (el) {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
  }

  function paintButtons() {
    document.querySelectorAll('[data-wishlist-toggle]').forEach(function (btn) {
      var id = btn.getAttribute('data-product-id');
      var active = has(id);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      var label = btn.querySelector('[data-wishlist-label]');
      if (label) label.textContent = active ? 'Retiré de mes favoris' : 'Ajouter à mes favoris';
      if (active) {
        btn.setAttribute('aria-label', 'Retirer de mes favoris');
      } else {
        btn.setAttribute('aria-label', 'Ajouter à mes favoris');
      }
    });
  }

  function formatMoney(cents) {
    return (cents / 100).toFixed(2).replace('.', ',') + ' €';
  }

  function onToggleClick(e) {
    var btn = e.target.closest('[data-wishlist-toggle]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var item = {
      id: btn.getAttribute('data-product-id'),
      handle: btn.getAttribute('data-product-handle'),
      title: btn.getAttribute('data-product-title'),
      price: parseInt(btn.getAttribute('data-product-price') || '0', 10),
      image: btn.getAttribute('data-product-image')
    };
    var added = toggle(item);
    btn.classList.remove('pop');
    // force reflow then trigger animation
    void btn.offsetWidth;
    btn.classList.add('pop');
    if (typeof window.showToast === 'function') {
      window.showToast(added ? 'Ajouté à vos favoris' : 'Retiré de vos favoris');
    }
    // If a previous wishlist label changed text, re-paint after a brief delay
    setTimeout(function () {
      var lbl = btn.querySelector('[data-wishlist-label]');
      if (lbl) lbl.textContent = added ? 'Retiré de mes favoris' : 'Ajouter à mes favoris';
    }, 0);
  }

  function renderFavoritesPage() {
    var listEl = document.getElementById('WishlistList');
    var emptyEl = document.getElementById('WishlistEmpty');
    if (!listEl || !emptyEl) return;

    var items = read();
    if (items.length === 0) {
      listEl.innerHTML = '';
      listEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    listEl.hidden = false;

    listEl.innerHTML = items.map(function (item) {
      var img = item.image
        ? '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy">'
        : '';
      var href = item.handle ? '/products/' + encodeURIComponent(item.handle) : '#';
      return [
        '<article class="wishlist-row" data-wishlist-row data-product-id="', escapeHtml(item.id), '">',
        '  <a class="wishlist-row-img" href="', href, '">', img, '</a>',
        '  <div class="wishlist-row-info">',
        '    <h3><a href="', href, '">', escapeHtml(item.title), '</a></h3>',
        '    <div class="wishlist-row-price">', formatMoney(item.price), '</div>',
        '  </div>',
        '  <div class="wishlist-row-actions">',
        '    <button type="button" class="btn btn-primary" data-wishlist-add-to-cart data-product-id="', escapeHtml(item.id), '">Ajouter au panier</button>',
        '    <button type="button" class="wishlist-row-remove" data-wishlist-remove data-product-id="', escapeHtml(item.id), '">Retirer</button>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c];
    });
  }

  async function addToCartFromWishlist(productId) {
    // Wishlist stores product.id not variant.id — fetch product to get first available variant
    var row = document.querySelector('[data-wishlist-row][data-product-id="' + productId + '"]');
    var handle = '';
    var items = read();
    var item = items.find(function (i) { return String(i.id) === String(productId); });
    if (item) handle = item.handle;
    if (!handle) {
      if (typeof window.showToast === 'function') window.showToast('Produit introuvable');
      return;
    }
    try {
      var res = await fetch('/products/' + encodeURIComponent(handle) + '.js', { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error('Produit introuvable');
      var product = await res.json();
      var variant = (product.variants || []).find(function (v) { return v.available; }) || product.variants[0];
      if (!variant) throw new Error('Aucune variante disponible');
      if (typeof window.addToCart === 'function') {
        await window.addToCart(variant.id, 1);
      }
    } catch (e) {
      if (typeof window.showToast === 'function') window.showToast(e.message || 'Erreur');
    }
  }

  document.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-wishlist-remove]');
    if (rm) {
      e.preventDefault();
      remove(rm.getAttribute('data-product-id'));
      renderFavoritesPage();
      if (typeof window.showToast === 'function') window.showToast('Retiré de vos favoris');
      return;
    }
    var atc = e.target.closest('[data-wishlist-add-to-cart]');
    if (atc) {
      e.preventDefault();
      atc.disabled = true;
      addToCartFromWishlist(atc.getAttribute('data-product-id')).finally(function () { atc.disabled = false; });
      return;
    }
  });

  document.addEventListener('click', onToggleClick);

  // Cross-tab sync
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY) {
      updateCount();
      paintButtons();
      renderFavoritesPage();
    }
  });

  // Init
  function init() {
    updateCount();
    paintButtons();
    renderFavoritesPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose minimal API
  window.AureliaWishlist = { read: read, add: add, remove: remove, toggle: toggle, has: has };
})();
