(() => {
 const root=document.querySelector('.system-carousel');if(!root)return;
 const track=root.querySelector('.system-track'),cursor=root.querySelector('.system-drag-cursor');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 // Repeat the media sequence to keep the next cards visible at every wrap.
 const originalCards=[...track.children];
 for(let repeat=0;repeat<2;repeat++)originalCards.forEach(card=>track.append(card.cloneNode(true)));
 originalCards.forEach(card=>card.classList.add('system-primary'));
 let width=root.clientWidth,drag=null,busy=false,timer=0,staticMode=false;
 const visible=new Set();
 const videos=[...root.querySelectorAll('video')];
 function syncPlayback(){
  for(const video of videos){
   if(visible.has(video)&&!document.hidden){video.play().catch(()=>{});}
   else{video.pause();if(video.readyState>0)video.currentTime=0;}
  }
 }
 // Viewport observation accounts for horizontal clipping and vertical page position.
 const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting&&e.intersectionRatio>.01)visible.add(e.target);else visible.delete(e.target);}syncPlayback();},{threshold:[0,.01,.05]});
 videos.forEach(v=>{v.muted=true;observer.observe(v)});
 document.addEventListener('visibilitychange',syncPlayback);
 function gap(){return parseFloat(getComputedStyle(track).columnGap)||0}
 function inset(){const value=getComputedStyle(root).getPropertyValue('--card-inset').trim();return value.endsWith('vw')?parseFloat(value)*innerWidth/100:parseFloat(value)}
 function position(offset=0){track.style.transform=staticMode?'none':`translate3d(${inset()-track.children[0].getBoundingClientRect().width-gap()+offset}px,0,0)`}
 function layout(){
  width=root.clientWidth;
  staticMode=originalCards.reduce((sum,card)=>sum+card.offsetWidth,0)+gap()+2*inset()<=width;
  root.classList.toggle('is-static',staticMode);
  root.tabIndex=staticMode?-1:0;
  root.setAttribute('aria-label',staticMode?'Product showcase':'Product showcase. Drag horizontally or use the left and right arrow keys.');
  if(staticMode)root.classList.remove('cursor-visible','is-dragging');
  if(!busy&&!drag)position();
 }
 function settle(direction){
  const step=direction===1?track.children[1].getBoundingClientRect().width+gap():track.children[0].getBoundingClientRect().width+gap();
  busy=true;track.style.transition=reduce.matches?'none':'transform 420ms cubic-bezier(.22,.7,.2,1)';position(-direction*step);
  const finish=()=>{
   clearTimeout(timer);track.removeEventListener('transitionend',end);
   track.style.transition='none';
   if(direction===1)track.append(track.firstElementChild);
   if(direction===-1)track.prepend(track.lastElementChild);
   position();busy=false;
  };
  const end=e=>{if(e.target===track&&e.propertyName==='transform')finish()};
  track.addEventListener('transitionend',end);timer=setTimeout(finish,reduce.matches?0:470);
 }
 function cursorAt(e){cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`}
 root.addEventListener('pointerenter',e=>{if(!staticMode&&e.pointerType!=='touch'){root.classList.add('cursor-visible');cursorAt(e)}});
 root.addEventListener('pointerleave',()=>root.classList.remove('cursor-visible'));
 root.addEventListener('pointerdown',e=>{
  if(staticMode||busy||e.button!==0)return;
  drag={x:e.clientX,y:e.clientY,time:performance.now(),dx:0};track.style.transition='none';
  root.setPointerCapture(e.pointerId);root.classList.add('is-dragging');root.focus({preventScroll:true});
 });
 root.addEventListener('pointermove',e=>{
  cursorAt(e);if(!drag)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(e.pointerType==='touch'&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dx)<12)return;
  drag.dx=Math.max(-width,Math.min(width,dx));position(drag.dx);
 });
 function release(e,cancel=false){
  if(!drag)return;const dx=drag.dx,elapsed=performance.now()-drag.time;
  drag=null;root.classList.remove('is-dragging');
  if(root.hasPointerCapture(e.pointerId))root.releasePointerCapture(e.pointerId);
  const advance=!cancel&&(Math.abs(dx)>width*.12||(Math.abs(dx)>35&&Math.abs(dx)/elapsed>.45));
  settle(advance?(dx<0?1:-1):0);
 }
 root.addEventListener('pointerup',e=>release(e));root.addEventListener('pointercancel',e=>release(e,true));
 root.addEventListener('keydown',e=>{if(!staticMode&&!busy&&!drag&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();settle(e.key==='ArrowRight'?1:-1)}});
 new ResizeObserver(layout).observe(root);
 const entrance=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('media-entered');entrance.unobserve(e.target);}}},{threshold:.15});
 [...track.children,document.querySelector('.pr-pin')].filter(Boolean).forEach(el=>entrance.observe(el));
 window.addEventListener('pagehide',()=>videos.forEach(v=>v.pause()));layout();
})();
