if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('entering');observer.unobserve(entry.target)}}),{threshold:.08});
 document.querySelectorAll('figure').forEach(figure=>{figure.classList.add('entering');observer.observe(figure)});
}

document.querySelectorAll('.verification-viewport').forEach(viewport => {
 const track=viewport.firstElementChild;
 const originals=[...track.children];
 const root=viewport.parentElement,cursor=root.querySelector('.verification-cursor');
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 viewport.addEventListener('pointermove',e=>{if(!fine.matches)return;const r=root.getBoundingClientRect();cursor.style.left=`${e.clientX-r.left}px`;cursor.style.top=`${e.clientY-r.top}px`;root.classList.add('cursor-visible')});
 viewport.addEventListener('pointerleave',()=>root.classList.remove('cursor-visible'));
 addEventListener('scroll',()=>root.classList.remove('cursor-visible'),{passive:true});
 for(let copy=0;copy<2;copy++)originals.forEach(img=>{const clone=img.cloneNode(true);clone.alt='';clone.setAttribute('aria-hidden','true');track.append(clone)});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let cycle=0,visible=false,dragging=false,lastX=0,velocity=0,lastMove=0,lastFrame=0,pauseUntil=0,frame=0,autoRemainder=0;
 function measure(){const previous=cycle;cycle=track.children[originals.length].offsetLeft-track.children[0].offsetLeft;if(cycle)viewport.scrollLeft=cycle+(previous?(viewport.scrollLeft%previous):0)}
 function wrap(){if(!cycle)return;if(viewport.scrollLeft<cycle*.5)viewport.scrollLeft+=cycle;else if(viewport.scrollLeft>=cycle*1.5)viewport.scrollLeft-=cycle}
 function tick(now){frame=0;const dt=Math.min((now-lastFrame)/1000||0,0.05);lastFrame=now;if(!dragging){if(Math.abs(velocity)>2){viewport.scrollLeft+=velocity*dt;velocity*=Math.exp(-5*dt)}else if(!reduced.matches&&now>pauseUntil){autoRemainder+=30*dt;const step=Math.floor(autoRemainder);if(step){viewport.scrollLeft+=step;autoRemainder-=step}}wrap()}if(visible&&!document.hidden)frame=requestAnimationFrame(tick)}
 function start(){if(visible&&!document.hidden&&!frame){lastFrame=performance.now();frame=requestAnimationFrame(tick)}}
 new ResizeObserver(measure).observe(viewport);
 originals.forEach(img=>img.addEventListener('load',measure,{once:true}));
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start()},{threshold:.05}).observe(viewport);
 document.addEventListener('visibilitychange',start);
 viewport.addEventListener('pointerdown',e=>{if(e.button!==0)return;dragging=true;velocity=0;lastX=e.clientX;lastMove=performance.now();viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging')});
 viewport.addEventListener('pointermove',e=>{if(!dragging)return;const now=performance.now(),dx=lastX-e.clientX;viewport.scrollLeft+=dx;velocity=Math.max(-2200,Math.min(2200,dx/Math.max(now-lastMove,8)*1000));lastX=e.clientX;lastMove=now;wrap()});
 function release(){if(!dragging)return;dragging=false;viewport.classList.remove('dragging');if(performance.now()-lastMove>100)velocity=0;pauseUntil=performance.now()+1800}
 viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',()=>{velocity=0;release()});viewport.addEventListener('lostpointercapture',release);
 viewport.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();velocity=0;pauseUntil=performance.now()+2500;viewport.scrollLeft+=(e.key==='ArrowRight'?1:-1)*viewport.clientWidth*.65;wrap()});
 viewport.addEventListener('wheel',()=>{pauseUntil=performance.now()+1800;velocity=0},{passive:true});
 measure();
});

// Keep decorative icon motion local to visible cards.
(() => {
 const icons=[...document.querySelectorAll('.journey-icon svg,.readiness-cards>div>svg')];
 if(!icons.length)return;
 const visible=new Set();
 const sync=()=>icons.forEach(icon=>icon.classList.toggle('icon-playing',visible.has(icon)&&!document.hidden));
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target)});sync()},{threshold:.5});
 icons.forEach((icon,index)=>{icon.classList.add('motion-icon');icon.style.setProperty('--icon-delay',`${index%4*.2}s`);observer.observe(icon)});
 document.addEventListener('visibilitychange',sync);
})();

(() => {
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const photos=[...document.querySelectorAll('.editorial-photo')];
 let pending=false;
 function update(){pending=false;const h=innerHeight;photos.forEach(photo=>{const r=photo.getBoundingClientRect();if(r.bottom<0||r.top>h)return;const progress=(h/2-r.top-r.height/2)/(h+r.height);photo.style.setProperty('--photo-y',`${Math.max(-18,Math.min(18,progress*55))}px`)})}
 function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
})();

(() => {
 const video=document.querySelector('.plan-video video');
 if(!video)return;
 const nav=document.querySelector('nav');
 new ResizeObserver(()=>document.documentElement.style.setProperty('--chapter-nav-height',`${nav.getBoundingClientRect().height}px`)).observe(nav);
 let visible=false;
 const sync=()=>{if(visible&&!document.hidden){video.play().catch(()=>{video.controls=true})}else{video.pause()}};
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.15}).observe(video);
 document.addEventListener('visibilitychange',sync);
})();
