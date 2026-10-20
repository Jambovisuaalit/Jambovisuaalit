(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHeader);
      }
    }, {passive: true});
    updateHeader();
  }
  // Observer reveals content once; no library, repeated scroll listeners or heavy parallax.
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const targets = [...document.querySelectorAll('[data-reveal]')];
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      }
    }, {rootMargin:'0px 0px -5% 0px', threshold:0.05});
    for (const target of targets) {
      // Avoid hiding any content that is already above or within the first viewport.
      if (target.getBoundingClientRect().top <= innerHeight * 0.94) {
        target.classList.add('is-visible');
      } else {
        observer.observe(target);
      }
    }
    document.documentElement.classList.add('motion-ready');
  }
})();
