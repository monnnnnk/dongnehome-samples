const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>8),{passive:true});
// menu tabs
const tabs=[...document.querySelectorAll('[role=tab]')],items=[...document.querySelectorAll('#mlist li')];
function sel(t){tabs.forEach(b=>{b.setAttribute('aria-selected',b===t);b.tabIndex=b===t?0:-1});const f=t.dataset.f;items.forEach(li=>li.hidden=!(f==='all'||li.dataset.c===f))}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>sel(b));b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];n.focus();sel(n)}})});
// today hours
const d=new Date().getDay();document.querySelector(`#hours li[data-d="${d}"]`)?.classList.add('today');
// booking
const f=document.getElementById('bk'),dt=f.dt,tm=f.tm,ph=f.ph,done=document.getElementById('done');
const pad=n=>String(n).padStart(2,'0'),iso=x=>`${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`;
const t0=new Date();dt.min=iso(t0);const mx=new Date();mx.setDate(mx.getDate()+30);dt.max=iso(mx);
function slots(){const kind=f.kind.value;const s=kind==='visit'?['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30']:['11:30','12:00','12:30','13:00','13:30','14:00','14:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30'];const cur=tm.value;tm.innerHTML='<option value="">선택</option>'+s.map(v=>`<option${v===cur?' selected':''}>${v}</option>`).join('')}
slots();
f.querySelectorAll('[name=kind]').forEach(r=>r.addEventListener('change',()=>{const t=f.kind.value==='take';document.getElementById('f-ppl').hidden=t;document.getElementById('f-ord').hidden=!t;slots()}));
ph.addEventListener('input',()=>{let v=ph.value.replace(/\D/g,'').slice(0,11);ph.value=v.length>7?`${v.slice(0,3)}-${v.slice(3,v.length-4)}-${v.slice(-4)}`:v.length>3?`${v.slice(0,3)}-${v.slice(3)}`:v});
function err(el,msg){el.setAttribute('aria-invalid',msg?'true':'false');document.getElementById('e-'+el.id).textContent=msg||'';return !msg}
function check(){let ok=true;
 ok&=err(f.nm,f.nm.value.trim().length<1?'이름을 적어 주세요.':'');
 ok&=err(ph,/^01[016789]-\d{3,4}-\d{4}$/.test(ph.value)?'':'휴대폰 번호를 010-0000-0000 형식으로 적어 주세요.');
 let m='';if(!dt.value)m='날짜를 골라 주세요.';else{const x=new Date(dt.value+'T12:00');if(dt.value<dt.min||dt.value>dt.max)m='오늘부터 30일 안의 날짜를 골라 주세요.';else if(x.getDay()===1)m='월요일은 쉽니다. 다른 날을 골라 주세요.'}
 ok&=err(dt,m);ok&=err(tm,tm.value?'':'시간을 골라 주세요.');return !!ok}
f.addEventListener('submit',e=>{e.preventDefault();done.hidden=true;if(!check()){f.querySelector('[aria-invalid=true]')?.focus();return}
 const t=f.kind.value==='take';done.innerHTML=`<b>요청을 받았습니다</b>${f.nm.value.trim()}님, ${dt.value} ${tm.value} ${t?'포장 '+f.ord.value:'방문 '+f.ppl.value}. 가게에서 ${ph.value} 번호로 확정 문자를 드립니다.`;done.hidden=false;done.scrollIntoView({block:'nearest'})});
['nm','ph','dt','tm'].forEach(id=>f[id].addEventListener('blur',()=>{if(f[id].getAttribute('aria-invalid')==='true')check()}));
