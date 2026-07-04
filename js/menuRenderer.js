/**
 * menuRenderer.js
 * ---------------------------------------------------------------------------
 * Turns MENU (data.js) into DOM: the sticky nav pills and the menu sections
 * themselves. Also wires each item's +/- buttons to the Cart module and
 * keeps their displayed quantity in sync whenever the cart changes
 * elsewhere (e.g. the "clear cart" button in the drawer).
 * ---------------------------------------------------------------------------
 */

import { MENU, ICONS } from './data.js';
import { Cart } from './cart.js';
import { formatToman } from './utils.js';

function iconMarkup(iconKey) {
  const path = ICONS[iconKey] || ICONS.default;
  return `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function renderItem(item) {
  if (item.soldOut) {
    return `
      <div class="item is-sold-out" data-id="${item.id}">
        <div class="item-row">
          <span class="item-name">${item.name}</span>
          <span class="leader"></span>
          <span class="item-price">${formatToman(item.price)}</span>
          <span class="sold-out-badge">ناموجود</span>
        </div>
        ${item.desc ? `<span class="item-desc">${item.desc}</span>` : ''}
      </div>`;
  }

  return `
    <div class="item" data-id="${item.id}">
      <div class="item-row">
        <span class="item-name">${item.name}</span>
        <span class="leader"></span>
        <span class="item-price">${formatToman(item.price)}</span>
        <div class="stepper">
          <button type="button" class="minus" aria-label="کم کردن">−</button>
          <span class="qty">0</span>
          <button type="button" class="plus" aria-label="اضافه کردن">+</button>
        </div>
      </div>
      ${item.desc ? `<span class="item-desc">${item.desc}</span>` : ''}
    </div>`;
}

function renderSection(category) {
  const items = category.items.map(renderItem).join('');
  return `
    <section class="section accent-${category.id}" id="${category.id}">
      <div class="section-head">
        <div class="icon-ring">${iconMarkup(category.icon)}</div>
        <h2>${category.title}<span>${category.subtitle || ''}</span></h2>
      </div>
      ${items}
    </section>`;
}

function renderNav(navEl) {
  navEl.innerHTML = MENU.map(
    (cat) => `<a class="nav-pill" data-target="${cat.id}">${cat.title}</a>`
  ).join('');
}

function renderSections(mainEl) {
  mainEl.innerHTML = MENU.map(renderSection).join('');
}

/** Reads Cart state and updates every rendered item row's qty label + minus-button state. */
function syncRowQuantities() {
  document.querySelectorAll('.item:not(.is-sold-out)').forEach((row) => {
    const id = row.dataset.id;
    const qty = Cart.getQty(id);
    row.querySelector('.qty').textContent = qty.toLocaleString('fa-IR');
    row.querySelector('.minus').disabled = qty <= 0;
  });
}

function attachStepperEvents() {
  document.querySelectorAll('.item:not(.is-sold-out)').forEach((row) => {
    const id = row.dataset.id;
    row.querySelector('.plus').addEventListener('click', () => Cart.add(id));
    row.querySelector('.minus').addEventListener('click', () => Cart.remove(id));
  });
}

/**
 * Builds the nav + menu DOM inside the given elements and wires up interactivity.
 * Must run before initScrollSpy() and initCartUI(), since both depend on this markup existing.
 */
export function renderMenu(navEl, mainEl) {
  renderNav(navEl);
  renderSections(mainEl);
  attachStepperEvents();
  syncRowQuantities();

  // Keep row quantities in sync if the cart changes from elsewhere (e.g. "clear cart").
  document.addEventListener('cart:change', syncRowQuantities);
}
