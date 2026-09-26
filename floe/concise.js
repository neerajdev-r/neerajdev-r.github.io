const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const modal=document.querySelector('dialog');
document.querySelector('.close-screen').onclick=()=>modal.close();
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
document.querySelectorAll('.gallery').forEach(gallery=>{
 const rail=gallery.querySelector('.rail'),toggle=gallery.querySelector('.autoplay');
 let paused=reduced.matches,drag=false,moved=false,start=0,left=0,visible=false,last=0,direction=1,resume=0;
 const label=()=>{toggle.textContent=paused?'Play motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused))};label();
 toggle.onclick=()=>{paused=!paused;label()};
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:.15}).observe(gallery);
 rail.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;drag=true;moved=false;start=e.clientX;left=rail.scrollLeft;rail.setPointerCapture(e.pointerId);rail.classList.add('dragging')});
 rail.addEventListener('pointermove',e=>{if(!drag)return;const delta=e.clientX-start;if(Math.abs(delta)>5)moved=true;rail.scrollLeft=left-delta});
 const release=()=>{drag=false;rail.classList.remove('dragging');resume=performance.now()+2500};
 rail.addEventListener('pointerup',release);rail.addEventListener('pointercancel',release);
 rail.addEventListener('wheel',()=>resume=performance.now()+2500,{passive:true});
 rail.addEventListener('touchstart',()=>resume=Infinity,{passive:true});rail.addEventListener('touchend',()=>resume=performance.now()+2500,{passive:true});
 rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();rail.scrollBy({left:rail.clientWidth*.65*(e.key==='ArrowRight'?1:-1),behavior:reduced.matches?'instant':'smooth'});resume=performance.now()+4000}});
 rail.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false;return}const button=e.target.closest('.screen-zoom');if(!button)return;const img=button.querySelector('img');modal.querySelector('img').src=img.src;modal.querySelector('img').alt=img.alt;modal.showModal()});
 const animate=time=>{const dt=Math.min(time-last,50);last=time;if(visible&&!paused&&!drag&&!document.hidden&&!modal.open&&time>resume&&!rail.matches(':hover,:focus-within')){rail.scrollLeft+=direction*dt*.024;const max=rail.scrollWidth-rail.clientWidth;if(rail.scrollLeft>=max-1)direction=-1;else if(rail.scrollLeft<=0)direction=1}requestAnimationFrame(animate)};requestAnimationFrame(animate);
 reduced.addEventListener('change',e=>{if(e.matches){paused=true;label()}});
});
const navlinks=[...document.querySelectorAll('nav a')];
const chapters=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)navlinks.forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))})},{rootMargin:'-10% 0px -60% 0px'});
navlinks.forEach(a=>chapters.observe(document.querySelector(a.hash)));

// Brief icon gestures on arrival and hover; no continuous motion.
(()=>{
 const cards=[...document.querySelectorAll('.journey .cards article')];
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 function play(card,index){
  if(preference.matches)return;
  const svg=card.querySelector('svg');
  svg.querySelectorAll('*').forEach(el=>el.getAnimations().forEach(a=>a.cancel()));
  svg.getAnimations().forEach(a=>a.cancel());
  const motion=(el,frames,duration=1600)=>el.animate(frames,{duration,easing:'ease-in-out',iterations:1});
  if(index===0)motion(svg,[{transform:'translateY(0)'},{transform:'translateY(-4px)',offset:.4},{transform:'translateY(0)'}]);
  if(index===1){const hand=svg.querySelector('path');hand.style.transformOrigin='16px 16px';motion(hand,[{transform:'rotate(0deg)'},{transform:'rotate(32deg)',offset:.5},{transform:'rotate(0deg)'}]);}
  if(index===2){motion(svg.querySelector('.slider-top'),[{transform:'translateX(0)'},{transform:'translateX(7px)',offset:.5},{transform:'translateX(0)'}]);motion(svg.querySelector('.slider-bottom'),[{transform:'translateX(0)'},{transform:'translateX(-7px)',offset:.5},{transform:'translateX(0)'}]);}
  if(index===3)motion(svg,[{transform:'scale(1)',opacity:1},{transform:'scale(1.08)',opacity:.7,offset:.5},{transform:'scale(1)',opacity:1}]);
 }
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){play(e.target,cards.indexOf(e.target));observer.unobserve(e.target);}}),{threshold:.6});
 cards.forEach((card,index)=>{observer.observe(card);card.addEventListener('pointerenter',()=>play(card,index));});
 preference.addEventListener('change',()=>{if(preference.matches)cards.forEach(card=>card.querySelectorAll('svg,svg *').forEach(el=>el.getAnimations().forEach(a=>a.cancel())));});
})();
document.querySelectorAll('.decision-evidence .screen-zoom').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');modal.querySelector('img').src=img.src;modal.querySelector('img').alt='Complete original FLOE design board';modal.showModal();}));
