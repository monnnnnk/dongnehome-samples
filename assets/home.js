/* 동네홈 메인 r7 — 첫 화면 샘플 띠(작업 보기), 헤더 구분선, 등장, 영상, 소리, 문의 안내. 스크롤 라이브러리 없음 */
(() => {
  window.dnh = true;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = (els, cb, opt) => { const o = new IntersectionObserver(cb, opt); els.forEach(e => e && o.observe(e)); return o; };

  /* header hairline after scrolling */
  const hd = document.getElementById('hd');
  let sc = null;
  const onScroll = () => { const s = scrollY > 8; if (s !== sc) { hd.classList.toggle('scrolled', s); sc = s; } };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* reveal: hero items in order, the rest when they enter */
  const rvs = [...document.querySelectorAll('.rv')];
  if (!reduce) {
    const heroItems = rvs.filter(e => e.closest('.hero'));
    heroItems.forEach((e, i) => { e.style.setProperty('--rd', (80 + i * 90) + 'ms'); });
    requestAnimationFrame(() => requestAnimationFrame(() => heroItems.forEach(e => e.classList.add('in'))));
    const rest = rvs.filter(e => !heroItems.includes(e));
    const o = io(rest, en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); o.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    // siblings entering together get a short stagger
    rest.forEach(e => { const sib = [...e.parentElement.children].filter(c => c.classList.contains('rv')); const k = sib.indexOf(e); if (k > 0) e.style.setProperty('--rd', Math.min(k, 4) * 70 + 'ms'); });
  }

  /* show: six slides (two copies of three) around a centre. Offsets -2..3; slides that wrap jump while off screen.
     Auto-advance only while visible, not hovered/focused, motion allowed */
  const work = document.getElementById('work');
  const slides = [...work.querySelectorAll('.slide')];
  const tabs = [...work.querySelectorAll('.tab')];
  const N = slides.length, M = tabs.length, DWELL = 5000;
  let cur = 0, timer = 0, inView = false, held = false;
  const offs = slides.map(() => 0);
  work.style.setProperty('--dwell', DWELL + 'ms');
  function place(first) {
    slides.forEach((sl, i) => {
      const o = ((i - cur + N + 2) % N) - 2;
      const jump = first || Math.abs(o - offs[i]) > 1;
      sl.classList.toggle('jump', jump);
      if (jump) void sl.offsetWidth;
      sl.style.setProperty('--o', o); offs[i] = o;
      sl.classList.toggle('on', o === 0);
      const a = sl.querySelector('a');
      if (!sl.classList.contains('dup')) { a.tabIndex = o === 0 ? 0 : -1; a.setAttribute('aria-hidden', String(o !== 0)); }
      if (Math.abs(o) <= 1) { const im = sl.querySelector('img'); if (im.loading === 'lazy') im.loading = 'eager'; }
    });
    requestAnimationFrame(() => slides.forEach(sl => sl.classList.remove('jump')));
  }
  function show(i, focus) {
    // move to the nearest slide that shows shop i
    const k = ((i % M) + M) % M;
    let best = cur, bd = 99;
    slides.forEach((sl, j) => { if (+sl.dataset.i === k) { const d = Math.abs(((j - cur + N + 2) % N) - 2); if (d < bd) { bd = d; best = j; } } });
    cur = best;
    tabs.forEach((t, j) => { const on = j === k; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; t.classList.remove('run'); });
    place(false);
    if (focus) tabs[k].focus();
    schedule();
  }
  const shop = () => +slides[cur].dataset.i;
  function schedule() {
    clearTimeout(timer); tabs.forEach(t => t.classList.remove('run'));
    if (reduce || !inView || held || document.hidden) return;
    const t = tabs[shop()]; void t.offsetWidth; t.classList.add('run');
    timer = setTimeout(() => { cur = (cur + 1) % N; show(shop()); }, DWELL);
  }
  place(true);
  slides.forEach((sl, j) => sl.querySelector('a').addEventListener('click', e => {
    if (!sl.classList.contains('on')) { e.preventDefault(); cur = j; show(shop()); }
  }));
  tabs.forEach((t, k) => {
    t.addEventListener('click', () => show(k));
    t.addEventListener('keydown', e => {
      const m = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (m) { e.preventDefault(); show(k + m, true); }
      else if (e.key === 'Home') { e.preventDefault(); show(0, true); }
      else if (e.key === 'End') { e.preventDefault(); show(M - 1, true); }
    });
  });
  const hold = v => () => { held = v; schedule(); };
  work.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hold(true)(); });
  work.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hold(false)(); });
  work.addEventListener('focusin', hold(true));
  work.addEventListener('focusout', e => { if (!work.contains(e.relatedTarget)) hold(false)(); });
  io([work], en => en.forEach(x => { inView = x.isIntersecting; schedule(); }), { threshold: 0.3 });
  document.addEventListener('visibilitychange', schedule);
  const warm = () => slides.forEach(sl => { const im = sl.querySelector('img'); if (im.loading === 'lazy') im.loading = 'eager'; });
  ('requestIdleCallback' in window) ? requestIdleCallback(warm, { timeout: 3000 }) : setTimeout(warm, 2000);

  /* film */
  const v = document.getElementById('film'), vb = document.getElementById('filmBtn');
  let userPaused = reduce;
  if (reduce) { vb.textContent = '재생'; vb.setAttribute('aria-pressed', 'true'); }
  io([v], en => en.forEach(x => { if (x.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; if (!userPaused) v.play().catch(() => {}); } else v.pause(); }), { threshold: 0.35 });
  vb.addEventListener('click', () => {
    if (v.paused) { userPaused = false; v.play().catch(() => {}); vb.textContent = '일시정지'; vb.setAttribute('aria-pressed', 'false'); }
    else { userPaused = true; v.pause(); vb.textContent = '재생'; vb.setAttribute('aria-pressed', 'true'); }
  });

  /* sound: off by default */
  const snd = document.getElementById('snd'), bgm = document.getElementById('bgm');
  let on = false, click = null;
  snd.addEventListener('click', () => {
    on = !on; snd.setAttribute('aria-pressed', String(on)); snd.textContent = on ? '소리 끄기' : '소리 켜기';
    if (on) { bgm.volume = 0.18; bgm.play().catch(() => {}); if (!click) { click = new Audio('assets/sound/click.mp3'); click.volume = 0.25; } } else bgm.pause();
  });
  document.addEventListener('click', e => { if (on && click && e.target.closest('a, button:not(#snd)')) { try { click.currentTime = 0; click.play().catch(() => {}); } catch (_) {} } });

  /* contact slot (link not ready) */
  const k = document.getElementById('kmong'), msg = document.getElementById('cmsg');
  k.addEventListener('click', e => { e.preventDefault(); msg.textContent = '크몽 링크는 아직 준비 중입니다. 상품이 승인되면 이 버튼에 연결합니다.'; });
})();
