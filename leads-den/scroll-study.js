(()=>{
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const section=document.querySelector('#sequence'),canvas=document.querySelector('#canvas'),surface=document.querySelector('.surface'),grid=document.querySelector('.layout-grid');
const content=document.createElement('div');content.className='surface-content';canvas.append(content);
for(let i=0;i<6;i++){const col=document.createElement('i');col.style.setProperty('--i',i);grid.append(col)}
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},range=(p,a,b)=>ease((p-a)/(b-a)),mix=(a,b,t)=>a+(b-a)*t;
function piece(name,asset,nw,nh){const e=document.createElement('div');e.className='piece';e.dataset.component=name;e.style.width=nw+'px';e.style.height=nh+'px';const img=new Image();img.src='assets/scroll-ui/'+asset+'.svg?v=parallel-grid';img.alt='';img.draggable=false;e.append(img);content.append(e);return {e,nw,nh}}
const status=piece('status','status',393,59),header=piece('header','header',353,44),filters=piece('filters','filters',353,104),card1=piece('shared-property-card-one','card1',353,260),card2=piece('shared-property-card-two','card2',353,284),nav=piece('mobile-navigation','nav',393,106);
const wh=piece('desktop-header','web-header',1440,108),side=piece('desktop-sidebar','web-sidebar',292,828),top=piece('desktop-filter-extension','web-top',1076,104);
const tabs=piece('shared-property-tabs','web-top',711,44);tabs.e.querySelector('img').style.width='1076px';tabs.e.querySelector('img').style.transform='translateY(-60px)';
const extra=[3,4,5,6,7,8,9].map(i=>piece('desktop-card-'+i,'web-card'+i,342,284));
const bands=[[0,59],[59,64],[123,120],[243,280],[523,223],[746,106]].map(([y,h])=>{const e=document.createElement('div');e.className='mobile-band';content.append(e);return {e,y,h}});
const labels=['Status bar','Header','Search & filters','Property card','Property listing','Bottom navigation'].map(text=>{const e=document.createElement('div');e.className='component-label';e.setAttribute('aria-hidden','true');const line=document.createElement('i'),name=document.createElement('span');name.textContent=text;e.append(line,name);canvas.append(e);return e});
nav.e.style.zIndex=10;status.e.style.zIndex=10;header.e.style.zIndex=11;card1.e.style.zIndex=7;card2.e.style.zIndex=7;
let target=0,current=0,raf=0,lastTime=0,gridStart=null,assetsReady=false,webProgress=0,webTarget=0;
function place(a,x,y,scale,clip=0){a.e.style.transform=`translate(${x}px,${y}px) scale(${scale})`;a.e.style.clipPath=`inset(0 0 ${clip}% 0)`;a.e.style.visibility=clip>=100?'hidden':'visible'}
function draw(p,time){const W=canvas.clientWidth,H=canvas.clientHeight,cx=W/2,cy=H/2;const ms=Math.min((H-96)/852,(W-64)/393,.72)*.88,ds=Math.min((W-64)/1440,(H-96)/960,.94)*.9;
 const ex=range(p,.08,.24)*(1-range(p,.32,.47));
 if(p>=.51&&gridStart===null){gridStart=time;grid.classList.add('active')}
 if(p<.48&&gridStart!==null){gridStart=null;grid.classList.remove('active')}
 const elapsed=gridStart===null?0:time-gridStart;
 webTarget=elapsed>=900?range(p,.69,.95):0;webProgress+=(webTarget-webProgress)*.16;if(Math.abs(webTarget-webProgress)<.0001)webProgress=webTarget;const morph=webProgress;
 const s=ms*(1-.22*ex),gap=20*ex*Math.min(1,(H-100)/700),bw=mix(393*s,1440*ds,morph),bh=mix(852*s,960*ds,morph),bx=cx-bw/2,by=cy-bh/2;
 content.style.clipPath=ex>.001&&morph===0?'none':`inset(${by}px ${W-bx-bw}px ${H-by-bh}px ${bx}px round ${mix(40*s,Math.max(12,24*ds),morph)}px)`;
 Object.assign(surface.style,{width:bw+'px',height:bh+'px',transform:`translate(${bx}px,${by}px)`,borderRadius:mix(40*s,Math.max(12,24*ds),morph)+'px',visibility:ex>.001?'hidden':'visible'});
 bands.forEach((b,i)=>{const x=cx-196.5*s,y=cy+(b.y-426)*s+(i-2.5)*gap;Object.assign(b.e.style,{width:393*s+'px',height:b.h*s+'px',transform:`translate(${x}px,${y}px)`,clipPath:`inset(0 0 ${morph*100}% 0)`,visibility:morph>=1?'hidden':'visible',borderRadius:i===0?`${40*s}px ${40*s}px 0 0`:i===5?`0 0 ${40*s}px ${40*s}px`:'0'})});
 labels.forEach((e,i)=>{const b=bands[i],left=cx+196.5*s+(W<600?10:24),top=cy+(b.y+b.h/2-426)*s+(i-2.5)*gap;Object.assign(e.style,{left:left+'px',top:top+'px',width:Math.max(0,W-left-12)+'px',opacity:morph===0?range(ex,.1,.65):0,visibility:ex>.1&&morph===0?'visible':'hidden'})});
 function mp(x,y,group){return [cx+(x-196.5)*s,cy+(y-426)*s+(group-2.5)*gap]}
 function shared(a,x,y,group,wx,wy,ws,clip=0){let m=mp(x,y,group);place(a,mix(m[0],cx+(wx-720)*ds,morph),mix(m[1],cy+(wy-480)*ds,morph),mix(s,ws*ds,morph),clip)}
 shared(status,0,0,0,0,0,1,100*morph);
 shared(header,20,67,1,316,132,1);header.e.style.clipPath=`inset(0 ${morph*65}% 0 0)`;
 shared(filters,20,131,2,316,192,1);filters.e.style.clipPath=`inset(60px 0 ${morph*44}px 0)`;
 shared(tabs,20,131,2,316,192,1);tabs.e.style.clipPath=`inset(0 ${711-mix(353,711,morph)}px 0 0)`;
 shared(card1,20,257,3,316,260,342/353);
 shared(card2,20,537,4,682,260,342/353,(1-morph)*(75/284)*100);
 shared(nav,0,746,5,0,830,1,100*morph);
 // The same two property-card elements remain visible and move into the desktop grid.
 const dx=cx-720*ds,dy=cy-480*ds;
 place(wh,dx,dy,ds,100*(1-morph));place(side,dx,dy+108*ds,ds,100*(1-morph));place(top,dx+316*ds,dy+132*ds,ds,100*(1-morph));
 // Shared tabs progressively gain room; the search field reveals inside the surface.
 top.e.style.clipPath=`inset(0 0 ${100*(1-morph)}% 68%)`;
 extra.forEach((a,k)=>{const i=k+2,row=Math.floor(i/3),col=i%3;place(a,dx+(316+366*col)*ds,dy+(260+304*row)*ds,ds,100*(1-morph));const maxH=Math.min(284,960-(260+304*row));a.e.style.height=maxH+'px'});
 grid.style.width=bw+'px';grid.style.height=bh+'px';grid.style.transform=`translate(${bx}px,${by}px)`;grid.style.borderRadius=mix(40*s,Math.max(12,24*ds),morph)+'px';grid.style.visibility=p>=.48&&morph<.99?'visible':'hidden';grid.style.clipPath=`inset(0 0 ${morph*100}% 0)`;
 canvas.dataset.progress=p.toFixed(3);canvas.dataset.morph=morph.toFixed(3);canvas.dataset.gridElapsed=Math.round(elapsed);canvas.dataset.expanded=ex.toFixed(3);
}
function tick(t){const dt=Math.min(50,t-lastTime||16);lastTime=t;current+=(target-current)*(1-Math.exp(-dt/80));if(Math.abs(target-current)<.0001)current=target;draw(current,t);if(current!==target||webProgress!==webTarget||(gridStart!==null&&t-gridStart<1050))raf=requestAnimationFrame(tick);else raf=0}
function update(){const nav=document.getElementsByTagName('nav')[0];const navHeight=nav?nav.getBoundingClientRect().height:0;section.style.setProperty('--motion-nav-height',navHeight+'px');if(!assetsReady)return;const r=section.getBoundingClientRect(),stageHeight=canvas.clientHeight,travel=section.offsetHeight-stageHeight-innerHeight*1.8;target=clamp((navHeight-r.top)/Math.max(1,travel));if(!raf)raf=requestAnimationFrame(tick)}
const pageNav=document.getElementsByTagName('nav')[0];if(pageNav)new ResizeObserver(update).observe(pageNav);
addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});draw(0,performance.now());Promise.all([...canvas.querySelectorAll('img')].map(i=>i.decode().catch(()=>{}))).then(()=>{assetsReady=true;update()});
})();
