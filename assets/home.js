(() => {
  window.dnh = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* reveal: hero in order, the rest as they enter */
  const rvs = [...document.querySelectorAll('.rv')];
  if (!reduce) {
    const hero = rvs.filter(e => e.closest('.hero'));
    hero.forEach((e, i) => e.style.setProperty('--rd', (60 + i * 90) + 'ms'));
    requestAnimationFrame(() => requestAnimationFrame(() => hero.forEach(e => e.classList.add('in'))));
    const rest = rvs.filter(e => !hero.includes(e));
    rest.forEach(e => { const sib = [...e.parentElement.children].filter(c => c.classList.contains('rv')); const k = sib.indexOf(e); if (k > 0) e.style.setProperty('--rd', Math.min(k, 4) * 60 + 'ms'); });
    const o = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); o.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rest.forEach(e => o.observe(e));
  }

  /* pricing on small screens: two columns + a picker per column (like a compare page) */
  const picks = [...document.querySelectorAll('.cmp-pick select')];
  const lists = [...document.querySelectorAll('.cmp-cols')];
  const small = matchMedia('(max-width: 734px)');
  const applyPick = () => {
    let a = +picks[0].value, b = +picks[1].value;
    lists.forEach(l => [...l.children].forEach((li, i) => {
      const on = !small.matches || i === a || i === b;
      li.hidden = !on; if (on && li.hidden === false && small.matches) li.classList.add('in'); li.style.order = small.matches ? (i === a ? 0 : 1) : '';
    }));
  };
  picks.forEach((s, k) => s.addEventListener('change', () => {
    const o = picks[1 - k];
    if (o.value === s.value) o.value = String([0, 1, 2].find(v => String(v) !== s.value && v !== +s.dataset.prev) ?? 0);
    picks.forEach(p => p.dataset.prev = p.value); applyPick();
  }));
  picks.forEach(p => p.dataset.prev = p.value);
  small.addEventListener('change', applyPick); applyPick();

  /* process cards: left/right buttons scroll by one card; disabled at the ends */
  const track = document.getElementById('cards');
  const btns = [...document.querySelectorAll('.car-btn')];
  const step = () => { const c = track.querySelector('.card'); return c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 20); };
  const upd = () => { const m = track.scrollWidth - track.clientWidth - 2; btns[0].disabled = track.scrollLeft <= 2; btns[1].disabled = track.scrollLeft >= m; };
  btns.forEach(b => b.addEventListener('click', () => track.scrollBy({ left: +b.dataset.d * step(), behavior: reduce ? 'auto' : 'smooth' })));
  track.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();

  /* contact slot (크몽 상품 승인 전) */
  const k = document.getElementById('kmong'), msg = document.getElementById('cmsg');
  k.addEventListener('click', e => { e.preventDefault(); msg.textContent = '크몽 상품이 승인되면 이 링크로 바로 이어 둘게요.'; });
})();
