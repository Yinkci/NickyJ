import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT)||4173;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp'};
const allowed=new Set(['index.html','style.css','app.js','scene.js','portfolio-data.js','favicon.svg']);
const previewBase=process.env.PREVIEW_BASE||'';
if(previewBase&&!/^\/[a-zA-Z0-9_-]+$/.test(previewBase))throw new Error('Invalid preview base');
const server=http.createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  try{
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(previewBase){
      if(pathname===previewBase){res.writeHead(302,{Location:previewBase+'/'});res.end();return;}
      if(!pathname.startsWith(previewBase+'/')){res.writeHead(404);res.end('Not found');return;}
      pathname=pathname.slice(previewBase.length);
    }
    const name=pathname==='/'?'index.html':pathname.slice(1);
    if(!allowed.has(name)&&!/^assets\/[a-z0-9-]+\.webp$/.test(name)){res.writeHead(404);res.end('Not found');return;}
    const body=await readFile(path.join(root,name));
    res.writeHead(200,{'Content-Type':types[path.extname(name)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:body);
  }catch(error){res.writeHead(error.code==='ENOENT'?404:400);res.end(error.code==='ENOENT'?'Not found':'Bad request');}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Port ${port} is already in use. Try: $env:PORT=4174; node server.mjs`:e.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`\n  NICKY JACOBO / FULL-STACK DEVELOPER\n  Local: http://127.0.0.1:${port}${previewBase}/\n  Static site. No build step.\n  Press Ctrl+C to stop.\n`));
