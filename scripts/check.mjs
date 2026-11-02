import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../portfolio-data.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>readFileSync(path.join(root,name),'utf8');
const publicFiles=['index.html','style.css','app.js','scene.js','portfolio-data.js','favicon.svg','.nojekyll'];
for(const name of publicFiles)assert.ok(existsSync(path.join(root,name)),`Missing public file: ${name}`);
for(const name of ['app.js','scene.js','portfolio-data.js','server.mjs','scripts/build.mjs','scripts/check.mjs']){
  execFileSync(process.execPath,['--check',path.join(root,name)],{stdio:'pipe'});
}

const html=read('index.html');
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
const usedAssets=new Set();
function checkReference(reference,from='index.html'){
  if(/^(?:data:|mailto:|https?:|tel:)/i.test(reference))return;
  if(reference.startsWith('#')){
    assert.ok(ids.has(reference.slice(1)),`Missing anchor: ${reference}`);
    return;
  }
  assert.ok(!reference.startsWith('/'),`Root-relative link breaks project Pages paths: ${reference}`);
  const pathname=reference.split(/[?#]/)[0];
  if(!pathname)return;
  const fullPath=path.resolve(root,path.dirname(from),pathname);
  assert.ok(!path.relative(root,fullPath).startsWith('..'),`Reference leaves project: ${reference}`);
  assert.ok(existsSync(fullPath)&&statSync(fullPath).isFile(),`Missing file from ${from}: ${reference}`);
  const relative=path.relative(root,fullPath).split(path.sep).join('/');
  if(relative.startsWith('assets/'))usedAssets.add(relative.slice(7));
}
for(const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g))checkReference(match[1]);
for(const match of read('style.css').matchAll(/url\((?:"([^"]*)"|'([^']*)'|([^)'"\s]*))\)/g))checkReference(match[1]??match[2]??match[3],'style.css');
for(const name of ['app.js','scene.js','portfolio-data.js']){
  for(const match of read(name).matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g))checkReference(match[1],name);
}
const indexes=[...html.matchAll(/\bdata-project="(\d+)"/g)].map(match=>Number(match[1]));
assert.equal(indexes.length,projects.length,'Gallery and preview project counts differ');
assert.equal(new Set(indexes).size,projects.length,'Duplicate project indexes');
projects.forEach((project,index)=>{
  assert.ok(indexes.includes(index),`Missing project index: ${index}`);
  checkReference(project.image);
});
for(const name of readdirSync(path.join(root,'assets'))){
  assert.match(name,/^[a-z0-9-]+\.webp$/,`Unexpected asset: ${name}`);
  assert.ok(usedAssets.has(name),`Unreferenced asset: ${name}`);
}
console.log(`Checks passed: JavaScript syntax, local references, anchors, ${projects.length} projects, and ${usedAssets.size} assets.`);
