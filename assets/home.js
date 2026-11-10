(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const io = (els, cb, opt) => { const o = new IntersectionObserver(cb, opt); els.forEach(e => o.observe(e)); return o; };
  const wait = ms => new Promise(r => setTimeout(r, ms));
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

  /* ---------- endless device strip ---------- */
  const hero = document.querySelector('.hero'), pin = hero.querySelector('.hero-pin'), track = document.getElementById('track'), strip = document.getElementById('strip');
  const originals = [...strip.children];
  let setW = 0, off = 0, sOff = 0, drag = 0, vel = 0, pinD = 0, auto = 0, hold = 0;
  if (!reduce) originals.forEach(li => {
    const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.classList.add('clone');
    c.querySelectorAll('a').forEach(a => { a.tabIndex = -1; a.removeAttribute('aria-label'); });
    c.querySelectorAll('img').forEach(i => { i.loading = 'lazy'; });
    strip.appendChild(c);
  });
  const items = [...strip.children];
  const shown = el => el.offsetWidth > 0;
  function measure() {
    vw = innerWidth; vh = innerHeight; desk = vw >= 900;
    if (reduce) return;
    const n = originals.length, k = originals.findIndex(shown);
    setW = k < 0 ? 0 : items[k + n].offsetLeft - items[k].offsetLeft;
    pinD = Math.round(desk ? setW / 2 * 0.62 + vh * 0.2 : vh * 0.9);   // scroll 1px -> 2px sideways (Yasin ratio)
    hero.style.height = (vh + pinD) + 'px';
    pin.style.position = 'sticky'; pin.style.top = '0';
  }
  measure();
  addEventListener('resize', measure);
  addEventListener('load', measure);

  /* drag (mouse and touch) with inertia */
  if (!reduce) {
    let down = false, sx = 0, lx = 0, lt = 0, moved = 0;
    track.addEventListener('pointerdown', e => { if (e.button) return; down = true; moved = 0; sx = lx = e.clientX; lt = performance.now(); vel = 0; hold = performance.now(); });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - lx, now = performance.now();
      if (Math.abs(e.clientX - sx) > 6 && !track.classList.contains('drag')) { track.classList.add('drag'); try { track.setPointerCapture(e.pointerId); } catch (_) {} }
      if (track.classList.contains('drag')) { drag -= dx * 1.4; vel = -dx * 1.4 / Math.max(1, now - lt) * 16; moved += Math.abs(dx); }
      lx = e.clientX; lt = now; hold = now;
    });
    const up = () => { if (!down) return; down = false; hold = performance.now(); setTimeout(() => track.classList.remove('drag'), 0); };
    addEventListener('pointerup', up); addEventListener('pointercancel', up);
    track.addEventListener('click', e => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---------- intro: empty -> roof mark draws -> wordmark rises -> one line -> the strip unfolds from the first screen -> labels ---------- */
  let introDone = reduce;
  async function intro() {
    if (reduce) return;
    const vis = items.filter(c => shown(c) && c.getBoundingClientRect().left < vw + 40);
    const first = vis[0], x0 = first.getBoundingClientRect().left;
    vis.forEach((c, k) => {
      c.style.transition = 'none';
      c.style.transform = k ? `translate3d(${(x0 - c.getBoundingClientRect().left).toFixed(0)}px,0,0)` : 'translate3d(0,40px,0)';
      c.style.zIndex = String(50 - k); c.style.position = 'relative';
    });
    const s0 = first.querySelector('.scr');
    s0.style.clipPath = 'inset(0 0 100% 0)';
    root.classList.add('play');
    void strip.offsetWidth;
    await wait(desk ? 450 : 200);
    root.classList.remove('intro');                         // CSS delays: mark .0s, wordmark .45s, line 1.25s
    await wait(desk ? 1500 : 1000);
    first.style.transition = 'transform .9s cubic-bezier(.19,1,.22,1), opacity .35s ease-out';
    first.style.opacity = '1'; first.style.transform = 'none';
    s0.style.transition = 'clip-path .6s cubic-bezier(.19,1,.22,1) .1s'; s0.style.clipPath = 'inset(0 0 0% 0)';
    await wait(650);
    vis.forEach((c, k) => { if (!k) return; c.style.transition = `transform 1.05s var(--io) ${k * 45}ms, opacity .25s ease-out ${k * 45}ms`; c.style.opacity = '1'; c.style.transform = 'none'; });
    items.forEach(c => { if (!vis.includes(c)) { c.style.transition = 'opacity .4s ease-out .9s'; c.style.opacity = '1'; } });
    await wait(1150);
    root.classList.add('lab');                               // labels and captions fade in last
    await wait(900);
    items.forEach(c => { c.style.transition = ''; c.style.transform = ''; c.style.opacity = ''; c.style.zIndex = ''; c.style.position = ''; });
    s0.style.clipPath = ''; s0.style.transition = '';
    root.classList.remove('play', 'lab'); introDone = true; prefetch();
  }
  const start = () => requestAnimationFrame(() => requestAnimationFrame(intro));
  if (!reduce) {
    const im0 = originals[0].querySelector('img'); let done = false;
    const go = () => { if (!done) { done = true; (document.fonts ? document.fonts.ready : Promise.resolve()).then(start); } };
    if (im0.complete) go(); else { im0.addEventListener('load', go); im0.addEventListener('error', go); setTimeout(go, 1200); }
  }

  /* ---------- hover: the page inside the screen scrolls down ---------- */
  const longCache = new Map();
  const getLong = src => { if (!longCache.has(src)) { const i = new Image(); i.decoding = 'async'; i.src = src; longCache.set(src, i.decode ? i.decode().then(() => i).catch(() => i) : Promise.resolve(i)); } return longCache.get(src); };
  function prefetch() { if (!fine) return; const go = () => [...new Set([...document.querySelectorAll('[data-long]')].map(s => s.dataset.long))].forEach(getLong); ('requestIdleCallback' in window) ? requestIdleCallback(go, { timeout: 4000 }) : setTimeout(go, 2000); }
  if (reduce) prefetch();
  function enter(scr) {
    scr._in = true;
    let lg = scr.querySelector('.lg');
    if (!lg) { lg = document.createElement('img'); lg.className = 'lg'; lg.alt = ''; lg.decoding = 'async'; scr.appendChild(lg); }
    getLong(scr.dataset.long).then(() => {
      if (!scr._in) return;
      if (lg.getAttribute('src') !== scr.dataset.long) lg.src = scr.dataset.long;
      const w = scr.clientWidth, h = scr.clientHeight, y = +scr.dataset.y * w, total = +scr.dataset.h * w;
      const dist = Math.max(0, Math.min(total - y - h, h * 1.4));
      lg.style.transition = 'none'; lg.style.transform = `translate3d(0,${-y}px,0)`;
      requestAnimationFrame(() => { scr.classList.add('live'); requestAnimationFrame(() => {
        lg.style.transition = `transform ${(2.2 + dist / h * .5).toFixed(2)}s cubic-bezier(.45,0,.2,1) .15s, opacity .2s linear`;
        lg.style.transform = `translate3d(0,${-(y + dist)}px,0)`; }); });
    });
  }
  function leave(scr) {
    scr._in = false; const lg = scr.querySelector('.lg'); if (!lg) return;
    const w = scr.clientWidth, y = +scr.dataset.y * w;
    lg.style.transition = 'transform .9s cubic-bezier(.19,1,.22,1), opacity .25s linear .75s';
    lg.style.transform = `translate3d(0,${-y}px,0)`; scr.classList.remove('live');
  }
  if (fine && !reduce) {
    document.addEventListener('pointerover', e => { const h = e.target.closest('.it a, .wk-stage'); if (!h || h.contains(e.relatedTarget)) return; if (track.classList.contains('drag')) return; h.querySelectorAll('.scr[data-long]').forEach(enter); });
    document.addEventListener('pointerout', e => { const h = e.target.closest('.it a, .wk-stage'); if (!h || h.contains(e.relatedTarget)) return; h.querySelectorAll('.scr[data-long]').forEach(leave); });
  }

  /* ---------- page transition: the picked screen grows into the sample's first screen ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    const href = a.getAttribute('href');
    if (!/^(cafe|salon|ramen)\/$/.test(href)) return;
    e.preventDefault();
    const s = href.slice(0, -1);
    const src = desk ? (a.dataset.shot || `assets/img/${s}_d.jpg`) : (a.dataset.shotM || `assets/img/${s}_m.jpg`);
    let host = a; if (a.classList.contains('wk-go')) host = a.closest('.wk').querySelector('.wk-stage');
    const scr = host.querySelector('.scr') || host;
    const from = scr.getBoundingClientRect();
    const lg = scr.classList.contains('live') ? scr.querySelector('.lg') : null;
    const tileImg = scr.querySelector('img');
    const box = document.createElement('div'); box.className = 'pt';
    const shot = document.createElement('div'); shot.className = 'pt-shot';
    shot.style.width = vw + 'px'; shot.style.height = vh + 'px';
    shot.innerHTML = '<img alt="" src="' + src + '">' + (tileImg ? '<img class="pt-from" alt="" src="' + tileImg.currentSrc + '">' : '');
    const sx0 = from.width / vw, sy0 = from.height / vh, m = Math.max(sx0, sy0);
    shot.style.transform = `translate3d(${from.left}px,${from.top}px,0) scale(${sx0},${sy0})`;
    const base = shot.firstElementChild, fromImg = shot.querySelector('.pt-from');
    base.style.transformOrigin = '50% 0'; base.style.transform = `scale(${m / sx0},${m / sy0})`;
    if (fromImg) Object.assign(fromImg.style, { width: from.width + 'px', height: from.height + 'px', objectFit: 'cover', objectPosition: '50% 0', transformOrigin: '0 0', transform: `scale(${1 / sx0},${1 / sy0})` });
    if (lg) leave(scr);
    box.appendChild(shot); document.body.appendChild(box);
    const li = a.closest('.it, .wk'); if (li) li.classList.add('picked');
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
  let lastSc = null, lastT = 0, heroOn = true, tick = 0;
  io([hero], en => en.forEach(x => { heroOn = x.isIntersecting; }));
  function frame(t) {
    const dt = lastT ? Math.min(50, t - lastT) : 16; lastT = t;
    const y = scrollY;
    const sc = y > 40; if (sc !== lastSc) { bar.classList.toggle('scrolled', sc); lastSc = sc; }
    if (!reduce && (++tick & 15) === 0) for (const e of rvs) if (!e.classList.contains('in') && e.getBoundingClientRect().top < vh * 0.9) e.classList.add('in');   // catch reveals skipped by jumps (anchor links)
    if (reduce || !setW || !heroOn) return;
    const r = hero.getBoundingClientRect();
    drag += vel; vel *= 0.94; if (Math.abs(vel) < 0.05) vel = 0;
    if (!desk && introDone && !document.hidden && t - hold > 1800) auto += dt * 0.02;   // phones: the three shops keep sliding past (~20px/s)
    off = clamp(-r.top, 0, pinD) * 2 + drag + auto;
    sOff += (off - sOff) * 0.12; if (Math.abs(off - sOff) < 0.05) sOff = off;
    const x = -(((sOff % setW) + setW) % setW);
    strip.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
  }
  function loop(t) { if (lenis) lenis.raf(t); frame(t); requestAnimationFrame(loop); }
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
