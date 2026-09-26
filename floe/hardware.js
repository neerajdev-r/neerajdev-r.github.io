// Simplified geometry reconstructed from the supplied drawings, not manufacturing CAD.
(()=>{
const root=document.querySelector('.blueprint-story');if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const observer=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){observer.disconnect();start().catch(()=>root.classList.add('blueprint-unavailable'));}},{rootMargin:'900px'});observer.observe(root);
async function start(){
const T=await import('./three.module.js');
const mount=root.querySelector('.blueprint-canvas'),view=root.querySelector('.blueprint-view');
const renderer=new T.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));mount.append(renderer.domElement);
const scene=new T.Scene(),camera=new T.OrthographicCamera(-4,4,3,-3,.1,100);camera.position.set(0,1.5,10);camera.lookAt(0,0,0);
const model=new T.Group();scene.add(model);
const surface=new T.MeshBasicMaterial({color:0x000000,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const inset=new T.MeshBasicMaterial({color:0x000000,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const lineMaterial=new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.9});
const softLine=new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.65});
function part(g,parent=model,mat=surface){const m=new T.Mesh(g,mat);m.add(new T.LineSegments(new T.EdgesGeometry(g,28),lineMaterial));parent.add(m);return m;}
function rounded(w,h,d,r=.12){const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:1,steps:1,curveSegments:7});g.translate(0,0,-d/2);return g;}
function panel(w,h,d,x,y,z,parent=model,mat=surface,r=.1){const m=part(rounded(w,h,d,r),parent,mat);m.position.set(x,y,z);return m;}
function cylinder(radius,depth,x,y,z,parent=model){const m=part(new T.CylinderGeometry(radius,radius,depth,24),parent);m.rotation.x=Math.PI/2;m.position.set(x,y,z);return m;}
panel(2.55,3.45,.85,0,0,-.18);panel(2.65,3.55,.09,0,0,.29);panel(2.43,3.31,.07,0,0,.36,model,inset);
panel(2.23,.87,.09,0,1.04,.43);panel(2.23,2.04,.07,0,-.5,.43);
for(const x of [-.94,.94])for(const y of [-1.47,1.45])cylinder(.035,.018,x,y,.495);
for(const x of [-.97,.97])for(const y of [-1.86,1.86]){panel(.28,.35,.09,x,y,-.4,model,surface,.055);cylinder(.055,.1,x,y,-.33);}
for(const y of [-1.15,0,1.15]){panel(.18,.31,.21,-1.4,y,.3,model,surface,.03);cylinder(.058,.32,-1.42,y,.36).rotation.x=0;}
for(const y of [-1.18,1.14])panel(.2,.29,.15,1.4,y,.22,model,surface,.025);
for(const [y,r] of [[1.13,.07],[.64,.085],[.12,.115],[-.67,.065],[-1.18,.115]]){const p=cylinder(r,.15,-1.36,y,-.16);p.rotation.set(0,0,Math.PI/2);}
panel(.65,.25,.035,-.35,.98,.505,model,inset,.02);cylinder(.205,.095,.7,1.06,.53);cylinder(.13,.1,.7,1.06,.58);
for(let i=0;i<3;i++)cylinder(.037,.026,-.65+i*.26,1.33,.5);cylinder(.047,.035,.34,1.34,.5);
for(let i=0;i<12;i++){const tick=part(new T.BoxGeometry(.012,.085,.007),model,inset);tick.position.set(-.61+i*.047,.98,.53);}
const doorPivot=new T.Group();doorPivot.position.set(-1.32,0,.54);model.add(doorPivot);
panel(2.6,3.48,.12,1.32,0,0,doorPivot);panel(2.36,3.2,.035,1.32,0,.09,doorPivot,surface,.18);
function wordmark(parent,x,y,z,size){const canvas=document.createElement('canvas');canvas.width=512;canvas.height=160;const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.font='300 115px Arial';ctx.textAlign='center';ctx.fillText('floe',256,120);const tex=new T.CanvasTexture(canvas);const mesh=new T.Mesh(new T.PlaneGeometry(size,size*160/512),new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:T.DoubleSide}));mesh.position.set(x,y,z);parent.add(mesh);}
wordmark(doorPivot,1.32,-.98,.15,1.05);wordmark(model,0,-1.04,.49,.85);
const pts=[[-1.75,-1.73,0],[-1.75,1.73,0],[-1.84,1.73,0],[-1.63,1.73,0],[-1.84,-1.73,0],[-1.63,-1.73,0]];
model.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(pts.map(p=>new T.Vector3(...p))),softLine));
let progress=0,frame=0,visible=true;
const clamp=n=>Math.max(0,Math.min(1,n)),smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
const labels=[root.querySelector('.label-a'),root.querySelector('.label-b')],leaders=[root.querySelector('#bp-line-a'),root.querySelector('#bp-line-b')];
const texts=[['Protective enclosure','Mounting points'],['Fluid connections','Sensor connection'],['Status & display','Control knob'],['Connected hardware','Digital workspace']];
function annotation(el,path,point,side,index){const p=model.localToWorld(new T.Vector3(...point)).project(camera),w=view.clientWidth,h=view.clientHeight,x=(p.x*.5+.5)*w,y=(-p.y*.5+.5)*h,tx=side===0?14:w-14,ty=index===0?Math.max(40,y-65):Math.min(h-55,y+65);el.style.left=tx+'px';el.style.top=ty+'px';el.style.transform=side===0?'none':'translateX(-100%)';path.setAttribute('d',`M ${x} ${y} L ${side===0?tx+35:tx-35} ${ty+24} L ${tx} ${ty+24}`);}
function draw(){frame=0;if(!visible)return;const p=progress,rotate=smooth(p/.4),open=smooth((p-.39)/.29),finish=smooth((p-.8)/.2);model.rotation.y=-.55+rotate*1.13-open*.76;model.rotation.x=.06;model.position.x=0;model.scale.setScalar(1);doorPivot.rotation.y=-open*1.95;const phase=p<.23?0:p<.48?1:p<.82?2:3;root.dataset.phase=phase;root.style.setProperty('--bp-progress',p);model.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(model);model.position.x=-(bounds.min.x+bounds.max.x)/2;model.updateMatrixWorld(true);const points=phase===1?[[-1.4,.12,-.16],[-1.4,-.67,-.16]]:phase>=2?[[-.35,1.15,.53],[.7,1.06,.6]]:[[.8,.1,.64],[.97,1.86,-.33]];labels.forEach((l,i)=>{l.style.opacity=1;leaders[i].style.opacity=1;l.textContent=texts[Math.min(phase,2)][i];annotation(l,leaders[i],points[i],i,i);});renderer.render(scene,camera);root.dataset.progress=p.toFixed(3);}
function queue(){if(!frame)frame=requestAnimationFrame(draw);}
function resize(){const w=view.clientWidth,h=view.clientHeight;renderer.setSize(w,h);const span=Math.max(5.5,5.1/(w/h));camera.left=-span*w/h/2;camera.right=span*w/h/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();draw();}
function scroll(){if(reduced.matches)return;const b=root.getBoundingClientRect();progress=clamp((62-b.top)/(b.height-innerHeight+62));queue();}
function motion(){root.classList.toggle('blueprint-motion',!reduced.matches);progress=reduced.matches?.68:0;resize();if(!reduced.matches)scroll();}
addEventListener('scroll',scroll,{passive:true});new ResizeObserver(resize).observe(view);reduced.addEventListener('change',motion);
new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)queue();}).observe(root);
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();root.classList.remove('blueprint-ready');});renderer.domElement.addEventListener('webglcontextrestored',()=>{root.classList.add('blueprint-ready');queue();});root.classList.add('blueprint-ready');motion();
}
})();
