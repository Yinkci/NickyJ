import { ConnectedScene } from './scene.js';
import { projects } from './portfolio-data.js';

document.documentElement.classList.add('js');
const $ = (selector) => document.querySelector(selector);
const all = (selector) => [...document.querySelectorAll(selector)];
const clamp = (v) => Math.max(0, Math.min(1, v));
const ease = (v) => {v=clamp(v);return v*v*(3-2*v);};
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = reducedQuery.matches;
const hero = $('.hero');
const stage = $('.hero-stage');
const intro = $('.hero-intro');
const stories = all('.story');
const scene = new ConnectedScene($('#scene'));
const nav = $('.nav');
const label = $('.scene-label');
const meter = $('.scroll-progress i');
const index = $('.scene-index');
let target=0,current=0,last=performance.now(),inView=true,lastPaint=0,lastSceneProgress=-1;

function updateTarget() {
  const rect=hero.getBoundingClientRect();
  const leadIn=Math.max(0,stage.offsetHeight-innerHeight);
  target=reduced?0:clamp((-rect.top-leadIn)/Math.max(1,hero.offsetHeight-stage.offsetHeight-leadIn));
  inView=rect.bottom>0&&rect.top<innerHeight;
  nav.classList.toggle('scrolled',scrollY>40);
}
function show(el,opacity,y=0,blur=0){
  el.style.opacity=opacity.toFixed(3);
  el.style.visibility=opacity<.01?'hidden':'visible';
  el.style.transform=`translate3d(0,${y.toFixed(1)}px,0)`;
  el.style.filter=blur>.2?`blur(${blur.toFixed(1)}px)`:'none';
  el.style.pointerEvents=opacity>.85?'auto':'none';
}
function timeline(){
  const p=reduced?0:current;
  const fade=1-ease((p-.015)/.12);
  show(intro,fade,-(1-fade)*45,(1-fade)*8);
  intro.inert=fade<.5;
  label.style.opacity=String((1-fade)*.7);
  $('#scene').style.opacity=String(.3+(1-fade)*.7);
  stories.forEach((story,i)=>{
    const start=[.11,.45,.78][i],end=[.34,.66,1][i];
    const fadeIn=ease((p-start)/.065),fadeOut=1-ease((p-end+.06)/.06);
    const alpha=fadeIn*fadeOut;
    show(story,alpha,(1-fadeIn)*35-(1-fadeOut)*30,(1-alpha)*6);
  });
  meter.style.transform=`scaleX(${p})`;
  const beat=p<.15?1:p<.48?2:p<.81?3:4;
  index.innerHTML=`0${beat} <span>/</span> 04`;
  scene.progress=p;
}
function frame(now){
  const dt=now-last;last=now;
  current+= (target-current)*(1-Math.exp(-Math.min(dt,80)/260));
  if(Math.abs(current-target)<.0001)current=target;
  if(inView){
    timeline();
    // Draw up to 60fps so the horizontal glides do not skip alternate display frames.
    if(now-lastPaint>=15 && ((!reduced)||Math.abs(current-lastSceneProgress)>.0001)){
      scene.draw(now-lastPaint);lastPaint=now;lastSceneProgress=current;
    }
  }
  requestAnimationFrame(frame);
}
addEventListener('scroll',updateTarget,{passive:true});
addEventListener('resize',updateTarget,{passive:true});
addEventListener('pointermove',e=>scene.setPointer(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5),{passive:true});
document.addEventListener('visibilitychange',()=>{scene.paused=document.hidden;});
reducedQuery.addEventListener('change',e=>{reduced=e.matches;scene.reduced=reduced;updateTarget();});

// Keyboard-accessible, dismissible navigation.
const menuToggle=$('.menu-toggle'), menu=$('#menu');
function setMenu(open){menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');menu.classList.toggle('open',open);menu.inert=!open;}
menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
document.addEventListener('click',e=>{if(!e.target.closest('.nav'))setMenu(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);menuToggle.focus();}});

// Reveal once, without retaining work for sections already visited.
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
}),{threshold:.08,rootMargin:'0px 0px -15px 0px'});
all('.reveal').forEach(el=>revealObserver.observe(el));

// The original portfolio photos use manual controls: no surprise slide changes.
const portraits=all('.portrait-slide');
let portraitIndex=0;
function selectPortrait(direction){
  portraitIndex=(portraitIndex+direction+portraits.length)%portraits.length;
  portraits.forEach((photo,i)=>{photo.classList.toggle('active',i===portraitIndex);photo.setAttribute('aria-hidden',String(i!==portraitIndex));});
  $('#portrait-caption').textContent=portraits[portraitIndex].dataset.caption;
}
$('#portrait-prev').addEventListener('click',()=>selectPortrait(-1));
$('#portrait-next').addEventListener('click',()=>selectPortrait(1));

// Retain every original project, with a compact first view and full-image previews.
const showProjects=$('#show-projects');
const extraProjects=all('.project-card[data-extra]');
showProjects.addEventListener('click',()=>{
  const expanded=showProjects.getAttribute('aria-expanded')!=='true';
  extraProjects.forEach(card=>card.classList.toggle('shown',expanded));
  showProjects.setAttribute('aria-expanded',String(expanded));
  showProjects.textContent=expanded?'Show fewer projects':'Show all 16 projects';
  $('#project-count').textContent=expanded?'Showing all 16 projects':'Showing 6 of 16 projects';
  if(!expanded)$('#work').scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
});

const projectDialog=$('#project-dialog');
let selectedProject=0;
let pageOverflow='';
function renderProject(){
  const project=projects[selectedProject];
  $('#project-title').textContent=project.title;
  $('#preview-count').textContent=`${String(selectedProject+1).padStart(2,'0')} / ${projects.length}`;
  const image=$('#project-full-image');image.src=project.image;image.alt=`${project.title} full-size project screenshot`;
  $('#project-image-link').href=project.image;
}
all('[data-project]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();selectedProject=Number(link.dataset.project);renderProject();
  pageOverflow=document.body.style.overflow;document.body.style.overflow='hidden';projectDialog.showModal();
}));
function changeProject(direction){selectedProject=(selectedProject+direction+projects.length)%projects.length;renderProject();}
$('#project-close').addEventListener('click',()=>projectDialog.close());
$('#project-prev').addEventListener('click',()=>changeProject(-1));
$('#project-next').addEventListener('click',()=>changeProject(1));
projectDialog.addEventListener('close',()=>document.body.style.overflow=pageOverflow);
projectDialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();changeProject(1);}if(event.key==='ArrowLeft'){event.preventDefault();changeProject(-1);}});
projectDialog.addEventListener('click',event=>{if(event.target===projectDialog){const rect=projectDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)projectDialog.close();}});

// Original hero arrangement: a client-photo carousel beside the introduction.
const clientSlides=all('.client-slide');
const clientDots=all('[data-slide]');
let clientIndex=0,clientTimer;
const clientSlider=$('.client-slider');
function scheduleClient(){
  clearTimeout(clientTimer);
  if(reduced||document.hidden)return;
  clientTimer=setTimeout(()=>{
    if(inView&&!intro.inert&&!clientSlider.matches(':focus-within'))selectClient(clientIndex+1,true);
    scheduleClient();
  },2500);
}
function selectClient(next,automatic=false){
  clientIndex=(next+clientSlides.length)%clientSlides.length;
  clientSlides.forEach((image,i)=>{image.classList.toggle('active',i===clientIndex);image.setAttribute('aria-hidden',String(i!==clientIndex));});
  clientDots.forEach((button,i)=>button.setAttribute('aria-current',String(i===clientIndex)));
  $('#client-caption').setAttribute('aria-live',automatic?'off':'polite');
  $('#client-caption').textContent=clientSlides[clientIndex].dataset.caption;
  $('#client-count').innerHTML=`${String(clientIndex+1).padStart(2,'0')} <i>/</i> 04`;
  if(!automatic)scheduleClient();
}
$('#client-prev').addEventListener('click',()=>selectClient(clientIndex-1));
$('#client-next').addEventListener('click',()=>selectClient(clientIndex+1));
clientDots.forEach(button=>button.addEventListener('click',()=>selectClient(Number(button.dataset.slide))));
document.addEventListener('visibilitychange',scheduleClient);
reducedQuery.addEventListener('change',scheduleClient);
scheduleClient();

// Project screens have a little physical depth; their captions stay still.
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
all('.project-open').forEach(link=>{
  const display=link.querySelector('.project-image');if(!display)return;
  let x=0,y=0,tx=0,ty=0,raf=0,previous=0;
  function paint(now){
    const dt=previous?Math.min(now-previous,50):16;previous=now;
    if(reduced){tx=0;ty=0;}
    const amount=1-Math.exp(-dt/110);x+=(tx-x)*amount;y+=(ty-y)*amount;
    display.style.setProperty('--tilt-x',`${x.toFixed(3)}deg`);display.style.setProperty('--tilt-y',`${y.toFixed(3)}deg`);
    if(Math.abs(tx-x)+Math.abs(ty-y)>.012)raf=requestAnimationFrame(paint);
    else{raf=0;previous=0;}
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(paint);}
  link.addEventListener('pointermove',event=>{
    if(!finePointer.matches||reduced)return;
    const rect=display.getBoundingClientRect(),px=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width)),py=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
    tx=(.5-py)*6;ty=(px-.5)*8;
    display.style.setProperty('--shine-x',`${px*100}%`);display.style.setProperty('--shine-y',`${py*100}%`);
    display.classList.add('is-pointing');schedule();
  },{passive:true});
  link.addEventListener('pointerleave',()=>{tx=0;ty=0;display.classList.remove('is-pointing');schedule();},{passive:true});
});

$('#year').textContent=new Date().getFullYear();
updateTarget();current=target;timeline();scene.draw(0);requestAnimationFrame(frame);
