(function(psleParams) {

var jwplacementsEmbed=function(e){let t=window,n=t.document;function i(...e){if(e.length>0){const n=e.shift();t.console.error(`JW Placements: ${n}`,...e)}}
/*! @name @jwplayer/service-loader @version 2.0.2 @copyright JWP */let r=class e{static normalizeVersion(e,t){return e.trim().replace(/^v/i,"").split(".").map(parseFloat).filter((e=>!Number.isNaN(e))).join(t)}static generateCacheKey(t,n){return`${t}@@${e.normalizeVersion(n,".")}`}static makePromise(){let e,t,n=new Promise(((n,i)=>{e=n,t=i}));return n.resolve=e,n.reject=t,n}},s=class{get key(){return r.generateCacheKey(this.name,this.version)}constructor(e,t,n){this.name=e,this.version=t,this.promise=n,this.timeoutId=void 0,this.scriptElement=null}},o="-1.-1.-1",a=e=>/^v?(\d+)(\.\d+)?(\.\d+)?([-+][0-9a-zA-Z-.]*)?$/.test(e),c=class e{static getServiceLoader(t){let{globalVal:n}=t||{},i=n||window;return i.jwpServices||(i.jwpServices=new e(t)),i.jwpServices}addOverrides(e){if(Array.isArray(e)||"object"!=typeof e||(e=[e]),!Array.isArray(e))throw Error("addOverrides only accepts an array of object or a single object");for(let{name:t,client:n}of e){if(!t||!n)throw Error(`invalid entry was passed to addOverrides. Objects must have a name and a client (url/version). ${JSON.stringify({name:t,client:n})}`);let e=n;a(n)&&(e=this._makeFetchUrl(t,n.replace(/^v/i,""))),this._overrides.set(t,e)}}delOverrides(e){if(Array.isArray(e)||"object"!=typeof e||(e=[e]),!Array.isArray(e))throw Error("delOverrides only accepts an array of object or a single object");for(let{name:t}of e){if(!t)throw Error("invalid entry was passed to delOverrides. Objects must have a name");this._overrides.delete(t)}}async getService(e,t){this._overrides.has(e)&&(t=o);let n=r.generateCacheKey(e,t);if(this._serviceCache.has(n))return this._serviceCache.get(n);if(this._loadingEntries.has(e)){let n=this._loadingEntries.get(e);if(n.version===t)return n.promise;if(this._pendingQueue.has(e)){let n=this._pendingQueue.get(e);if(null==n?void 0:n.length){let e=n.find((e=>e.version===t));if(e)return e.promise}}let i=r.makePromise(),o=new s(e,t,i);return this._makePending(o),i}let i=r.makePromise(),a=new s(e,t,i);return this._doLoad(a),i}async registerService(e,t){if(!e||!t)return;let{currentScript:n}=this._global.document,i=await t,s=this._overrides.has(e)?o:i.version,a=r.generateCacheKey(e,s);if(!this._loadingEntries.has(e))return this._registerNonLoadingService(e,t);let c=this._loadingEntries.get(e);if(!c)return;let u=c.promise,l=c.key;if(c.scriptElement!==n)return this._registerNonLoadingService(e,t);this._loadingEntries.delete(e),clearTimeout(c.timeoutId);let d=this._serviceCache.get(a);if(d)return this._serviceCache.set(l,d),this._maybeMovePendingToLoading(e),u.resolve(d);this._serviceCache.set(l,i),l!==a&&this._serviceCache.set(a,u),this._maybeResolveOtherPending(e,t,s),this._maybeMovePendingToLoading(e),u.resolve(t)}async _registerNonLoadingService(e,t){let n=await t,i=this._overrides.has(e)?o:n.version,s=r.generateCacheKey(e,i);this._serviceCache.has(s)||(this._serviceCache.set(s,n),this._maybeResolveOtherPending(e,t,i))}_maybeResolveOtherPending(e,t,n){let i=this._pendingQueue.get(e);if(!i)return;if(!i.length)return void this._pendingQueue.delete(e);let r=i.findIndex((e=>e.version===n));if(-1===r)return;let s=i.splice(r,1)[0];i.length||this._pendingQueue.delete(e),s.promise.resolve(t)}_makePending(e){let{name:t}=e,n=this._pendingQueue.get(t);n?n.push(e):this._pendingQueue.set(t,[e])}_doLoad(e){let{name:t}=e;this._setTimeout(e),this._createScriptElement(e),this._loadingEntries.set(t,e)}_setTimeout(e){let t=Error("script loading timeout error");e.timeoutId=setTimeout(this._scriptError(e),2e4,t)}_createScriptElement(e){let{name:t,version:n}=e,i=this._global.document.createElement("script");i.type="text/javascript",i.src=this._makeFetchUrl(t,n),i.onerror=this._scriptError(e),i.async=!0,e.scriptElement=i,this._global.document.head.appendChild(i)}_scriptError(e){return t=>{var n;let{name:i,promise:r}=e;clearTimeout(e.timeoutId),e.scriptElement&&(e.scriptElement.onerror=null);let s=(null==e||null==(n=e.scriptElement)?void 0:n.src)?` at ${e.scriptElement.src}`:"",o=(null==t?void 0:t.message)?` with error: ${t.message}`:"";this._loadingEntries.delete(i),this._maybeMovePendingToLoading(i),r.reject(Error(`Failed to load service ${i}${s}${o}`))}}_makeFetchUrl(e,t){let n=this._overrides.get(e);if(n)return n;let i=r.normalizeVersion(t,"/");return`${this._baseUrl}/${e}/v/${i}/index.js`}_maybeMovePendingToLoading(e){let t=this._pendingQueue.get(e);if(!(null==t?void 0:t.length))return;let n=t.shift();n&&this._doLoad(n)}constructor(e){let{baseUrl:t,globalVal:n}=e||{};if(this._baseUrl=t||"https://ssl.p.jwpcdn.com/player/services",this._global=n||window,this._overrides=new Map,this._pendingQueue=new Map,this._loadingEntries=new Map,this._serviceCache=new Map,this._global.location){let e=new URL(this._global.location.href).searchParams.getAll("jwpcslOverride");this.addOverrides(e.reduce(((e,t)=>{let n=t.indexOf(":");if(-1===n)return console.warn("Skipping unsupported jwpcslOverride value",t),e;let i=t.slice(0,n),r=t.slice(n+1);return e.push({name:i,client:r}),e}),[]))}}};const u={};function l(e){return function(e=window){const t=e.navigator.plugins;if(t&&"object"==typeof t["Shockwave Flash"]){const e=t["Shockwave Flash"].description;if(e)return e}if(void 0!==window.ActiveXObject)try{const e=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(e){const t=e.GetVariable("$version");if(t)return t}}catch(e){}return""}(e).replace(/\D+(\d+\.?\d*).*/,"$1")}function d(){try{const e=window.crypto||window.msCrypto;if(e&&e.getRandomValues)return e.getRandomValues(new Uint32Array(1))[0].toString(36)}catch(e){}return Math.random().toString(36).slice(2,9)}function h(e){let t="";for(;t.length<e;)t+=d();return t.slice(0,e)}(()=>{const e=l(window)})();const p=h(12);function f(e,t,n=window){const{document:i,top:r,location:s}=n,o=i.referrer,a=function(e){return e.top!==e.self}(n),c=function(e,t,n){let i="",r="",s="",o=!1;if(e){if(r=t,i=function(e){const t=/^(https?:\/\/).*\.(?:ampproject\.org|bing-amp\.com)\/(?:.\/)?(?:.\/)?(.*)$/,n=e.match(t);if(n&&n.length>1)return`${n[1]}${n[2]}`;const i=/^(https?:\/\/.*)\.(?:cdn\.ampproject\.org|bing-amp\.com)$/,r=e.match(i);if(r&&r.length>1)return`${r[1]}`.replace(/([^-])(\-)([^-])/g,"$1.$3").replace(/\-\-/g,"-");return e}(t),o=i!==t,!n)return{pageURL:i,origPageURL:r,amp:o,pageTitle:s};try{s=n.document.title;const e=n.location.href;r=r||e,i=i||e}catch(e){}}return{pageURL:i,origPageURL:r,amp:o,pageTitle:s}}(a,o,r),u=i.querySelector('meta[property="og:title"]');let d;return u&&(d=u.getAttribute("content")),{pageURL:c.pageURL||s.href,origPageURL:c.amp?c.origPageURL:void 0,pageTitle:c.pageTitle||i.title,inIframe:a,flashVersion:l(n),pageViewId:p,pageOGTitle:d,testCaseId:void 0,amp:c.amp,jwAmpComponent:(h=i.location.search,/isAMP/.test(h))};var h}function m(e=window){try{if(e.top!==e.self)return e.top.document.referrer}catch(e){return null}return e.document.referrer}const g="jw",y="player",v="0.45.0",b="javascript",w="vertical",E="dynamicAds",_="idle",x="play",C="pause",I="buffer",S="adError",P="mute",A="playlist",T="playlistItem",D="resize",k="viewable",O="remove",j="adRequestedContentResume",R="adScheduleChanged",L="playlistItemTransition",F="object",N="text/javascript",M="utf-8",B=1,V=2,U=3,$="global",q="data-jw-",z=q+$+"-",W=q+"placement-id",G="custom.",H="Other",K="Desktop",Z="iOS",Q="Android",X="Linux",Y="FireOS",J="Mac OS",ee="Mac OS X",te="ChromecastOS",ne="RokuOS",ie="tvOS",re="BB10",se="Safari",oe="Twitter",ae="Pinterest",ce="Roku",ue="Valve",le="Vewd",de="post",he="Object";function pe(e){return function(e,t){return Object.prototype.toString.call(e)==="["+F+" "+t+"]"}(e,he)}function fe(e,t,{checkTypes:n=!1}={}){if(e===t)return!0;if(typeof e===F&&null!==e&&typeof t===F&&null!==t&&(!n||e.constructor===t.constructor)){if(e instanceof Set&&t instanceof Set)return e.size===t.size&&[...e].every((e=>t.has(e)));if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const i in e){if(!Object.hasOwn(t,i))return!1;if(!fe(e[i],t[i],{checkTypes:n}))return!1}return!0}return!1}function me(e,...t){if(!t.length)return e;const n=t.shift();if(pe(e)&&pe(n))for(const t in n)pe(n[t])?(e[t]||Object.assign(e,{[t]:{}}),me(e[t],n[t])):Object.assign(e,{[t]:n[t]});return me(e,...t)}function ge(e,t,n){return!!e&&(e.charAt(0)===t&&e.charAt(e.length-1)===n)}function ye(e){return!e||e.length<3?"":e.substring(1,e.length-1)}function ve(e,t){return!(!e||!t)&&("string"==typeof e?e.includes(t):!!Array.isArray(e)&&e.some((e=>ve(e,t))))}function be(e,t,n){if(e)return t?"string"==typeof e?function(e,t,n){if(e===t)return n;return e.replaceAll(t,n)}(e,t,n):Array.isArray(e)?function(e,t,n){return e.map((e=>be(e,t,n)))}(e,t,n):e:e}function we(e){if(!e)return;const t=xe(e);if(!t)return;const n={};return t.searchParams.forEach(((e,t)=>{n[t]=e})),n}function Ee(e,t){const n=function(e){const t=_e(e,'meta[property="og:title"]');if(t)return t;const n=e.querySelector("title");if(n)return n.textContent}(t);n&&e.searchParams.set("search",n);const i=_e(t,'meta[property="og:description"]')||_e(t,'meta[name="description"]');i&&e.searchParams.set("page_description",i)}function _e(e,t){const n=e.querySelector(t);if(n)return n.getAttribute("content")}function xe(e){try{return new URL(e)}catch(e){}}function Ce(e,t){try{new Function("payload",e)(t)}catch(e){}}function Ie(e,t){const n=new Promise(((e,n)=>setTimeout((()=>{n(new Error("Promise has timed out."))}),t)));return Promise.race([e,n])}const Se=()=>{};function Pe(e){return!!e&&"function"==typeof e}function Ae(e,t){const n=function(e){const t=f(0,0,e),n=t.pageURL,i={url:n,referrer:m(e)};if(!n)return i;const r=function(e){const t=xe(e);if(!t)return;return{query_params:we(e),domain:t.host,schema:t.protocol,route:t.pathname,fragment:t.hash.slice(1)}}(n);return Object.assign(i,r),i}(e);t.page=n}var Te="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},De={exports:{}};!function(e,t){!function(n,i){var r="function",s="undefined",o="object",a="string",c="major",u="model",l="name",d="type",h="vendor",p="version",f="architecture",m="console",g="mobile",y="tablet",v="smarttv",b="wearable",w="embedded",E="Amazon",_="Apple",x="ASUS",C="BlackBerry",I="Browser",S="Chrome",P="Firefox",A="Google",T="Huawei",D="LG",k="Microsoft",O="Motorola",j="Opera",R="Samsung",L="Sharp",F="Sony",N="Xiaomi",M="Zebra",B="Facebook",V="Chromium OS",U="Mac OS",$=function(e){for(var t={},n=0;n<e.length;n++)t[e[n].toUpperCase()]=e[n];return t},q=function(e,t){return typeof e===a&&-1!==z(t).indexOf(z(e))},z=function(e){return e.toLowerCase()},W=function(e,t){if(typeof e===a)return e=e.replace(/^\s\s*/,""),typeof t===s?e:e.substring(0,350)},G=function(e,t){for(var n,s,a,c,u,l,d=0;d<t.length&&!u;){var h=t[d],p=t[d+1];for(n=s=0;n<h.length&&!u&&h[n];)if(u=h[n++].exec(e))for(a=0;a<p.length;a++)l=u[++s],typeof(c=p[a])===o&&c.length>0?2===c.length?typeof c[1]==r?this[c[0]]=c[1].call(this,l):this[c[0]]=c[1]:3===c.length?typeof c[1]!==r||c[1].exec&&c[1].test?this[c[0]]=l?l.replace(c[1],c[2]):i:this[c[0]]=l?c[1].call(this,l,c[2]):i:4===c.length&&(this[c[0]]=l?c[3].call(this,l.replace(c[1],c[2])):i):this[c]=l||i;d+=2}},H=function(e,t){for(var n in t)if(typeof t[n]===o&&t[n].length>0){for(var r=0;r<t[n].length;r++)if(q(t[n][r],e))return"?"===n?i:n}else if(q(t[n],e))return"?"===n?i:n;return e},K={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},Z={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[p,[l,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[p,[l,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[l,p],[/opios[\/ ]+([\w\.]+)/i],[p,[l,j+" Mini"]],[/\bopr\/([\w\.]+)/i],[p,[l,j]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[l,p],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[p,[l,"UC"+I]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[p,[l,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[p,[l,"WeChat"]],[/konqueror\/([\w\.]+)/i],[p,[l,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[p,[l,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[p,[l,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[l,/(.+)/,"$1 Secure "+I],p],[/\bfocus\/([\w\.]+)/i],[p,[l,P+" Focus"]],[/\bopt\/([\w\.]+)/i],[p,[l,j+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[p,[l,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[p,[l,"Dolphin"]],[/coast\/([\w\.]+)/i],[p,[l,j+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[p,[l,"MIUI "+I]],[/fxios\/([-\w\.]+)/i],[p,[l,P]],[/\bqihu|(qi?ho?o?|360)browser/i],[[l,"360 "+I]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[l,/(.+)/,"$1 "+I],p],[/(comodo_dragon)\/([\w\.]+)/i],[[l,/_/g," "],p],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[l,p],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[l],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[l,B],p],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[l,p],[/\bgsa\/([\w\.]+) .*safari\//i],[p,[l,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[p,[l,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[p,[l,S+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[l,S+" WebView"],p],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[p,[l,"Android "+I]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[l,p],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[p,[l,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[p,l],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[l,[p,H,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[l,p],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[l,"Netscape"],p],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[p,[l,P+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[l,p],[/(cobalt)\/([\w\.]+)/i],[l,[p,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[f,"amd64"]],[/(ia32(?=;))/i],[[f,z]],[/((?:i[346]|x)86)[;\)]/i],[[f,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[f,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[f,"armhf"]],[/windows (ce|mobile); ppc;/i],[[f,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[f,/ower/,"",z]],[/(sun4\w)[;\)]/i],[[f,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[f,z]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[u,[h,R],[d,y]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[u,[h,R],[d,g]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[u,[h,_],[d,g]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[u,[h,_],[d,y]],[/(macintosh);/i],[u,[h,_]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[u,[h,L],[d,g]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[u,[h,T],[d,y]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[u,[h,T],[d,g]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[u,/_/g," "],[h,N],[d,g]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[u,/_/g," "],[h,N],[d,y]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[u,[h,"OPPO"],[d,g]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[u,[h,"Vivo"],[d,g]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[u,[h,"Realme"],[d,g]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[u,[h,O],[d,g]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[u,[h,O],[d,y]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[u,[h,D],[d,y]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[u,[h,D],[d,g]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[u,[h,"Lenovo"],[d,y]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[u,/_/g," "],[h,"Nokia"],[d,g]],[/(pixel c)\b/i],[u,[h,A],[d,y]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[u,[h,A],[d,g]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[u,[h,F],[d,g]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[u,"Xperia Tablet"],[h,F],[d,y]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[u,[h,"OnePlus"],[d,g]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[u,[h,E],[d,y]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[u,/(.+)/g,"Fire Phone $1"],[h,E],[d,g]],[/(playbook);[-\w\),; ]+(rim)/i],[u,h,[d,y]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[u,[h,C],[d,g]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[u,[h,x],[d,y]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[u,[h,x],[d,g]],[/(nexus 9)/i],[u,[h,"HTC"],[d,y]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[h,[u,/_/g," "],[d,g]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[u,[h,"Acer"],[d,y]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[u,[h,"Meizu"],[d,g]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[h,u,[d,g]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[h,u,[d,y]],[/(surface duo)/i],[u,[h,k],[d,y]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[u,[h,"Fairphone"],[d,g]],[/(u304aa)/i],[u,[h,"AT&T"],[d,g]],[/\bsie-(\w*)/i],[u,[h,"Siemens"],[d,g]],[/\b(rct\w+) b/i],[u,[h,"RCA"],[d,y]],[/\b(venue[\d ]{2,7}) b/i],[u,[h,"Dell"],[d,y]],[/\b(q(?:mv|ta)\w+) b/i],[u,[h,"Verizon"],[d,y]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[u,[h,"Barnes & Noble"],[d,y]],[/\b(tm\d{3}\w+) b/i],[u,[h,"NuVision"],[d,y]],[/\b(k88) b/i],[u,[h,"ZTE"],[d,y]],[/\b(nx\d{3}j) b/i],[u,[h,"ZTE"],[d,g]],[/\b(gen\d{3}) b.+49h/i],[u,[h,"Swiss"],[d,g]],[/\b(zur\d{3}) b/i],[u,[h,"Swiss"],[d,y]],[/\b((zeki)?tb.*\b) b/i],[u,[h,"Zeki"],[d,y]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[h,"Dragon Touch"],u,[d,y]],[/\b(ns-?\w{0,9}) b/i],[u,[h,"Insignia"],[d,y]],[/\b((nxa|next)-?\w{0,9}) b/i],[u,[h,"NextBook"],[d,y]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[h,"Voice"],u,[d,g]],[/\b(lvtel\-)?(v1[12]) b/i],[[h,"LvTel"],u,[d,g]],[/\b(ph-1) /i],[u,[h,"Essential"],[d,g]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[u,[h,"Envizen"],[d,y]],[/\b(trio[-\w\. ]+) b/i],[u,[h,"MachSpeed"],[d,y]],[/\btu_(1491) b/i],[u,[h,"Rotor"],[d,y]],[/(shield[\w ]+) b/i],[u,[h,"Nvidia"],[d,y]],[/(sprint) (\w+)/i],[h,u,[d,g]],[/(kin\.[onetw]{3})/i],[[u,/\./g," "],[h,k],[d,g]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[u,[h,M],[d,y]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[u,[h,M],[d,g]],[/smart-tv.+(samsung)/i],[h,[d,v]],[/hbbtv.+maple;(\d+)/i],[[u,/^/,"SmartTV"],[h,R],[d,v]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[h,D],[d,v]],[/(apple) ?tv/i],[h,[u,_+" TV"],[d,v]],[/crkey/i],[[u,S+"cast"],[h,A],[d,v]],[/droid.+aft(\w+)( bui|\))/i],[u,[h,E],[d,v]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[u,[h,L],[d,v]],[/(bravia[\w ]+)( bui|\))/i],[u,[h,F],[d,v]],[/(mitv-\w{5}) bui/i],[u,[h,N],[d,v]],[/Hbbtv.*(technisat) (.*);/i],[h,u,[d,v]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[h,W],[u,W],[d,v]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[d,v]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[h,u,[d,m]],[/droid.+; (shield) bui/i],[u,[h,"Nvidia"],[d,m]],[/(playstation [345portablevi]+)/i],[u,[h,F],[d,m]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[u,[h,k],[d,m]],[/((pebble))app/i],[h,u,[d,b]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[u,[h,_],[d,b]],[/droid.+; (glass) \d/i],[u,[h,A],[d,b]],[/droid.+; (wt63?0{2,3})\)/i],[u,[h,M],[d,b]],[/(quest( 2| pro)?)/i],[u,[h,B],[d,b]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[h,[d,w]],[/(aeobc)\b/i],[u,[h,E],[d,w]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[u,[d,g]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[u,[d,y]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[d,y]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[d,g]],[/(android[-\w\. ]{0,9});.+buil/i],[u,[h,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[p,[l,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[p,[l,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[l,p],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[p,l]],os:[[/microsoft (windows) (vista|xp)/i],[l,p],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[l,[p,H,K]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[l,"Windows"],[p,H,K]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[p,/_/g,"."],[l,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[l,U],[p,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[p,l],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[l,p],[/\(bb(10);/i],[p,[l,C]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[p,[l,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[p,[l,P+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[p,[l,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[p,[l,"watchOS"]],[/crkey\/([\d\.]+)/i],[p,[l,S+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[l,V],p],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[l,p],[/(sunos) ?([\w\.\d]*)/i],[[l,"Solaris"],p],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[l,p]]},Q=function(e,t){if(typeof e===o&&(t=e,e=i),!(this instanceof Q))return new Q(e,t).getResult();var m=typeof n!==s&&n.navigator?n.navigator:i,v=e||(m&&m.userAgent?m.userAgent:""),b=m&&m.userAgentData?m.userAgentData:i,w=t?function(e,t){var n={};for(var i in e)t[i]&&t[i].length%2==0?n[i]=t[i].concat(e[i]):n[i]=e[i];return n}(Z,t):Z,E=m&&m.userAgent==v;return this.getBrowser=function(){var e,t={};return t[l]=i,t[p]=i,G.call(t,v,w.browser),t[c]=typeof(e=t[p])===a?e.replace(/[^\d\.]/g,"").split(".")[0]:i,E&&m&&m.brave&&typeof m.brave.isBrave==r&&(t[l]="Brave"),t},this.getCPU=function(){var e={};return e[f]=i,G.call(e,v,w.cpu),e},this.getDevice=function(){var e={};return e[h]=i,e[u]=i,e[d]=i,G.call(e,v,w.device),E&&!e[d]&&b&&b.mobile&&(e[d]=g),E&&"Macintosh"==e[u]&&m&&typeof m.standalone!==s&&m.maxTouchPoints&&m.maxTouchPoints>2&&(e[u]="iPad",e[d]=y),e},this.getEngine=function(){var e={};return e[l]=i,e[p]=i,G.call(e,v,w.engine),e},this.getOS=function(){var e={};return e[l]=i,e[p]=i,G.call(e,v,w.os),E&&!e[l]&&b&&"Unknown"!=b.platform&&(e[l]=b.platform.replace(/chrome os/i,V).replace(/macos/i,U)),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return v},this.setUA=function(e){return v=typeof e===a&&e.length>350?W(e,350):e,this},this.setUA(v),this};Q.VERSION="1.0.36",Q.BROWSER=$([l,p,c]),Q.CPU=$([f]),Q.DEVICE=$([u,h,d,m,g,v,y,b,w]),Q.ENGINE=Q.OS=$([l,p]),e.exports&&(t=e.exports=Q),t.UAParser=Q;var X=typeof n!==s&&(n.jQuery||n.Zepto);if(X&&!X.ua){var Y=new Q;X.ua=Y.getResult(),X.ua.get=function(){return Y.getUA()},X.ua.set=function(e){Y.setUA(e);var t=Y.getResult();for(var n in t)X.ua[n]=t[n]}}}("object"==typeof window?window:Te)}(De,De.exports);var ke=De.exports;const Oe={[ke.UAParser.DEVICE.CONSOLE]:H,[ke.UAParser.DEVICE.MOBILE]:"Phone",[ke.UAParser.DEVICE.TABLET]:"Tablet",[ke.UAParser.DEVICE.SMARTTV]:"TV",[ke.UAParser.DEVICE.WEARABLE]:H,[ke.UAParser.DEVICE.EMBEDDED]:H},je={Android:Q,iOS:Z,Linux:X,"Chromium OS":"Chrome OS",Windows:"Windows","Mac OS":J,"Mac OS X":ee,Chromecast:te,FreeBSD:"FreeBSD",BlackBerry:re,webOS:"LG WebOS",Tizen:"Samsung Tizen"},Re={Chrome:"Chrome",Safari:se,"Mobile Safari":se,Firefox:"Firefox",Edge:"Microsoft Edge",Facebook:"Facebook",GSA:"Google Search App",WebKit:"Webkit",IE:"Internet Explorer",UCBrowser:"UC Browser"};function Le(e){const t=new ke.UAParser(e),n=t.getDevice(),i=t.getBrowser(),r=t.getOS(),s=function(e,t){const n=function(e,t){const n=e.name,i=e.version;if(!n)return function(e){const t=e.model,n=e.type,i=e.vendor;if("Roku"===i)return ne;if("Chromecast"===t)return te;if("Apple TV"===t)return ie;if("BlackBerry"===i&&n===ke.UAParser.DEVICE.MOBILE)return re;return H}(t);if(n===J&&i)return function(e){const t=e.split(".");let n=10===parseInt(t[0],10);if(n&&t.length>1){n=parseInt(t[1],10)<=11}return n?ee:J}(i);if(function(e,t){const n=e.name,i=t.vendor,r=t.type;return!("Amazon"!==i&&"Kindle"!==i||n!==Q&&n!==X||r!==ke.UAParser.DEVICE.SMARTTV&&r!==ke.UAParser.DEVICE.TABLET)}(e,t))return Y;const r=je[n];if(r)return r;return H}(e,t);return{name:n}}(r,n),o=function(e,t,n){const i=t.name,r=n.name,s=function(e,t,n){const i=e.type||"",r=Oe[i];if(r)return r;if(t===Q||t===Z||"Mobile Safari"===n)return H;return K}(e,i,r);return{type:s}}(n,i,r),a=function(e,t){const n={version:e.version,name:H};e.major&&(n.major_version=parseInt(e.major,10));const i=function(e){if(e.includes("Twitter"))return oe;if(e.includes("Pinterest"))return ae;if(/Roku.*\/DVP|RokuBrowser/.test(e))return ce;if(/Mozilla.*Valve/.test(e))return ue;if(/Linux.*OMI/.test(e))return le}(t);if(i)return n.name=i,n;return n.name=function(e){const t=e.name;if(!t)return H;const n=Re[t];if(n)return n;return H}(e),n}(i,e);return{device:o,browser:a,os:s}}function Fe(){return(t.top||t).localStorage}const Ne=new Set(["AS","AU","BD","BN","BT","CC","CN","CX","FJ","FM","GU","HK","ID","IN","IO","JP","KH","KI","KP","KR","LA","LK","MH","MM","MN","MO","MP","MV","MY","NF","NP","NR","NU","NZ","PG","PH","PK","PN","PW","SB","SG","TH","TK","TL","TO","TV","TW","UM","VN","VU","WS"]),Me=new Set(["AG","AI","AR","AW","BB","BM","BO","BR","BS","BZ","CL","CO","CR","CU","DM","DO","EC","FK","GD","GS","GT","GY","HN","HT","JM","KN","KY","LC","MS","MX","NI","PA","PE","PR","PY","SR","SV","TC","TT","UY","VC","VE","VG","VI"]),Be=new Set(["AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GR","HR","HU","IE","IT","LT","LU","LV","MT","NL","PL","PT","RO","SE","SI","SK"]),Ve={APAC:Ne,EMEA:new Set(["AD","AE","AF","AL","AM","AO","AT","AX","AZ","BA","BE","BF","BG","BH","BI","BJ","BL","BV","BW","BY","CD","CF","CG","CH","CI","CK","CM","CV","CW","CY","CZ","DE","DJ","DK","DZ","EE","EG","EH","ER","ES","ET","FI","FO","FR","GA","GB","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GW","HM","HR","HU","IE","IL","IM","IQ","IR","IS","IT","JE","JO","KE","KG","KM","KW","KZ","LB","LI","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MK","ML","MQ","MR","MT","MU","MW","MZ","NA","NC","NE","NG","NL","NO","OM","PF","PL","PM","PS","PT","QA","RE","RO","RS","RU","RW","SA","SC","SD","SE","SH","SI","SK","SL","SM","SN","SO","SS","ST","SX","SY","SZ","TD","TF","TG","TJ","TM","TN","TR","TZ","UA","UG","UZ","VA","WF","YE","YT","ZA","ZM","ZW"]),EU:Be,LATAM:Me};function Ue(e,t){const n=function(){const e=function(e){try{const t=Fe().getItem(e);if(!t)return null;const n=JSON.parse(t);if(n)return n.data}catch(e){}return null}("geoData");if(!e)return $e();(function(e,t){try{const n=Fe().getItem(e);if(!n)return!0;const i=JSON.parse(n);return(new Date).getTime()-i.timestamp>t}catch(e){return!0}})("geoData",864e5)&&$e().catch((()=>{}));return Promise.resolve(e)}().then((t=>{!function(e,t){const{country:n,subdivision:i}=e,r=n?function(e){const t=[];for(const[n,i]of Object.entries(Ve))i.has(e)&&t.push(n);return t}(n):[];t.geo={country:n,subdivision:i,regions:r}}(t,e)})).catch((()=>{}));return Ie(n,t)}function $e(){return fetch("https://cdn.jwplayer.com/v2/geo.json").then((e=>e.json())).then((e=>({country:e.country_code,subdivision:e.region_code}))).then((e=>(function(e,t){try{const n={data:t,timestamp:(new Date).getTime()};Fe().setItem(e,JSON.stringify(n))}catch(e){}}("geoData",e),e)))}function qe(){return t.jwDataStore||{}}const ze=new class{constructor(){this.placementAttributesData={},this.queryParamsData={}}setPlacementAttributesData(e){me(this.placementAttributesData,e)}setQueryParamsData(e){me(this.queryParamsData,e)}updateExternalDataStore(){!function(e){const n=qe();t.jwDataStore=me({},e,n)}(me({},this.queryParamsData,{custom:this.placementAttributesData}))}};function We(e,t){const n=e.split("."),i={};return n.reduce(((e,i,r)=>{if(r!==n.length-1)return e[i]={},e[i];e[i]=t}),i),i}function Ge(e,t,n,i){He(e,t.split("."),n,i)}function He(e,t,n,i){function r(){Pe(i)&&i()}if(Array.isArray(e))return void e.forEach((e=>He(e,t,n,i)));if(!t.length||!pe(e))return void r();const s=t[0],o=e[s];void 0!==o?1!==t.length?He(o,t.slice(1),n,i):n(s,e):r()}function Ke(e){const t=function(e){if(!e)return{};const t={};return Object.keys(e).forEach((n=>{if(n.startsWith(G)){let i=e[n];i.includes(",")&&(i=i.split(","));const r=We(n,i);me(t,r)}})),t}(e);ze.setQueryParamsData(t),ze.updateExternalDataStore()}const Ze=(e,t,n,i)=>{let r=-1;const s=e.length;for(;++r<s;){const s=e[r];if(i)try{s.callback.apply(s.context||n,t)}catch(e){console.error(`Error in "${i}" event handler:`,e)}else s.callback.apply(s.context||n,t)}},Qe=/\s+/,Xe=(e,t,n,i)=>{if(!n)return!0;if("object"==typeof n){for(const r in n)Object.hasOwn(n,r)&&e[t].apply(e,[r,n[r]].concat(i));return!1}if(Qe.test(n)){const r=n.split(Qe);for(let n=0,s=r.length;n<s;n++)e[t].apply(e,[r[n]].concat(i));return!1}return!0};class Ye{on(e,t,n){if(!Xe(this,"on",e,[t,n])||!t)return this;const i=this._events||(this._events={});return(i[e]||(i[e]=[])).push({callback:t,context:n}),this}once(e,t,n){if(!Xe(this,"once",e,[t,n])||!t)return this;let i=0;const r=this,s=function(){i++||(r.off(e,s),t.apply(this,arguments))};return s._callback=t,this.on(e,s,n)}off(e,t,n){if(!this._events||!Xe(this,"off",e,[t,n]))return this;if(!e&&!t&&!n)return delete this._events,this;const i=e?[e]:Object.keys(this._events);for(let r=0,s=i.length;r<s;r++){e=i[r];const s=this._events[e];if(s){const i=this._events[e]=[];if(t||n)for(let e=0,r=s.length;e<r;e++){const r=s[e];(t&&t!==r.callback&&t!==r.callback._callback||n&&n!==r.context)&&i.push(r)}i.length||delete this._events[e]}}return this}trigger(e,...t){if(!this._events)return this;if(!Xe(this,"trigger",e,t))return this;const n=this._events[e],i=this._events.all;return n&&Ze(n,t,this),i&&Ze(i,arguments,this),this}triggerSafe(e,...t){if(!this._events)return this;if(!Xe(this,"trigger",e,t))return this;const n=this._events[e],i=this._events.all;return n&&Ze(n,t,this,e),i&&Ze(i,arguments,this,e),this}}const Je=Ye.prototype.on,et=Ye.prototype.once,tt=Ye.prototype.off,nt=Ye.prototype.trigger;Ye.on=Je,Ye.once=et,Ye.off=tt,Ye.trigger=nt;class it extends Ye{constructor(e,t,n){super(),this.analyticsId=n,this.version=e,this.placementEventData={},this.queue=[],this.serviceLoaded=!1,t.getService("jwpsrv","4.x").then((e=>{e.register("placement",this),this.triggerQueuedEvents(),this.serviceLoaded=!0}))}triggerQueuedEvents(){this.queue.forEach((e=>{const{event:t,data:n}=e;super.trigger(t,n)})),this.queue.length=0}trigger(e,t){return this.serviceLoaded?super.trigger(e,t):(this.queue.push({event:e,data:t}),this)}emitLoadedEvent(){this.trigger("placementLoaded")}emitEmbedAttemptEvent(e){this.trigger("placementEmbedAttempt",Object.assign({},this.placementEventData[e]))}emitEmbedCompleteEvent(e){this.trigger("placementEmbedComplete",Object.assign({},this.placementEventData[e]))}emitEmbedErrorEvent(e){this.trigger("placementEmbedError",Object.assign({},this.placementEventData[e]))}emitEvaluationSuccessEvent(e,t,n){this.placementEventData[e].eid=t,this.placementEventData[e].so=n,this.trigger("placementEvaluationSuccess",Object.assign({},this.placementEventData[e]))}emitEvaluationErrorEvent(e,t){this.placementEventData[e].eid=t,this.trigger("placementEvaluationError",Object.assign({},this.placementEventData[e]))}emitTriggerEvent(e,t){this.trigger("placementTrigger",Object.assign(Object.assign({},this.placementEventData[e]),{tid:t}))}initPlacementEventData(e){this.placementEventData[e]||(this.placementEventData[e]={aid:this.analyticsId,idp:e,pei:h(8)})}getPlacementEventData(e){return this.placementEventData[e]||{}}}function rt(e,t,n,i){return new(n||(n=Promise))((function(r,s){function o(e){try{c(i.next(e))}catch(e){s(e)}}function a(e){try{c(i.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}c((i=i.apply(e,t||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;class st{constructor(){this.storage={}}store(e,t){this.storage[e]=t}retrieve(e){return this.storage[e]}}const ot=new st,at=new st,ct=12,ut="jwplacementLocalId";function lt(){return function(e,n){let i=function(e){let n;try{n=t.localStorage[e]}catch(e){}return n}(e);i||(i=h(n),function(e,n){try{t.localStorage[n]=e}catch(e){}}(i,e));return i}(ut,ct)}const dt="|",ht="&",pt="=",ft="!=",mt=">",gt="<",yt=">=",vt="<=",bt="true",wt="false",Et="in",_t="notIn",xt="between",Ct="notBetween",It="isNull",St="isNotNull",Pt="isUndefined",At="isDefined",Tt="isEmpty",Dt="isNotEmpty",kt="contains",Ot="excludes",jt="startsWith",Rt="doesNotStartWith",Lt="endsWith",Ft="doesNotEndWith",Nt="beforeDate",Mt="afterDate",Bt="betweenDates",Vt="toArray",Ut="toSet",$t=0,qt=1,zt=2,Wt=3,Gt=4,Ht=5,Kt=6,Zt=7,Qt=8,Xt=9,Yt="(",Jt=")",en=",",tn="'",nn=".";function rn(e,t={}){function n(e){const t=i(e.shift());let r=t.value;for(t.type===Ht&&(r=n(e));e.length;){const t=i(e.shift());if(t.type===Kt)return r;if(0===e.length&&t.execute){return t.execute(r)}const s=i(e.shift());let o=s.value;s.type===Ht&&(o=n(e)),t.execute&&(r=t.execute(r,o))}return r}function i(e){if(e===Yt)return{type:Ht};if(e===Jt)return{type:Kt};const n=function(e){switch(e){case Et:return(e,t)=>s(t,e);case _t:return(e,t)=>!s(t,e);case xt:return(e,t)=>{const[n,i]=t;return o(n,i,e)};case Ct:return(e,t)=>{const[n,i]=t;return!o(n,i,e)};case Pt:return e=>void 0===e;case At:return e=>void 0!==e;case It:return e=>null===e;case St:return e=>null!==e;case Tt:return e=>"string"==typeof e||Array.isArray(e)?0===e.length:e instanceof Set&&0===e.size;case Dt:return e=>"string"==typeof e||Array.isArray(e)?e.length>0:e instanceof Set&&e.size>0;case kt:return(e,t)=>s(e,t);case Ot:return(e,t)=>!s(e,t);case jt:return(e,t)=>a(e,t);case Rt:return(e,t)=>!a(e,t);case Lt:return(e,t)=>c(e,t);case Ft:return(e,t)=>!c(e,t);case Nt:return(e,t)=>("string"==typeof e&&(e=new Date(e)),"string"==typeof t&&(t=new Date(t)),e<t);case Mt:return(e,t)=>("string"==typeof e&&(e=new Date(e)),"string"==typeof t&&(t=new Date(t)),e>t);case Bt:return(e,t)=>{let[n,i]=t;return"string"==typeof n&&(n=new Date(n)),"string"==typeof i&&(i=new Date(i)),"string"==typeof e&&(e=new Date(e)),o(n,i,e)};default:return}}(e);if(n)return{type:Zt,execute:n};const i=function(e){switch(e){case Vt:return e=>Array.isArray(e)?e:"string"==typeof e?e.split(","):void 0;case Ut:return e=>{if(Array.isArray(e))return new Set(e)};default:return}}(e);if(i)return{type:Zt,execute:i};const u=function(e){switch(e){case pt:return(e,t)=>fe(e,t);case ft:return(e,t)=>!fe(e,t);case ht:return(e,t)=>e&&t;case dt:return(e,t)=>e||t;case mt:return(e,t)=>e>t;case gt:return(e,t)=>e<t;case yt:return(e,t)=>e>=t;case vt:return(e,t)=>e<=t;default:return}}(e);if(u)return{type:Gt,execute:u};const l=function(e){if(e===bt)return!0;if(e===wt)return!1}(e);if(void 0!==l)return{type:Xt,value:l};const d=function(e){const t=parseFloat(e);if(!isNaN(t))return t}(e);if(void 0!==d)return{type:zt,value:d};const h=function(e){if(ge(e,tn,tn))return ye(e)}(e);if(void 0!==h)return{type:qt,value:h};const p=function(e){if(!ge(e,Yt,Jt))return;e=ye(e);return e.split(en).flatMap(r)}(e);if(p)return{type:Qt,value:p};const f=function(e){const n=e.split(nn);let i=t;for(;n.length&&i&&"object"==typeof i;){i=i[n.shift()]}if(n.length)return;return{value:i}}(e);return f?{type:Wt,value:f.value}:{type:$t}}function r(e){return i(e).value}function s(e,t){return Array.isArray(e)?e.includes(t):e instanceof Set?e.has(t):"string"==typeof t&&e.toLowerCase().includes(t.toLowerCase())}function o(e,t,n){return e<=n&&n<=t}function a(e,t){return e.toLowerCase().startsWith(t.toLowerCase())}function c(e,t){return e.toLowerCase().endsWith(t.toLowerCase())}return function(e){const t=e.match(/(?:[^\s"']+|['"][^'"]*["'])+/g);return null!==t&&0!==t.length&&!!n(t)}(e)}function sn(e,t){return e.getAttributeNames().reduce(((n,i)=>{const r=function(e,t,n){if(!t.startsWith(q)||t===W)return;const i=function(e,t){const n=e.startsWith(z),i=function(e,t){if(e.startsWith(t))return e.substring(t.length)}(e,n?z:q),r=n?$:t;return s=i,o=r,o?`${o}.${s}`:s;var s,o}(t,n);if(!i)return;const r=e.getAttribute(t);return We(i,r)}(e,i,t);return me(n,r)}),{})}function on(){const e=function(e){const t=an(function(e){const t=e.getFullYear(),n=e.getMonth(),i=e.getDate(),r=e.getDay(),s=e.getHours(),o=e.getMinutes();return{date:e,year:t,month_of_year:n,day_of_month:i,day_of_week:r,hour:s,minute:o}}(e)),n=an(function(e){const t=e.getUTCFullYear(),n=e.getUTCMonth(),i=e.getUTCDate(),r=e.getUTCDay(),s=e.getUTCHours(),o=e.getUTCMinutes();return{date:e,year:t,month_of_year:n,day_of_month:i,day_of_week:r,hour:s,minute:o}}(e));return{local:t,utc:n}}(new Date);return{date:e}}function an(e){const{year:t,hour:n,minute:i,day_of_month:r}=e,s=e.day_of_week+1,o=e.month_of_year+1,a=`${t}-${o}-${r}`,c=n+i/60;return Object.assign(Object.assign({},e),{month_of_year:o,day_of_week:s,iso_date:a,hour_and_minute:c})}const cn=new class{constructor(e){this.dataStore=e}getData(){const e=qe(),t=on();return me({},{custom:e.custom},t,this.dataStore)}}(u);class un{constructor(e,t){this.placementId=e,this.dataStoreCreator=t}getData(){const e=this.dataStoreCreator.getData(),t=this.placementId;this.populateCurrentPlacementReference(e,t);const n=e.custom;return n&&this.populateCurrentPlacementReference(n,t),e}populateCurrentPlacementReference(e,t){const n=e[t];e.this_placement=n}}const ln=dn;function dn(e){if("string"!=typeof e)return Array.isArray(e)?function(e){if(!e.length)return;let t=e.find((e=>pn(e)));t||(t=e[0]);return hn(t.tag)}(e):pe(e)?function(e){const t=Object.keys(e);if(!t.length)return;let n=t.find((t=>pn(e[t])));n||(n=t[0]);const i=e[n];return hn(i.tag)}(e):void 0}function hn(e){return Array.isArray(e)?e[0]:e}function pn(e){return"pre"===e.offset||0===e.offset}class fn{constructor(e,t,n,i){this.eventEmitter=e,this.eventEmitterType=t,this.placementId=n,this.evaluationData=i}setEventPayload(e){this.eventPayload=e}getData(){return{placementId:this.placementId,analytics:this.evaluationData,eventEmitter:this.eventEmitter,eventEmitterType:this.eventEmitterType,eventPayload:this.eventPayload}}}class mn{constructor(e,t){this.player=e,this.instanceMethodExecutor=t}execute(e,t){switch(e){case"setAdSchedule":this.setAdSchedule(t[0]);break;case"resetAdConfig":this.resetAdConfig();break;case"disableKeepWatchingForCurrentItem":this.disableKeepWatchingForCurrentItem();break;case"setAutostart":this.setAutostart(t[0]);break;default:this.instanceMethodExecutor.execute(e,t)}}setAdSchedule(e){const t=this.getAdClient();t&&(this.adScheduleAtSetup||(this.adScheduleAtSetup=this.getAdSchedule()),this.player.setupDynamicPlugin(t,{schedule:e,ignorePlaylistSchedules:!0}),this.player.trigger(R,{adSchedule:e}))}setAutostart(e){this.player.setConfig({autostart:e}),this.player.trigger("autostartChanged",{autostart:e})}resetAdConfig(){const e=this.getAdClient();e&&(this.player.setupDynamicPlugin(e),this.player.trigger(R,{adSchedule:this.adScheduleAtSetup}))}disableKeepWatchingForCurrentItem(){const e=this.player.getPlugin("keepWatching");e&&e.disableForCurrentItem&&e.disableForCurrentItem()}getAdSchedule(){const e=this.player.getConfig().advertising;if(e)return e.schedule}getAdClient(){const e=this.player.getConfig().advertising;if(e)return e.client}}class gn{constructor(e,t){this.namespace=e,this.targetInstance=t}execute(e,t){const n=this.targetInstance[e];Pe(n)&&n.apply(this.targetInstance,t)}}class yn{constructor(e,t){this.namespace=e,this.executionContext=t}execute(e,t){if("executeCustom"===e&&t.length){const e=t[0];this.executeCustomAction(e)}}executeCustomAction(e){Ce(e,this.executionContext.getData())}}const vn="ab_test",bn="ab_variant",wn="conditional",En="config",_n="experience_optimizer",xn="experience_optimizer_variant",Cn="switch",In="switch_conditional",Sn="trigger",Pn="always",An="whenViewable",Tn="never";function Dn(e){return e===k?An:e?Pn:Tn}function kn(e){const t=function(e){if("string"!=typeof e)return;const t=e.split(":");if(2!==t.length)return;return{x:parseInt(t[0],10),y:parseInt(t[1],10)}}(e.aspectratio),n=On(e.height),i=On(e.width),r={};return t&&(r.aspectRatio=t),n&&(r.height=n),i&&(r.width=i),r}function On(e){if("number"==typeof e)return{format:"px",value:e};if("string"==typeof e){const t=e.includes("%")?e.substring(0,e.length-1):e;return{format:"%",value:parseInt(t,10)}}}function jn(e,t,n){const i=t.enrichment,r=t[e];n.forEach((e=>{const t=function(e,t,n){const i=e.type;if(i===y){const i=t.player={},r=t.sharedPlayerState={player:{}},s=e.instance,o=function(e,t,n,i){function r(e){t.player.autostart=Dn(e.autostart)}function s(e){const n=ln(e.adSchedule);t.ads=t.ads||{},t.ads.tag=n}function o(e){t.content={playlistFeed:{playlist:e.playlist},currentItemIndex:0}}function a(i){e.current_item=i.item,e.current_item_index=i.index;const r=i.item.mediaid;if(t.content&&(t.content.currentItemIndex=i.index),!n||!r)return void delete e.current_item_enrichment;const s=n.media&&n.media[r];s&&(e.current_item_enrichment=s)}function c(e){let n=t.player.size;n||(n=t.player.size={}),n.height={format:"px",value:e.height},n.width={format:"px",value:e.width}}function u(e){t.player.mute=e.mute}function l(){delete e.current_item,delete e.current_item_index,delete e.current_item_enrichment,i&&(t.player.position=i.getPosition())}function d(e){t.player.state=e.newstate}return{onAutostartChanged:r,onAdScheduleChanged:s,onPlaylist:o,onPlaylistItem:a,onPlayerStateChange:d,onResize:c,onMute:u,onRemove:l}}(i,r,n,s),a=function(e,t){function n(){e.on(R,t.onAdScheduleChanged),e.on(`${T} ${L}`,t.onPlaylistItem),e.on(A,t.onPlaylist),e.on(D,t.onResize),e.on(P,t.onMute),e.on(O,t.onRemove),e.on(`${I} ${_} ${C} ${x}`,t.onPlayerStateChange)}return{attachEventListeners:n}}(s,o);return a}}(e,r,i);t&&t.attachEventListeners()}))}function Rn(e){const t=n.createElement("div");return t.id=e,t}function Ln(e,t){return`${g}${e}Div_${t}`}function Fn(e,t){const n=Mn(e);t.appendChild(n)}function Nn(e){return new Promise(((t,i)=>{const r=function(e,t,i){const r=n.createElement("script");return r.type=N,r.async=!0,r.src=e,r.charset=M,t&&(r.onload=t),i&&(r.onerror=i),r}(e,t,i);var s;s=r,n.head.appendChild(s)}))}function Mn(e){const t=n.createDocumentFragment();return t.appendChild(e),t}class Bn{constructor(e,t){this.counter=0,this.retryFn=null,this.timeoutID=null,this.interval=e,this.retryCap=t}setRetryFunction(e){e instanceof Function&&(this.abort(),this.retryFn=e)}schedule(){this.retryFn&&0!==this.retryCap&&(this.counter<this.retryCap?(this.counter++,this.timeoutID=window.setTimeout(this.retryFn,this.interval)):this.reset())}abort(){this.timeoutID&&(clearTimeout(this.timeoutID),this.timeoutID=null),this.reset()}reset(){this.counter=0,this.retryFn=null}}class Vn{constructor(e,t){this.player=e,this.retryScheduler=t}init(){this.player.on(S,this.onAdError,this),this.player.on(`adImpression ${_} ${T}`,this.abortRetry,this),this.player.on(O,this.destroy,this)}destroy(){this.retryScheduler.abort(),this.player&&this.player.off(null,null,this)}onAdError(e){const t=function(e){const t=e.adschedule;if(!t)return;const n=t.tags;if(!n||!n.length)return;return n[0]}(e);if(t){const e=()=>{this.player.playAd(t)};this.retryScheduler.setRetryFunction(e)}this.retryScheduler.schedule()}abortRetry(){this.retryScheduler.abort()}}const Un="adPlay adSkipped";class $n{constructor(e){this.sessionState={},this.player=e}start(e){this.callback=e,this.player.on("adBreakStart",this.onAdBreakStart,this),this.player.on("adRequest",this.onAdRequest,this),this.player.on("adSchedule",this.onAdSchedule,this)}end(){this.callback=null,this.player.off(null,null,this)}destroy(){this.end(),this.player=null}onAdSchedule(e){const t=e.adbreaks;t&&t.length>0||(this.sessionState.tag=e.tag,this.sessionState.isFailedVmapRequest=!0,this.onNoAdFillDetected())}onAdBreakStart(e){this.sessionState.adposition=function(e){const t=e.adposition;if(t)return t;const n=e.offset;if("pre"===n||n===de)return n;return"mid"}(e),this.player.once(j,this.onNoAdFillDetected,this),this.player.once(Un,this.clearCurrentAdSession,this)}onAdRequest(e){this.sessionState.tag=e.tag}onNoAdFillDetected(){const e=this.sessionState;this.clearCurrentAdSession(),this.callback&&this.callback(e)}clearCurrentAdSession(){this.sessionState={},this.player.off(j,this.onNoAdFillDetected,this),this.player.off(Un,this.clearCurrentAdSession,this)}}class qn{createPlayer(e,t){const n=this.setupPlayer(e,t.jwplayerConfig);if(!n)return;const i=t.adRetry;i&&this.addImpressionOptimization(n,i.interval,i.cap);const r=t.placementConfig;return r&&this.addPlacementCustomization(n,r),this.addNoAdFillTrigger(n),this.addPlaylistItemTransitionEvent(n),n}setupPlayer(e,n){return t.jwplayer(e).setup(n)}addPlacementCustomization(e,t){t.no_ad_fill_ctp&&this.addClickToPlayOnFirstPrerollErrors(e)}addClickToPlayOnFirstPrerollErrors(e){const t=()=>{e.stop()};e.on(S,t),e.once(x,(function(){e.off(S,t)}))}addNoAdFillTrigger(e){const t=new $n(e);t.start((t=>{e.trigger("adNoFill",t)})),e.on(O,(()=>{t.destroy()}))}addImpressionOptimization(e,t,n){t<1500&&(t=1500);const i=new Bn(t,n);new Vn(e,i).init()}addPlaylistItemTransitionEvent(e){const t=function(){e.updatePlaylistItem=Se,e.blockPlaylistItem=Se},n=(n,i)=>{e.updatePlaylistItem=function(e){t(),n(e)},e.blockPlaylistItem=function(){t(),i()}};e.setPlaylistItemCallback((function(t,i){const r=new Promise(n);return e.trigger(L,{item:t,index:i}),e.updatePlaylistItem(),r}))}}class zn{constructor(e){this.embedCache=e}embed(e){let t=this.embedCache.retrieve(e);return t||(t=Nn(e),this.embedCache.store(e,t)),t}}const Wn="DEFAULT0";class Gn{constructor(e,t,n){this.siteId=e,this.dependencyLoader=t,this.playerInstanceFactory=n}setPlayerVersion(e){this.playerVersion=e}build(e){const{experienceConfig:t,experienceDiv:n,analyticsContext:i,adTargetingContext:r}=e,s=this.getPlayerFactoryOptions(t,i,r),o=this.playerVersion?`?version=${this.playerVersion}`:"",a=`https://cdn.jwplayer.com/v2/sites/${this.siteId}/${y}.js${o}`;return this.dependencyLoader.embed(a).then((()=>{const e=this.playerInstanceFactory.createPlayer(n.id,s);return{type:y,instance:e,experienceDiv:n,experienceConfig:t}}))}getPlayerFactoryOptions(e,t,n){const i=function(e,t,n){const i=Object.assign({},e),r=i.jwplayer_config;r.pid||(r.pid=Wn);r.analytics=Object.assign(Object.assign({},r.analytics),{placement:t}),r.advertising&&(r.advertising.targeting=Object.assign(Object.assign({},r.advertising.targeting),n));return i}(e,t,n),r=i.jwplayer_config,s=i.placement_config,o=r.advertising,a=i.dynamic_ads_config;let c;if(o&&o.adRetry&&(c=o.adRetry,delete o.adRetry),a&&o){r.enableAdLoadingUI=!1;["rules","tag","vastxml","schedule","adscheduleid","freewheel","fwassetid","outstream","repeat","preloadAds","adTagParameters","clearAdsOnComplete","companiondiv","endstate","requestFilter","trackingFilter"].forEach((e=>delete o[e]))}return{jwplayerConfig:r,placementConfig:s,adRetry:c}}}class Hn{constructor(e,t,n){this.serviceLoader=e,this.siteId=t,this.playerVersion=n}createExperience(e,t,n){return rt(this,void 0,void 0,(function*(){const i=yield this.serviceLoader.getService("vertical-video","0"),r={verticalVideoConfig:t.vertical_video_config,divId:e,domain:"cdn.jwplayer.com",siteId:this.siteId,playerVersion:null!==this.playerVersion?this.playerVersion:void 0,analytics:{placement:n}},s=yield i.register("orchestrator",r);return yield s.init(),s}))}}function Kn(e){return e&&e.adBreaks?Object.keys(e.adBreaks).reduce(((t,n)=>{const i=e.adBreaks[n];if(i){const e=function(e,t){const n={type:"dynamicAds",name:"adBreakSuggestion",frequency:-1,condition:`event.adPosition = '${e}'`},i=Object.assign({},t);delete i.macros;const r={argument:i};t.macros&&(r.macros=t.macros);return{event:n,actions:[{namespace:"dynamicAds",function:"loadAd",arguments:[r]}]}}(n,i);t.push(e)}return t}),[]):[]}const Zn={"__app-bundle__":"[APP_BUNDLE]","__app-name__":"[APP_NAME]","__device-ua__":"[UA]",__domain__:"[DOMAIN]",__gdpr__:"[GDPR]",__gdpr_consent__:"[GDPR_CONSENT]","__item-description__":"[VIDEO_DESCRIPTION]","__item-duration__":"[VIDEO_DURATION]","__item-mediaid__":"[VIDEO_ID]","__item-title__":"[MEDIA_TITLE]","__page-url__":"[PAGE_URL]","__player-height__":"[HEIGHT]","__player-width__":"[WIDTH]","__random-number__":"[RAND]",__referrer__:"[SOURCE_REFERRER]","__session-client_ip__":"[IP]","__session-uuid__":"[UUID]"},Qn=0,Xn=2,Yn=0,Jn=1;class ei{getEmbedUrl(e){let t="//cd.thecontentserver.com/player.js";if(!e)return t;let n="";return e.cid&&(n+=`&cid=${e.cid}`),n&&(t+=`?${n.substring(1)}`),t}build(e){const n=e.experienceConfig.pid;(new Image).src=`https://tr.thecontentserver.com/tr/si?token=${n}&cid=${e.experienceConfig.cid}`;const i=function(e){const t=e.sharedExperienceConfig;if(!t||!t.player)return;switch(t.player.autostart){case Pn:case An:return Qn;default:return Xn}}(e),r=function(e){const t=e.sharedExperienceConfig;if(!t||!t.content)return;const n=t.content,i=n.playlistFeed.playlist;n.currentItemIndex>0&&i.push(...i.splice(0,n.currentItemIndex));const r=i.map((e=>{const t=e.allSources||e.sources||[],n=e.tracks||[],i=e.tags||"",r=t.find((e=>e.file.includes(".m3u8"))),s=r&&r.file;return{id:e.mediaid||null,title:e.title||"",description:e.description||"",duration:e.duration||0,keywordList:Array.from(i.split(","))||[],publishDate:e.pubdate,imageUrl:e.image,closedCaptions:n.filter((e=>"captions"===e.kind&&e.file.includes(".vtt"))).map((e=>({file:e.file,title:e.label,language:e.language||"en"}))),hlsFilePath:s||"",sources:t.filter((e=>{if("video/mp4"===e.type&&!e.file.includes(".m3u8"))return{file:e.file,quality:e.width}}))}}));return r}(e),s=function(e){const{experienceConfig:t,sharedExperienceConfig:n}=e,i=n&&n.ads&&n.ads.tag,r=t.advertising||{lineItems:[{}]};if(!i)return r;return r.lineItems.forEach((e=>{e.url||(e.url=function(e){let t=e;for(const e of Object.keys(Zn))t=t.split(`${e}`).join(`${Zn[e]}`);return t}(i))})),r}(e),o=function(e){const t=e.sharedExperienceConfig,n=t&&t.player;if(!n)return;const i={};if(n.size){const e=function(e){const t={},n=e.height,i=e.width,r=e.aspectRatio;t.responsive=!!r,n&&"px"===n.format&&(t.fixedHeight=n.value);i&&"px"===i.format&&(t.fixedWidth=i.value);r&&(t.ratioWidth=r.x,t.ratioHeight=r.y);return t}(n.size);Object.assign(i,e)}return i}(e),a=function(e){const t=e.sharedExperienceConfig,n=t&&t.player;if(!n)return;if(!0===n.mute)return Jn;return Yn}(e),c=function(e){const t={};for(let n=1;n<=5;n++){const i="customParam"+n,r=e.experienceConfig[i];void 0!==r&&(t[i]=r)}return t}(e),u=Object.assign(Object.assign({playerId:n},c),{strategyOutcomeId:e.analytics.outcomeId,settings:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({advertising:s},r&&{playlist:r}),void 0!==i&&{playbackMode:i}),void 0!==a&&{defaultSoundMode:a}),o&&{customization:o}),{rendering:{containerSelector:`[id="${e.experienceDiv.id}"]`,insertPosition:0,position:0,forceInsertPath:!0}})}),l=new Promise(((n,i)=>{t.cnxel.cmd.push((()=>{t.cnxel(u).render(e.experienceDiv.id,((t,r)=>{t?i(t):(!function(e,t){const n=t.sharedExperienceConfig;if(!n||!n.player)return;const i=n.player.autostart,r="playing"===n.player.state||"buffering"===n.player.state;(i===Pn||r)&&e.once("newVideo",(()=>{e.play()}))}(r,e),function(e,t){const n=t.sharedExperienceConfig;if(!n||!n.player)return;const i=n.player.position;i&&i>0&&e.once("newVideo",(()=>{e.setVideoPosition(i)}))}(r,e),n(r))}))}))}));return{isApiReady:()=>l}}}class ti{constructor(e,t){this.dependencyLoader=e,this.playerFactory=t}preloadDependencies(e){const t=this.playerFactory.getEmbedUrl(e);return this.dependencyLoader.embed(t)}build(e){return rt(this,void 0,void 0,(function*(){yield this.preloadDependencies(e.experienceConfig);const t=this.playerFactory.build(e);let n;return n=t.isApiReady?yield t.isApiReady():t.player,n}))}}class ni{constructor(e,t){this.playerExperienceFactory=e.player,this.verticalVideoExperienceFactory=e.vertical,this.dynamicAdsFactory=e.dynamicAds,this.connatixFactory=e.connatix,this.playlistLoader=t}promiseExperience(e){return rt(this,void 0,void 0,(function*(){const{experienceDiv:t,experienceName:n,experienceConfig:i,analyticsContext:r,adTargetingContext:s}=e,o={placementId:r.placementId,analytics:{evaluationId:r.evaluationId,embedId:r.embedId,outcomeId:r.outcomeId,strategyId:r.strategyId,strategyTreeVersionId:r.strategyTreeVersionId}};i.custom_code_config&&function(e,t){e.javascript&&Ce(e.javascript,t)}(i.custom_code_config,o);const a={experienceConfig:i,experienceDiv:t};if("custom_code_experience"===n)return Object.assign({type:"customCode"},a);const c=this.getPartnerBuildOptions(i);if(c)return this.promisePartnerExperience(c,a,o);let u;if(i.vertical_video_config?u=this.promiseExperienceVerticalVideo(a,r):this.requiresPlayer(i)&&(u=this.promiseExperiencePlayer(t,i,r,s)),i.dynamic_ads_config&&u)return this.promiseExperienceWithDynamicAds(i.dynamic_ads_config,u);if(u)return u;throw Error()}))}promiseExperienceVerticalVideo(e,t){return rt(this,void 0,void 0,(function*(){const n=yield this.verticalVideoExperienceFactory.createExperience(e.experienceDiv.id,e.experienceConfig,t);return Object.assign({type:w,instance:{orchestrator:n}},e)}))}promiseExperiencePlayer(e,t,n,i){return rt(this,void 0,void 0,(function*(){return yield this.playerExperienceFactory.build({experienceConfig:t,experienceDiv:e,analyticsContext:n,adTargetingContext:i})}))}promisePartnerExperience(e,t,n){return rt(this,void 0,void 0,(function*(){e.factory.preloadDependencies(e.config);const i=Object.assign(Object.assign({},n),{experienceConfig:e.config,experienceDiv:t.experienceDiv}),r=e.sharedConfig||(yield this.getSharedExperienceConfig(e.sharedPlayerConfig));r&&(i.sharedExperienceConfig=r);const s=yield e.factory.build(i);return Object.assign({type:e.type,instance:s},t)}))}getSharedExperienceConfig(e){return rt(this,void 0,void 0,(function*(){if(!e)return;const t={ads:e.ads,player:e.player},n=yield this.getSharedPlaylist(e);return n&&(t.content={playlistFeed:n,currentItemIndex:0}),t}))}getSharedPlaylist(e){return rt(this,void 0,void 0,(function*(){const t=e.content&&e.content.playlist;if(t)return yield this.playlistLoader.load(t)}))}promiseExperienceWithDynamicAds(e,t){return rt(this,void 0,void 0,(function*(){this.dynamicAdsFactory.preloadDependencies();const n=yield t;if(!n.instance)throw Error();const i=yield this.dynamicAdsFactory.extendExperience(n.type,n.instance,e);return n.extensions=n.extensions||{},n.extensions.dynamicAds={type:E,instance:i},n.triggers=n.triggers||[],n.triggers.push(...Kn(e)),n}))}requiresPlayer(e){return!!e.jwplayer_config}getPartnerBuildOptions(e){const t={sharedPlayerConfig:e.player_config,sharedConfig:e.shared_config};if(e.connatix_config)return Object.assign(Object.assign({},t),{type:"connatix",config:e.connatix_config,factory:this.connatixFactory});if(e.showheroes_config||e.exco_config||e.anyclip_config)throw new Error("Missing Partner Factory")}}class ii{constructor(e){this.experienceBuilder=e}promiseBuild(e,t,n,i){let r;const{analyticsContext:s,adTargetingContext:o}=i,a=ot.retrieve(e);if(r=a&&a.isConnected?a:this.createPlacement(e,n),!t)return Promise.resolve({placementId:e,experienceBuilds:[],placementDiv:r});const c=Object.keys(t).map((e=>{const n=t[e];return this.promiseSetupExperience({name:e,config:n,placementElement:r,analyticsContext:s,adTargetingContext:o})}));return Promise.all(c).then((t=>({placementId:e,experienceBuilds:t,placementDiv:r})))}promiseSetupExperience(e){const{name:t,config:n,placementElement:i,analyticsContext:r,adTargetingContext:s}=e,o=Rn(Ln("Experience",h(12)));return Fn(o,i),this.experienceBuilder.promiseExperience({experienceName:t,experienceConfig:n,experienceDiv:o,analyticsContext:r,adTargetingContext:s})}createPlacement(e,t){const n=function(e,t){const n=Rn(Ln("Placement",e));return n.dataset.jwPlacementId=e,n}(e);return ot.store(e,n),t.parentTag?Fn(n,t.parentTag):t.previousTag&&function(e,t){const n=Mn(e),i=t.nextElementSibling,r=t.parentNode;r&&(i?r.insertBefore(n,i):r.appendChild(n))}(n,t.previousTag),n}}function ri(e,t,n,i){const r=i[n];r&&(i[n]=si(r,e,t))}function si(e,t,n){const i=t.datastore_key,r=`{${i}}`;if(!ve(e,r))return e;const s=t.default;let o=function(e,t){let n;return Ge(e,t,((e,t)=>{n=t[e]})),n}(n,i);return void 0===o&&(o=s),be(e,r,o)}class oi{constructor(e){this.treeParser=e}parse(e,t){return rt(this,void 0,void 0,(function*(){const n=e.id,i=e.tree,r=function(e){const t=[];let n,i=[];const r=[];function s(){return{config:n,nodes:t,triggers:i,untraversableNodes:r}}function o(e){t.push(e.id)}function a(t){o(t);const i=t.config;if(void 0===i)return;if(null===i)return n=null,void d(y);const r=t.macros;if(r&&function(e,t,n){e&&0!==t.length&&t.forEach((t=>{const i=t.config_key;Ge(e,i,ri.bind(null,t,n))}))}(i,r,e),!n)return void(n=i);h(n,i).forEach((e=>{l(e),delete n[e]})),n=me({},n,i)}function c(e){o(e),i.push(e)}function u(e){r.push(e.id)}return{getTraversalState:s,onNode:o,onConfigNode:a,onTriggerNode:c,onUnsuccessfulTraversal:u};function l(e){"player_experience"!==e&&"maxmon_experience"!==e||d(y)}function d(e){i=i.filter((t=>t.event.type!==e))}function h(e,t){return Object.keys(e).filter((e=>!t[e]))}}(t),s=yield this.treeParser.traverseTree(i,e.strategy_tree_version_id,t,r),o=r.getTraversalState(),a=function(e,t){if(!t)return null;const n=e.join(",");return t[n]||null}(o.nodes,i.outcomes),c=h(8);return Object.assign(Object.assign({},o),{placementId:n,success:s,outcomeId:a,evaluationId:c})}))}}class ai{constructor(e=new st,t=new st){this.promiseCache=e,this.promiseResolveCache=t}initPromise(e){if(this.promiseCache.retrieve(e))return;const t=new Promise((t=>{this.promiseResolveCache.store(e,(e=>{t(e)}))}));this.promiseCache.store(e,t)}getPromise(e){this.initPromise(e);return this.promiseCache.retrieve(e)}resolvePromise(e,t){const n=this.promiseResolveCache.retrieve(e);n&&n(t)}}class ci extends ai{resolvePromise(e,t){const n={placementId:e};t.experienceBuilds.forEach((e=>{if(e.type===y){const t=e.instance;n.player=t,n.playerDivId=t&&t.id}})),super.resolvePromise(e,n)}}class ui{constructor(e){this.siteId=e}enrichVariantNodes(e,t){return rt(this,void 0,void 0,(function*(){try{const n=yield Ie(this.fetchVariantEnrichmentData(t),1500);return e.map((e=>{const t=Object.assign({},e),i=n[e.id];return i&&void 0!==i.weight?t.weight=i.weight:t.weight=1,t}))}catch(t){return e.map((e=>Object.assign(Object.assign({},e),{weight:1})))}}))}fetchVariantEnrichmentData(e){return rt(this,void 0,void 0,(function*(){const{countryCode:t,deviceType:n,strategyTreeVersionId:i,nodeId:r}=e;if(!t||!n)return Promise.reject("Missing required parameters: countryCode or deviceType");const s=new URLSearchParams({strategy_tree_version_id:i,optimizer_node_id:r,country_code:t,device:n}),o=`https://cdn.jwplayer.com/v2/sites/${this.siteId}/strategy_optimizer_node_data?${s.toString()}`;return fetch(o).then((e=>e.json()))}))}}function li(e,t,n){const i=e;let r,s,o,a,c;return{traverseTree:function(e,t,n,i){return rt(this,void 0,void 0,(function*(){return s=e,r=t,o=s.nodes,a=n,c=i,u(o[s.root_node])}))}};function u(e){return rt(this,void 0,void 0,(function*(){let s;switch(e.node_type){case En:s=yield function(e){return rt(this,void 0,void 0,(function*(){if(c.onConfigNode(e),null===e.config)return!0;const t=void 0!==e.config,n=e.child;if(!n)return t;const i=u(o[n]);return t||i}))}(e);break;case wn:s=yield function(e){return rt(this,void 0,void 0,(function*(){let t;c.onNode(e);try{t=i(e.condition,a)}catch(t){return c.onUnsuccessfulTraversal(e),!1}const n=t?e.true_child:e.false_child;if(!n)return c.onUnsuccessfulTraversal(e),!1;return u(o[n])}))}(e);break;case Sn:s=yield function(e){return rt(this,void 0,void 0,(function*(){c.onTriggerNode(e);const t=e.child;if(!t)return!0;return u(o[t])}))}(e);break;case vn:s=yield function(e){return rt(this,void 0,void 0,(function*(){c.onNode(e);const n=e.variants.map((e=>o[e])),i=t.selectVariant(n,e.total_weight,e.id);if(!i)return c.onUnsuccessfulTraversal(e),!1;return l(i)}))}(e);break;case _n:s=yield function(e){return rt(this,void 0,void 0,(function*(){c.onNode(e);const i=e.variants.map((e=>o[e])),s=function(e,t,n){const i={strategyTreeVersionId:t,nodeId:e},r=n.geo&&n.geo.country;r&&(i.countryCode=r);const s=n.device&&n.device.type;return s&&(i.deviceType=s),i}(e.id,r,a),u=yield n.enrichVariantNodes(i,s),d=u.reduce(((e,t)=>e+t.weight),0),h=t.selectVariant(u,d,e.id);if(!h)return c.onUnsuccessfulTraversal(e),!1;return l(h)}))}(e);break;case Cn:s=yield function(e){return rt(this,void 0,void 0,(function*(){c.onNode(e);const t=e.switch_conditionals.find((e=>function(e){let t;try{t=i(e.condition,a)}catch(e){return!1}return t}(o[e])));if(!t)return c.onUnsuccessfulTraversal(e),!1;return l(o[t])}))}(e);break;case bn:case xn:case In:s=yield l(e);break;default:c.onUnsuccessfulTraversal(e),s=!1}return s}))}function l(e){return rt(this,void 0,void 0,(function*(){return c.onNode(e),u(o[e.child])}))}}function di(e,t,n){const i={};return e.forEach((e=>{const r=e.namespace;if(i[r])return;const s=t[r],o=function(e,t,n){if(e===y&&n){const t=new gn(e,n);return new mn(n,t)}return e===b?new yn(e,t):n?new gn(e,n):void 0}(r,n,s);i[r]=o})),i}class hi{constructor(e,t,n){this.actions=[],this.functionExecutorMap=e,this.executionContext=t,this.onEventHandled=n}setActions(e){this.actions=e}onEvent(e){this.executionContext.setEventPayload(e.event),this.actions.forEach((t=>{const n=this.functionExecutorMap[t.namespace];if(!n)return;const i=this.getArguments(t.arguments,e);n.execute(t.function,i)})),this.onEventHandled&&this.onEventHandled()}getArguments(e,t){return e.map((e=>e.macros?function(e,t){let n=e.argument;const i=e.macros;return n&&i&&0!==i.length?(i.forEach((e=>{const i=e.target_key;i&&typeof n===F?n&&Ge(n,i,ri.bind(null,e,t)):n=si(n,e,t)})),n):n}(e,t):e))}}class pi{constructor(e,t,n){this.eventCount=0,this.eventName=e.name,this.frequencyCap=e.frequency,this.condition=e.condition,this.macros=e.macros,this.eventEmitter=t,this.dataStoreFactory=n}setDelegate(e){this.delegate=e}setParent(e){this.parent=e}start(){this.onEventBinded=this.onEvent.bind(this),this.eventEmitter.on(this.eventName,this.onEventBinded)}stop(){this.onEventBinded&&(this.eventEmitter.off(this.eventName,this.onEventBinded),this.onEventBinded=null)}destroy(){this.stop(),this.delegate=null}onEvent(e){const t=this.dataStoreFactory.getData();t.event=e,!this.isFrequencyReached()&&this.shouldHandleEvent(t)&&(this.delegate&&this.delegate.onEvent(t),this.eventCount++,this.isFrequencyReached()&&this.onFrequencyReached())}shouldHandleEvent(e){if(!this.condition)return!0;let t=this.condition;var n,i,r;let s;this.macros&&(n=t,i=this.macros,r=e,i.forEach((e=>{n=si(n,e,r)})),t=n);try{s=rn(t,e)}catch(e){return!1}return s}isFrequencyReached(){return-1!==this.frequencyCap&&this.eventCount>=this.frequencyCap}onFrequencyReached(){this.stop(),this.parent&&(this.parent.onEventFrequencyReached(),this.parent=null)}}function fi(e,t,n,i){const r=e.event,s=e.actions,o=n[r.type];if(!o)return;const a=function(e,t){switch(t){case y:case E:return e;default:return}}(o,r.type);if(!a)return;const c=t.getData(),u=c.this_placement.placementId,l=c.this_placement.this_evaluation,d=new fn(o,r.type,u,l),h=di(s,n,d),p=new pi(e.event,a,t),f=new hi(h,d,i);f.setActions(s);const m=new mi(p,f);return m.activate(),m}class mi{constructor(e,t){this.eventListener=e,this.eventHandler=t}activate(){this.eventListener.setParent(this),this.eventListener.setDelegate(this.eventHandler),this.eventListener.start()}deactivate(){this.eventListener.stop()}onEventFrequencyReached(){this.destroyDependencies()}destroy(){this.deactivate(),this.destroyDependencies()}destroyDependencies(){this.eventListener&&(this.eventListener.destroy(),this.eventListener=null),this.eventHandler=null}}class gi{constructor(e,t){this.dataStoreFactory=e,this.experienceMap=t}build(e,t,n){const i={};return e.forEach((e=>{const t=fi(e,this.dataStoreFactory,this.experienceMap,(()=>n(e.id))),r=e.event.type;this.addTriggerExecutor(i,r,t)})),t.forEach((e=>{const t=fi(e,this.dataStoreFactory,this.experienceMap),n=e.event.type;this.addTriggerExecutor(i,n,t)})),i}addTriggerExecutor(e,t,n){n&&(e[t]=e[t]||[],e[t].push(n))}}class yi{constructor(e){this.numBuckets=2520,this.constantId=e}selectVariant(e,t,n){let i=0,r=this.constantId;n&&(r+=n);const s=function(e){let t=0;const n=e.length;let i=1794770992;for(;t<n;t++)i^=e.charCodeAt(t),i+=(i<<1)+(i<<4)+(i<<7)+(i<<8)+(i<<24);return i>>>0}(r),o=s%this.numBuckets;return e.find((e=>(i+=this.numBuckets*e.weight/t,i>o)))}}function vi(e,t){if(e===y||function(e){return Pe(e.loadAdTag)&&Pe(e.loadAdXml)}(t))return new bi(t);throw new Error(`Missing Ad Tag Loading support for ${e}`)}class bi{constructor(e){this.experienceInstance=e}loadAd(e){e&&(e.adXml?this.experienceInstance.loadAdXml(e.adXml):e.tag?this.experienceInstance.loadAdTag(e.tag):this.experienceInstance.loadAdBreak&&this.experienceInstance.loadAdBreak())}}class wi{constructor(e){this.serviceLoader=e}preloadDependencies(){this.loadService()}extendExperience(e,t,n){return rt(this,void 0,void 0,(function*(){const i=yield this.loadService(),r=this.getContextDependentRules(n.rules,{experienceType:e}),s=yield i.register("placement",{preset:n.preset,adRules:r,experienceName:e,experience:t});s.init();const o=vi(e,t);return s.loadAd=function(e){o.loadAd(e)},s}))}loadService(){return this.serviceLoader.getService("dynamic-ad-scheduler","0")}getContextDependentRules(e,t){if(!e)return;const{experienceType:n}=t,i=Object.assign({},e);return void 0!==i.forcePreroll||(n===y?i.forcePreroll=!0:n===w&&(i.forcePreroll=!1)),i}}function Ei(e,t){return{player:function(e,t){const n=new zn(at),i=new qn,r=new Gn(e,n,i);return t&&r.setPlayerVersion(t),r}(e.siteId,e.playerVersion),vertical:new Hn(t,e.siteId,e.playerVersion),dynamicAds:new wi(t),connatix:function(){const e=new zn(at),t=new ei;return new ti(e,t)}()}}class _i{constructor(e){this.jsonCache=e}load(e){const t=this.jsonCache.retrieve(e);if(t)return t;const n=fetch(e).then((e=>e.json()));return this.jsonCache.store(e,n),n}}class xi{constructor(e,t=n){this.jsonLoader=e,this.document=t}load(e){return rt(this,void 0,void 0,(function*(){const t=this.transformPlaylistUrl(e),n=yield this.jsonLoader.load(t),i=n&&n.playlist;if(!i)return n;const r=i.length;if(!r)return n;const s=this.getPageLimit(t)||50,o=n.playlist[0].recommendations;if(r<s&&o){const e=this.transformPlaylistUrl(o,s-r),t=yield this.jsonLoader.load(e);t&&t.playlist&&n.playlist.push(...t.playlist)}return n}))}transformPlaylistUrl(e,t=50){let n;try{n=new URL(e),n.searchParams.get("page_limit")||n.searchParams.set("page_limit",t),"__CONTEXTUAL__"===n.searchParams.get("search")&&Ee(n,this.document)}catch(t){return e}return n.toString()}getPageLimit(e){try{const t=new URL(e).searchParams.get("page_limit")||null;return t?parseInt(t,10):null}catch(e){return null}}}class Ci{constructor(e){this.experienceBuilds=[],this.placementId=e.placementId,this.placementBuilder=e.placementBuilder,this.dataStoreFactory=e.dataStoreFactory,this.currentEmbedConfig=e.embedConfig,this.currentAnalyticsContext=e.analyticsContext,this.currentAdTargetingContext=e.adTargetingContext}setAnalyticsContext(e){this.currentAnalyticsContext=e}setAdTargetingContext(e){this.currentAdTargetingContext=e}setEmbedConfig(e){this.currentEmbedConfig=e}hide(){}remove(){this.experienceBuilds.forEach((e=>function(e){e.instance&&Ii(e.instance);e.experienceDiv.remove();const t=e.extensions;if(!t)return;Object.keys(t).forEach((e=>{const n=t[e];n&&n.instance&&Ii(n.instance)}))}(e))),this.experienceBuilds=[]}loadStrategy(){}embedExperience(e){return rt(this,void 0,void 0,(function*(){if(this.remove(),e){const t=this.dataStoreFactory.getData();!function(e,t){if(!t)return;Object.keys(e).forEach((n=>{e[n].shared_config=t}))}(e,t.this_placement.sharedPlayerState)}const t={analyticsContext:this.currentAnalyticsContext,adTargetingContext:this.currentAdTargetingContext},n=yield this.placementBuilder.promiseBuild(this.placementId,e,this.currentEmbedConfig,t);return this.experienceBuilds=n.experienceBuilds,n}))}}function Ii(e){const t=e.destroy||e.remove;t&&"function"==typeof t&&t.apply(e)}function Si(e,t,n){const i=n[e],r=i.sharedPlayerState=i.sharedPlayerState||{},s=t.jwplayer_config;s&&function(e,t){const n=function(e){const t=e.advertising;if(t)return t.tag?hn(t.tag):t.schedule?dn(t.schedule):void 0}(e);n&&(t.ads={tag:n});const i={autostart:Dn(e.autostart),mute:e.mute,size:kn(e)};t.player=i}(s,r);const o=t.dynamic_ads_config;o&&function(e,t){const n=e.adBreaks;if(!n)return;const i=n.pre||n.mid,r=i&&i.tag;r&&(t.ads={tag:r})}(o,r)}function Pi(e,t,n){const i=lt(),r=li(rn,new yi(i),new ui(e.siteId)),s=new oi(r),o=Ei(e,n),a=function(){const e=new st,t=new _i(e);return new xi(t)}(),c=new ni(o,a),u=new ii(c),l=new ci;return new Ai({placementBuilder:u,placementParser:s,placementPromiseWrapper:l,eventEmitter:t})}class Ai{constructor(e){this.triggerExecutorPool={},this.placementParser=e.placementParser,this.placementBuilder=e.placementBuilder,this.placementPromiseWrapper=e.placementPromiseWrapper,this.placementEventEmitter=e.eventEmitter}static get version(){return v}get version(){return v}setup(e){if(!e)return;const t=e.placementDefinitions;t&&Array.isArray(t)&&(t.forEach((e=>{const t=e.id,n=ot.retrieve(t);if(!n)return;const i=sn(n,t);ze.setPlacementAttributesData(i)})),ze.updateExternalDataStore(),t.forEach((t=>rt(this,void 0,void 0,(function*(){this.placementEventEmitter.initPlacementEventData(t.id),this.placementEventEmitter.emitEmbedAttemptEvent(t.id);const n=this.placementEventEmitter.getPlacementEventData(t.id),r=new un(t.id,cn),s=r.getData();let o;try{o=yield this.placementParser.parse(t,s)}catch(e){return void this.placementEventEmitter.emitEvaluationErrorEvent(t.id,h(8))}if(!1===o.success)return void this.placementEventEmitter.emitEvaluationErrorEvent(t.id,o.evaluationId);const a={outcomeId:o.outcomeId,strategyId:t.strategy_id,strategyTreeVersionId:t.strategy_tree_version_id,evaluationId:o.evaluationId,placementId:o.placementId,embedId:n.pei};this.placementEventEmitter.emitEvaluationSuccessEvent(o.placementId,o.evaluationId,o.outcomeId);const c={placementId:o.placementId,outcomeId:o.outcomeId};!function(e,t){const n=u[e]=u[e]||{placementId:e,strategyId:t.strategyId,strategyTreeVersionId:t.strategyTreeVersionId,evaluations:{}},i={evaluationId:t.evaluationId,embedId:t.embedId,outcomeId:t.outcomeId,strategyId:t.strategyId,strategyTreeVersionId:t.strategyTreeVersionId};n.this_evaluation=i,n.evaluations[i.evaluationId]=i}(t.id,a),this.placementPromiseWrapper.initPromise(o.placementId);const l=new Ci({placementId:o.placementId,placementBuilder:this.placementBuilder,dataStoreFactory:r,embedConfig:e,analyticsContext:a,adTargetingContext:c});l.embedExperience(o.config).then((e=>{const n=e.placementId;this.placementPromiseWrapper.resolvePromise(n,e);const i=e.experienceBuilds;jn(n,u,i),i.forEach((e=>{e.experienceConfig&&Si(n,e.experienceConfig,u)}));const s=function(e,t){const n={placement:e};return t.forEach((e=>{const t=e.type;if(n[t])return;n[t]=e.instance;const i=e.extensions;i&&Object.keys(i).forEach((e=>{n[e]||(n[e]=i[e].instance)}))})),n}(l,i),a=function(e){return e.reduce(((e,t)=>(t.triggers&&e.push(...t.triggers),e)),[])}(i),c=new gi(r,s).build(o.triggers,a,(e=>this.placementEventEmitter.emitTriggerEvent(n,e)));Object.assign(this.triggerExecutorPool,c),this.placementEventEmitter.emitEmbedCompleteEvent(t.id)})).catch((e=>{i("Placement could not be embedded: ",e)}))})))))}_getPlacementReadyPromise(e){return this.placementPromiseWrapper.getPromise(e)}}const Ti=new class{scanForElements(e,t){return this.documentReadyPromise(e).then((()=>this.getElements(e,t)))}documentReadyPromise(e){return new Promise((function(t){"complete"!==e.readyState?e.addEventListener("DOMContentLoaded",(function(){t()})):t()}))}getElements(e,t){return e.querySelectorAll(t)}},Di=`div[${W}]`;function ki(e){return Ti.scanForElements(n,Di).then((e=>{if(0===e.length)throw Error(`No divs with data-attribute key ${W} found`);const t=[];for(const n of e){const e=n.getAttribute(W);ot.store(e,n),t.push(e)}return t})).then((t=>function(e,t){const n=t.sort().join(","),i=`https://cdn.jwplayer.com/v2/sites/${e}/placements?placement_ids=${n}`;return fetch(i).then((e=>e.json()))}(e,t))).then((e=>{const t=e.placements;if(!t)throw Error();return t}))}const Oi="scanPage",ji="divId",Ri="di",Li="embedType",Fi="breakout",Ni="playerVersion",Mi="embed.js",Bi="cdn.jwplayer.com/v2/sites/([a-zA-Z0-9]{8})/placements/",Vi=Bi+Mi,Ui=Bi+"([a-zA-Z0-9]{8})/"+Mi;function $i(e){if(!e)return;const t=qi(e,Vi);const n=function(e){return qi(e,Ui)}(e);if(!t&&!n)return;const i=function(e){if(!e)return"";const t=e.match(new RegExp(Bi));if(!t||t.length<2)return"";return t[1]}(e),r=new URL(e).searchParams,s=r.get(Ni);if(t)return{siteId:i,scanPage:!0,playerVersion:s};const o=r.get(ji)||r.get(Ri),a=function(e,t){if(e)return U;if(t===Fi)return V;return B}(o,r.get(Li));return{siteId:i,targetDivId:o,embedType:a,scanPage:"true"===r.get(Oi),playerVersion:s}}function qi(e,t){return new RegExp(t).test(e)}function zi(e){const r=n.currentScript;if(!r)return void i("Invalid tag");const s=function(e,t){if(t)return function(e){return{siteId:e.siteId,targetDivId:e.divId,embedType:U,scanPage:!1,playerVersion:e.playerVersion}}(t);return $i(e)}(r.src,e);if(!s)return void i("No embed data");const o=(a=t,(c=s).targetDivId?function(e,t){let n,i=e;function r(e,t){return e.getElementById(t)}function s(t){let s=r(e.document,t);if(s)n=s;else try{const o=e.top;if(e===o)return;if(null===o)return;if(s=r(o.document,t),s)return i=o,void(n=s)}catch(e){}}return t&&s(t),{targetWindow:i,targetDiv:n}}(a,c.targetDivId):{targetWindow:a});var a,c;if(function(e,t){return!(!e.siteId||e.embedType===U&&!t.targetDiv)}(s,o))return{scriptTag:r,embedData:s,embedContext:o};i("Invalid embed")}function Wi(e){const{placementDefinitions:t,embedType:n,scriptTag:i,targetDiv:r}=e,s={placementDefinitions:t};return i&&n===B&&(s.previousTag=i),r&&(s.parentTag=r),s}return e.init=function(e){const r=e.placementDefinitions;let s;e.analyticsId?s=e.analyticsId:r&&r.length&&(s=r[0].analytics_id);const o=e.enrichment,a=Ue(u,1500),l=zi(e.psleParams);if(!l)return;const{scriptTag:d,embedData:h,embedContext:p}=l;var f,m;(f=p.targetWindow)!==t&&(t=f,n=t.document),Ke(we(d.src)),function(){Ae(t,u);const e=Le(t.navigator.userAgent);Object.assign(u,e)}(),o&&(m=o,u.enrichment=m),function(e,n){if(!t.jwplacements){const i=c.getServiceLoader(),r=new it(Ai.version,i,n);t.jwplacements=Pi(e,r,i),r.emitLoadedEvent()}}(h,s),r&&function(e){const{embedData:n,embedContext:i,geoDataExpirablePromise:r,scriptTag:s,placementDefinitions:o}=e;r.catch((()=>{})).finally((()=>{const{embedType:e}=n,{targetDiv:r}=i,a=Wi({placementDefinitions:o,embedType:e,scriptTag:s,targetDiv:r});t.jwplacements.setup(a)}))}({embedData:h,embedContext:p,geoDataExpirablePromise:a,scriptTag:d,placementDefinitions:r}),h.scanPage&&function(e,n){const r=ki(e.siteId);Promise.allSettled([r,n]).then((e=>{const n=e[0];if("rejected"===n.status)return void i("Page scan failed: ",n.reason);const r=Wi({placementDefinitions:Object.values(n.value)});t.jwplacements.setup(r)}))}(h,a)},e}({});


jwplacementsEmbed.init({ placementDefinitions: [{
  "analytics_id": "SsZ1zG04Eee9YgY3v_uBow",
  "id": "KmMLkvao",
  "name": "Fandom - All Partners",
  "strategy_id": "dmP5Zd3Z",
  "strategy_tree_version_id": "fd2NCpK5",
  "tree": {
    "leaf_nodes": [
      "anyclipAnime",
      "anyclipAnimeNoFillTrigger",
      "anyclipEntertainment",
      "anyclipEntertainmentNoFillTrigger",
      "anyclipGaming",
      "anyclipGamingNoFillTrigger",
      "connatixDirect",
      "connatixNoFillTrigger",
      "countryUndefinedPrint",
      "partialAdLoadingUIJWConfig",
      "shAnime",
      "shAnimeTrigger",
      "shEnter",
      "shEnterTrigger",
      "shGaming",
      "shGamingTrigger"
    ],
    "nodes": {
      "CNXAdServerInJWPOnNoFillVariant": {
        "child": "JWconnatixAdServerNoFillNoQPTrigger",
        "id": "CNXAdServerInJWPOnNoFillVariant",
        "name": "CNX Ad Server in JW Player",
        "node_type": "ab_variant",
        "weight": 0
      },
      "CNXCustomCodeOnNoFillVariant": {
        "child": "connatixNoFillTrigger",
        "id": "CNXCustomCodeOnNoFillVariant",
        "name": "CNX Partnership",
        "node_type": "ab_variant",
        "weight": 100
      },
      "CNXNoFillABTest": {
        "id": "CNXNoFillABTest",
        "name": "Ad No Fill Switch to CNX",
        "node_type": "ab_test",
        "total_weight": 100,
        "variants": [
          "CNXCustomCodeOnNoFillVariant",
          "CNXAdServerInJWPOnNoFillVariant"
        ]
      },
      "JWconnatixAdServerNoFillNoQPTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "enable",
            "namespace": "dynamicAds"
          },
          {
            "arguments": [
              {
                "argument": "payload.eventEmitter.destroyDynamicPlugin('googima');\npayload.eventEmitter.setupDynamicPlugin(\"https://ssl.p.jwpcdn.com/player/v/8.37.0/cnx.js\", {\n        requestTimeout: -1,\n\t\t\t\tadServer: {\n            \"cid\": \"016551d5-7095-47c0-a46b-fd0cb9bf4c72\",\n            \"adUnitId\": \"b417e5b8-02e3-40d6-bd82-036dabe07830\",\n            \"strategyOutcomeId\": \"3_b\"\n        }\n    }).then(() => {\n    console.log(\"Switched to longform content\");\nlet playlists = {'K21eFFRc': 'HGzd7yjF', 'CR0MZ2ZP': 'TF1h1U15', 'sXWp3rZ0': 'J9UZ0gER'};\n\nlet longformJWPlaylist = playlists[jwDataStore.custom[payload.placementId].playlist_id] ?? 'TF1h1U15';\n\npayload.eventEmitter.load(`https://cdn.jwplayer.com/v2/playlists/${longformJWPlaylist}`);\npayload.eventEmitter.getPlugin(\"keepWatching\").disable();\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 100;\npayload.eventEmitter.play();\n});",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "partialAdLoadingUIJWConfig",
        "event": {
          "condition": "( ( page.query_params.partner != 'cnx_ad_server' ) & ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) & ( event.adposition = 'pre' ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "JWconnatixAdServerNoFillNoQPTrigger",
        "name": "Trigger Enabling the CNX Ad Client in JW Player on Ad No Fill",
        "node_type": "trigger"
      },
      "JWconnatixAdServerNoFillQPTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "enable",
            "namespace": "dynamicAds"
          },
          {
            "arguments": [
              {
                "argument": "payload.eventEmitter.destroyDynamicPlugin('googima');\npayload.eventEmitter.setupDynamicPlugin(\"https://ssl.p.jwpcdn.com/player/v/8.37.0/cnx.js\", {\n        requestTimeout: -1,\n\t\t\t\tadServer: {\n            \"cid\": \"016551d5-7095-47c0-a46b-fd0cb9bf4c72\",\n            \"adUnitId\": \"b417e5b8-02e3-40d6-bd82-036dabe07830\",\n            \"strategyOutcomeId\": \"3_b\"\n        }\n    }).then(() => {\n    console.log(\"Switched to longform content\");\nlet playlists = {'K21eFFRc': 'HGzd7yjF', 'CR0MZ2ZP': 'TF1h1U15', 'sXWp3rZ0': 'J9UZ0gER'};\n\nlet longformJWPlaylist = playlists[jwDataStore.custom[payload.placementId].playlist_id] ?? 'TF1h1U15';\n\npayload.eventEmitter.load(`https://cdn.jwplayer.com/v2/playlists/${longformJWPlaylist}`);\npayload.eventEmitter.getPlugin(\"keepWatching\").disable();\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 100;\npayload.eventEmitter.play();\n});",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "CNXNoFillABTest",
        "event": {
          "condition": "( ( page.query_params.partner = 'cnx_ad_server' ) & ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) & ( event.adposition = 'pre' ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "JWconnatixAdServerNoFillQPTrigger",
        "name": "Trigger Enabling the CNX Ad Client in JW Player on Ad No Fill (only fires when cnx_ad_server QP set)",
        "node_type": "trigger"
      },
      "USGB99": {
        "condition": "( ( ( geo.country = 'US' ) | ( geo.country = 'GB' ) | ( geo.country = 'CA' ) | ( geo.country = 'AU' ) | ( geo.country = 'NZ' ) | ( geo.country = 'JP' ) | ( geo.country = 'SG' ) | ( geo.country = 'FR' ) | ( geo.country = 'MX' ) | ( geo.country = 'DE' ) | ( geo.country = 'IL' ) | ( geo.country = 'AR' ) | ( geo.country = 'BE' ) | ( geo.country = 'CL' ) | ( geo.country = 'CO' ) | ( geo.country = 'ES' ) | ( geo.country = 'IT' ) | ( geo.country = 'NL' ) | ( geo.country = 'PE' ) | ( geo.country = 'BR' ) | ( geo.country = 'AT' ) | ( geo.country = 'TH' ) | ( geo.country = 'PH' ) | ( geo.country = 'SE' ) | ( page.query_params.partner = 'jw' ) ) & ( page.query_params.partner != 'showheroes' ) & ( page.query_params.partner != 'outbrain' ) & ( page.query_params.partner != 'exco' ) & ( page.query_params.partner != 'anyclip' ) )",
        "false_child": "excoDirectCountries",
        "id": "USGB99",
        "name": "US/GB/CA/AU+?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "split"
      },
      "anyclipAnime": {
        "child": null,
        "config": {
          "custom_code_experience": {
            "custom_code_config": {
              "javascript": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Danyclip%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\nvar scp = document.createElement('script');\nscp.src = \"https://player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js\";\nscp.setAttribute('pubname', 'fandomcom');\nscp.dataset.variant = `$8-${payload.analytics.outcomeId}`;\nlet widgetName = jwDataStore.custom[payload.placementId].tier === 4 ? '001w000001Y8ud2AAB_M10512' : '001w000001Y8ud2AAB_M12753';\nscp.setAttribute('widgetname', widgetName);\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(scp);"
            }
          }
        },
        "id": "anyclipAnime",
        "macros": [],
        "name": "Anyclip Anime",
        "node_subtype": "custom_code",
        "node_type": "config"
      },
      "anyclipAnimeNoFillTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "remove",
            "namespace": "player"
          },
          {
            "arguments": [
              {
                "argument": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Danyclip%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\nvar scp = document.createElement('script');\nscp.src = \"https://player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js\";\nscp.setAttribute('pubname', 'fandomcom');\nscp.dataset.variant = `$8-${payload.analytics.outcomeId}`;\nlet widgetName = jwDataStore.custom[payload.placementId].tier === 4 ? '001w000001Y8ud2AAB_M10512' : '001w000001Y8ud2AAB_M12753';\nscp.setAttribute('widgetname', widgetName);\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(scp);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "( ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( geo.country != 'SE' ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "anyclipAnimeNoFillTrigger",
        "name": "Trigger Anyclip Anime on Ad No Fill",
        "node_type": "trigger"
      },
      "anyclipCAnime": {
        "condition": "( custom.this_placement.playlist_id = 'sXWp3rZ0' )",
        "false_child": "anyclipEntertainment",
        "id": "anyclipCAnime",
        "name": "Anime Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "anyclipAnime"
      },
      "anyclipCAnimeTrigger": {
        "condition": "( custom.this_placement.playlist_id = 'sXWp3rZ0' )",
        "false_child": "anyclipEntertainmentNoFillTrigger",
        "id": "anyclipCAnimeTrigger",
        "name": "Anime Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "anyclipAnimeNoFillTrigger"
      },
      "anyclipCGaming": {
        "condition": "( custom.this_placement.playlist_id = 'K21eFFRc' )",
        "false_child": "anyclipCAnime",
        "id": "anyclipCGaming",
        "name": "Gaming Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "anyclipGaming"
      },
      "anyclipCGamingTrigger": {
        "condition": "( custom.this_placement.playlist_id = 'K21eFFRc' )",
        "false_child": "anyclipCAnimeTrigger",
        "id": "anyclipCGamingTrigger",
        "name": "Gaming Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "anyclipGamingNoFillTrigger"
      },
      "anyclipDirectCountries": {
        "condition": "( geo.country = 'MA' )",
        "false_child": "excoDirectCountries",
        "id": "anyclipDirectCountries",
        "name": "Anyclip QP or Direct Countries?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "anyclipCGaming"
      },
      "anyclipEntertainment": {
        "child": null,
        "config": {
          "custom_code_experience": {
            "custom_code_config": {
              "javascript": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Danyclip%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\nvar scp = document.createElement('script');\nscp.src = \"https://player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js\";\nscp.setAttribute('pubname', 'fandomcom');\nscp.dataset.variant = `$8-${payload.analytics.outcomeId}`;\nlet widgetName = jwDataStore.custom[payload.placementId].tier === 4 ? '001w000001Y8ud2AAB_M10512' : '001w000001Y8ud2AAB_M12754';\nscp.setAttribute('widgetname', widgetName);\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(scp);"
            }
          }
        },
        "id": "anyclipEntertainment",
        "macros": [],
        "name": "Anyclip Entertainment",
        "node_subtype": "custom_code",
        "node_type": "config"
      },
      "anyclipEntertainmentNoFillTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "remove",
            "namespace": "player"
          },
          {
            "arguments": [
              {
                "argument": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Danyclip%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\nvar scp = document.createElement('script');\nscp.src = \"https://player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js\";\nscp.setAttribute('pubname', 'fandomcom');\nscp.dataset.variant = `$8-${payload.analytics.outcomeId}`;\nlet widgetName = jwDataStore.custom[payload.placementId].tier === 4 ? '001w000001Y8ud2AAB_M10512' : '001w000001Y8ud2AAB_M12754';\nscp.setAttribute('widgetname', widgetName);\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(scp);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "( ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( geo.country != 'SE' ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "anyclipEntertainmentNoFillTrigger",
        "name": "Trigger Anyclip Entertainment on Ad No Fill",
        "node_type": "trigger"
      },
      "anyclipGaming": {
        "child": null,
        "config": {
          "custom_code_experience": {
            "custom_code_config": {
              "javascript": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Danyclip%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\nvar scp = document.createElement('script');\nscp.src = \"https://player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js\";\nscp.setAttribute('pubname', 'fandomcom');\nscp.dataset.variant = `$8-${payload.analytics.outcomeId}`;\nlet widgetName = jwDataStore.custom[payload.placementId].tier === 4 ? '001w000001Y8ud2AAB_M10512' : '001w000001Y8ud2AAB_M12728';\nscp.setAttribute('widgetname', widgetName);\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(scp);"
            }
          }
        },
        "id": "anyclipGaming",
        "macros": [],
        "name": "Anyclip Gaming",
        "node_subtype": "custom_code",
        "node_type": "config"
      },
      "anyclipGamingNoFillTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "remove",
            "namespace": "player"
          },
          {
            "arguments": [
              {
                "argument": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Danyclip%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\nvar scp = document.createElement('script');\nscp.src = \"https://player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js\";\nscp.setAttribute('pubname', 'fandomcom');\nscp.dataset.variant = `$8-${payload.analytics.outcomeId}`;\nlet widgetName = jwDataStore.custom[payload.placementId].tier === 4 ? '001w000001Y8ud2AAB_M10512' : '001w000001Y8ud2AAB_M12728';\nscp.setAttribute('widgetname', widgetName);\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(scp);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "( ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( geo.country != 'SE' ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "anyclipGamingNoFillTrigger",
        "name": "Trigger Anyclip Gaming on Ad No Fill",
        "node_type": "trigger"
      },
      "anyclipNoFillVariant": {
        "child": "anyclipCGamingTrigger",
        "id": "anyclipNoFillVariant",
        "name": "Anyclip Direct Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "anyclipOptimizerVariant": {
        "child": "anyclipCGaming",
        "id": "anyclipOptimizerVariant",
        "name": "Anyclip Optimizer Variant",
        "node_type": "experience_optimizer_variant"
      },
      "anyclipVariant": {
        "child": "anyclipCGaming",
        "id": "anyclipVariant",
        "name": "Anyclip Direct Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "baselinePinningVariant": {
        "child": "setSponsoredKVPs2",
        "id": "baselinePinningVariant",
        "name": "Baseline Pinning Variant",
        "node_type": "ab_variant",
        "weight": 100
      },
      "cnxAdServerJWConfig": {
        "child": "updateAdTagCnxAdServer",
        "config": {
          "player_experience": {
            "jwplayer_config": {
              "advertising": {
                "adServer": {
                  "adUnitId": "{page.query_params.cnxAdUnitId}",
                  "cid": "016551d5-7095-47c0-a46b-fd0cb9bf4c72",
                  "strategyOutcomeId": "1_b"
                },
                "autoplayadsmuted": true,
                "client": "{page.query_params.jwAdClient}",
                "outstream": false
              },
              "aspectratio": "16:9",
              "autoPause": {
                "viewability": false
              },
              "autostart": true,
              "captions": {
                "backgroundColor": "#000000",
                "backgroundOpacity": 75,
                "color": "#FFFFFF",
                "edgeStyle": "none",
                "fontFamily": "sans-serif",
                "fontOpacity": 100,
                "fontSize": 15,
                "windowColor": "#000000",
                "windowOpacity": 0
              },
              "controls": true,
              "displayHeading": false,
              "displaydescription": true,
              "displaytitle": true,
              "floating": {
                "mode": "never"
              },
              "generateSEOMetadata": true,
              "include_compatibility_script": false,
              "intl": {
                "en": {
                  "related": {
                    "autoplaymessage": "",
                    "heading": "More Videos"
                  }
                }
              },
              "keepWatching": {
                "countdownDuration": 8,
                "countdownStartTime": 23
              },
              "logo": {
                "hide": true,
                "position": "top-right"
              },
              "mute": true,
              "pid": "DEFAULT0",
              "pipIcon": "disabled",
              "playbackRateControls": true,
              "plugins": {
                "https://assets.connatix.com/Elements/9f387617-6455-4986-b66f-7d263336f879/fandom-floating-ui-plugin.js": {}
              },
              "preload": "metadata",
              "related": {
                "autoplaytimer": 5,
                "displayMode": "overlay",
                "onclick": "play",
                "oncomplete": "autoplay",
                "shouldAutoAdvance": "true"
              },
              "repeat": false,
              "showUIWhen": "onContent",
              "skin": {
                "controlbar": {
                  "background": "rgba(0,0,0,0)",
                  "icons": "rgba(255,255,255,0.8)",
                  "iconsActive": "#FFFFFF",
                  "text": "#FFFFFF"
                },
                "menus": {
                  "background": "#333333",
                  "text": "rgba(255,255,255,0.8)",
                  "textActive": "#FFFFFF"
                },
                "timeslider": {
                  "progress": "#F2F2F2",
                  "rail": "rgba(255,255,255,0.3)"
                },
                "tooltips": {
                  "background": "#FFFFFF",
                  "text": "#000000"
                }
              },
              "width": "100%"
            }
          }
        },
        "id": "cnxAdServerJWConfig",
        "macros": [
          {
            "config_key": "player_experience.jwplayer_config.advertising.adServer.adUnitId",
            "datastore_key": "page.query_params.cnxAdUnitId",
            "default": "cd24b9c0-55b4-4f50-b433-ebf2b6ebbfe7"
          },
          {
            "config_key": "player_experience.jwplayer_config.advertising.client",
            "datastore_key": "page.query_params.jwAdClient",
            "default": "https://ssl.p.jwpcdn.com/player/v/8.36.9999/cnx.js"
          }
        ],
        "name": "JW Config using CNX Ad Server",
        "node_subtype": "content",
        "node_type": "config"
      },
      "cnxAdServerVariant": {
        "child": "setSponsoredKVPs2CnxAdServer",
        "id": "cnxAdServerVariant",
        "name": "Connatix Ad Server Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "commonJWConfig": {
        "child": "updateAdTagJWP",
        "config": {
          "player_experience": {
            "dynamic_ads_config": {
              "adBreaks": {
                "mid": {},
                "pre": {}
              },
              "rules": {
                "contentToAdRatio": 1,
                "contentToAdRatioCalculationMethod": "useContentDuration",
                "forcePreroll": true,
                "minContentDurationForMidrollSeconds": 480,
                "secondsOfContentAfterFailedAd": 10,
                "secondsOfContentBetweenAds": 15
              }
            },
            "jwplayer_config": {
              "advertising": {
                "autoplayadsmuted": true,
                "client": "googima",
                "outstream": false
              },
              "aspectratio": "16:9",
              "autoPause": {
                "viewability": false
              },
              "autostart": true,
              "captions": {
                "backgroundColor": "#000000",
                "backgroundOpacity": 75,
                "color": "#FFFFFF",
                "edgeStyle": "none",
                "fontFamily": "sans-serif",
                "fontOpacity": 100,
                "fontSize": 15,
                "windowColor": "#000000",
                "windowOpacity": 0
              },
              "controls": true,
              "displayHeading": false,
              "displaydescription": true,
              "displaytitle": true,
              "floating": {
                "mode": "never"
              },
              "generateSEOMetadata": true,
              "include_compatibility_script": false,
              "intl": {
                "en": {
                  "related": {
                    "autoplaymessage": "",
                    "heading": "More Videos"
                  }
                }
              },
              "keepWatching": {
                "countdownDuration": 8,
                "countdownStartTime": 23
              },
              "logo": {
                "hide": true,
                "position": "top-right"
              },
              "mute": true,
              "pid": "DEFAULT0",
              "pipIcon": "disabled",
              "playbackRateControls": true,
              "plugins": {
                "https://assets.connatix.com/Elements/9f387617-6455-4986-b66f-7d263336f879/fandom-floating-ui-plugin.js": {}
              },
              "preload": "metadata",
              "related": {
                "autoplaytimer": 5,
                "displayMode": "overlay",
                "onclick": "play",
                "oncomplete": "autoplay",
                "shouldAutoAdvance": "true"
              },
              "repeat": false,
              "showUIWhen": "onContent",
              "skin": {
                "controlbar": {
                  "background": "rgba(0,0,0,0)",
                  "icons": "rgba(255,255,255,0.8)",
                  "iconsActive": "#FFFFFF",
                  "text": "#FFFFFF"
                },
                "menus": {
                  "background": "#333333",
                  "text": "rgba(255,255,255,0.8)",
                  "textActive": "#FFFFFF"
                },
                "timeslider": {
                  "progress": "#F2F2F2",
                  "rail": "rgba(255,255,255,0.3)"
                },
                "tooltips": {
                  "background": "#FFFFFF",
                  "text": "#000000"
                }
              },
              "width": "100%"
            }
          }
        },
        "id": "commonJWConfig",
        "macros": [],
        "name": "Common JW Config",
        "node_subtype": "content",
        "node_type": "config"
      },
      "connatixDirect": {
        "child": null,
        "config": {
          "custom_code_experience": {
            "custom_code_config": {
              "javascript": "let token = jwDataStore.custom[payload.placementId].tier === 4 ? 'b417e5b8-02e3-40d6-bd82-036dabe07830' : '251b1082-efe7-4e03-99a2-cf1ce5c4efeb';\n\nif (!window.cnx) {\n    window.cnx = {};\n    window.cnx.cmd = [];\n    let t = document.createElement('iframe');\n    t.src = 'javascript:false';\n    t.display = 'none';\n    var n = null;\n    t.onload = function () {\n        n = t.contentWindow.document;\n        let c = n.createElement('script');\n        c.src = `//cd.connatix.com/connatix.player.js?cid=016551d5-7095-47c0-a46b-fd0cb9bf4c72&pid=${token}`;\n        c.setAttribute('async', '1');\n        c.setAttribute('type', 'text/javascript');\n        n.body.appendChild(c)\n    };\n    document.head.appendChild(t)\n}\n\nlet playlists = {\n    'K21eFFRc': '9bdf4208-a923-44b1-8fb3-4e1289c300c9',\n    'CR0MZ2ZP': '740e6aed-8e71-4c87-842f-45398734be12',\n    'sXWp3rZ0': '36081eca-e784-4e30-87c3-133cf673e447',\n}\n\nlet cnxPlaylistId = playlists[jwDataStore.custom[payload.placementId].playlist_id] ?? '740e6aed-8e71-4c87-842f-45398734be12';\n\nlet scp = document.createElement(\"script\");\nscp.id = \"9db83d6e0f9e4d8f8d7c5a4fe1b97f9f\";\nscp.textContent = `\n    (new Image()).src = 'https://capi.connatix.com/tr/si?token=${token}&cid=016551d5-7095-47c0-a46b-fd0cb9bf4c72';\n    cnx.cmd.push(function () {\n        cnx({\n            playerId: \"${token}\",\n            playlistId: \"${cnxPlaylistId}\",\n\t\t\t\t\t\tstrategyOutcomeId: \"${payload.analytics.outcomeId}\"\n        }).render(\"9db83d6e0f9e4d8f8d7c5a4fe1b97f9f\");\n    });\n`;\nwindow.top.document.querySelector(`[data-jw-placement-id=${payload.placementId}]`).appendChild(scp);"
            }
          }
        },
        "id": "connatixDirect",
        "macros": [],
        "name": "Connatix",
        "node_subtype": "custom_code",
        "node_type": "config"
      },
      "connatixNoFillTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "remove",
            "namespace": "player"
          },
          {
            "arguments": [
              {
                "argument": "let token = jwDataStore.custom[payload.placementId].tier === 4 ? 'b417e5b8-02e3-40d6-bd82-036dabe07830' : '251b1082-efe7-4e03-99a2-cf1ce5c4efeb';\n\nif (!window.cnx) {\n    window.cnx = {};\n    window.cnx.cmd = [];\n    let t = document.createElement('iframe');\n    t.src = 'javascript:false';\n    t.display = 'none';\n    var n = null;\n    t.onload = function () {\n        n = t.contentWindow.document;\n        let c = n.createElement('script');\n        c.src = `//cd.connatix.com/connatix.player.js?cid=016551d5-7095-47c0-a46b-fd0cb9bf4c72&pid=${token}`;\n        c.setAttribute('async', '1');\n        c.setAttribute('type', 'text/javascript');\n        n.body.appendChild(c)\n    };\n    document.head.appendChild(t)\n}\n\nlet playlists = {\n    'K21eFFRc': '9bdf4208-a923-44b1-8fb3-4e1289c300c9',\n    'CR0MZ2ZP': '740e6aed-8e71-4c87-842f-45398734be12',\n    'sXWp3rZ0': '36081eca-e784-4e30-87c3-133cf673e447',\n}\n\nlet cnxPlaylistId = playlists[jwDataStore.custom[payload.placementId].playlist_id] ?? '740e6aed-8e71-4c87-842f-45398734be12';\n\nlet scp = document.createElement(\"script\");\nscp.id = \"9db83d6e0f9e4d8f8d7c5a4fe1b97f9f\";\nscp.textContent = `\n    (new Image()).src = 'https://capi.connatix.com/tr/si?token=${token}&cid=016551d5-7095-47c0-a46b-fd0cb9bf4c72';\n    cnx.cmd.push(function () {\n        cnx({\n            playerId: \"${token}\",\n            playlistId: \"${cnxPlaylistId}\",\n\t\t\t\t\t\tstrategyOutcomeId: \"${payload.analytics.outcomeId}\"\n        }).render(\"9db83d6e0f9e4d8f8d7c5a4fe1b97f9f\");\n    });\n`;\nwindow.top.document.querySelector(`[data-jw-placement-id=${payload.placementId}]`).appendChild(scp);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "( ( page.query_params.partner != 'cnx_ad_server' ) & ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) & ( event.adposition = 'pre' ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "connatixNoFillTrigger",
        "name": "Trigger Connatix on Ad No Fill",
        "node_type": "trigger"
      },
      "connatixNoFillVariant": {
        "child": "JWconnatixAdServerNoFillQPTrigger",
        "id": "connatixNoFillVariant",
        "name": "Connatix Direct Variant",
        "node_type": "ab_variant",
        "weight": 95
      },
      "connatixOptimizerVariant": {
        "child": "connatixDirect",
        "id": "connatixOptimizerVariant",
        "name": "Connatix Optimizer Variant",
        "node_type": "experience_optimizer_variant"
      },
      "connatixVariant": {
        "child": "connatixDirect",
        "id": "connatixVariant",
        "name": "Connatix Direct Variant",
        "node_type": "ab_variant",
        "weight": 94
      },
      "countryDefined": {
        "condition": "( geo.country isDefined )",
        "false_child": "countryUndefinedPrint",
        "id": "countryDefined",
        "name": "Country defined?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "excoFallbackCountries"
      },
      "countrySplit": {
        "id": "countrySplit",
        "name": "Country Traffic Split",
        "node_type": "ab_test",
        "total_weight": 100,
        "variants": [
          "shVariant",
          "anyclipVariant",
          "connatixVariant",
          "optimizerVariant"
        ]
      },
      "countryUndefinedPrint": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "console.log('Country is Undefined, Timed Out');",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "",
          "frequency": 1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "countryUndefinedPrint",
        "name": "Print Country is Undefined",
        "node_type": "trigger"
      },
      "disableDynamicAds": {
        "actions": [
          {
            "arguments": [],
            "function": "disableForCurrentItem",
            "namespace": "dynamicAds"
          }
        ],
        "child": "updateAdTagJWPDynamicAds",
        "event": {
          "condition": "( this_placement.player.current_item.isSponsored = 'Yes' )",
          "frequency": -1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "disableDynamicAds",
        "name": "Disable Dynamic Ads for Sponsored Media in the US",
        "node_type": "trigger"
      },
      "disableKeepWatching": {
        "actions": [
          {
            "arguments": [],
            "function": "disableKeepWatchingForCurrentItem",
            "namespace": "player"
          }
        ],
        "child": "countryDefined",
        "event": {
          "condition": "( ( page.query_params.partner = 'disableKeepWatching' ) | ( this_placement.player.current_item.isSponsored = 'Yes' ) | ( ( this_placement.player.current_item_index < custom.this_placement.disable_keep_watching_until_slot ) & ( ( geo.country = 'US' ) | ( geo.country = 'GB' ) | ( geo.country = 'CA' ) ) ) )",
          "frequency": -1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "disableKeepWatching",
        "name": "Disable Keep Watching for Sponsored Media in the US",
        "node_type": "trigger"
      },
      "dynamicAdsJWConfig": {
        "child": "disableDynamicAds",
        "config": {
          "player_experience": {
            "dynamic_ads_config": {
              "adBreaks": {
                "mid": {
                  "macros": [],
                  "tag": "https://capi.connatix.com/rtb/tag?gdpr_consent=__gdpr_consent__&us_privacy=[US_PRIVACY]&page_url=__page-url__&domain=__domain__&w=__player-width__&h=__player-height__&player_id=d080bb41-e159-480c-a5f8-7cc6a5db8957"
                },
                "pre": {
                  "macros": [
                    {
                      "datastore_key": "custom.this_placement.preroll_ad_tag",
                      "default": "",
                      "target_key": "tag"
                    }
                  ],
                  "tag": "{custom.this_placement.preroll_ad_tag}"
                }
              },
              "rules": {
                "contentToAdRatio": 4,
                "forcePreroll": true,
                "secondsOfContentAfterFailedAd": 10,
                "secondsOfContentBetweenAds": 60
              }
            },
            "jwplayer_config": {
              "advertising": {
                "adServer": {
                  "adUnitId": "{page.query_params.cnxAdUnitId}",
                  "cid": "016551d5-7095-47c0-a46b-fd0cb9bf4c72",
                  "strategyOutcomeId": "2_b"
                },
                "autoplayadsmuted": true,
                "client": "{page.query_params.jwAdClient}",
                "outstream": false
              },
              "aspectratio": "16:9",
              "autoPause": {
                "viewability": false
              },
              "autostart": true,
              "captions": {
                "backgroundColor": "#000000",
                "backgroundOpacity": 75,
                "color": "#FFFFFF",
                "edgeStyle": "none",
                "fontFamily": "sans-serif",
                "fontOpacity": 100,
                "fontSize": 15,
                "windowColor": "#000000",
                "windowOpacity": 0
              },
              "controls": true,
              "displayHeading": false,
              "displaydescription": true,
              "displaytitle": true,
              "floating": {
                "mode": "never"
              },
              "generateSEOMetadata": true,
              "include_compatibility_script": false,
              "intl": {
                "en": {
                  "related": {
                    "autoplaymessage": "",
                    "heading": "More Videos"
                  }
                }
              },
              "keepWatching": {
                "countdownDuration": 8,
                "countdownStartTime": 23
              },
              "logo": {
                "hide": true,
                "position": "top-right"
              },
              "mute": true,
              "pid": "DEFAULT0",
              "pipIcon": "disabled",
              "playbackRateControls": true,
              "preload": "metadata",
              "related": {
                "autoplaytimer": 5,
                "displayMode": "overlay",
                "onclick": "play",
                "oncomplete": "autoplay",
                "shouldAutoAdvance": "true"
              },
              "repeat": false,
              "showUIWhen": "onContent",
              "skin": {
                "controlbar": {
                  "background": "rgba(0,0,0,0)",
                  "icons": "rgba(255,255,255,0.8)",
                  "iconsActive": "#FFFFFF",
                  "text": "#FFFFFF"
                },
                "menus": {
                  "background": "#333333",
                  "text": "rgba(255,255,255,0.8)",
                  "textActive": "#FFFFFF"
                },
                "timeslider": {
                  "progress": "#F2F2F2",
                  "rail": "rgba(255,255,255,0.3)"
                },
                "tooltips": {
                  "background": "#FFFFFF",
                  "text": "#000000"
                }
              },
              "width": "100%"
            }
          }
        },
        "id": "dynamicAdsJWConfig",
        "macros": [
          {
            "config_key": "player_experience.jwplayer_config.advertising.adServer.adUnitId",
            "datastore_key": "page.query_params.cnxAdUnitId",
            "default": "ec029184-2028-49b6-b90b-9fbca267e9e4"
          },
          {
            "config_key": "player_experience.jwplayer_config.advertising.client",
            "datastore_key": "page.query_params.jwAdClient",
            "default": "https://ssl.p.jwpcdn.com/player/v/8.36.9999/cnx.js"
          }
        ],
        "name": "Dynamic Ads Variant JW Config",
        "node_subtype": "content",
        "node_type": "config"
      },
      "dynamicAdsVariant": {
        "child": "setSponsoredKVPs2DynamicAds",
        "id": "dynamicAdsVariant",
        "name": "Dynamic Ads Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "excoCountriesAnyclipDirectVariant": {
        "child": "anyclipCGaming",
        "id": "excoCountriesAnyclipDirectVariant",
        "name": "Anyclip Direct Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "excoCountriesConnatixDirectVariant": {
        "child": "connatixDirect",
        "id": "excoCountriesConnatixDirectVariant",
        "name": "Connatix Direct Variant",
        "node_type": "ab_variant",
        "weight": 92
      },
      "excoCountriesSHDirectVariant": {
        "child": "shCGaming",
        "id": "excoCountriesSHDirectVariant",
        "name": "Showheroes Direct Variant",
        "node_type": "ab_variant",
        "weight": 8
      },
      "excoDirectCountries": {
        "condition": "( ( geo.country = 'MA' ) | ( geo.country = 'MX' ) | ( geo.country = 'BR' ) | ( geo.country = 'RU' ) | ( geo.country = 'ZA' ) | ( geo.country = 'SA' ) )",
        "false_child": "shDirectCountries",
        "id": "excoDirectCountries",
        "name": "Exco Direct Countries?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "excoDirectSplit"
      },
      "excoDirectSplit": {
        "id": "excoDirectSplit",
        "name": "97/2/1 Traffic Split for Countries where Exco is best",
        "node_type": "ab_test",
        "total_weight": 100,
        "variants": [
          "excoCountriesSHDirectVariant",
          "excoCountriesAnyclipDirectVariant",
          "excoCountriesConnatixDirectVariant"
        ]
      },
      "excoFallbackCountries": {
        "condition": "( ( geo.country = 'US' ) | ( geo.country = 'CA' ) | ( geo.country = 'GB' ) | ( geo.country = 'AU' ) | ( geo.country = 'MX' ) | ( geo.country = 'IL' ) )",
        "false_child": "fallbackSplit",
        "id": "excoFallbackCountries",
        "name": "Exco Fallback Countries?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "primeCountryFallbackSplit"
      },
      "experienceOptimizer": {
        "id": "experienceOptimizer",
        "metric": "rpm",
        "name": "Partner Experience Optimizer",
        "node_type": "experience_optimizer",
        "variants": [
          "anyclipOptimizerVariant",
          "connatixOptimizerVariant"
        ]
      },
      "fallbackSplit": {
        "id": "fallbackSplit",
        "name": "Traffic Split for No Fill Fallback",
        "node_type": "ab_test",
        "total_weight": 96,
        "variants": [
          "shNoFillVariant",
          "anyclipNoFillVariant",
          "connatixNoFillVariant"
        ]
      },
      "frequencyCap": {
        "actions": [
          {
            "arguments": [],
            "function": "blockPlaylistItem",
            "namespace": "player"
          }
        ],
        "child": "disableKeepWatching",
        "event": {
          "condition": "( ( this_placement.player.current_item_enrichment.media_campaigns.eligible = false ) | ( ( this_placement.player.current_item.isSponsored = 'Yes' ) & ( ( page.url in ('https://atheism.fandom.com/wiki/Bestiality','https://cinemorgue.fandom.com/wiki/Category:Death_scenes_by_decapitation','https://gta.fandom.com/wiki/Dildo','https://manhunt.fandom.com/wiki/Dentist_Chair','https://manhunt.fandom.com/wiki/Dildo','https://memory-alpha.fandom.com/wiki/Decapitation','https://memory-alpha.fandom.com/wiki/Genitals','https://memory-alpha.fandom.com/wiki/Rape','https://military-history.fandom.com/wiki/Unit_731','https://psychology.fandom.com/wiki/Anal_sex','https://psychology.fandom.com/wiki/Coprophilia','https://psychology.fandom.com/wiki/Glans_penis','https://psychology.fandom.com/wiki/Human_penis_size','https://psychology.fandom.com/wiki/Penis_removal','https://psychology.fandom.com/wiki/Prostitution','https://psychology.fandom.com/wiki/Sexual_abuse_of_people_with_developmental_disabilities','https://psychology.fandom.com/wiki/Statutory_rape','https://psychology.fandom.com/wiki/Types_of_rape','https://publicsafety.fandom.com/wiki/Rape','https://supernatural.fandom.com/wiki/Decapitation','https://tardis.fandom.com/wiki/Rape','https://the-true-tropes.fandom.com/wiki/Gag_Penis','https://wheelerverse.fandom.com/wiki/Bestiality') ) ) ) )",
          "frequency": -1,
          "macros": [],
          "name": "playlistItemTransition",
          "type": "player"
        },
        "id": "frequencyCap",
        "name": "Skip media that have exceeded the frequency cap",
        "node_type": "trigger"
      },
      "jwplayerDevice": {
        "condition": "( device.type = 'Desktop' )",
        "false_child": "setSponsoredKVPsMobile",
        "id": "jwplayerDevice",
        "name": "Desktop?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "setSponsoredKVPsDesktop"
      },
      "keepWatchingVariant": {
        "child": "setSponsoredKVPs0",
        "id": "keepWatchingVariant",
        "name": "Player for when there is no sponsored content, with keep watching always on",
        "node_type": "ab_variant",
        "weight": 0
      },
      "optimizerVariant": {
        "child": "experienceOptimizer",
        "id": "optimizerVariant",
        "name": "Optimizer Node Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "partialAdLoadingUIJWConfig": {
        "child": null,
        "config": {
          "player_experience": {
            "jwplayer_config": {
              "allowPlaybackWhileHiddenAdLoading": true,
              "enableAdLoadingUI": false
            }
          }
        },
        "id": "partialAdLoadingUIJWConfig",
        "macros": [],
        "name": "Partial Ad Loading Config",
        "node_subtype": "content",
        "node_type": "config"
      },
      "playlistConfigPinDesktop": {
        "child": "commonJWConfig",
        "config": {
          "player_experience": {
            "jwplayer_config": {
              "playlist": "https://cdn.jwplayer.com/v2/playlists/{custom.this_placement.playlist_id}?pin_playlist=6_{custom.this_placement.sponsored_playlist_id},7_du7AoLm0&recommendations_playlist_id={custom.this_placement.recommendations_playlist_id}"
            }
          }
        },
        "id": "playlistConfigPinDesktop",
        "macros": [
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.playlist_id",
            "default": "CR0MZ2ZP"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.recommendations_playlist_id",
            "default": "FOhaD53w"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.sponsored_playlist_id",
            "default": "a1iFQXBs"
          }
        ],
        "name": "Desktop Playlist Config",
        "node_subtype": "content",
        "node_type": "config"
      },
      "playlistConfigPinMobile": {
        "child": "commonJWConfig",
        "config": {
          "player_experience": {
            "jwplayer_config": {
              "playlist": "https://cdn.jwplayer.com/v2/playlists/{custom.this_placement.playlist_id}?pin_playlist=7_{custom.this_placement.sponsored_playlist_id},8_du7AoLm0&recommendations_playlist_id={custom.this_placement.recommendations_playlist_id}"
            }
          }
        },
        "id": "playlistConfigPinMobile",
        "macros": [
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.playlist_id",
            "default": "CR0MZ2ZP"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.recommendations_playlist_id",
            "default": "FOhaD53w"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.sponsored_playlist_id",
            "default": "a1iFQXBs"
          }
        ],
        "name": "Non-Desktop Playlist Config",
        "node_subtype": "content",
        "node_type": "config"
      },
      "playlistConfigPinSlot2": {
        "child": "commonJWConfig",
        "config": {
          "player_experience": {
            "jwplayer_config": {
              "playlist": "https://cdn.jwplayer.com/v2/playlists/{custom.this_placement.playlist_id}?pin_playlist=2_{custom.this_placement.sponsored_playlist_id},3_du7AoLm0,4_du7AoLm0,5_jteZbRnD&recommendations_playlist_id={custom.this_placement.recommendations_playlist_id}"
            }
          }
        },
        "id": "playlistConfigPinSlot2",
        "macros": [
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.playlist_id",
            "default": "CR0MZ2ZP"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.recommendations_playlist_id",
            "default": "FOhaD53w"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.sponsored_playlist_id",
            "default": "a1iFQXBs"
          }
        ],
        "name": "Baseline Playlist Config",
        "node_subtype": "content",
        "node_type": "config"
      },
      "playlistConfigPinSlot2CnxAdServer": {
        "child": "cnxAdServerJWConfig",
        "config": {
          "player_experience": {
            "jwplayer_config": {
              "playlist": "https://cdn.jwplayer.com/v2/playlists/{custom.this_placement.playlist_id}?pin_playlist=2_{custom.this_placement.sponsored_playlist_id},3_du7AoLm0,4_du7AoLm0,5_jteZbRnD&recommendations_playlist_id={custom.this_placement.recommendations_playlist_id}"
            }
          }
        },
        "id": "playlistConfigPinSlot2CnxAdServer",
        "macros": [
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.playlist_id",
            "default": "CR0MZ2ZP"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.recommendations_playlist_id",
            "default": "FOhaD53w"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.sponsored_playlist_id",
            "default": "a1iFQXBs"
          }
        ],
        "name": "Baseline Playlist Config (Copy for CNX Ad Server)",
        "node_subtype": "content",
        "node_type": "config"
      },
      "playlistConfigPinSlot2DynamicAds": {
        "child": "dynamicAdsJWConfig",
        "config": {
          "player_experience": {
            "jwplayer_config": {
              "playlist": "https://cdn.jwplayer.com/v2/playlists/{custom.this_placement.playlist_id}?pin_playlist=2_{custom.this_placement.sponsored_playlist_id},3_du7AoLm0,4_du7AoLm0,5_jteZbRnD&recommendations_playlist_id={custom.this_placement.recommendations_playlist_id}"
            }
          }
        },
        "id": "playlistConfigPinSlot2DynamicAds",
        "macros": [
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.playlist_id",
            "default": "CR0MZ2ZP"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.recommendations_playlist_id",
            "default": "FOhaD53w"
          },
          {
            "config_key": "player_experience.jwplayer_config.playlist",
            "datastore_key": "custom.this_placement.sponsored_playlist_id",
            "default": "a1iFQXBs"
          }
        ],
        "name": "Dynamic Playlist Config",
        "node_subtype": "content",
        "node_type": "config"
      },
      "preRoll": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "{custom.this_placement.preroll_ad_tag}",
                "macros": [
                  {
                    "datastore_key": "custom.this_placement.preroll_ad_tag",
                    "default": ""
                  }
                ]
              }
            ],
            "function": "loadAdTag",
            "namespace": "player"
          }
        ],
        "child": "preRollXml",
        "event": {
          "condition": "( ( event.state = 'idle' ) & ( this_placement.player.current_item.isSponsored != 'Yes' ) & ( ( custom.this_placement.vastxml isUndefined ) | ( ( custom.this_placement.vastxml isDefined ) & ( this_placement.player.current_item_index > 0 ) ) ) )",
          "frequency": -1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "preRoll",
        "name": "Play Preroll Ad Tag for Non-Sponsored Media",
        "node_type": "trigger"
      },
      "preRollXml": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "{custom.this_placement.vastxml}",
                "macros": [
                  {
                    "datastore_key": "custom.this_placement.vastxml",
                    "default": ""
                  }
                ]
              }
            ],
            "function": "loadAdXml",
            "namespace": "player"
          }
        ],
        "child": "frequencyCap",
        "event": {
          "condition": "( ( event.state = 'idle' ) & ( this_placement.player.current_item.isSponsored != 'Yes' ) & ( custom.this_placement.vastxml isDefined ) & ( this_placement.player.current_item_index = 0 ) )",
          "frequency": -1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "preRollXml",
        "name": "Play Preroll XML for Non-Sponsored Media",
        "node_type": "trigger"
      },
      "primeCountriesAnyclipFallbackVariant": {
        "child": "anyclipCGamingTrigger",
        "id": "primeCountriesAnyclipFallbackVariant",
        "name": "Anyclip JW Fallback Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "primeCountriesConnatixFallbackVariant": {
        "child": "JWconnatixAdServerNoFillQPTrigger",
        "id": "primeCountriesConnatixFallbackVariant",
        "name": "Connatix JW Fallback Variant",
        "node_type": "ab_variant",
        "weight": 99
      },
      "primeCountryFallbackSplit": {
        "id": "primeCountryFallbackSplit",
        "name": "95/5 Traffic Split for Prime Countries",
        "node_type": "ab_test",
        "total_weight": 99,
        "variants": [
          "primeCountriesAnyclipFallbackVariant",
          "primeCountriesConnatixFallbackVariant"
        ]
      },
      "qpAnyclip": {
        "child": "anyclipCGaming",
        "condition": "( page.query_params.partner = 'anyclip' )",
        "id": "qpAnyclip",
        "name": "Anyclip",
        "node_type": "switch_conditional"
      },
      "qpCnx": {
        "child": "connatixDirect",
        "condition": "( page.query_params.partner = 'cnx' )",
        "id": "qpCnx",
        "name": "Connatix",
        "node_type": "switch_conditional"
      },
      "qpCnxAdServer": {
        "child": "setSponsoredKVPs2CnxAdServer",
        "condition": "( page.query_params.cnxAdUnitId isDefined )",
        "id": "qpCnxAdServer",
        "name": "Connatix",
        "node_type": "switch_conditional"
      },
      "qpDynamic": {
        "child": "setSponsoredKVPs2DynamicAds",
        "condition": "( page.query_params.partner = 'dynamic' )",
        "id": "qpDynamic",
        "name": "DynamicAds",
        "node_type": "switch_conditional"
      },
      "qpNone": {
        "child": "USGB99",
        "condition": "true",
        "id": "qpNone",
        "name": "Other Visits Node",
        "node_type": "switch_conditional"
      },
      "qpSH": {
        "child": "shCGaming",
        "condition": "( page.query_params.partner = 'showheroes' )",
        "id": "qpSH",
        "name": "Showheroes",
        "node_type": "switch_conditional"
      },
      "qpSwitch": {
        "id": "qpSwitch",
        "name": "Query Params",
        "node_type": "switch",
        "switch_conditionals": [
          "qpSH",
          "qpAnyclip",
          "qpCnx",
          "qpDynamic",
          "qpCnxAdServer",
          "qpNone"
        ]
      },
      "setSponsoredKVPs0": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "const jwDataStore = window.jwDataStore || { custom: {} };\njwDataStore.custom[payload.placementId].sponsored_pin_slot = 0;\njwDataStore.custom[payload.placementId].emergency_sponsored_pin_slot = 3;\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 0;\nwindow.jwDataStore = jwDataStore;",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "playlistConfigPinSlot2",
        "event": {
          "condition": "",
          "frequency": 1,
          "macros": [],
          "name": "ready",
          "type": "player"
        },
        "id": "setSponsoredKVPs0",
        "name": "Set Sponsored KVP to slot 0, assuming no sponsored content and allow KW and player switching always",
        "node_type": "trigger"
      },
      "setSponsoredKVPs2": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "const jwDataStore = window.jwDataStore || { custom: {} };\njwDataStore.custom[payload.placementId].sponsored_pin_slot = 2;\njwDataStore.custom[payload.placementId].emergency_sponsored_pin_slot = 3;\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 0;\nwindow.jwDataStore = jwDataStore;",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          },
          {
            "arguments": [],
            "function": "disable",
            "namespace": "dynamicAds"
          }
        ],
        "child": "playlistConfigPinSlot2",
        "event": {
          "condition": "",
          "frequency": 1,
          "macros": [],
          "name": "ready",
          "type": "player"
        },
        "id": "setSponsoredKVPs2",
        "name": "Set Sponsored KVP to slot 2",
        "node_type": "trigger"
      },
      "setSponsoredKVPs2CnxAdServer": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "const jwDataStore = window.jwDataStore || { custom: {} };\njwDataStore.custom[payload.placementId].sponsored_pin_slot = 2;\njwDataStore.custom[payload.placementId].emergency_sponsored_pin_slot = 3;\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 2;\nwindow.jwDataStore = jwDataStore;",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "playlistConfigPinSlot2CnxAdServer",
        "event": {
          "condition": "",
          "frequency": 1,
          "macros": [],
          "name": "ready",
          "type": "player"
        },
        "id": "setSponsoredKVPs2CnxAdServer",
        "name": "Set Sponsored KVP to slot 2 (Copy for CNX Ad Server Branch)",
        "node_type": "trigger"
      },
      "setSponsoredKVPs2DynamicAds": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "const jwDataStore = window.jwDataStore || { custom: {} };\njwDataStore.custom[payload.placementId].sponsored_pin_slot = 2;\njwDataStore.custom[payload.placementId].emergency_sponsored_pin_slot = 3;\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 2;\nwindow.jwDataStore = jwDataStore;",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "playlistConfigPinSlot2DynamicAds",
        "event": {
          "condition": "",
          "frequency": 1,
          "macros": [],
          "name": "ready",
          "type": "player"
        },
        "id": "setSponsoredKVPs2DynamicAds",
        "name": "Set Sponsored KVP to slot 2 for Dynamic Ads Variant",
        "node_type": "trigger"
      },
      "setSponsoredKVPsDesktop": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "const jwDataStore = window.jwDataStore || { custom: {} };\njwDataStore.custom[payload.placementId].sponsored_pin_slot = 6;\njwDataStore.custom[payload.placementId].emergency_sponsored_pin_slot = 7;\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 0;\nwindow.jwDataStore = jwDataStore;",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "playlistConfigPinDesktop",
        "event": {
          "condition": "",
          "frequency": 1,
          "macros": [],
          "name": "ready",
          "type": "player"
        },
        "id": "setSponsoredKVPsDesktop",
        "name": "Set Desktop Sponsored KVP to slot 6",
        "node_type": "trigger"
      },
      "setSponsoredKVPsMobile": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "const jwDataStore = window.jwDataStore || { custom: {} };\njwDataStore.custom[payload.placementId].sponsored_pin_slot = 7;\njwDataStore.custom[payload.placementId].emergency_sponsored_pin_slot = 8;\njwDataStore.custom[payload.placementId].disable_keep_watching_until_slot = 0;\nwindow.jwDataStore = jwDataStore;",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "playlistConfigPinMobile",
        "event": {
          "condition": "",
          "frequency": 1,
          "macros": [],
          "name": "ready",
          "type": "player"
        },
        "id": "setSponsoredKVPsMobile",
        "name": "Set Non-Desktop Sponsored KVP to slot 7",
        "node_type": "trigger"
      },
      "shAnime": {
        "child": null,
        "config": {
          "custom_code_experience": {
            "custom_code_config": {
              "javascript": "var elements = document.getElementsByClassName(\"mobile-article-video-wrapper\");\nif (elements.length > 0) {elements[0].style.transform = 'initial';};\nlet pub_adtag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag ?? '';\npub_adtag = pub_adtag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Dshowheroes%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\npub_adtag = encodeURIComponent(pub_adtag.replace(\"https://pubads.g.doubleclick.net/\", \"\"));\nlet zid = jwDataStore.custom[payload.placementId].tier === 4 ? 'AAFIJhaPv9C-UAbN' : 'AAF1-Qzs8MWzISA0';\nlet scp = document.createElement(\"script\");\nscp.src = `https://content.viralize.tv/display/?zid=${zid}&pub_adtag=${pub_adtag}`;\nscp.type = 'text/javascript';\nscp.dataset.wid = 'auto';\n\nlet sh_div = document.createElement('div');\nsh_div.id = 'sh-player';\nsh_div.appendChild(scp);\n\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(sh_div);"
            }
          }
        },
        "id": "shAnime",
        "macros": [],
        "name": "ShowHeroes Anime",
        "node_subtype": "custom_code",
        "node_type": "config"
      },
      "shAnimeTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "remove",
            "namespace": "player"
          },
          {
            "arguments": [
              {
                "argument": "var elements = document.getElementsByClassName(\"mobile-article-video-wrapper\");\nif (elements.length > 0) {elements[0].style.transform = 'initial';};\nlet pub_adtag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag ?? '';\npub_adtag = pub_adtag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Dshowheroes%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\npub_adtag = encodeURIComponent(pub_adtag.replace(\"https://pubads.g.doubleclick.net/\", \"\"));\nlet zid = jwDataStore.custom[payload.placementId].tier === 4 ? 'AAFIJhaPv9C-UAbN' : 'AAF1-Qzs8MWzISA0';\nlet scp = document.createElement(\"script\");\nscp.src = `https://content.viralize.tv/display/?zid=${zid}&pub_adtag=${pub_adtag}`;\nscp.type = 'text/javascript';\nscp.dataset.wid = 'auto';\n\nlet sh_div = document.createElement('div');\nsh_div.id = 'sh-player';\nsh_div.appendChild(scp);\n\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(sh_div);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "( ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) & ( event.adposition = 'pre' ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "shAnimeTrigger",
        "name": "Trigger Showheroes Anime on Ad No Fill",
        "node_type": "trigger"
      },
      "shCAnime": {
        "condition": "( custom.this_placement.playlist_id = 'sXWp3rZ0' )",
        "false_child": "shEnter",
        "id": "shCAnime",
        "name": "Anime Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "shAnime"
      },
      "shCAnimeTrigger": {
        "condition": "( custom.this_placement.playlist_id = 'sXWp3rZ0' )",
        "false_child": "shEnterTrigger",
        "id": "shCAnimeTrigger",
        "name": "Anime Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "shAnimeTrigger"
      },
      "shCGaming": {
        "condition": "( custom.this_placement.playlist_id = 'K21eFFRc' )",
        "false_child": "shCAnime",
        "id": "shCGaming",
        "name": "Gaming Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "shGaming"
      },
      "shCGamingTrigger": {
        "condition": "( custom.this_placement.playlist_id = 'K21eFFRc' )",
        "false_child": "shCAnimeTrigger",
        "id": "shCGamingTrigger",
        "name": "Gaming Playlist?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "shGamingTrigger"
      },
      "shCountriesAnyclipDirectVariant": {
        "child": "anyclipCGaming",
        "id": "shCountriesAnyclipDirectVariant",
        "name": "Anyclip Direct Variant",
        "node_type": "ab_variant",
        "weight": 0
      },
      "shCountriesConnatixDirectVariant": {
        "child": "connatixDirect",
        "id": "shCountriesConnatixDirectVariant",
        "name": "Connatix Direct Variant",
        "node_type": "ab_variant",
        "weight": 98
      },
      "shCountriesSHDirectVariant": {
        "child": "shCGaming",
        "id": "shCountriesSHDirectVariant",
        "name": "Showheroes Direct Variant",
        "node_type": "ab_variant",
        "weight": 2
      },
      "shDirectCountries": {
        "condition": "( ( geo.country = 'FR' ) | ( geo.country = 'DE' ) | ( geo.country = 'AR' ) | ( geo.country = 'CZ' ) | ( geo.country = 'DK' ) | ( geo.country = 'FI' ) | ( geo.country = 'HU' ) | ( geo.country = 'IN' ) | ( geo.country = 'ID' ) | ( geo.country = 'IE' ) | ( geo.country = 'JP' ) | ( geo.country = 'MY' ) | ( geo.country = 'NL' ) | ( geo.country = 'NZ' ) | ( geo.country = 'NO' ) | ( geo.country = 'PH' ) | ( geo.country = 'PL' ) | ( geo.country = 'RO' ) | ( geo.country = 'SG' ) | ( geo.country = 'ES' ) | ( geo.country = 'TH' ) | ( geo.country = 'TR' ) | ( geo.country = 'VN' ) | ( geo.country = 'PH' ) )",
        "false_child": "undefinedCountry",
        "id": "shDirectCountries",
        "name": "Showheroes Direct Countries?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "shDirectSplit"
      },
      "shDirectSplit": {
        "id": "shDirectSplit",
        "name": "97/2/1 Traffic Split for Countries where Showheroes is best",
        "node_type": "ab_test",
        "total_weight": 100,
        "variants": [
          "shCountriesSHDirectVariant",
          "shCountriesAnyclipDirectVariant",
          "shCountriesConnatixDirectVariant"
        ]
      },
      "shEnter": {
        "child": null,
        "config": {
          "custom_code_experience": {
            "custom_code_config": {
              "javascript": "var elements = document.getElementsByClassName(\"mobile-article-video-wrapper\");\nif (elements.length > 0) {elements[0].style.transform = 'initial';};\nlet pub_adtag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag ?? '';\npub_adtag = pub_adtag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Dshowheroes%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\npub_adtag = encodeURIComponent(pub_adtag.replace(\"https://pubads.g.doubleclick.net/\", \"\"));\nlet zid = jwDataStore.custom[payload.placementId].tier === 4 ? 'AAFIJhaPv9C-UAbN' : 'AAF1_eklRWoMQLZK';\nlet scp = document.createElement(\"script\");\nscp.src = `https://content.viralize.tv/display/?zid=${zid}&pub_adtag=${pub_adtag}`;\nscp.type = 'text/javascript';\nscp.dataset.wid = 'auto';\n\nlet sh_div = document.createElement('div');\nsh_div.id = 'sh-player';\nsh_div.appendChild(scp);\n\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(sh_div);"
            }
          }
        },
        "id": "shEnter",
        "macros": [],
        "name": "ShowHeroes Entertainment",
        "node_subtype": "custom_code",
        "node_type": "config"
      },
      "shEnterTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "remove",
            "namespace": "player"
          },
          {
            "arguments": [
              {
                "argument": "var elements = document.getElementsByClassName(\"mobile-article-video-wrapper\");\nif (elements.length > 0) {elements[0].style.transform = 'initial';};\nlet pub_adtag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag ?? '';\npub_adtag = pub_adtag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Dshowheroes%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\npub_adtag = encodeURIComponent(pub_adtag.replace(\"https://pubads.g.doubleclick.net/\", \"\"));\nlet zid = jwDataStore.custom[payload.placementId].tier === 4 ? 'AAFIJhaPv9C-UAbN' : 'AAF1_eklRWoMQLZK';\nlet scp = document.createElement(\"script\");\nscp.src = `https://content.viralize.tv/display/?zid=${zid}&pub_adtag=${pub_adtag}`;\nscp.type = 'text/javascript';\nscp.dataset.wid = 'auto';\n\nlet sh_div = document.createElement('div');\nsh_div.id = 'sh-player';\nsh_div.appendChild(scp);\n\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(sh_div);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "( ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) & ( event.adposition = 'pre' ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "shEnterTrigger",
        "name": "Trigger Showheroes Entertainment on Ad No Fill",
        "node_type": "trigger"
      },
      "shGaming": {
        "child": null,
        "config": {
          "custom_code_experience": {
            "custom_code_config": {
              "javascript": "var elements = document.getElementsByClassName(\"mobile-article-video-wrapper\");\nif (elements.length > 0) {elements[0].style.transform = 'initial';};\nlet pub_adtag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag ?? '';\npub_adtag = pub_adtag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Dshowheroes%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\npub_adtag = encodeURIComponent(pub_adtag.replace(\"https://pubads.g.doubleclick.net/\", \"\"));\nlet zid = jwDataStore.custom[payload.placementId].tier === 4 ? 'AAFIJhaPv9C-UAbN' : 'AAF2ACeMO1CrMjxS';\nlet scp = document.createElement(\"script\");\nscp.src = `https://content.viralize.tv/display/?zid=${zid}&pub_adtag=${pub_adtag}`;\nscp.type = 'text/javascript';\nscp.dataset.wid = 'auto';\n\nlet sh_div = document.createElement('div');\nsh_div.id = 'sh-player';\nsh_div.appendChild(scp);\n\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(sh_div);"
            }
          }
        },
        "id": "shGaming",
        "macros": [],
        "name": "ShowHeroes Gaming",
        "node_subtype": "custom_code",
        "node_type": "config"
      },
      "shGamingTrigger": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "",
                "macros": []
              }
            ],
            "function": "remove",
            "namespace": "player"
          },
          {
            "arguments": [
              {
                "argument": "var elements = document.getElementsByClassName(\"mobile-article-video-wrapper\");\nif (elements.length > 0) {elements[0].style.transform = 'initial';};\nlet pub_adtag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag ?? '';\npub_adtag = pub_adtag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Dshowheroes%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);\npub_adtag = encodeURIComponent(pub_adtag.replace(\"https://pubads.g.doubleclick.net/\", \"\"));\nlet zid = jwDataStore.custom[payload.placementId].tier === 4 ? 'AAFIJhaPv9C-UAbN' : 'AAF2ACeMO1CrMjxS';\nlet scp = document.createElement(\"script\");\nscp.src = `https://content.viralize.tv/display/?zid=${zid}&pub_adtag=${pub_adtag}`;\nscp.type = 'text/javascript';\nscp.dataset.wid = 'auto';\n\nlet sh_div = document.createElement('div');\nsh_div.id = 'sh-player';\nsh_div.appendChild(scp);\n\n(document.querySelector(\"[data-jw-placement-id='KmMLkvao']\")).appendChild(sh_div);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": null,
        "event": {
          "condition": "( ( page.query_params.partner != 'jw' ) & ( geo.country isDefined ) & ( this_placement.player.current_item_index >= custom.this_placement.sponsored_pin_slot ) & ( event.adposition = 'pre' ) )",
          "frequency": 1,
          "macros": [],
          "name": "adNoFill",
          "type": "player"
        },
        "id": "shGamingTrigger",
        "name": "Trigger Showheroes Gaming on Ad No Fill",
        "node_type": "trigger"
      },
      "shNoFillVariant": {
        "child": "shCGamingTrigger",
        "id": "shNoFillVariant",
        "name": "Showheroes Direct Variant",
        "node_type": "ab_variant",
        "weight": 1
      },
      "shVariant": {
        "child": "shCGaming",
        "id": "shVariant",
        "name": "Showheroes Direct Variant",
        "node_type": "ab_variant",
        "weight": 6
      },
      "split": {
        "id": "split",
        "name": "Traffic Split",
        "node_type": "ab_test",
        "total_weight": 100,
        "variants": [
          "keepWatchingVariant",
          "baselinePinningVariant",
          "dynamicAdsVariant",
          "cnxAdServerVariant"
        ]
      },
      "undefinedCountry": {
        "condition": "( geo.country isUndefined )",
        "false_child": "countrySplit",
        "id": "undefinedCountry",
        "name": "Country is Undefined?",
        "node_subtype": "visit",
        "node_type": "conditional",
        "true_child": "jwplayerDevice"
      },
      "updateAdTagCnxAdServer": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Djwp%26jc_ab_id%3D1_b%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "preRoll",
        "event": {
          "condition": "",
          "frequency": -1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "updateAdTagCnxAdServer",
        "name": "Add Cnx Ad Server QPs to GAM tag",
        "node_type": "trigger"
      },
      "updateAdTagJWP": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Djwp%26jc_ab_id%3D1_a%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "preRoll",
        "event": {
          "condition": "",
          "frequency": -1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "updateAdTagJWP",
        "name": "Add QPs to GAM tag",
        "node_type": "trigger"
      },
      "updateAdTagJWPDynamicAds": {
        "actions": [
          {
            "arguments": [
              {
                "argument": "window.jwDataStore.custom[payload.placementId].preroll_ad_tag = window.jwDataStore.custom[payload.placementId].preroll_ad_tag.replace(\"%26player%3Djwp\", \"\").replace(\"&cust_params=\", `&cust_params=player%3Djwp%26jc_ab_id%3D2_b%26jwp_outcome_id%3D${payload.analytics.outcomeId}%26`);",
                "macros": []
              }
            ],
            "function": "executeCustom",
            "namespace": "javascript"
          }
        ],
        "child": "disableKeepWatching",
        "event": {
          "condition": "",
          "frequency": -1,
          "macros": [],
          "name": "beforePlay",
          "type": "player"
        },
        "id": "updateAdTagJWPDynamicAds",
        "name": "Add QPs to GAM tag for Dynamic Ads",
        "node_type": "trigger"
      }
    },
    "outcomes": {
      "qpSwitch,qpAnyclip,anyclipCGaming,anyclipCAnime,anyclipAnime": "4nafiinF",
      "qpSwitch,qpAnyclip,anyclipCGaming,anyclipCAnime,anyclipEntertainment": "4SpHQhDv",
      "qpSwitch,qpAnyclip,anyclipCGaming,anyclipGaming": "GDwqhMRt",
      "qpSwitch,qpCnx,connatixDirect": "DaGZcpTy",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,countryUndefinedPrint": "iSx6ONVv",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "UhDwQMHH",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "ffpmKKcY",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "QdDGq9AK",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "7J8pgH8W",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "jx3UP13J",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "SCr1Cwbj",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "v5Aag81j",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "46yyGyLV",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "j4Kz9dC8",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "XSVq5Aip",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "zU6HogVk",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "Q2ph2i0e",
      "qpSwitch,qpCnxAdServer,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "7gmn5geN",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,countryUndefinedPrint": "wzSNtccC",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "Oxl8rugp",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "F4vpyUs9",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "fzZf8U19",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "pxJVmRL7",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "72hEFAu9",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "OJN8iDag",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "SNeiDLEP",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "t0eTKVjf",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "07JfXdlV",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "ZkzvQcgc",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "pbaOoRKO",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "qTww5GFW",
      "qpSwitch,qpDynamic,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "JmVQZBEH",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,excoDirectSplit,excoCountriesAnyclipDirectVariant,anyclipCGaming,anyclipCAnime,anyclipAnime": "bPqXHhuX",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,excoDirectSplit,excoCountriesAnyclipDirectVariant,anyclipCGaming,anyclipCAnime,anyclipEntertainment": "1mmTGxoX",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,excoDirectSplit,excoCountriesAnyclipDirectVariant,anyclipCGaming,anyclipGaming": "2IOo8Gdm",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,excoDirectSplit,excoCountriesConnatixDirectVariant,connatixDirect": "IADBMexK",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,excoDirectSplit,excoCountriesSHDirectVariant,shCGaming,shCAnime,shAnime": "Nmq7QWhj",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,excoDirectSplit,excoCountriesSHDirectVariant,shCGaming,shCAnime,shEnter": "HbZzU0YI",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,excoDirectSplit,excoCountriesSHDirectVariant,shCGaming,shGaming": "tpHP5WDu",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,shDirectSplit,shCountriesAnyclipDirectVariant,anyclipCGaming,anyclipCAnime,anyclipAnime": "8x8QZBCu",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,shDirectSplit,shCountriesAnyclipDirectVariant,anyclipCGaming,anyclipCAnime,anyclipEntertainment": "wj6Jqag2",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,shDirectSplit,shCountriesAnyclipDirectVariant,anyclipCGaming,anyclipGaming": "05rjfGEy",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,shDirectSplit,shCountriesConnatixDirectVariant,connatixDirect": "TSTP0q2z",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,shDirectSplit,shCountriesSHDirectVariant,shCGaming,shCAnime,shAnime": "dyYH9oZi",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,shDirectSplit,shCountriesSHDirectVariant,shCGaming,shCAnime,shEnter": "cg4EJXKc",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,shDirectSplit,shCountriesSHDirectVariant,shCGaming,shGaming": "349Kci0G",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,anyclipVariant,anyclipCGaming,anyclipCAnime,anyclipAnime": "B9rbNsZk",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,anyclipVariant,anyclipCGaming,anyclipCAnime,anyclipEntertainment": "flOC0HwC",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,anyclipVariant,anyclipCGaming,anyclipGaming": "OrAzrCmE",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,connatixVariant,connatixDirect": "27pbxIGu",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,optimizerVariant,experienceOptimizer,anyclipOptimizerVariant,anyclipCGaming,anyclipCAnime,anyclipAnime": "wTmSjPJM",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,optimizerVariant,experienceOptimizer,anyclipOptimizerVariant,anyclipCGaming,anyclipCAnime,anyclipEntertainment": "B2oaAKI9",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,optimizerVariant,experienceOptimizer,anyclipOptimizerVariant,anyclipCGaming,anyclipGaming": "Rdt0pH4c",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,optimizerVariant,experienceOptimizer,connatixOptimizerVariant,connatixDirect": "YwXzo8P5",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,shVariant,shCGaming,shCAnime,shAnime": "7LwmXGLS",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,shVariant,shCGaming,shCAnime,shEnter": "vip9OTMH",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,countrySplit,shVariant,shCGaming,shGaming": "3mZbBY1l",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,countryUndefinedPrint": "8Y5hfgdf",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "RCcSF847",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "4QHpKrut",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "SEgLff7O",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "A9Rtc5Nn",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "B9dj6r2N",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "m9Y2M6sK",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "QaLz43MJ",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "In8JQedB",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "8hFN7jcS",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "QqYxnOkV",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "SQXMqdXV",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "Xx7aA5ta",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsDesktop,playlistConfigPinDesktop,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "wPak01T6",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,countryUndefinedPrint": "FEr918DG",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "UKEEH8J3",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "kwmq7EWy",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "g4jEjmP1",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "Pc4ficXT",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "rYuWHfOm",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "z6kGGI2R",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "Lrob3tyh",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "pw0fHOrN",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "B5WvWCJ6",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "LRjl4T1I",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "V0vuyOdB",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "iqoeocJP",
      "qpSwitch,qpNone,USGB99,excoDirectCountries,shDirectCountries,undefinedCountry,jwplayerDevice,setSponsoredKVPsMobile,playlistConfigPinMobile,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "72PT3q3v",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,countryUndefinedPrint": "OnZelpvj",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "CEpKxMYv",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "BwOUXXKo",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "miqC0SYH",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "TTQ9lG2p",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "9UJyp43w",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "OpY2dsmc",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "3a8rGcH9",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "Gia8i9vX",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "nWRD9DZY",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "07OrpeE4",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "DZHkbLql",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "kACDkq1u",
      "qpSwitch,qpNone,USGB99,split,baselinePinningVariant,setSponsoredKVPs2,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "Oztx2tmj",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,countryUndefinedPrint": "immnHmEy",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "JQjCWdMf",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "kJpt0LwM",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "p5g7xMT7",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "YDkADtFt",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "Pnfavy1t",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "y2nwZfLS",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "DPC6fXeR",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "1srCyoPr",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "Lq0i4IMz",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "KOU9spMV",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "KuZCzbkv",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "OhzhkQWr",
      "qpSwitch,qpNone,USGB99,split,cnxAdServerVariant,setSponsoredKVPs2CnxAdServer,playlistConfigPinSlot2CnxAdServer,cnxAdServerJWConfig,updateAdTagCnxAdServer,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "0s2pF5yF",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,countryUndefinedPrint": "nNg99J60",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "qAb3AwLp",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "O1qkg64b",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "wgFmV92r",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "cZmRGHYp",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "xwQ2VA01",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "d5U4nG5a",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "JERPxHGz",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "E9lLJMm7",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "c5CHFO88",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "K6mdw4gE",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "5CajX6xt",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "Hv8Tya7J",
      "qpSwitch,qpNone,USGB99,split,dynamicAdsVariant,setSponsoredKVPs2DynamicAds,playlistConfigPinSlot2DynamicAds,dynamicAdsJWConfig,disableDynamicAds,updateAdTagJWPDynamicAds,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "FujxAYFG",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,countryUndefinedPrint": "k8FwsXX0",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "xtCTjn9U",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "iAHLdFgf",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,anyclipNoFillVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "nzdX9P8H",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "KdRLVzYf",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,connatixNoFillVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "jLneFp5m",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shAnimeTrigger": "QHqVvDxe",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shCAnimeTrigger,shEnterTrigger": "qoMKWa4L",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,fallbackSplit,shNoFillVariant,shCGamingTrigger,shGamingTrigger": "jkw7W1f6",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipAnimeNoFillTrigger": "1lRQ3Cg9",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipCAnimeTrigger,anyclipEntertainmentNoFillTrigger": "K0YlbjoH",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesAnyclipFallbackVariant,anyclipCGamingTrigger,anyclipGamingNoFillTrigger": "1Q0YhPsP",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXAdServerInJWPOnNoFillVariant,JWconnatixAdServerNoFillNoQPTrigger,partialAdLoadingUIJWConfig": "kETUj3Sy",
      "qpSwitch,qpNone,USGB99,split,keepWatchingVariant,setSponsoredKVPs0,playlistConfigPinSlot2,commonJWConfig,updateAdTagJWP,preRoll,preRollXml,frequencyCap,disableKeepWatching,countryDefined,excoFallbackCountries,primeCountryFallbackSplit,primeCountriesConnatixFallbackVariant,JWconnatixAdServerNoFillQPTrigger,CNXNoFillABTest,CNXCustomCodeOnNoFillVariant,connatixNoFillTrigger": "ljxCF9zJ",
      "qpSwitch,qpSH,shCGaming,shCAnime,shAnime": "aO4hlzQe",
      "qpSwitch,qpSH,shCGaming,shCAnime,shEnter": "c3U90iPq",
      "qpSwitch,qpSH,shCGaming,shGaming": "SF3ahKHz"
    },
    "root_node": "qpSwitch"
  }
}], enrichment: {
  "media": {}
}, psleParams });
}(typeof psleParams !== 'undefined' ? psleParams : null));
