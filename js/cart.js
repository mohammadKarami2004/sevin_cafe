/**
 * cart.js
 * ---------------------------------------------------------------------------
 * Holds the current order quantities in memory (no backend, no persistence —
 * this is a live calculator for the customer, not a real ordering system).
 *
 * The state itself is private to this module (a closure over `state`).
 * Other modules never touch it directly; they call the exported methods and
 * listen for the 'cart:change' event to know when to re-render. This keeps
 * menuRenderer.js and cartUI.js decoupled from each other — neither needs to
 * know the other exists.
 * ---------------------------------------------------------------------------
 */

const state = new Map(); // itemId -> quantity

function notify() {
  document.dispatchEvent(new CustomEvent('cart:change'));
}

function add(itemId) {
  state.set(itemId, (state.get(itemId) || 0) + 1);
  notify();
}

function remove(itemId) {
  const next = (state.get(itemId) || 0) - 1;
  if (next <= 0) {
    state.delete(itemId);
  } else {
    state.set(itemId, next);
  }
  notify();
}

function getQty(itemId) {
  return state.get(itemId) || 0;
}

function clear() {
  state.clear();
  notify();
}

/** Returns a plain array of [itemId, quantity] pairs, safe to iterate without exposing the Map. */
function entries() {
  return Array.from(state.entries());
}

export const Cart = { add, remove, getQty, clear, entries };
