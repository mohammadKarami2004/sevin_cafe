/**
 * main.js
 * ---------------------------------------------------------------------------
 * Entry point. Loaded from index.html as <script type="module">.
 *
 * Menu source of truth: tries the live Google Sheet first (js/sheetMenu.js +
 * js/config.js). If that fails for any reason — sheet not published yet,
 * no internet, wrong URL — it quietly falls back to DEFAULT_MENU (data.js)
 * so the site never shows a blank page.
 * ---------------------------------------------------------------------------
 */

import { DEFAULT_MENU } from './data.js';
import { loadMenuFromSheet } from './sheetMenu.js';
import { SHEET_CSV_URL } from './config.js';
import { renderMenu } from './menuRenderer.js';
import { initCartUI } from './cartUI.js';
import { initScrollSpy } from './scrollSpy.js';

async function loadMenu() {
  try {
    return await loadMenuFromSheet(SHEET_CSV_URL);
  } catch (err) {
    console.warn('[Sevin Menu] Falling back to the built-in menu —', err.message);
    return DEFAULT_MENU;
  }
}

async function init() {
  const navEl = document.getElementById('navScroll');
  const mainEl = document.getElementById('menuMain');

  mainEl.innerHTML = '<p class="loading-text">در حال بارگذاری منو...</p>';

  const menu = await loadMenu();

  renderMenu(navEl, mainEl, menu);
  initCartUI(menu);
  initScrollSpy();
}

document.addEventListener('DOMContentLoaded', init);
