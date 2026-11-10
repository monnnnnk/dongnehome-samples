/* 동네홈 샘플 공통 r7 — 헤더 구분선, 등장, 영업 상태. JS가 없어도 모든 내용이 보인다 */
(() => {
  window.dnh = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hd = document.querySelector('.hd'); let sc = null;
  const onScroll = () => { const s = scrollY > 8; if (s !== sc) { hd.classList.toggle('scrolled', s); sc = s; } };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if (!reduce) {
    const hero = [...document.querySelectorAll('.hero .rv, .hero-media')];
    hero.forEach((e, i) => e.style.setProperty('--rd', (60 + i * 90) + 'ms'));
    requestAnimationFrame(() => requestAnimationFrame(() => hero.forEach(e => e.classList.add('in'))));
    const rest = [...document.querySelectorAll('.rv')].filter(e => !e.closest('.hero'));
    rest.forEach(e => { const sib = [...e.parentElement.children].filter(c => c.classList.contains('rv')); const k = sib.indexOf(e); if (k > 0) e.style.setProperty('--rd', Math.min(k, 4) * 70 + 'ms'); });
    const o = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); o.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rest.forEach(e => o.observe(e));
  }

  /* open status from data-hours: [[day,...],"HH:MM","HH:MM"] ranges, Seoul time */
  const st = document.querySelector('[data-hours]');
  if (st) {
    const ranges = JSON.parse(st.dataset.hours);
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    const d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
    const mm = t => { const [h, n] = t.split(':').map(Number); return h * 60 + n; };
    const today = ranges.filter(r => r[0].includes(d));
    let msg;
    const open = today.find(r => m >= mm(r[1]) && m < mm(r[2]));
    if (open) msg = `지금 영업 중 · ${open[2]}까지`;
    else { const next = today.find(r => m < mm(r[1])); msg = next ? `영업 전 · 오늘 ${next[1]}에 엽니다` : (today.length ? '오늘 영업을 마쳤습니다' : '오늘은 쉬는 날입니다'); }
    st.textContent = msg;
    document.querySelectorAll('[data-days]').forEach(r => { if (r.dataset.days.split(',').map(Number).includes(d)) r.classList.add('today'); });
  }
})();
