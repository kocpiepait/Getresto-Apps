define(["exports"],(function(t){"use strict";try{self["workbox:core:7.0.0"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.0.0"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class r{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class i extends r{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class o{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let o=i&&i.handler;const c=t.method;if(!o&&this.i.has(c)&&(o=this.i.get(c)),!o)return;let a;try{a=o.handle({url:s,request:t,event:e,params:r})}catch(t){a=Promise.reject(t)}const h=i&&i.catchHandler;return a instanceof Promise&&(this.o||h)&&(a=a.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),a}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const o=i.match({url:t,sameOrigin:e,request:s,event:n});if(o)return r=o,(Array.isArray(r)&&0===r.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"==typeof o)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let c;const a=()=>(c||(c=new o,c.addFetchListener(),c.addCacheListener()),c);function h(t,e,n){let o;if("string"==typeof t){const s=new URL(t,location.href);o=new r((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)o=new i(t,e,n);else if("function"==typeof t)o=new r(t,e,n);else{if(!(t instanceof r))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});o=t}return a().registerRoute(o),o}try{self["workbox:cacheable-response:7.0.0"]&&_()}catch(t){}class u{constructor(t={}){this.h=t.statuses,this.u=t.headers}isResponseCacheable(t){let e=!0;return this.h&&(e=this.h.includes(t.status)),this.u&&e&&(e=Object.keys(this.u).some((e=>t.headers.get(e)===this.u[e]))),e}}try{self["workbox:strategies:7.0.0"]&&_()}catch(t){}const l={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null},f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},w=t=>[f.prefix,t,f.suffix].filter((t=>t&&t.length>0)).join("-"),d=t=>t||w(f.precache),p=t=>t||w(f.runtime);function y(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class g{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const R=new Set;function m(t){return"string"==typeof t?new Request(t):t}class v{constructor(t,e){this.l={},Object.assign(this,e),this.event=e.event,this.p=t,this.g=new g,this.R=[],this.m=[...t.plugins],this.v=new Map;for(const t of this.m)this.v.set(t,{});this.event.waitUntil(this.g.promise)}async fetch(t){const{event:e}=this;let n=m(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const i=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.p.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:i,response:t});return t}catch(t){throw r&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:r.clone(),request:i.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=m(t);let s;const{cacheName:n,matchOptions:r}=this.p,i=await this.getCacheKey(e,"read"),o=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,o);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const n=m(t);var r;await(r=0,new Promise((t=>setTimeout(t,r))));const i=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(o=i.url,new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var o;const c=await this.q(e);if(!c)return!1;const{cacheName:a,matchOptions:h}=this.p,u=await self.caches.open(a),l=this.hasCallback("cacheDidUpdate"),f=l?await async function(t,e,s,n){const r=y(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),o=await t.keys(e,i);for(const e of o)if(r===y(e.url,s))return t.match(e,n)}(u,i.clone(),["__WB_REVISION__"],h):null;try{await u.put(i,l?c.clone():c)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of R)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:a,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.l[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=m(await t({mode:e,request:n,event:this.event,params:this.params}));this.l[s]=n}return this.l[s]}hasCallback(t){for(const e of this.p.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.p.plugins)if("function"==typeof e[t]){const s=this.v.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.R.push(t),t}async doneWaiting(){let t;for(;t=this.R.shift();)await t}destroy(){this.g.resolve(null)}async q(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class q{constructor(t={}){this.cacheName=p(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new v(this,{event:e,request:s,params:n}),i=this.U(r,s,e);return[i,this.L(i,r,s,e)]}async U(t,e,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(r=await this._(e,t),!r||"error"===r.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(r=await i({error:s,event:n,request:e}),r)break;if(!r)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))r=await s({event:n,request:e,response:r});return r}async L(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}function U(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:7.0.0"]&&_()}catch(t){}function b(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const r=new URL(n,location.href),i=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",e),{cacheKey:r.href,url:i.href}}class L{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class C{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.C.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.C=t}}let E,O;async function x(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const r=t.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},o=e?e(i):i,c=function(){if(void 0===E){const t=new Response("");if("body"in t)try{new Response(t.body),E=!0}catch(t){E=!1}E=!1}return E}()?r.body:await r.blob();return new Response(c,o)}class N extends q{constructor(t={}){t.cacheName=d(t.cacheName),super(t),this.O=!1!==t.fallbackToNetwork,this.plugins.push(N.copyRedirectedCacheableResponsesPlugin)}async _(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.N(t,e):await this.W(t,e))}async W(t,e){let n;const r=e.params||{};if(!this.O)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=r.integrity,i=t.integrity,o=!i||i===s;n=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?i||s:void 0})),s&&o&&"no-cors"!==t.mode&&(this.j(),await e.cachePut(t,n.clone()))}return n}async N(t,e){this.j();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}j(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==N.copyRedirectedCacheableResponsesPlugin&&(n===N.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(N.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}N.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},N.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await x(t):t};class W{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.k=new Map,this.K=new Map,this.T=new Map,this.p=new N({cacheName:d(t),plugins:[...e,new C({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.p}precache(t){this.addToCacheList(t),this.M||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.M=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:r}=b(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.k.has(r)&&this.k.get(r)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.k.get(r),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.T.has(t)&&this.T.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:r});this.T.set(t,n.integrity)}if(this.k.set(r,t),this.K.set(r,i),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return U(t,(async()=>{const e=new L;this.strategy.plugins.push(e);for(const[e,s]of this.k){const n=this.T.get(s),r=this.K.get(e),i=new Request(e,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return U(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.k.values()),n=[];for(const r of e)s.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.k}getCachedURLs(){return[...this.k.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.k.get(e.href)}getIntegrityForCacheKey(t){return this.T.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const j=()=>(O||(O=new W),O);class k extends r{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const r of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const o=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(i,e);if(yield o.href,s&&o.pathname.endsWith("/")){const t=new URL(o.href);t.pathname+=s,yield t.href}if(n){const t=new URL(o.href);t.pathname+=".html",yield t.href}if(r){const t=r({url:i});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(r);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.P.isResponseCacheable(t)?t:null,this.P=new u(t)}},t.StaleWhileRevalidate=class extends q{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(l)}async _(t,e){const n=e.fetchAndCachePut(t).catch((()=>{}));e.waitUntil(n);let r,i=await e.cacheMatch(t);if(i);else try{i=await n}catch(t){t instanceof Error&&(r=t)}if(!i)throw new s("no-response",{url:t.url,error:r});return i}},t.precacheAndRoute=function(t,e){!function(t){j().precache(t)}(t),function(t){const e=j();h(new k(e,t))}(e)},t.registerRoute=h}));
//# sourceMappingURL=workbox-97767ba9.js.map
