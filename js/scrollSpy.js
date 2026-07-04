/**
 * scrollSpy.js
 * ---------------------------------------------------------------------------
 * Two independent scroll-driven behaviors:
 *   1. Highlight the nav pill matching whichever section is in view.
 *   2. Fade/slide each section in the first time it enters the viewport.
 *
 * Must run after renderMenu() has built the .nav-pill and .section elements.
 * ---------------------------------------------------------------------------
 */

function initNavClickScrolling(pills) {
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const target = document.getElementById(pill.dataset.target);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initActivePillTracking(pills, sections) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const pill = document.querySelector(`.nav-pill[data-target="${entry.target.id}"]`);
        if (!pill) return;
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initRevealOnScroll(sections) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((section) => observer.observe(section));
}

export function initScrollSpy() {
  const pills = document.querySelectorAll('.nav-pill');
  const sections = document.querySelectorAll('.section');

  initNavClickScrolling(pills);
  initActivePillTracking(pills, sections);
  initRevealOnScroll(sections);

  if (pills[0]) pills[0].classList.add('active');
}
