const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>8),{passive:true});
const tabs=[...document.querySelectorAll('[role=tab]')],items=[...document.querySelectorAll('#mlist li')];
function sel(t){tabs.forEach(b=>{b.setAttribute('aria-selected',b===t);b.tabIndex=b===t?0:-1});const f=t.dataset.f;items.forEach(li=>li.hidden=!(f==='all'||li.dataset.c===f))}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>sel(b));b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];n.focus();sel(n)}})});
document.querySelector(`#hours li[data-d="${new Date().getDay()}"]`)?.classList.add('today');
const f=document.getElementById('bk'),dt=f.dt,tm=f.tm,ph=f.ph,done=document.getElementById('done'),q=document.getElementById('q'),sum=document.getElementById('sum');
const pad=n=>String(n).padStart(2,'0'),iso=x=>`${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`;
const t1=new Date();t1.setDate(t1.getDate()+1);dt.min=iso(t1);const mx=new Date();mx.setDate(mx.getDate()+14);dt.max=iso(mx);
tm.innerHTML='<option value="">선택</option>'+['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map(v=>`<option>${v}</option>`).join('');
function total(){sum.textContent=(+f.bean.value*+q.value).toLocaleString('ko-KR')}
f.bean.addEventListener('change',total);
f.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{q.value=q.textContent=Math.min(5,Math.max(1,+q.textContent+ +b.dataset.q));total()}));
ph.addEventListener('input',()=>{let v=ph.value.replace(/\D/g,'').slice(0,11);ph.value=v.length>7?`${v.slice(0,3)}-${v.slice(3,v.length-4)}-${v.slice(-4)}`:v.length>3?`${v.slice(0,3)}-${v.slice(3)}`:v});
function err(el,msg){el.setAttribute('aria-invalid',msg?'true':'false');document.getElementById('e-'+el.id).textContent=msg||'';return !msg}
function check(){let ok=true;
 let m='';if(!dt.value)m='찾으실 날을 골라 주세요.';else if(dt.value<dt.min||dt.value>dt.max)m='내일부터 2주 안의 날짜를 골라 주세요.';else if(new Date(dt.value+'T12:00').getDay()===1)m='월요일은 쉽니다. 다른 날을 골라 주세요.';
 ok=err(dt,m)&&ok;ok=err(tm,tm.value?'':'찾으실 시간을 골라 주세요.')&&ok;
 ok=err(f.nm,f.nm.value.trim()?'':'이름을 적어 주세요.')&&ok;
 ok=err(ph,/^01[016789]-\d{3,4}-\d{4}$/.test(ph.value)?'':'휴대폰 번호를 010-0000-0000 형식으로 적어 주세요.')&&ok;return ok}
f.addEventListener('submit',e=>{e.preventDefault();done.hidden=true;if(!check()){f.querySelector('[aria-invalid=true]')?.focus();return}
 const name=f.bean.options[f.bean.selectedIndex].text.split(' · ')[0];
 done.innerHTML=`<b>담아 두겠습니다</b>${f.nm.value.trim()}님, ${dt.value} ${tm.value}에 ${name} ${q.textContent}봉(${f.grind.value}). 합계 ${sum.textContent}원. 준비되면 ${ph.value}로 문자 드립니다.`;done.hidden=false;done.scrollIntoView({block:'nearest'})});
['nm','ph','dt','tm'].forEach(id=>f[id].addEventListener('blur',()=>{if(f[id].getAttribute('aria-invalid')==='true')check()}));
