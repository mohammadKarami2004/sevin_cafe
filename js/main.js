/**
 * main.js
 * ---------------------------------------------------------------------------
 * Entry point. Loaded from index.html as <script type="module">.
 * Order matters: the menu must be rendered before scroll-spy or cart-UI
 * try to attach to elements that don't exist yet.
 * ---------------------------------------------------------------------------
 */

import { renderMenu } from './menuRenderer.js';
import { initCartUI } from './cartUI.js';
import { initScrollSpy } from './scrollSpy.js';

function init() {
  const navEl = document.getElementById('navScroll');
  const mainEl = document.getElementById('menuMain');

  renderMenu(navEl, mainEl);
  initCartUI();
  initScrollSpy();
}

document.addEventListener('DOMContentLoaded', init);
