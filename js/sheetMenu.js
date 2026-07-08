/**
 * sheetMenu.js
 * ---------------------------------------------------------------------------
 * Fetches the cafe's menu from a published Google Sheet (CSV export) and
 * converts it into the same { id, title, subtitle, icon, items[] } shape
 * that the rest of the app expects (see data.js for the shape reference).
 *
 * Expected CSV columns (see menu-template.csv for a ready-to-import example):
 *   category_id | category_title | category_subtitle | category_icon |
 *   item_id | item_name | item_desc | price | sold_out
 *
 * Every row is one menu item; category_* columns repeat on each row that
 * belongs to that category (a flat table, not two linked sheets) — this is
 * the easiest shape for a non-technical person to edit in Google Sheets.
 * ---------------------------------------------------------------------------
 */

const KNOWN_SOLD_OUT_VALUES = new Set(['ناموجود', 'true', '1', 'بله', 'yes']);

/** Minimal RFC4180-ish CSV parser: handles quoted fields, escaped quotes, and commas inside quotes. */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i++; }
      else if (char === '"') { inQuotes = false; }
      else { field += char; }
      continue;
    }

    if (char === '"') { inQuotes = true; }
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\r') { /* ignore, \n handles the line break */ }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else { field += char; }
  }

  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

function parsePrice(raw) {
  const digitsOnly = String(raw || '').replace(/[^\d]/g, '');
  return digitsOnly ? parseInt(digitsOnly, 10) : 0;
}

function parseSoldOut(raw) {
  return KNOWN_SOLD_OUT_VALUES.has(String(raw || '').trim().toLowerCase());
}

/**
 * Guarantees every item id handed to the app is unique, no matter what's
 * actually typed in the sheet.
 *
 * Why this exists: the app tracks cart quantities in a Map keyed by item_id
 * (see cart.js). If the cafe owner accidentally reuses the same item_id for
 * two different items — e.g. copy-pasting a row and forgetting to change the
 * id column — those items silently share one cart entry: tapping "+" on one
 * of them bumps the quantity shown on all of them. This has already happened
 * once (six hookah flavors were all given the same item_id).
 *
 * Rather than relying on the cafe owner to always remember to set unique
 * ids (which will happen again), we de-duplicate here: the first row with a
 * given raw id keeps it as-is; every later row that reuses that same id gets
 * an auto-incrementing suffix (-2, -3, ...) appended. This runs on every
 * sheet load, so it's self-healing even if the sheet is edited badly again.
 */
function makeIdDeduper() {
  const seenCounts = new Map();
  return function dedupe(rawId) {
    const count = (seenCounts.get(rawId) || 0) + 1;
    seenCounts.set(rawId, count);
    return count === 1 ? rawId : `${rawId}-${count}`;
  };
}

/** Turns parsed CSV rows (with a header row) into the MENU array shape. */
function rowsToMenu(rows) {
  const [headerRow, ...dataRows] = rows;
  const header = headerRow.map((h) => h.trim().toLowerCase());
  const col = (name) => header.indexOf(name);

  const idx = {
    categoryId: col('category_id'),
    categoryTitle: col('category_title'),
    categorySubtitle: col('category_subtitle'),
    categoryIcon: col('category_icon'),
    itemId: col('item_id'),
    itemName: col('item_name'),
    itemDesc: col('item_desc'),
    price: col('price'),
    soldOut: col('sold_out')
  };

  const categoriesById = new Map();
  const categoryOrder = [];
  const dedupeId = makeIdDeduper();

  dataRows.forEach((row, rowIndex) => {
    const categoryId = (row[idx.categoryId] || '').trim();
    const itemName = (row[idx.itemName] || '').trim();
    if (!categoryId || !itemName) return; // skip incomplete rows silently

    if (!categoriesById.has(categoryId)) {
      categoriesById.set(categoryId, {
        id: categoryId,
        title: (row[idx.categoryTitle] || categoryId).trim(),
        subtitle: (row[idx.categorySubtitle] || '').trim(),
        icon: (row[idx.categoryIcon] || 'default').trim() || 'default',
        items: []
      });
      categoryOrder.push(categoryId);
    }

    const rawItemId = (row[idx.itemId] || '').trim() || `${categoryId}-row-${rowIndex}`;
    const itemId = dedupeId(rawItemId); // guarantees uniqueness even if the sheet has duplicates

    categoriesById.get(categoryId).items.push({
      id: itemId,
      name: itemName,
      desc: (row[idx.itemDesc] || '').trim(),
      price: parsePrice(row[idx.price]),
      soldOut: parseSoldOut(row[idx.soldOut])
    });
  });

  return categoryOrder.map((id) => categoriesById.get(id));
}

/**
 * Fetches and parses the menu from a published Google Sheet CSV URL.
 * Throws on network failure or an empty/malformed result — callers should
 * catch this and fall back to DEFAULT_MENU (see data.js + main.js).
 */
export async function loadMenuFromSheet(csvUrl) {
  if (!csvUrl || csvUrl.includes('PASTE_YOUR_PUBLISHED_CSV_LINK_HERE')) {
    throw new Error('SHEET_CSV_URL is not configured yet (see js/config.js).');
  }

  const response = await fetch(csvUrl, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sheet fetch failed with status ${response.status}`);
  }

  const text = await response.text();
  const rows = parseCSV(text);
  const menu = rowsToMenu(rows);

  if (menu.length === 0) {
    throw new Error('Parsed sheet produced an empty menu.');
  }

  return menu;
}
