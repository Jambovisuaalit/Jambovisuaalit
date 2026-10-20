(() => {
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length) {
    let current = 0;
    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-current', i === current);
        slide.setAttribute('aria-hidden', String(i !== current));
      });
    };
    document.querySelector('[data-carousel="prev"]')?.addEventListener('click', () => showSlide(current - 1));
    document.querySelector('[data-carousel="next"]')?.addEventListener('click', () => showSlide(current + 1));
  }

  // Standalone map implementation: address, zoom, type and styling correspond to
  // the supplied Framer reference; unlike it, Google is contacted only on opt-in.
  document.querySelectorAll('[data-embed-map]').forEach((panel) => {
    const launch = panel.querySelector('[data-load-map]');
    const close = panel.querySelector('[data-hide-map]');
    const toolbar = panel.querySelector('.map-toolbar');
    const frame = panel.querySelector('iframe[data-src]');
    if (!launch || !frame) return;
    const show = () => {
      // The URL is a vetted static HTML attribute, never visitor-provided input.
      frame.src = frame.dataset.src;
      frame.hidden = false;
      panel.classList.add('is-loaded');
      if (toolbar) toolbar.hidden = false;
      close?.focus();
    };
    const hide = () => {
      frame.removeAttribute('src'); // Unload third-party content on close.
      frame.hidden = true;
      panel.classList.remove('is-loaded');
      if (toolbar) toolbar.hidden = true;
      launch.focus();
    };
    launch.addEventListener('click', show);
    close?.addEventListener('click', hide);
  });

  const lightbox = document.getElementById('lightbox');
  const imageButtons = [...document.querySelectorAll('.photo-grid [data-image]')];
  let openPhoto = null;
  if (lightbox && imageButtons.length) {
    const image = lightbox.querySelector('figure img');
    const caption = lightbox.querySelector('figcaption');
    const close = lightbox.querySelector('.lightbox-close');
    const prev = lightbox.querySelector('.lightbox-prev');
    const next = lightbox.querySelector('.lightbox-next');
    const controls = [close, prev, next];
    const modalBackground = [...document.body.children].filter(el => el !== lightbox && ['HEADER','MAIN','FOOTER','NAV'].includes(el.tagName));
    let current = 0, activeTrigger = null;
    const show = (index) => {
      current = (index + imageButtons.length) % imageButtons.length;
      const source = imageButtons[current].querySelector('img');
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      caption.textContent = `${current + 1} / ${imageButtons.length} — ${source.alt}`;
    };
    openPhoto = (index, trigger) => {
      activeTrigger = trigger;
      show(index);
      lightbox.setAttribute('aria-hidden', 'false');
      modalBackground.forEach(el => { el.inert = true; });
      document.body.classList.add('lightbox-open');
      close.focus();
    };
    const dismiss = () => {
      lightbox.setAttribute('aria-hidden', 'true');
      modalBackground.forEach(el => { el.inert = false; });
      document.body.classList.remove('lightbox-open');
      image.removeAttribute('src');
      if (activeTrigger && document.contains(activeTrigger)) activeTrigger.focus();
    };
    imageButtons.forEach((button, index) => button.addEventListener('click', () => openPhoto(index, button)));
    close.addEventListener('click', dismiss);
    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox) dismiss(); });
    document.addEventListener('keydown', (event) => {
      if (lightbox.getAttribute('aria-hidden') !== 'false') return;
      if (event.key === 'Escape') { event.preventDefault(); dismiss(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
      else if (event.key === 'Tab') {
        event.preventDefault();
        const index = controls.indexOf(document.activeElement);
        controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
      }
    });
  }

  // Independent, lightweight 3D orbit photo carousel, progressive enhancement.
  // Keep the masonry grid and its accessible full-screen lightbox as an option.
  const orbit = document.querySelector('[data-orbit-gallery]');
  const photoGrid = document.querySelector('.photo-grid');
  if (orbit && photoGrid && imageButtons.length && openPhoto) {
    const ring = orbit.querySelector('[data-orbit-ring]');
    const stage = orbit.querySelector('[data-orbit-stage]');
    const status = orbit.querySelector('[data-orbit-status]');
    const viewButtons = [...document.querySelectorAll('[data-gallery-view]')];
    const previous = orbit.querySelector('[data-orbit-prev]');
    const next = orbit.querySelector('[data-orbit-next]');
    const lang = document.documentElement.lang;
    let current = 0;
    const count = imageButtons.length;
    const step = 360 / count;
    // Remove the prerendered orbit cards before initializing the interactive gallery.
    ring.replaceChildren();
    const cards = imageButtons.map((sourceButton, i) => {
      const image = sourceButton.querySelector('img');
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'orbit-card';
      card.setAttribute('aria-label', (lang === 'fi' ? 'Suurenna kuva: ' : 'Enlarge photo: ') + image.alt);
      card.dataset.orbitIndex = String(i);
      const picture = document.createElement('img');
      picture.src = image.getAttribute('src');
      if (image.hasAttribute('width')) picture.width = Number(image.getAttribute('width'));
      if (image.hasAttribute('height')) picture.height = Number(image.getAttribute('height'));
      if (image.hasAttribute('srcset')) picture.srcset = image.getAttribute('srcset');
      picture.sizes = '(max-width:700px) 50vw, 240px';
      picture.loading = 'lazy';
      picture.decoding = 'async';
      picture.referrerPolicy = 'no-referrer';
      picture.alt = '';
      card.appendChild(picture);
      const counter = document.createElement('span');
      counter.className = 'orbit-card-number';
      counter.setAttribute('aria-hidden','true');
      counter.textContent = String(i + 1).padStart(2,'0');
      card.appendChild(counter);
      card.addEventListener('click', () => {
        if (current !== i) change(i);
        else openPhoto(i, card);
      });
      ring.appendChild(card);
      return card;
    });
    const position = () => {
      const width = stage.getBoundingClientRect().width;
      const radius = Math.min(360, Math.max(150, width * 0.32));
      ring.style.transform = `rotateY(${-current * step}deg)`;
      cards.forEach((card,i) => {
        card.style.transform = `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`;
        card.classList.toggle('is-active', i === current);
        card.tabIndex = i === current ? 0 : -1;
        card.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
      const alt = imageButtons[current].querySelector('img').alt;
      status.textContent = `${current + 1} / ${count} · ${alt}`;
    };
    const change = (index) => {current = (index + count) % count; position();};
    previous.addEventListener('click', () => change(current - 1));
    next.addEventListener('click', () => change(current + 1));
    stage.addEventListener('keydown',(e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        change(current + (e.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let downX = null, downY = null;
    stage.addEventListener('pointerdown', (e) => {downX=e.clientX;downY=e.clientY;});
    stage.addEventListener('pointerup', (e) => {
      if (downX === null) return;
      const dx = e.clientX-downX, dy=e.clientY-downY;
      downX=downY=null;
      if (Math.abs(dx)>38 && Math.abs(dx)>Math.abs(dy)*1.3) change(current + (dx<0?1:-1));
    });
    const setView=(value)=>{
      const isOrbit=value==='orbit';
      orbit.hidden=!isOrbit;
      photoGrid.hidden=isOrbit;
      viewButtons.forEach(button=>{
        const active=button.dataset.galleryView===value;
        button.classList.toggle('is-selected',active);
        button.setAttribute('aria-pressed',String(active));
      });
      if (isOrbit) position();
    };
    viewButtons.forEach(button=>button.addEventListener('click',()=>setView(button.dataset.galleryView)));
    // For reduced-motion visitors, start with the calm full photo grid.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setView('grid');
    window.addEventListener('resize', () => {if (!orbit.hidden) position();}, {passive:true});
  }
})();
