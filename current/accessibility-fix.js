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