/**
 * main.js
 * ---------------------------------------------------------------------------
 * Entry point. Loaded from index.html as <script type="module">.
 *
 * Rendering strategy — "instant fallback, silent upgrade":
 *   1. Render DEFAULT_MENU (data.js) immediately. The page never waits on
 *      a network request to show something, so it feels exactly as fast as
 *      the old hardcoded-menu version.
 *   2. In the background, fetch data/menu.json (this repo, no external
 *      service). If it arrives (almost always instant, same-origin), quietly
 *      swap the DOM to the live data — the customer usually never notices.
 *   3. If that fetch fails for any reason, we simply keep showing
 *      DEFAULT_MENU. No error state, no blank page.
 * ---------------------------------------------------------------------------
 */

import { DEFAULT_MENU } from './data.js';
import { loadMenuFromJson } from './menuSource.js';
import { MENU_JSON_URL } from './config.js';
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

  // 2) Try to upgrade to the live menu.json in the background.
  try {
    const liveMenu = await loadMenuFromJson(MENU_JSON_URL);
    renderMenu(navEl, mainEl, liveMenu); // rebuilds nav + section DOM with live data
    cart.updateMenu(liveMenu);           // keep cart totals correct against the new prices/ids
    initScrollSpy();                     // re-attach scroll observers to the freshly-built DOM
  } catch (err) {
    console.warn('[Sevin Menu] Using the built-in fallback menu —', err.message);
  }
}

document.addEventListener('DOMContentLoaded', init);
