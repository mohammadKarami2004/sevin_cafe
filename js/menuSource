/**
 * menuSource.js
 * ---------------------------------------------------------------------------
 * Replaces sheetMenu.js. Loads the menu from data/menu.json — a file inside
 * this same repository, served by GitHub Pages alongside the rest of the
 * site. No external service (Google Sheets, Apps Script, etc.) is involved.
 *
 * The admin panel (see /admin) edits data/menu.json directly via the GitHub
 * API and commits the change; GitHub Pages then rebuilds automatically
 * (usually within a minute), and this fetch picks up the new content.
 * ---------------------------------------------------------------------------
 */

/**
 * Guarantees every item id is unique, no matter what's actually in the JSON
 * file. This is a safety net — the admin panel already de-duplicates ids
 * before committing — but keeping the check here too means a hand-edited
 * or manually-committed menu.json can never reintroduce the "multiple items
 * share one cart entry" bug (see the hookah-flavor incident).
 */
function ensureUniqueIds(menu) {
  const seen = new Map();
  menu.forEach((category) => {
    category.items.forEach((item) => {
      const base = item.id && String(item.id).trim() ? String(item.id).trim() : `${category.id}-item`;
      const count = (seen.get(base) || 0) + 1;
      seen.set(base, count);
      item.id = count === 1 ? base : `${base}-${count}`;
    });
  });
}

/**
 * Fetches and validates the menu from the local JSON file.
 * Throws on network failure or an empty/malformed result — callers should
 * catch this and fall back to DEFAULT_MENU (see data.js + main.js).
 */
export async function loadMenuFromJson(jsonUrl) {
  // cache: 'no-store' so a customer who had the page open before an update
  // still sees the new menu on their next visit / reload, not a stale cache.
  const response = await fetch(jsonUrl, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Menu fetch failed with status ${response.status}`);
  }

  const menu = await response.json();

  if (!Array.isArray(menu) || menu.length === 0) {
    throw new Error('Parsed menu.json is empty or has an unexpected shape.');
  }

  ensureUniqueIds(menu);
  return menu;
}
