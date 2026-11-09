(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const io = (els, cb, opt) => { const o = new IntersectionObserver(cb, opt); els.forEach(e => o.observe(e)); return o; };

  /* ---------- reveals ---------- */
  if (!reduce) root.classList.add('mo');
  const revealTargets = [...document.querySelectorAll('.rv, h1, h2')].filter(e => !e.closest('.hero'));
  if (reduce) {
    document.querySelectorAll('.rv, h1, h2, .hero').forEach(e => e.classList.add('in'));
  } else {
    io(revealTargets, (en, o) => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); o.unobserve(x.target); } }), { rootMargin: '0px 0px -12% 0px' });
    const heroIn = () => requestAnimationFrame(() => document.querySelectorAll('.hero, .hero .rv, .hero h1').forEach(e => e.classList.add('in')));
    (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 900))]) : Promise.resolve()).then(heroIn);
  }

  /* ---------- smooth scroll (desktop only) ---------- */
  let lenis = null;
  if (!reduce && fine && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { duration: 1.4 });
    else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', id);
  });

  /* ---------- header ---------- */
  const bar = document.getElementById('bar');
  const tones = [...document.querySelectorAll('[data-tone]')];
  let tone = 'light';
  const setTone = () => {
    const yb = (bar.offsetHeight || 56) / 2; let t = 'light';
    for (const s of tones) { const r = s.getBoundingClientRect(); if (r.top <= yb && r.bottom > yb) { t = s.dataset.tone; break; } }
    if (t !== tone) { bar.classList.remove('t-' + tone); tone = t; if (t !== 'light') bar.classList.add('t-' + t); }
  };
  addEventListener('scroll', setTone, { passive: true }); setTone();

  /* ---------- chapters: pinned screen that zooms until it fills the viewport ---------- */
  const chs = [...document.querySelectorAll('.ch')].map(el => ({
    el, frame: el.querySelector('.ch-frame'), text: el.querySelector('.ch-text'), bg: el.querySelector('.ch-bg'),
    imgs: [...el.querySelectorAll('.ch-screen img')], dark: el.classList.contains('ch-dark') || el.classList.contains('ch-red'), last: -1
  }));
  chs.forEach(c => c.el.style.setProperty('--chbg', c.el.dataset.bg));
  const film = document.getElementById('filmBox');
  let vw = innerWidth, vh = innerHeight, desk = vw >= 900;
  const onResize = () => { vw = innerWidth; vh = innerHeight; desk = vw >= 900; chs.forEach(c => c.last = -1); };
  addEventListener('resize', onResize);

  function frame() {
    if (reduce) return;
    const y = window.scrollY;
    bar.classList.toggle('lined', y > 8);
    let full = false;
    for (const c of chs) {
      const r = c.el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) continue;
      const p = clamp(-r.top / (r.height - vh));
      if (Math.abs(p - c.last) < 0.0005) { if (p > 0.5 && p < 0.999) full = true; continue; }
      c.last = p;
      const z = ease(clamp(p / 0.5));
      const s0 = desk ? 0.5 : 0.6;
      const s = s0 + (1 - s0) * z;
      const tx = desk ? (1 - z) * vw * 0.17 : 0;
      const ty = desk ? (1 - z) * vh * 0.04 : (1 - z) * vh * 0.16;
      c.frame.style.transform = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0) scale(${s.toFixed(4)})`;
      c.text.style.opacity = (1 - clamp(z / 0.45)).toFixed(3);
      c.text.style.transform = `translate3d(0,${(-z * 36).toFixed(1)}px,0)`;
      c.bg.style.opacity = (z * 0.98).toFixed(3);
      const q = clamp((p - 0.56) / 0.44);
      const img = c.imgs.find(i => i.offsetParent !== null);
      if (img) {
        const travel = Math.max(0, img.getBoundingClientRect().height / s - vh) * 0.62;
        img.style.transform = `translate3d(0,${(-q * travel).toFixed(1)}px,0)`;
      }
      c.el.classList.toggle('open', p > 0.52);
      if (p > 0.5 && p < 0.999) full = true;
    }
    bar.classList.toggle('hide', full);
    if (film) {
      const r = film.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        const t = ease(clamp((vh - r.top) / (vh * 0.85)));
        film.style.transform = `scale(${(0.88 + 0.12 * t).toFixed(4)})`;
      }
    }
  }
  function loop(t) { if (lenis) lenis.raf(t); frame(); requestAnimationFrame(loop); }
  if (!reduce) requestAnimationFrame(loop);

  /* ---------- film ---------- */
  const v = document.getElementById('film'), vb = document.getElementById('filmBtn');
  let userPaused = false;
  if (v) {
    io([v], en => en.forEach(x => {
      if (x.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; if (!userPaused && !reduce) v.play().catch(() => {}); }
      else v.pause();
    }), { threshold: 0.35 });
    if (reduce) { userPaused = true; vb.textContent = '재생'; vb.setAttribute('aria-pressed', 'true'); }
    vb.addEventListener('click', () => {
      if (v.paused) { userPaused = false; v.play().catch(() => {}); vb.textContent = '일시정지'; vb.setAttribute('aria-pressed', 'false'); }
      else { userPaused = true; v.pause(); vb.textContent = '재생'; vb.setAttribute('aria-pressed', 'true'); }
    });
  }

  /* ---------- sound: off by default ---------- */
  const snd = document.getElementById('snd'), bgm = document.getElementById('bgm');
  let on = false, click = null;
  snd.addEventListener('click', () => {
    on = !on;
    snd.setAttribute('aria-pressed', String(on));
    snd.querySelector('.snd-t').textContent = on ? '소리 켜짐' : '소리 꺼짐';
    if (on) { bgm.volume = 0.18; bgm.play().catch(() => {}); if (!click) { click = new Audio('assets/sound/click.mp3'); click.volume = 0.25; } }
    else bgm.pause();
  });
  document.addEventListener('click', e => {
    if (!on || !click) return;
    if (e.target.closest('a, button:not(#snd)')) { try { click.currentTime = 0; click.play().catch(() => {}); } catch (_) {} }
  });

  /* ---------- contact slot (link not ready) ---------- */
  const k = document.getElementById('kmong'), m = document.getElementById('cmsg');
  k.addEventListener('click', e => { e.preventDefault(); m.textContent = '크몽 링크는 아직 준비 중입니다. 상품이 승인되면 이 버튼에 연결합니다.'; });
})();
