/**
 * menuRenderer.js
 * ---------------------------------------------------------------------------
 * Turns a menu array (see data.js for the shape) into DOM: the sticky nav
 * pills and the menu sections themselves. Also wires each item's +/-
 * buttons to the Cart module and keeps their displayed quantity in sync
 * whenever the cart changes elsewhere (e.g. the "clear cart" button).
 *
 * Takes `menu` as a parameter rather than importing it directly, since the
 * menu may come from the live Google Sheet or from the local fallback —
 * this module doesn't need to know or care which.
 * ---------------------------------------------------------------------------
 */

import { ICONS } from './data.js';
import { Cart } from './cart.js';
import { formatToman } from './utils.js';

function iconMarkup(iconKey) {
  const path = ICONS[iconKey] || ICONS.default;
  return `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function renderPriceRow(item) {
  // Sold-out items with no price set (e.g. temporarily discontinued) skip the
  // price/leader entirely instead of showing an odd "۰ ت".
  if (item.soldOut && !item.price) {
    return `
      <span class="item-name">${item.name}</span>
      <span class="leader"></span>
      <span class="sold-out-badge">ناموجود</span>`;
  }
  if (item.soldOut) {
    return `
      <span class="item-name">${item.name}</span>
      <span class="leader"></span>
      <span class="item-price">${formatToman(item.price)}</span>
      <span class="sold-out-badge">ناموجود</span>`;
  }
  return `
    <span class="item-name">${item.name}</span>
    <span class="leader"></span>
    <span class="item-price">${formatToman(item.price)}</span>
    <div class="stepper">
      <button type="button" class="minus" aria-label="کم کردن">−</button>
      <span class="qty">0</span>
      <button type="button" class="plus" aria-label="اضافه کردن">+</button>
    </div>`;
}

function renderItem(item) {
  const classes = item.soldOut ? 'item is-sold-out' : 'item';
  return `
    <div class="${classes}" data-id="${item.id}">
      <div class="item-row">${renderPriceRow(item)}</div>
      ${item.desc ? `<span class="item-desc">${item.desc}</span>` : ''}
    </div>`;
}

function renderSection(category) {
  const items = category.items.map(renderItem).join('');
  // Accent color is keyed by icon, not category id — this way many categories
  // that share an icon (e.g. every coffee-based drink) automatically share a
  // color family too. See the accent-* rules in css/menu.css.
  return `
    <section class="section accent-${category.icon}" id="${category.id}">
      <div class="section-head">
        <div class="icon-ring">${iconMarkup(category.icon)}</div>
        <h2>${category.title}<span>${category.subtitle || ''}</span></h2>
      </div>
      ${items}
    </section>`;
}

function renderNav(navEl, menu) {
  navEl.innerHTML = menu
    .map((cat) => `<a class="nav-pill" data-target="${cat.id}">${cat.title}</a>`)
    .join('');
}

function renderSections(mainEl, menu) {
  mainEl.innerHTML = menu.map(renderSection).join('');
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

let syncListenerAttached = false;

/**
 * Builds the nav + menu DOM inside the given elements and wires up interactivity.
 * Safe to call more than once (e.g. once for the instant fallback render, then
 * again when the live Google Sheet data arrives) — each call fully rebuilds
 * the DOM and re-attaches per-row listeners, but the document-level
 * 'cart:change' listener is only ever attached once.
 */
export function renderMenu(navEl, mainEl, menu) {
  renderNav(navEl, menu);
  renderSections(mainEl, menu);
  attachStepperEvents();
  syncRowQuantities();

  if (!syncListenerAttached) {
    document.addEventListener('cart:change', syncRowQuantities);
    syncListenerAttached = true;
  }
}/**
 * menuRenderer.js
 * ---------------------------------------------------------------------------
 * Turns a menu array (see data.js for the shape) into DOM: the sticky nav
 * pills and the menu sections themselves. Also wires each item's +/-
 * buttons to the Cart module and keeps their displayed quantity in sync
 * whenever the cart changes elsewhere (e.g. the "clear cart" button).
 *
 * Takes `menu` as a parameter rather than importing it directly, since the
 * menu may come from the live Google Sheet or from the local fallback —
 * this module doesn't need to know or care which.
 * ---------------------------------------------------------------------------
 */

import { ICONS } from './data.js';
import { Cart } from './cart.js';
import { formatToman } from './utils.js';

function iconMarkup(iconKey) {
  const path = ICONS[iconKey] || ICONS.default;
  return `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function renderPriceRow(item) {
  // Sold-out items with no price set (e.g. temporarily discontinued) skip the
  // price/leader entirely instead of showing an odd "۰ ت".
  if (item.soldOut && !item.price) {
    return `
      <span class="item-name">${item.name}</span>
      <span class="leader"></span>
      <span class="sold-out-badge">ناموجود</span>`;
  }
  if (item.soldOut) {
    return `
      <span class="item-name">${item.name}</span>
      <span class="leader"></span>
      <span class="item-price">${formatToman(item.price)}</span>
      <span class="sold-out-badge">ناموجود</span>`;
  }
  return `
    <span class="item-name">${item.name}</span>
    <span class="leader"></span>
    <span class="item-price">${formatToman(item.price)}</span>
    <div class="stepper">
      <button type="button" class="minus" aria-label="کم کردن">−</button>
      <span class="qty">0</span>
      <button type="button" class="plus" aria-label="اضافه کردن">+</button>
    </div>`;
}

function renderItem(item) {
  const classes = item.soldOut ? 'item is-sold-out' : 'item';
  return `
    <div class="${classes}" data-id="${item.id}">
      <div class="item-row">${renderPriceRow(item)}</div>
      ${item.desc ? `<span class="item-desc">${item.desc}</span>` : ''}
    </div>`;
}

function renderSection(category) {
  const items = category.items.map(renderItem).join('');
  // Accent color is keyed by icon, not category id — this way many categories
  // that share an icon (e.g. every coffee-based drink) automatically share a
  // color family too. See the accent-* rules in css/menu.css.
  return `
    <section class="section accent-${category.icon}" id="${category.id}">
      <div class="section-head">
        <div class="icon-ring">${iconMarkup(category.icon)}</div>
        <h2>${category.title}<span>${category.subtitle || ''}</span></h2>
      </div>
      ${items}
    </section>`;
}

function renderNav(navEl, menu) {
  navEl.innerHTML = menu
    .map((cat) => `<a class="nav-pill" data-target="${cat.id}">${cat.title}</a>`)
    .join('');
}

function renderSections(mainEl, menu) {
  mainEl.innerHTML = menu.map(renderSection).join('');
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
export function renderMenu(navEl, mainEl, menu) {
  renderNav(navEl, menu);
  renderSections(mainEl, menu);
  attachStepperEvents();
  syncRowQuantities();

  // Keep row quantities in sync if the cart changes from elsewhere (e.g. "clear cart").
  document.addEventListener('cart:change', syncRowQuantities);
}
