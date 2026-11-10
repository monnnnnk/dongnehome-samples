(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const io = (els, cb, opt) => { const o = new IntersectionObserver(cb, opt); els.forEach(e => o.observe(e)); return o; };
  let vw = innerWidth, vh = innerHeight, desk = vw >= 900;

  /* ---------- quiet reveals ---------- */
  const rvs = [...document.querySelectorAll('.rv')];
  if (reduce) rvs.forEach(e => e.classList.add('in'));
  else io(rvs, (en, o) => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); o.unobserve(x.target); } }), { rootMargin: '0px 0px -10% 0px' });

  /* ---------- smooth scroll (mouse only) ---------- */
  let lenis = null;
  if (!reduce && fine && window.Lenis) lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = document.querySelector(id); if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { duration: 1.4, offset: -10 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', id);
  });

  /* ---------- endless gallery ---------- */
  const hero = document.querySelector('.hero'), track = document.getElementById('track'), strip = document.getElementById('strip');
  const originals = [...strip.children];
  let setW = 0, off = 0, sOff = 0, drag = 0, vel = 0, pinD = 0;
  if (!reduce) {
    originals.forEach(li => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.classList.add('clone'); c.querySelectorAll('a').forEach(a => a.tabIndex = -1); c.querySelectorAll('img').forEach(i => { i.alt = ''; i.loading = 'eager'; }); strip.appendChild(c); });
  }
  const cards = [...strip.children];
  function measure() {
    vw = innerWidth; vh = innerHeight; desk = vw >= 900;
    if (reduce) return;
    const first = originals[0], clone0 = strip.children[originals.length];
    setW = clone0.offsetLeft - first.offsetLeft;
    pinD = Math.round(setW / 2 + vh * 0.3);          // scroll 1 px -> 2 px sideways (Yasin ratio 2.0); a bit more than one full loop while pinned
    hero.style.height = (vh + pinD) + 'px';
    hero.querySelector('.hero-pin').style.position = 'sticky';
    hero.querySelector('.hero-pin').style.top = '0';
  }
  measure();
  addEventListener('resize', measure);
  addEventListener('load', measure);

  /* drag (mouse and touch) adds to the same offset, with inertia */
  if (!reduce) {
    let down = false, sx = 0, lx = 0, lt = 0, moved = 0;
    track.addEventListener('pointerdown', e => { if (e.button) return; down = true; moved = 0; sx = lx = e.clientX; lt = performance.now(); vel = 0; });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - lx, now = performance.now();
      if (Math.abs(e.clientX - sx) > 6 && !track.classList.contains('drag')) { track.classList.add('drag'); try { track.setPointerCapture(e.pointerId); } catch (_) {} }
      if (track.classList.contains('drag')) { drag -= dx * 1.4; vel = -dx * 1.4 / Math.max(1, now - lt) * 16; moved += Math.abs(dx); }
      lx = e.clientX; lt = now;
    });
    const up = () => { if (!down) return; down = false; setTimeout(() => track.classList.remove('drag'), 0); };
    addEventListener('pointerup', up); addEventListener('pointercancel', up);
    track.addEventListener('click', e => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---------- intro: empty -> one small card flips through photos -> cards unfold into the row -> labels fade in ---------- */
  function intro() {
    if (reduce) return;
    const vis = cards.filter(c => { const r = c.getBoundingClientRect(); return r.left < vw + 40; });
    const pile = cards.slice(0, Math.max(5, vis.length));
    const th = cards[0].querySelector('.hs-img').getBoundingClientRect();
    const cx = vw / 2, cy = vh / 2;
    pile.forEach((c, k) => {
      const r = c.querySelector('.hs-img').getBoundingClientRect();
      c.style.setProperty('--dx', (cx - (r.left + r.width / 2)).toFixed(0) + 'px');
      c.style.setProperty('--dy', (cy - (r.top + r.height / 2)).toFixed(0) + 'px');
      c.style.transition = 'none';
      c.style.transform = 'translate3d(var(--dx),var(--dy),0) scale(.3)';
      c.style.opacity = '0';
      c.style.zIndex = String(10 + pile.length - k);   // card 0 ends on top
      c.style.position = 'relative';
    });
    cards.forEach(c => { if (!pile.includes(c)) c.style.opacity = '0'; });
    root.classList.remove('intro');                 // only header labels stay hidden (class below)
    root.classList.add('intro-l');
    void strip.offsetWidth;
    const T0 = 200, STEP = 230, N = pile.length, S0 = 0.4, S1 = 0.6;   // Yasin: card 158x200 -> 279x348 (0.40 -> 0.70 of the final card)
    const seq = pile.slice().reverse();                 // flip order ends on card 0 (it stays in front and becomes the first slot)
    const img0 = seq[0].querySelector('.hs-img');
    img0.style.clipPath = 'inset(0 0 100% 0)';
    setTimeout(() => {                                   // first card reveals top -> bottom (Yasin 1.1-1.4 s)
      seq[0].style.opacity = '1'; seq[0].style.transform = `translate3d(var(--dx),var(--dy),0) scale(${S0})`;
      img0.style.transition = 'clip-path .45s cubic-bezier(.19,1,.22,1)'; img0.style.clipPath = 'inset(0 0 0% 0)';
    }, T0);
    seq.forEach((c, k) => { if (k) setTimeout(() => {   // flip: next photo lands on top, the pile grows slowly
      c.style.opacity = '1';
      const sc = (S0 + (S1 - S0) * k / (N - 1)).toFixed(3);
      seq.slice(0, k + 1).forEach(p => { p.style.transition = 'transform .6s cubic-bezier(.19,1,.22,1)'; p.style.transform = `translate3d(var(--dx),var(--dy),0) scale(${sc})`; });
    }, T0 + 300 + k * STEP); });
    const TU = T0 + 300 + N * STEP + 150;               // unfold: the pile travels to the first slot, the rest slide out from behind it
    setTimeout(() => {
      pile.forEach((c, k) => { c.style.transition = `transform 1.05s var(--io) ${k * 45}ms, opacity .3s ease-out`; c.style.transform = 'none'; c.style.opacity = '1'; });
      cards.forEach(c => { if (!pile.includes(c)) { c.style.transition = 'opacity .4s ease-out .9s'; c.style.opacity = '1'; } });
      setTimeout(() => { img0.style.clipPath = ''; img0.style.transition = ''; }, 1200);
    }, TU);
    setTimeout(() => { root.classList.remove('intro-l'); }, TU + 1300);   // header labels and captions fade in quietly at the very end   // labels fade in quietly at the end
    setTimeout(() => { cards.forEach(c => { c.style.transition = ''; c.style.transform = ''; c.style.opacity = ''; c.style.zIndex = ''; c.style.position = ''; }); }, TU + 2200);
  }
  const start = () => requestAnimationFrame(() => requestAnimationFrame(intro));
  const im0 = cards[0].querySelector('img');
  if (reduce) {} else if (im0.complete) start(); else { let done = false; const go = () => { if (!done) { done = true; start(); } }; im0.addEventListener('load', go); im0.addEventListener('error', go); setTimeout(go, 1200); }

  /* ---------- page transition: the picked card grows into the sample's first screen ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    const href = a.getAttribute('href');
    if (!/^(cafe|salon|ramen)\/$/.test(href)) return;
    e.preventDefault();
    const s = href.slice(0, -1);
    const src = desk ? (a.dataset.shot || `assets/img/${s}_d.jpg`) : (a.dataset.shotM || `assets/img/${s}_m.jpg`);
    let host = a; if (a.classList.contains('wk-go')) host = a.closest('.wk').querySelector('.wk-img');
    const box0 = host.querySelector('.hs-img') || host;
    const from = box0.getBoundingClientRect();
    const tileImg = box0.querySelector('img');
    const box = document.createElement('div'); box.className = 'pt';
    const shot = document.createElement('div'); shot.className = 'pt-shot';
    shot.style.width = vw + 'px'; shot.style.height = vh + 'px';
    shot.innerHTML = '<img alt="" src="' + src + '">' + (tileImg ? '<img class="pt-from" alt="" src="' + tileImg.currentSrc + '">' : '');
    const sx0 = from.width / vw, sy0 = from.height / vh, m = Math.max(sx0, sy0);
    shot.style.transform = `translate3d(${from.left}px,${from.top}px,0) scale(${sx0},${sy0})`;
    const base = shot.firstElementChild, fromImg = shot.querySelector('.pt-from');
    base.style.transformOrigin = '50% 0'; base.style.transform = `scale(${m / sx0},${m / sy0})`;
    if (fromImg) Object.assign(fromImg.style, { width: from.width + 'px', height: from.height + 'px', objectFit: 'cover', transformOrigin: '0 0', transform: `scale(${1 / sx0},${1 / sy0})` });
    box.appendChild(shot); document.body.appendChild(box);
    const li = a.closest('.hs, .wk'); if (li) li.classList.add('picked');
    root.classList.add('leaving');
    const D = 900, E = 'cubic-bezier(.87,0,.13,1)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      shot.style.transition = `transform ${D}ms ${E}`; base.style.transition = `transform ${D}ms ${E}`;
      shot.style.transform = 'translate3d(0,0,0) scale(1,1)'; base.style.transform = 'none';
      if (fromImg) { fromImg.style.transition = 'opacity 320ms ease-out 360ms'; fromImg.style.opacity = '0'; }
    }));
    setTimeout(() => { location.href = href; }, D + 60);
  });
  addEventListener('pageshow', ev => { if (ev.persisted) { root.classList.remove('leaving'); document.querySelectorAll('.pt').forEach(n => n.remove()); document.querySelectorAll('.picked').forEach(n => n.classList.remove('picked')); } });

  /* ---------- frame loop ---------- */
  const bar = document.getElementById('bar');
  let lastSc = null;
  function frame() {
    const y = scrollY;
    const sc = y > 40; if (sc !== lastSc) { bar.classList.toggle('scrolled', sc); lastSc = sc; }
    if (reduce || !setW) return;
    const r = hero.getBoundingClientRect();
    if (r.bottom <= 0) return;
    drag += vel; vel *= 0.94; if (Math.abs(vel) < 0.05) vel = 0;
    off = clamp(-r.top, 0, pinD) * 2 + drag;
    sOff += (off - sOff) * 0.12; if (Math.abs(off - sOff) < 0.05) sOff = off;
    const x = -(((sOff % setW) + setW) % setW);
    strip.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    for (const c of cards) {
      const b = c.getBoundingClientRect(); if (b.right < -50 || b.left > vw + 50) continue;
      const d = clamp(((b.left + b.width / 2) - vw / 2) / vw, -1, 1);
      c.querySelector('img').style.transform = `translate3d(${(-d * b.width * 0.06).toFixed(1)}px,0,0) scale(1.15)`;
    }
  }
  function loop(t) { if (lenis) lenis.raf(t); frame(); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);

  /* ---------- film ---------- */
  const v = document.getElementById('film'), vb = document.getElementById('filmBtn');
  let userPaused = reduce;
  if (reduce) { vb.textContent = '재생'; vb.setAttribute('aria-pressed', 'true'); }
  io([v], en => en.forEach(x => { if (x.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; if (!userPaused) v.play().catch(() => {}); } else v.pause(); }), { threshold: 0.35 });
  vb.addEventListener('click', () => {
    if (v.paused) { userPaused = false; v.play().catch(() => {}); vb.textContent = '일시정지'; vb.setAttribute('aria-pressed', 'false'); }
    else { userPaused = true; v.pause(); vb.textContent = '재생'; vb.setAttribute('aria-pressed', 'true'); }
  });

  /* ---------- sound: off by default ---------- */
  const snd = document.getElementById('snd'), bgm = document.getElementById('bgm');
  let on = false, click = null;
  snd.addEventListener('click', () => {
    on = !on; snd.setAttribute('aria-pressed', String(on));
    snd.querySelector('.snd-t').textContent = on ? '소리 켜짐' : '소리 꺼짐';
    if (on) { bgm.volume = 0.18; bgm.play().catch(() => {}); if (!click) { click = new Audio('assets/sound/click.mp3'); click.volume = 0.25; } } else bgm.pause();
  });
  document.addEventListener('click', e => { if (on && click && e.target.closest('a, button:not(#snd)')) { try { click.currentTime = 0; click.play().catch(() => {}); } catch (_) {} } });

  /* ---------- contact slot (link not ready) ---------- */
  const k = document.getElementById('kmong'), msg = document.getElementById('cmsg');
  k.addEventListener('click', e => { e.preventDefault(); msg.textContent = '크몽 링크는 아직 준비 중입니다. 상품이 승인되면 이 버튼에 연결합니다.'; });
})();
