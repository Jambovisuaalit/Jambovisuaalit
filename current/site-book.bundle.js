;
/* SOURCE: polish-v7.js */
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


;
/* SOURCE: accessibility-fix.js */
(()=>{'use strict';
 const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
 function fixNames(){
  document.querySelectorAll('button[aria-label],a[aria-label]').forEach(el=>{
   const visible=clean(el.innerText||el.textContent),aria=clean(el.getAttribute('aria-label'));
   if(visible&&aria&&!aria.toLocaleLowerCase().includes(visible.toLocaleLowerCase()))el.setAttribute('aria-label',visible+' – '+aria);
  });
  document.querySelectorAll('a[href*="airbnb."],a[href*="booking.com"]').forEach(el=>{
   const visible=clean(el.innerText||el.textContent),p=/airbnb/i.test(el.href)?'Airbnb':'Booking.com';
   if(/^(Siirry varaamaan|Continue to booking)$/i.test(visible)&&!clean(el.getAttribute('aria-label')).includes(p))
     el.setAttribute('aria-label',visible+' – '+p);
  });
 }
 function mobile(){
  const cta=document.querySelector('.hero-actions .btn-pill');
  if(cta&&document.querySelector('.mobile-bar')&&'IntersectionObserver' in window)
    new IntersectionObserver(e=>document.body.classList.toggle('hero-primary-visible',e[0].isIntersecting),{threshold:0}).observe(cta);
 }
 function run(){fixNames();mobile();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
 window.addEventListener('load',fixNames,{once:true});
})();

;
/* SOURCE: mobile-finish.js */
(()=>{'use strict';function init(){const footer=document.querySelector('.site-footer');if(!footer||!document.querySelector('.mobile-bar')||!('IntersectionObserver' in window))return;new IntersectionObserver(e=>{document.body.classList.toggle('mobile-footer-visible',e[0].isIntersecting)},{threshold:0}).observe(footer);}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();
