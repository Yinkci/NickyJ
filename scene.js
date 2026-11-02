// A small, dependency-free 3D projection renderer. All artwork is drawn locally.
const TAU = Math.PI * 2;
const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, v) => { const t = clamp((v-a)/(b-a)); return t*t*(3-2*t); };
const glide = (a, b, v) => { const t = clamp((v-a)/(b-a)); return t*t*t*(t*(6*t-15)+10); };

export class ConnectedScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.progress = 0;
    this.time = 0;
    this.paused = false;
    this.pointer = {x:0,y:0};
    this.aim = {x:0,y:0};
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.specks = Array.from({length:80}, (_,i)=>({x:this.random(i*3+1),y:this.random(i*3+2),z:this.random(i*3+3)}));
    this.points = Array.from({length:96}, (_,i)=>{
      const y=1-(i/95)*2, radius=Math.sqrt(1-y*y), phi=i*2.399963229728653;
      return {x:Math.cos(phi)*radius,y,z:Math.sin(phi)*radius};
    });
    this.links=[];
    this.points.forEach((a,i)=>this.points.forEach((b,j)=>{
      if(j>i && Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)<.44) this.links.push([i,j]);
    }));
    this.resize = this.resize.bind(this);
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(canvas);
    this.resize();
  }
  random(n) { const v=Math.sin(n*127.1+311.7)*43758.5453; return v-Math.floor(v); }
  resize() {
    const {width,height}=this.canvas.getBoundingClientRect();
    this.width=width; this.height=height;
    this.dpr=Math.min(devicePixelRatio || 1,1.65);
    this.canvas.width=Math.round(width*this.dpr); this.canvas.height=Math.round(height*this.dpr);
    this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    this.mobile=width<641;
  }
  setPointer(x,y) {this.aim.x=x; this.aim.y=y;}
  rotate(p, ry, rx) {
    const cy=Math.cos(ry),sy=Math.sin(ry),cx=Math.cos(rx),sx=Math.sin(rx);
    const x=p.x*cy+p.z*sy,z=p.z*cy-p.x*sy;
    return {x,y:p.y*cx-z*sx,z:p.y*sx+z*cx};
  }
  project(p,cx,cy,r) { const depth=3.8/(3.8+p.z);return {x:cx+p.x*r*depth,y:cy+p.y*r*depth,z:p.z,scale:depth}; }
  glow(x,y,r,opacity=.2) {
    const c=this.ctx,g=c.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,`rgba(179,235,244,${opacity})`);g.addColorStop(.12,`rgba(126,206,229,${opacity*.48})`);g.addColorStop(.45,`rgba(83,157,190,${opacity*.12})`);g.addColorStop(1,'rgba(83,157,190,0)');
    c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);
  }
  path(points,color,width=1) {
    const c=this.ctx;c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.strokeStyle=color;c.lineWidth=width;c.stroke();
  }
  ring(cx,cy,r,rotation,tilt,alpha,front) {
    const seg=128, pts=[];
    for(let i=0;i<=seg;i++){
      const a=(i/seg)*TAU;
      const v=this.rotate({x:Math.cos(a)*1.32,y:Math.sin(a)*1.32,z:0},rotation,tilt);
      const p=this.project(v,cx,cy,r);p.visible=front?v.z<0:v.z>=0;pts.push(p);
    }
    const c=this.ctx;
    for(let i=1;i<pts.length;i++){
      if(!pts[i].visible || !pts[i-1].visible)continue;
      const lit=(Math.sin(i/seg*TAU+rotation)+1)/2;
      this.path([pts[i-1],pts[i]],`rgba(${Math.round(110+lit*115)},${Math.round(151+lit*95)},${Math.round(173+lit*80)},${alpha*(.2+lit*.65)})`,(front?2:1)*pts[i].scale);
    }
    for(let j=0;j<3;j++){
      const a=rotation*.5+j*TAU/3, v=this.rotate({x:Math.cos(a)*1.32,y:Math.sin(a)*1.32,z:0},rotation,tilt);
      if((front&&v.z>=0)||(!front&&v.z<0))continue;
      const p=this.project(v,cx,cy,r);this.glow(p.x,p.y,16*p.scale,alpha*.35);
      c.fillStyle=`rgba(212,247,255,${alpha})`;c.beginPath();c.arc(p.x,p.y,1.7*p.scale,0,TAU);c.fill();
    }
  }
  cube(p,size,alpha,rotation=0) {
    const c=this.ctx;c.save();c.translate(p.x,p.y);c.rotate(rotation);
    const s=size*p.scale,x=s*.55,y=s*.31;
    c.beginPath();c.moveTo(0,-s);c.lineTo(x,-y);c.lineTo(x,y);c.lineTo(0,s);c.lineTo(-x,y);c.lineTo(-x,-y);c.closePath();
    const g=c.createLinearGradient(-x,-s,x,s);g.addColorStop(0,`rgba(208,239,249,${alpha*.7})`);g.addColorStop(.4,`rgba(81,129,152,${alpha*.3})`);g.addColorStop(1,`rgba(12,29,42,${alpha*.8})`);
    c.fillStyle=g;c.fill();c.strokeStyle=`rgba(170,224,242,${alpha*.8})`;c.lineWidth=.8;c.stroke();
    c.beginPath();c.moveTo(-x,-y);c.lineTo(0,y);c.lineTo(x,-y);c.moveTo(0,y);c.lineTo(0,s);c.moveTo(0,y);c.lineTo(0,-s);c.strokeStyle=`rgba(182,238,248,${alpha*.5})`;c.stroke();c.restore();
  }
  draw(dt=16) {
    if(!this.ctx || !this.width)return;
    const moving=!this.paused&&!this.reduced;
    if(moving)this.time+=Math.min(dt,40)*.00016;
    this.pointer.x=mix(this.pointer.x,moving?this.aim.x:0,.04);
    this.pointer.y=mix(this.pointer.y,moving?this.aim.y:0,.04);
    const t=this.time,p=this.reduced?0:this.progress,w=this.width,h=this.height,c=this.ctx;
    c.clearRect(0,0,w,h);
    const spread=smooth(.23,.52,p),pipeline=smooth(.80,.94,p),exit=smooth(.93,1,p);
    // Longer glides ease both velocity and acceleration; hold while Connect is readable.
    const leftShift=glide(.32,.46,p)*(1-glide(.66,.80,p));
    let cx=w*(this.mobile?.55:.73)-leftShift*w*(this.mobile?.04:.4);
    let cy=h*(this.mobile?.29:.49);
    let r=Math.min(w*(this.mobile?.30:.19),h*(this.mobile?.21:.32));
    r*=1+Math.sin(p*Math.PI)*.17;
    cx+=this.pointer.x*14;cy+=this.pointer.y*10;
    c.globalAlpha=1-exit*.5;

    // Quiet background dust and a sparse technical grid.
    this.specks.forEach((s,i)=>{
      const x=(s.x*w+Math.sin(t*.12+i)*13+w)%w,y=(s.y*h+Math.cos(t*.1+i)*10+h)%h;
      c.fillStyle=`rgba(166,208,227,${.08+s.z*.19})`;c.beginPath();c.arc(x,y,.45+s.z*.6,0,TAU);c.fill();
    });
    const gridY=h*.76;
    for(let i=0;i<9;i++){const yy=gridY+Math.pow(i/8,1.8)*h*.3;this.path([{x:0,y:yy},{x:w,y:yy}],'rgba(110,167,193,.025)');}
    for(let i=-6;i<7;i++)this.path([{x:cx+i*28,y:gridY},{x:cx+i*w*.17,y:h}],'rgba(110,167,193,.024)');
    this.glow(cx,cy,r*2.5,.12);
    const ry=t*.21+p*4.7+this.pointer.x*.12,rx=-.18+Math.sin(t*.18)*.1+p*.8+this.pointer.y*.1;

    // Satellite cubes orbit the shell, then resolve into a directed workflow.
    const satellites=Array.from({length:7},(_,i)=>{
      const a=i*TAU/7+t*.12;
      const v=this.rotate({x:Math.cos(a)*1.85,y:Math.sin(a)*1.25,z:Math.sin(a*2)*.7},ry*.23,.2);
      const orbital=this.project(v,cx,cy,r);
      const target={x:w*(.14+i*.12),y:cy+Math.sin(i*1.1)*r*.4,z:0,scale:1};
      if(this.mobile){target.x=w*(.18+(i%3)*.31);target.y=cy+(Math.floor(i/3)-1)*r*.8;}
      return {x:mix(orbital.x,target.x,pipeline),y:mix(orbital.y,target.y,pipeline),z:v.z,scale:orbital.scale};
    });
    const shellAlpha=1-pipeline*.92;
    c.save();c.globalAlpha*=shellAlpha;
    this.ring(cx,cy,r,ry*.4+.6,1.1,.7,false);
    this.ring(cx,cy,r,ry*.3-1.6,-.65,.5,false);
    // Reflective glass body: gradients supply surface depth, points define volume.
    const sphereR=r*(1-spread*.1);
    const sphere=c.createRadialGradient(cx-sphereR*.35,cy-sphereR*.47,sphereR*.02,cx,cy,sphereR);
    sphere.addColorStop(0,'rgba(205,235,247,.19)');sphere.addColorStop(.16,'rgba(81,131,153,.12)');sphere.addColorStop(.55,'rgba(13,31,45,.55)');sphere.addColorStop(.89,'rgba(41,76,94,.18)');sphere.addColorStop(.98,'rgba(138,200,218,.32)');sphere.addColorStop(1,'rgba(123,199,226,.02)');
    c.fillStyle=sphere;c.beginPath();c.arc(cx,cy,sphereR,0,TAU);c.fill();
    const points=this.points.map((v,i)=>{
      const out=1+spread*(.2+this.random(i)*.5);
      const rotated=this.rotate({x:v.x*out,y:v.y*out,z:v.z*out},ry,rx);
      return this.project(rotated,cx,cy,r);
    });
    // Draw back connections first; lit front connections are selectively brighter.
    this.links.forEach(([a,b],i)=>{
      const z=(points[a].z+points[b].z)/2,alpha=z>0?.055:.14;
      this.path([points[a],points[b]],`rgba(134,204,226,${alpha*(1-spread*.25)})`,.6);
      if(i%19===0){const travel=(t*.35+i*.11)%1;const x=mix(points[a].x,points[b].x,travel),y=mix(points[a].y,points[b].y,travel);this.glow(x,y,8,.17);c.fillStyle='#c0f1f5';c.fillRect(x,y,1.3,1.3);}
    });
    points.sort((a,b)=>b.z-a.z).forEach((pt,i)=>{
      const alpha=pt.z>0?.15:.5;
      c.beginPath();c.arc(pt.x,pt.y,(i%7===0?2.2:1)*pt.scale,0,TAU);c.fillStyle=`rgba(178,226,240,${alpha})`;c.fill();
      if(i%13===0&&pt.z<0)this.glow(pt.x,pt.y,12,.15);
    });
    // Thin latitude curves make the sphere read as a volume rather than a flat mesh.
    for(let j=-2;j<=2;j++){
      const lat=j*.32,rad=Math.sqrt(1-lat*lat),line=[];
      for(let i=0;i<=100;i++){const a=i/100*TAU;line.push(this.project(this.rotate({x:Math.cos(a)*rad,y:lat,z:Math.sin(a)*rad},ry,rx),cx,cy,r));}
      this.path(line,'rgba(160,214,235,.065)',.65);
    }
    this.glow(cx-r*.19,cy-r*.13,r*.58,.24);
    const flareX=cx-r*.33,flareY=cy-r*.41;
    this.glow(flareX,flareY,r*.26,.35);
    this.path([{x:flareX-r*.18,y:flareY},{x:flareX+r*.18,y:flareY}],'rgba(200,242,255,.4)',.6);
    c.fillStyle='rgba(227,251,255,.7)';c.beginPath();c.arc(flareX,flareY,1.7,0,TAU);c.fill();
    this.ring(cx,cy,r,ry*.4+.6,1.1,.95,true);
    this.ring(cx,cy,r,ry*.3-1.6,-.65,.6,true);
    c.restore();
    satellites.forEach((pt,i)=>{
      if(i){const prev=satellites[i-1];this.path([prev,pt],`rgba(131,210,226,${.06+pipeline*.24})`,.8);if(pipeline>.2){const a=(t*.5+i*.21)%1,x=mix(prev.x,pt.x,a),y=mix(prev.y,pt.y,a);this.glow(x,y,16,pipeline*.3);}}
      this.cube(pt,r*(.07+this.random(i+7)*.04)*(1+pipeline),.55+pipeline*.4,Math.sin(t*.2+i)*.2*(1-pipeline));
      if(pipeline>.5){c.fillStyle=`rgba(171,221,231,${pipeline*.5})`;c.font='7px monospace';c.textAlign='center';c.fillText(['INPUT','CONTEXT','THINK','REVIEW','ROUTE','ACT','DONE'][i],pt.x,pt.y+r*.22);}
    });
    // Fine orbit dashes, subtly moving rather than a spinning loading indicator.
    c.save();c.translate(cx,cy);c.rotate(-.3);c.scale(1,.45);c.setLineDash([2,10]);c.beginPath();c.arc(0,0,r*1.68,0,TAU);c.strokeStyle=`rgba(148,211,229,${.13*(1-pipeline)})`;c.lineWidth=.7;c.stroke();c.restore();
    c.globalAlpha=1;
  }
}
