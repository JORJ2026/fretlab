/* Offline-first service worker for the Original mode (replaces the network-first worker so the Original works offline too). */
importScripts('offline-assets.js');
const CACHE=self.ST_OFFLINE.version+'-'+encodeURIComponent(new URL(self.registration.scope).pathname);
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE),A=self.ST_OFFLINE.assets;
 for(let i=0;i<A.length;i+=20){await Promise.all(A.slice(i,i+20).map(f=>c.add(new Request(f,{cache:'reload'})).catch(()=>{})))}
 await c.put('__offline-ready__',new Response('ok'));await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const k=await caches.keys();const suf='-'+encodeURIComponent(new URL(self.registration.scope).pathname);
 await Promise.all(k.filter(x=>x.startsWith('st-')&&x.endsWith(suf)&&x!==CACHE).map(x=>caches.delete(x)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 e.respondWith((async()=>{const hit=await caches.match(r,{ignoreSearch:true});if(hit)return hit;
  try{const res=await fetch(r);if(res.ok){const c=await caches.open(CACHE);c.put(r,res.clone())}return res}
  catch(err){if(r.mode==='navigate'){const f=await caches.match(new URL('index.html',self.registration.scope).href);if(f)return f}
   return new Response('This file is not available offline yet.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})())});
