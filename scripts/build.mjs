import { execFileSync } from 'node:child_process';
import { cp, lstat, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.resolve(root,'dist');
execFileSync(process.execPath,[path.join(root,'scripts/check.mjs')],{stdio:'inherit'});

// Only this project's generated dist directory may be replaced.
if(path.relative(root,output)!=='dist')throw new Error('Unexpected output directory');
const previous=await lstat(output).catch(error=>{if(error.code!=='ENOENT')throw error;return null;});
if(previous?.isSymbolicLink())throw new Error('Output directory cannot be a symbolic link');
await rm(output,{recursive:true,force:true});
await mkdir(path.join(output,'assets'),{recursive:true});
const publicFiles=['index.html','style.css','app.js','scene.js','portfolio-data.js','favicon.svg','.nojekyll'];
for(const name of publicFiles)await cp(path.join(root,name),path.join(output,name));
for(const name of await readdir(path.join(root,'assets'))){
  if(!/^[a-z0-9-]+\.webp$/.test(name))throw new Error(`Unexpected asset: ${name}`);
  const source=path.join(root,'assets',name);
  if(!(await lstat(source)).isFile())throw new Error(`Asset must be a regular file: ${name}`);
  await cp(source,path.join(output,'assets',name));
}
console.log('Static site ready in dist/. Only website files are included.');
