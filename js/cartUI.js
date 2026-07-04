/**
 * cartUI.js
 * ---------------------------------------------------------------------------
 * Renders the floating "cart bar" (total count + total price) and its
 * expandable drawer (line-by-line breakdown). Purely a *view* over the Cart
 * module's state — it never mutates state directly except via Cart.clear().
 * ---------------------------------------------------------------------------
 */

import { MENU } from './data.js';
import { Cart } from './cart.js';
import { formatToman, formatTomanFull, formatCount } from './utils.js';

/** id -> { name, price } lookup, built once from MENU so we don't re-scan it on every render. */
const itemLookup = new Map(
  MENU.flatMap((category) => category.items).map((item) => [item.id, item])
);

function render(elements) {
  const { bar, drawer, countEl, totalEl, rowsEl } = elements;

  let totalCount = 0;
  let totalPrice = 0;
  const rows = [];

  for (const [id, qty] of Cart.entries()) {
    const item = itemLookup.get(id);
    if (!item) continue; // defensive: ignore stale ids if menu data changed
    totalCount += qty;
    totalPrice += qty * item.price;
    rows.push({ name: item.name, qty, subtotal: qty * item.price });
  }

  if (totalCount === 0) {
    bar.classList.remove('show', 'expanded');
    drawer.classList.remove('open');
    return;
  }

  bar.classList.add('show');
  countEl.textContent = `${formatCount(totalCount)} آیتم`;
  totalEl.textContent = formatTomanFull(totalPrice);

  rowsEl.innerHTML = rows
    .map(
      (row) => `
        <div class="cart-row">
          <span class="cart-row-name">${formatCount(row.qty)} × ${row.name}</span>
          <span class="cart-row-sub">${formatToman(row.subtotal)}</span>
        </div>`
    )
    .join('');
}

/** Wires up the cart bar/drawer DOM and starts listening for cart changes. */
export function initCartUI() {
  const elements = {
    bar: document.getElementById('cartBar'),
    drawer: document.getElementById('cartDrawer'),
    countEl: document.getElementById('cartCount'),
    totalEl: document.getElementById('cartTotal'),
    rowsEl: document.getElementById('cartRows'),
    clearBtn: document.getElementById('cartClear')
  };

  elements.bar.addEventListener('click', () => {
    elements.bar.classList.toggle('expanded');
    elements.drawer.classList.toggle('open');
  });

  elements.clearBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // don't let the click bubble up and re-toggle the drawer
    Cart.clear();
  });

  document.addEventListener('cart:change', () => render(elements));
}
