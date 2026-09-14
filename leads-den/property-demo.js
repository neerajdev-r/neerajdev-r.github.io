(() => {
 const section=document.querySelector('#property-demo'),video=section?.querySelector('video');if(!video)return;
 let visible=false;
 video.muted=true;
 function sync(){
  if(visible&&!document.hidden){section.classList.add('is-visible');video.play().catch(()=>{});}
  else{video.pause();if(video.readyState>0)video.currentTime=0;}
 }
 new IntersectionObserver(entries=>{const e=entries[0];visible=e.isIntersecting&&e.intersectionRatio>.01;sync();},{threshold:[0,.01,.05]}).observe(video);
 document.addEventListener('visibilitychange',sync);
 addEventListener('pagehide',()=>video.pause());
})();
