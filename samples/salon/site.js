const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>8),{passive:true});
const fb=[...document.querySelectorAll('.filter button')],items=[...document.querySelectorAll('#slist li')];
fb.forEach(b=>b.addEventListener('click',()=>{fb.forEach(x=>x.setAttribute('aria-pressed',x===b));items.forEach(li=>li.hidden=!(b.dataset.f==='all'||li.dataset.c===b.dataset.f))}));
document.querySelector(`#hours li[data-d="${new Date().getDay()}"]`)?.classList.add('today');
const f=document.getElementById('bk'),dt=f.dt,ph=f.ph,svc=f.svc,slots=document.getElementById('slots'),done=document.getElementById('done'),est=document.getElementById('est');
const pad=n=>String(n).padStart(2,'0'),iso=x=>`${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`;
const t0=new Date();dt.min=iso(t0);const mx=new Date();mx.setDate(mx.getDate()+30);dt.max=iso(mx);
const TIMES=['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
// booked slots: deterministic per date (no backend)
function taken(d){const n=+d.slice(-2);return new Set([TIMES[n%8],TIMES[(n*3+1)%8]])}
function dateMsg(){if(!dt.value)return '날짜를 골라 주세요.';if(dt.value<dt.min||dt.value>dt.max)return '오늘부터 30일 안의 날짜를 골라 주세요.';const w=new Date(dt.value+'T12:00').getDay();if(w===0||w===1)return '일요일과 월요일은 쉽니다.';return ''}
function render(){const opt=svc.selectedOptions[0];est.textContent='';
 if(!svc.value||!dt.value||dateMsg()){slots.innerHTML='<p class="hint">시술과 날짜를 먼저 골라 주세요.</p>';return}
 const m=+opt.dataset.m,tk=taken(dt.value),now=new Date();
 const lastStart=17*60,CLOSE=19*60;
 const ok=TIMES.filter(t=>{const st=+t.split(':')[0]*60;return st<=lastStart&&st+m<=CLOSE});
 slots.innerHTML=ok.map(t=>{const st=+t.split(':')[0]*60;const past=dt.value===iso(now)&&st<=now.getHours()*60+now.getMinutes();const dis=tk.has(t)||past;return `<label><input type="radio" name="tm" value="${t}"${dis?' disabled':''}><span>${t}${dis?'<span class="sr"> 마감</span>':''}</span></label>`}).join('')+`<p class="hint">19:00 전에 끝나는 시간만 보여 드립니다. ${opt.text.split(' · ')[0]} 기준 마지막 시작은 ${ok[ok.length-1]}입니다.</p>`;
 const end=s=>{const e=s+m;return `${pad(Math.floor(e/60))}:${pad(e%60)}`};
 slots.querySelectorAll('input').forEach(i=>i.addEventListener('change',()=>{const [h]=i.value.split(':').map(Number);est.textContent=`${i.value} 시작 · ${end(h*60)}쯤 끝납니다`;err('tm','')}));
 if(!slots.querySelector('input:not(:disabled)'))slots.innerHTML='<p class="hint">이 날은 예약이 찼습니다. 다른 날을 골라 주세요.</p>'}
svc.addEventListener('change',render);dt.addEventListener('change',()=>{err('dt',dateMsg());render()});
ph.addEventListener('input',()=>{let v=ph.value.replace(/\D/g,'').slice(0,11);ph.value=v.length>7?`${v.slice(0,3)}-${v.slice(3,v.length-4)}-${v.slice(-4)}`:v.length>3?`${v.slice(0,3)}-${v.slice(3)}`:v});
function err(id,msg){const el=f[id];if(el&&el.setAttribute)el.setAttribute('aria-invalid',msg?'true':'false');document.getElementById('e-'+id).textContent=msg||'';return !msg}
function check(){let ok=true;ok=err('svc',svc.value?'':'시술을 골라 주세요.')&&ok;ok=err('dt',dateMsg())&&ok;
 const t=f.querySelector('input[name=tm]:checked');document.getElementById('e-tm').textContent=t?'':'시작 시간을 골라 주세요.';ok=!!t&&ok;
 ok=err('nm',f.nm.value.trim()?'':'이름을 적어 주세요.')&&ok;
 ok=err('ph',/^01[016789]-\d{3,4}-\d{4}$/.test(ph.value)?'':'휴대폰 번호를 010-0000-0000 형식으로 적어 주세요.')&&ok;return ok}
f.addEventListener('submit',e=>{e.preventDefault();done.hidden=true;if(!check()){(f.querySelector('[aria-invalid=true]')||slots.querySelector('input'))?.focus();return}
 const t=f.querySelector('input[name=tm]:checked').value,name=svc.selectedOptions[0].text.split(' · ')[0];
 done.innerHTML=`<b>예약을 받았습니다</b>${f.nm.value.trim()}님, ${dt.value} ${t} ${name}. 한 시간 안에 ${ph.value}로 확정 문자를 보내 드립니다.`;done.hidden=false;done.scrollIntoView({block:'nearest'})});
['nm','ph','svc'].forEach(id=>f[id].addEventListener('blur',()=>{if(f[id].getAttribute('aria-invalid')==='true')check()}));
