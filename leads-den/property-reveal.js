(() => {
 const section=document.getElementById('property-reveal');if(!section)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),pin=section.querySelector('.pr-pin'),scene=section.querySelector('.pr-scene');
 // One photograph stays continuous through the transparent onboarding phone.
 // Phone coordinates retain the 1440 x 926 Figma layout.
 scene.innerHTML=`<div class="pr-onboard"><img src="assets/onboarding-controls.svg" alt="Onboard best in country — onboarding screen"></div><img class="pr-listing" src="assets/scroll-listing.png" alt="Active property listings screen"><img class="pr-details" src="assets/scroll-details.png" alt="Property details screen">`;
 const onboard=scene.querySelector('.pr-onboard'),listing=scene.querySelector('.pr-listing'),details=scene.querySelector('.pr-details'),bar=section.querySelector('.pr-track i');
 const extension=document.createElement('div');extension.className='pr-extension';extension.setAttribute('aria-hidden','true');pin.prepend(extension);
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=(p,a,b)=>{const t=clamp((p-a)/(b-a));return t*t*(3-2*t)};
 let p=0,target=0,frame=0,last=0,active=false;
 function paint(){const reveal=ease(p,.06,.39);onboard.style.opacity=reveal;listing.style.opacity=ease(p,.58,.8);details.style.opacity=ease(p,.68,.9);bar.style.transform=`scaleX(${p})`}
 function tick(now){const dt=Math.min(now-last||16,50);last=now;p+=(target-p)*(1-Math.exp(-dt/75));if(Math.abs(target-p)<.0001)p=target;paint();frame=0;if(p!==target)frame=requestAnimationFrame(tick)}
 function update(){if(reduced.matches){p=1;paint();return}target=clamp((58-section.getBoundingClientRect().top)/(section.offsetHeight-pin.offsetHeight));if(active&&!frame)frame=requestAnimationFrame(tick)}
 new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active)update()},{rootMargin:'150px'}).observe(section);
 addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
 reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;update()});update();
})();
