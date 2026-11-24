/* FretLab: small "Mode ⇄" chip so the Original site can switch to the Beta (added by the 8.0 site build). */
(function(){
 if(window.__flModeChip)return;window.__flModeChip=1;
 /* FretLab 9.0 fix: changing the key, type or selection stops the pattern that is still sounding, so Play works straight away */
 document.addEventListener('change',function(e){var t=e.target;if(!t||t.tagName!=='SELECT')return;if(t.closest&&t.closest('#chromatic-tuner-container'))return;var a=window.app;if(a&&a._patternPlaying&&typeof a.stopCurrentPattern==='function'){try{a.stopCurrentPattern()}catch(err){}}},true);
 var me=document.currentScript,root=new URL('../',me&&me.src||location.href);
 var a=document.createElement('a');a.href=new URL('index.html?choose',root).href;a.textContent='Mode ⇄ Original';a.title='Switch between the Original site and the new Beta';
 a.setAttribute('style','position:fixed;left:12px;bottom:12px;z-index:2147483000;background:#1b1814;color:#f3ebe0;border:1px solid #5a5047;padding:8px 12px;font:700 13px system-ui,-apple-system,Segoe UI,Arial,sans-serif;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.25)');
 var b=document.createElement('a');b.href=new URL('beta/index.html',root).href;b.textContent='Try the Beta →';
 b.setAttribute('style','position:fixed;left:142px;bottom:12px;z-index:2147483000;background:#ffb300;color:#1b1206;border:1px solid #ffb300;padding:8px 12px;font:800 13px system-ui,-apple-system,Segoe UI,Arial,sans-serif;text-decoration:none');
 function add(){document.body.appendChild(a);document.body.appendChild(b)}
 if(document.body)add();else document.addEventListener('DOMContentLoaded',add);
})();
/* FretLab 10.1: Roboto everywhere, and every titled section starts collapsed (except the fretboard diagram). */
(function(){
 if(window.__flColl)return;window.__flColl=1;
 var me=document.currentScript,font=new URL('roboto-var.woff',me&&me.src||location.href).href;
 var css='@font-face{font-family:"Roboto";src:url("'+font+'") format("woff");font-weight:100 900;font-display:swap}'+
  'html body,html body :is(p,a,li,span,div,label,button,input,select,textarea,h1,h2,h3,h4,h5,h6,td,th,legend,summary,small,strong,b,em,option,dt,dd,figcaption,caption,blockquote,nav,header,footer,section,article,aside,main,fieldset):not(code):not(pre):not(kbd):not(samp):not([class*="mono"]):not([class*="icon"]):not([class*="fa-"]):not(.material-icons){font-family:Roboto,system-ui,-apple-system,"Segoe UI",Arial,sans-serif!important}'+
  '.chord-item .favorite-button,.scale-item .favorite-button,.interval-item .favorite-button{left:auto!important;right:6px!important;width:auto!important;min-width:32px}body{padding-bottom:56px}'+
  '.flc-head{cursor:pointer;user-select:none}.flc-head:focus-visible{outline:2px solid #ffb300;outline-offset:2px}.flc-head::before{content:"▾";display:inline-block;width:1.1em;transition:transform .15s;vertical-align:.08em;font-size:.85em;line-height:1}'+
  '.flc.flc-closed>.flc-head::before{transform:rotate(-90deg)}.flc.flc-closed>:not(.flc-head){display:none!important}.flc.flc-closed{min-height:0!important;height:auto!important;padding-bottom:6px}.flc.flc-closed>.flc-sub{display:block!important}'+
  '[class*="filters"] div[style*="flex"]{flex-wrap:wrap}';
 var st=document.createElement('style');st.textContent=css;(document.head||document.documentElement).appendChild(st);
 var KEY='fl.coll.'+location.pathname.split('/').pop();var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
 function keyOf(box,h){return (box.id||'')+'|'+(h.textContent||'').trim().slice(0,40)}
 function isBoard(box){if(box.classList.contains('fretboard-container'))return true;var g=box.querySelectorAll('svg,canvas');for(var i=0;i<g.length;i++){var r=g[i].getBoundingClientRect();if(r.width>280&&r.height>110)return true}return false}
 function setup(){
  var heads=[].slice.call(document.querySelectorAll('fieldset>legend:first-child,h2:first-child,h3:first-child,h4:first-child')).filter(function(h){var p=h.parentElement;return p&&p!==document.body&&!/^(A|SPAN|LABEL|BUTTON|SUMMARY|LI|TD|TH)$/.test(p.tagName)&&!/(^|[-_ ])(head|heading|header|title|titlebar|topbar|toolbar)([-_ ]|$)/i.test(String(p.className))&&!h.closest('a,header,.top-header,nav,footer')&&p.children.length>=2})
  var HD=/(^|[-_ ])(head|heading|header|title|titlebar|topbar|toolbar)([-_ ]|$)/i;
  [].slice.call(document.querySelectorAll('h2:first-child,h3:first-child')).forEach(function(x){var w=x.parentElement,g=w&&w.parentElement;if(w&&g&&HD.test(String(w.className))&&g.firstElementChild===w&&g.children.length>=2&&g!==document.body&&!w.closest('a,header,.top-header,nav,footer')&&heads.indexOf(w)<0)heads.push(w)});
  for(var i=0;i<heads.length;i++){var h=heads[i],box=h.parentElement;if(!box||box.classList.contains('flc')||isBoard(box))continue;
   if(box.closest('header,nav,footer,[role=dialog],dialog,.modal,#modal'))continue;if(box.children.length<2)continue;
   box.classList.add('flc');h.classList.add('flc-head');var nx=h.nextElementSibling;if(nx&&/^H[4-6]$/.test(nx.tagName)&&(nx.textContent||'').length<120)nx.classList.add('flc-sub');h.setAttribute('role','button');h.tabIndex=0;
   var k=keyOf(box,h),open=saved[k]===true;box.classList.toggle('flc-closed',!open);h.setAttribute('aria-expanded',String(open));
   (function(box,h,k){function tog(e){if(e&&e.target&&e.target.closest&&e.target.closest('input,select,button:not(.flc-head),a'))return;var o=box.classList.toggle('flc-closed');h.setAttribute('aria-expanded',String(!o));saved[k]=!o;try{localStorage.setItem(KEY,JSON.stringify(saved))}catch(err){}}
    h.addEventListener('click',tog);h.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tog()}})})(box,h,k)}
 }
 var t=0;function later(){clearTimeout(t);t=setTimeout(setup,120)}
 function go(){setup();new MutationObserver(later).observe(document.body,{childList:true,subtree:true})}
 if(document.body)go();else document.addEventListener('DOMContentLoaded',go);
})();

/* Android app: route downloads and printing of the Original pages through the app (WebView cannot save blob: links) */
(function(){
  var A=window.FretLabAndroid;if(!A||!A.saveFile)return;
  function save(a){
    var href=a.href,name=a.getAttribute('download')||(href.split('/').pop().split('?')[0])||'fretlab-file';
    fetch(href).then(function(r){return r.blob()}).then(function(b){
      var fr=new FileReader();fr.onload=function(){var s=String(fr.result);try{A.saveFile(name,b.type||'application/octet-stream',s.slice(s.indexOf(',')+1))}catch(e){}};fr.readAsDataURL(b);
    }).catch(function(){});
  }
  var orig=HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click=function(){if(this.hasAttribute('download')){save(this);return}return orig.apply(this,arguments)};
  document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[download]');if(a){e.preventDefault();save(a)}},true);
  if(A.printPage)window.print=function(){try{A.printPage()}catch(e){}};
})();
