/**
 * utils.js
 * ---------------------------------------------------------------------------
 * Small, dependency-free helpers shared across modules.
 * ---------------------------------------------------------------------------
 */

/** Format a Toman amount with Persian digits and thousands separators, e.g. 65000 -> "۶۵,۰۰۰ ت" */
export function formatToman(amount) {
  return `${amount.toLocaleString('fa-IR')} ت`;
}

/** Same as formatToman but spells out the full word "تومان" (used in the cart bar). */
export function formatTomanFull(amount) {
  return `${amount.toLocaleString('fa-IR')} تومان`;
}

/** Format a plain count with Persian digits, e.g. 3 -> "۳" */
export function formatCount(n) {
  return n.toLocaleString('fa-IR');
}
