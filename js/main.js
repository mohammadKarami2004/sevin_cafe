/**
 * main.js
 * ---------------------------------------------------------------------------
 * Entry point. Loaded from index.html as <script type="module">.
 *
 * Rendering strategy — "instant fallback, silent upgrade":
 *   1. Render DEFAULT_MENU (data.js) immediately. The page never waits on
 *      a network request to show something, so it feels exactly as fast as
 *      the old hardcoded-menu version.
 *   2. In the background, fetch the live Google Sheet. If it arrives (almost
 *      always under a second), quietly swap the DOM to the live data —
 *      the customer usually never notices this happen.
 *   3. If the sheet fetch fails for any reason, we simply keep showing
 *      DEFAULT_MENU. No error state, no blank page.
 * ---------------------------------------------------------------------------
 */

import { DEFAULT_MENU } from './data.js';
import { loadMenuFromSheet } from './sheetMenu.js';
import { SHEET_CSV_URL } from './config.js';
import { renderMenu } from './menuRenderer.js';
import { initCartUI } from './cartUI.js';
import { initScrollSpy } from './scrollSpy.js';

async function init() {
  const navEl = document.getElementById('navScroll');
  const mainEl = document.getElementById('menuMain');

  // 1) Render the fallback immediately — no waiting, no loading text.
  renderMenu(navEl, mainEl, DEFAULT_MENU);
  const cart = initCartUI(DEFAULT_MENU);
  initScrollSpy();

  // 2) Try to upgrade to the live sheet in the background.
  try {
    const liveMenu = await loadMenuFromSheet(SHEET_CSV_URL);
    renderMenu(navEl, mainEl, liveMenu); // rebuilds nav + section DOM with live data
    cart.updateMenu(liveMenu);           // keep cart totals correct against the new prices/ids
    initScrollSpy();                     // re-attach scroll observers to the freshly-built DOM
  } catch (err) {
    console.warn('[Sevin Menu] Using the built-in fallback menu —', err.message);
  }
}

document.addEventListener('DOMContentLoaded', init);/**
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
