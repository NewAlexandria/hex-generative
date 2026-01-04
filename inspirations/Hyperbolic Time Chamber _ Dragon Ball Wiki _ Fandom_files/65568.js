"use strict";!function(){var m,f,u,y,b,n,c,w=!1,o={},a=function(){if(!document.getElementById||!document.getElementById("__bm_locator")){var e=document.createElement("iframe");e.id="__bm_locator",e.name="__bm_locator",e.width="0",e.height="0",e.scrolling="no",e.src="about:blank",e.style.display="none",e.style.width="0px",e.style.height="0px",e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex","-1"),document.body.appendChild(e)}},l=function(){function e(e,t,o,r,i){if(f=e,n=r,b=o,m=t,u=i)y=u.storage;else if("ls"===e.storage)try{y=new(brandmetrics.getModule(5))(f,m,!1)}catch(e){y=void 0}else if("1pc"===e.storage)try{y=new(brandmetrics.getModule(35))(f,m,!1)}catch(e){y=void 0}a()}return e.prototype.isReady=function(){return c&&c.isInitiated},e.prototype.hasConsent=function(){return!0},e.prototype.addEventListener=function(e){"ready"===e.event&&this.isReady()?e.handler({api:this}):m.on(e)},e.prototype.triggerSurvey=function(r){var n,a=this,s=!1;void 0!==(null==r?void 0:r.timeout)&&0<r.timeout&&(n=setTimeout(function(){d(!(s=!(w=!1))),m.emit("survey_loaded",{available:!1,showed:!1})},r.timeout));var d=function(e,t,o){r&&r.callback&&r.callback(e,t,o)},u={mid:(r=r||{}).mid,bid:r.bid,callback:r.callback,autoRender:void 0===r.autoRender||r.autoRender,force:void 0!==r.force&&r.force,isTest:void 0!==r.isTest&&r.isTest,dtName:r.dtName},e=!1,t=[];if("none"!==f.storage&&y){var o=y.state(),i=0,c=0;for(var l in o)if(o.hasOwnProperty(l)){var v=o[l];if(!0!==u.isTest&&u.mid===v.mid&&!0===v.isAnswered){e=!0;break}if(u.isTest){t.push(v);continue}if(u.force&&!v.isAnswered){t.push(v);continue}if(i=Math.max(i,v.lastSurvey),Date.now()-v.lastSurvey<6048e5&&(c+=v.nbrOfSurveys),v.nbrOfSurveys>=f.survey.max)continue;if(Date.now()-v.lastSurvey<1e3*f.survey.interval*60)continue;!1===v.isAnswered&&t.push(v)}!0!==u.isTest&&(c>=f.survey.maxTot||Date.now()-i<1e3*f.survey.intervalTot*60)&&(e=!0)}if(!0===e)return clearInterval(n),d(!1),void m.emit("survey_loaded",{available:!1,showed:!1});var p=Math.random()<=f.surveyRandomization;!w&&(u.callback||u.mid||u.isTest||u.force||p)?(w=!0,b.ExecuteConfigRequest(u.mid||null,u.isTest||!1,u.force,u.dtName,t,function(e){if(y&&y.removeSurveyConfiguration(),!s){w=!1,clearTimeout(n);var t=!1,o=!1,r=!1;if(void 0!==e){r=!0;var i=a.createSurvey(e.surveyConfig);d(!0,e.surveyConfig,i),t=!0,u.autoRender&&(i.show(),o=!0)}t||d(!1),m.emit("survey_loaded",{available:r,showed:o,mid:null==e?void 0:e.surveyConfig.measurementId})}})):p||(clearTimeout(n),m.emit("survey_loaded",{available:!1,showed:!1}),m.emit("surveyloadskipped",u))},e.prototype.createSurvey=function(e){if(void 0===e||void 0===e.measurementId||void 0===e.displayOption)throw new Error("");if(n){var t=n.create(e);return o[e.measurementId]=t}throw new Error("brandmetrics: This configuration does not support creating surveys.")},e.prototype.addMetadata=function(e){if(void 0===e||void 0===e.name||void 0===e.value||"string"!=typeof e.value)throw new Error("Invalid Argument");b.upsertParam(e.name,e.value,e.types)},e.prototype.setDoNotTrack=function(){var e=localStorage;if(e)try{e.setItem("__bmdnt","true"),e.removeItem("__bm_m"),e.removeItem("__bm_s")}catch(e){}b.postOptout()},e.prototype.triggerExposure=function(e){if(void 0===u)throw new Error("brandmetrics: triggerExposure only works when collection is activated.");u.triggerExposure(e,{type:"api",data:void 0})},e.prototype.updateExposure=function(e){if(void 0===u)throw new Error("brandmetrics: updateExposure only works collection is activated.");u.updateExposureProperties(e.exposureId,{active:e.properties,meta:e.adMetadata})},e.prototype.endExposure=function(e){if(void 0===u)throw new Error("brandmetrics: endExposure only works collection is activated.");u.endExposure(e)},e.prototype.collectAds=function(e){},e.prototype.getState=function(){return y?y.state():void 0},e.prototype.reinitialize=function(){void 0!==u&&u.reinitialize()},e.prototype.addUserIds=function(e){b.ConfigureSingleUsers(e)},e.prototype.getOptions=function(){return f},e.prototype.stop=function(){void 0!==u&&u.stop(),void 0!==m&&m.stop()},e}();window.brandmetrics.register({id:0,ctor:function(e,t,o,r,i,n,a){var s=new l(e,t,o,r,i),d={bm:s,collection:u,options:e,utils:t,client:o,storage:y,callback:function(){a(s),m.emit("ready",{api:s})}};switch(n){case 0:c=new(brandmetrics.getModule(19))(d);break;case 1:c=new(brandmetrics.getModule(20))(d);break;default:throw new Error("Failed to start brandmetrics, the mode: ".concat(n," is not defined."))}c.start()}})}();
"use strict";!function(){var s,y,g,w,b,k,r,u,E=function(e,t,i,r,n,o){var c=this;switch(this.measurements=[],this.state=0,this.start=void 0,this.latest=void 0,this.maxDuration=Number.MAX_VALUE,this.thresholdTimer=void 0,this.active=!1,this.updateProperties=function(e){for(var t=e.active||{},i=!1,r=0,n=Object.keys(t);r<n.length;r++){var o=u=n[r];if(u in c.props){var a=t[o];void 0!==a&&c.props[o]!==a&&(c.props[o]=a,i=!0)}}if(i){var s=!0;for(var u in c.props)if(!c.props[u]){s=!1;break}s?c.active||(c.thresholdTimer=setTimeout(function(){c.active=!0,c.onPropertyChange(c)},c.threshold)):(clearTimeout(c.thresholdTimer),c.active=!1),c.onPropertyChange(c)}e.meta&&(c.maxDuration=e.meta.maxDuration||c.maxDuration)},this.age=function(){return Date.now()-c.created},this.isActive=function(){return c.active},this.created=Date.now(),this.type=e.type,this.id=t,this.beaconId=e.id,this.source=e.source,this.element=n,this.measurements=i,this.onPropertyChange=r,this.type){case 0:this.threshold=1e3,this.props={inview:o||!1},this.active=o||!1;break;case 1:this.threshold=2e3,this.props={inview:o||!1,playing:!1};break;default:throw new Error("brandmetrics: Exposure type: ".concat(this.type," not supported."))}},o=!1,n={dirty:!1,lastWrite:0},I=[],x=function(e,t){t.measurements.forEach(function(e){})},D=function(){r||(r=setInterval(D,1e3));for(var e=0,t=I;e<t.length;e++){var i=t[e];switch(i.state){case 0:i.isActive()&&(l(i),n.dirty=!0);break;case 1:i.isActive()?d(i):A([i],!1,!1),n.dirty=!0;break;case 3:i.isActive()&&(l(i),n.dirty=!0)}}n.dirty&&1e3<=Date.now()-n.lastWrite&&f()},P=function(t){var e=I.filter(function(e){return e.element&&e.element===t});return 0<e.length?e[0]:void 0},a=function(t){var e=I.filter(function(e){return e.beaconId===t});return 0<e.length?e[0]:void 0},c=function(e,t,i,r){var n,o,a;if("beacon"===e.source.type){var s=(a=S(e.key),I.filter(function(e){return"beacon"!==e.source.type&&e.id===a}));0<s.length&&A(s,!0)}var u,c,d,l,f=r?P(r):(u=t,0<(c=I.filter(function(e){return e.id===u})).length?c[0]:void 0);if(void 0!==f&&(f.id!==t?(A([f],!0),f=void 0):"beacon"!==f.source.type&&(f.source=e.source)),void 0===f&&0<i.length&&(f=new E(e,t,i,function(e){D()},r,"always"===(null===(n=y.inview)||void 0===n?void 0:n.type)),I.push(f)),void 0!==f&&(l=0===(d=f).state?12:13,d.measurements.forEach(function(e){w.postEvent(l,e.id,void 0,{pid:d.id})}),x(0,d),0===(e.inviewHandling||0)))if(f.element&&g)null==g||g.observe(f.element);else if("always"!==(null===(o=y.inview)||void 0===o?void 0:o.type)){for(var v=0,p=f.measurements;v<p.length;v++){var h=p[v],m=k.updateExp(h.id,t,1,1);w.postEvent(10,h.id,m,{pid:t,first:0===f.state?"true":void 0,noel:"true"}),b.emit("creative_in_view",{source:f.source,mid:h.id})}f.state=3}},d=function(e){var t=Date.now(),i=b.getIdleTimeout();if(e.start&&e.latest&&t-e.latest>i+1){var r=e.latest-e.start;e.start=t-r-i}e.maxDuration&&e.start&&t-e.start>e.maxDuration?e.latest=e.start+1e3*e.maxDuration:e.latest=t},l=function(e){if(1!==e.state){for(var t=0,i=e.measurements;t<i.length;t++){var r=i[t],n=k.updateExp(r.id,e.id,1,1);w.postEvent(10,r.id,n,{pid:e.id,first:0===e.state?"true":void 0}),b.emit("creative_in_view",{source:e.source,mid:r.id})}x("exposure ".concat(3===e.state?"reactivated":"activated"),e),e.start=Date.now()-e.threshold,e.latest=Date.now(),e.state=1}},A=function(e,t,i){void 0===i&&(i=!0),e.forEach(function(i){if(1===i.state){d(i);var r=Math.floor((i.latest-i.start)/1e3);i.measurements.forEach(function(e){var t=k.updateExp(e.id,i.id,0,r);w.postEvent(11,e.id,t,{pid:i.id,ts:(r+1).toString()})}),i.state=3,x("exposure ended (".concat(r," sec), "),i)}if(t){i.element&&(null==g||g.unObserve(i.element));var e=I.indexOf(i);-1!==e&&(I.splice(e,1),x(0,i))}}),i&&f()},f=function(){var i=[];I.forEach(function(t){1===t.state&&t.measurements.forEach(function(e){i.push({mid:e.id,uid:t.id,start:t.start,last:t.latest})})}),k.setSession(i.filter(function(e){return null!==e})),n.dirty=!1,n.lastWrite=Date.now()},v=function(e){var t=y.measurements.map(function(e){return e.id});k.clean(t);for(var i=0,r=e;i<r.length;i++){var n=r[i],o=Math.floor((n.last-n.start)/1e3),a=k.updateExp(n.mid,n.uid,0,o);w.postEvent(11,n.mid,a,{pid:n.uid,ts:o.toString()})}k.setSession([])},p=function(e,t){for(var i=null,r=0,n=e;r<n.length;r++){var o=n[r],a=!0;for(var s in o)if(o.hasOwnProperty(s)){if("ntv"===o.source&&"urlPattern"===s||"meta"===s)continue;if(o[s]!=t[s]){a=!1;break}}if(a){i=o;break}}return i},h=function(t){var i;if(t&&"string"==typeof t)try{i=document.getElementById(t)||void 0}catch(e){try{var r=document.querySelectorAll(b.escapeSelector("#"+t));i=0<r.length?r[r.length-1]:void 0}catch(e){i=void 0}}else t&&(i=t);return i},m=function(e){var t,i=h(e.element),r=P(i),n=(t=e.key,y.measurements.filter(function(e){return null!=p(e.keys,t)}));if(n&&0<n.length){var o=S(e.key,n[0].uks);if(0===e.type&&y.hostConfiguration&&u&&"all"===y.hostConfiguration.collectionAtHost.type){var a=n[0];return void u.transmitBeacon(a.id,o)}c(e,o,n,i)}else r&&(r.source.type===e.key.source&&"ntv"!==e.key.source||1e3<r.age())&&A([r],!0)},S=function(t,e){var i;if(void 0===e)switch(t.source){case"apn":i=["creativeId"];break;case"gpt":i=["creativeId","lineItemId"];break;case"pbj":i=["dealId"];break;case"ntv":case"api":case"slot":i=["key"];break;case"id":i=["pid"];break;case"gptHb":case"gptPb":i=["creativeId","lineItemId","dealId"];break;case"kvl":i=["creativeId","flightId","campaignId"];break;default:throw Error("Constructing id's from source: "+t.source+" is not implemented.")}else i=e;return i.map(function(e){return t[e]}).join(":")},M=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t],n=P(r.element);n&&n.updateProperties({active:{inview:1===r.state}})}},T=function(e){var t,i=brandmetrics.getModule(17),r=brandmetrics.getModule(18),n=brandmetrics.getModule(16),o=brandmetrics.getModule(15);return(window.omid3p||window.oo)&&r?t=new r(e):window.mraid&&i?t=new i(e):window.IntersectionObserver&&n?t=new n(e):o&&(t=new o(e)),t},C=function(e){if(o)switch(e){case 0:i();break;case 1:H()}},i=function(){s.filter(function(e){return e.isReady()}).map(function(e){return e.getDisplayedSlots()}).forEach(function(e){e.forEach(function(e){return m(e)})}),s.forEach(function(e){return e.setActive(!0)}),D()},H=function(){clearInterval(r),r=void 0,s.forEach(function(e){return e.setActive(!1)}),A(I.filter(function(){return!0}),!1),v(k.getSession())},e=function(){function e(e,t,i,r,n){var o;this.storage=n,k=n,y=e,w=t,s=r,b=i;var a=brandmetrics.getModule(27);a&&(u=new a),"always"!==(null===(o=e.inview)||void 0===o?void 0:o.type)&&(g=T({collection:this,callback:M,utils:i})),b.on({event:"pagestatus",handler:function(e){C(e)}})}return e.prototype.reinitialize=function(){var t=this;H(),i(),s.forEach(function(e){e.slotDisplayed(function(e){return m(e)}),e.slotEnded(function(){return t.endExposure}),e.slotUpdated(function(){return t.updateExposureProperties})})},e.prototype.start=function(){var n=this;v(k.getSession()),v(k.getAndRemoveOutdatedSessions());for(var e=function(r){r.onReady(function(){for(var e=0,t=r.getDisplayedSlots();e<t.length;e++){var i=t[e];m(i)}r.slotDisplayed(function(e){return m(e)}),r.slotEnded(function(e){return n.endExposure(e)}),r.slotUpdated(function(e,t){return n.updateExposureProperties(e,t)})})},t=0,i=s;t<i.length;t++){e(i[t])}D(),o=!0},e.prototype.stop=function(){H()},e.prototype.triggerExposure=function(e,t){var i,r,n={type:e.type||0,inviewHandling:e.inviewHandling?e.inviewHandling:0,id:e.exposureId,element:e.element,source:t,key:(i=e,r="mid"in i?{source:"id",mid:i.mid,pid:i.pid||i.mid}:"string"==typeof i.key?{source:"api",key:i.key}:i.key,"gpt"===r.source&&(r.creativeId=r.creativeId?""+r.creativeId:r.creativeId,r.lineItemId=r.lineItemId?""+r.lineItemId:r.lineItemId),"id"===r.source&&function(t,e){var i=y.measurements.filter(function(e){return e.id===t});if(0<i.length){var r=i[0];null===p(r.keys,e)&&r.keys.push(e)}else y.measurements.push({id:t,keys:[e]})}(r.mid,r),r)};m(n)},e.prototype.updateExposureProperties=function(e,t){var i=a(e);i&&i.updateProperties(t)},e.prototype.endExposure=function(e){var t;"string"==typeof e&&(t=a(e)),t||(t=P(h(e))),t&&A([t],!0)},e.prototype.triggerListener=function(e){for(var t=0,i=s;t<i.length;t++){var r=i[t];r.getType()===e.type&&r.trigger(e.data)}},e}();window.brandmetrics.register({id:1,ctor:e})}();
"use strict";var __spreadArray=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))};!function(){var t,r,n=3e4,o=/^#([0-9])/,i=[],e=!0,a={survey_loaded:["surveyloaded"],survey_rendered:["surveyrendered"],survey_answer:["surveyanswered"],survey_complete:["surveycompleted"],survey_closed:["surveyclosed"],creative_in_view:[],ready:[],surveyloadskipped:[],pagestatus:[]},s=function(t){for(var r=[],e=1;e<arguments.length;e++)r[e-1]=arguments[e];i.forEach(function(e){e.event!==t&&-1===a[t].indexOf(e.event)||e.handler.apply(e,r)})},c=function(e){return!0===e?1:2},d=function(e,t,r){e.addEventListener&&e.addEventListener(t,r,{passive:!0})},u=function(e,t,r){e.removeEventListener&&e.removeEventListener(t,r)},l=function(){document.hidden?p():v()},v=function(){e||(s("pagestatus",0),e=!0),clearTimeout(t),t=setTimeout(p,n)},p=function(){e&&(s("pagestatus",1),e=!1)},f=function(){var e=window;d(e,"load",v),d(e,"touchstart",v),d(e,"keypress",v),d(e,"wheel",v),d(e,"pagehide",p),d(document,"visibilitychange",l),e.IntersectionObserver&&(r=new IntersectionObserver(function(){v()},{threshold:.1})).observe(document.documentElement),v()},m=function(e){return Math.abs((e[2]-e[0])*(e[1]-e[3]))},h=new Array,w=function(e,t,r,n){if(0<h.length&&(null===e||e.isReady())){var o=h.shift();try{y(e,o,r,n)}catch(e){var i="Error in command: ".concat(o.cmd,", msg: ").concat(e);throw t.postDiagnostics(i),new Error(i)}w(e,t,r)}},y=function(e,t,r,n){if(null!==e&&!e.isReady())throw new Error("Try to execute commands before initiated");switch(t.cmd=void 0===t.cmd?"":t.cmd.toLowerCase(),t.cmd){case"_loadsurvey":null==e||e.triggerSurvey(t.val);break;case"_forcesurvey":null==e||e.triggerSurvey({mid:t.val.mid,force:!0,dtName:t.val.style});break;case"_querysurvey":if(void 0===t.val||void 0===t.val.callback)throw new Error("No callback defined");null==e||e.triggerSurvey({autoRender:!1,callback:t.val.callback});break;case"_addmetadata":var o=t.val;void 0===o.value&&void 0!==o.val&&(o.value=o.val),null==e||e.addMetadata(o);break;case"_setdonottrack":null==e||e.setDoNotTrack();break;case"_triggerexposure":if(void 0===t.val)throw new Error("The command _triggerexposure needs a value.");null==e||e.triggerExposure(t.val);break;case"_updateexposure":if(void 0===t.val)throw new Error("The command _updateexposure needs a value.");null==e||e.updateExposure(t.val);break;case"_endexposure":if(void 0===t.val)throw new Error("The command _endexposure needs a value.");null==e||e.endExposure(t.val);break;case"_addeventlistener":null!==e?e.addEventListener(t.val):r.on(t.val);break;case"_adduserids":void 0!==t.val&&(null==e||e.addUserIds(t.val));break;case"_reinitialize":null==e||e.reinitialize();break;case"_triggerlistener":if(void 0===t.val)throw new Error("The command _triggerlistener needs a value.");null==n||n.triggerListener(t.val);break;default:throw new Error("unknown cmd")}},g=function(){function e(e){this.guid=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},this.escapeSelector=function(e){var t=o.exec(e);return t&&(e=e.replace(t[0],"#\\3"+t[1]+" ")),e=e.replace(/:/g,"\\:")},e.idleTimeout&&(n=1e3*e.idleTimeout),f()}return e.prototype.getPageRect=function(){var e=document.documentElement.scrollLeft||document.body.scrollLeft||window.pageXOffset,t=document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset;return[e,t,e+("innerWidth"in window?window.innerWidth:document.body.clientWidth),t+("innerHeight"in window?window.innerHeight:document.body.clientHeight)]},e.prototype.getElementPixels=function(e){return m(this.getElementRect(e))},e.prototype.getElementRect=function(e){for(var t=0,r=0,n=e.offsetWidth,o=e.offsetHeight;null!==e.offsetParent;)t+=e.offsetLeft,r+=e.offsetTop,e=e.offsetParent;return[t,r,t+n,r+o]},e.prototype.rectsIntersect=function(e,t){return e[0]<t[2]&&e[2]>t[0]&&e[1]<t[3]&&e[3]>t[1]},e.prototype.rectsRatio=function(e,t){var r=0;if(this.rectsIntersect(e,t)){var n=Math.max(e[0],t[0]),o=Math.min(e[2],t[2]),i=Math.max(e[1],t[1]),a=Math.min(e[3],t[3]);r=m([n,i,o,a])/m(t)}return r},e.prototype.inView=function(e){var t=this.getPageRect(),r=this.getElementRect(e),n=m(r)>m(t),o=this.getElementPixels(e),i=this.inViewByRatio(o,this.rectsRatio(t,r)),a=n?c(.3<this.rectsRatio(r,t)):this.inViewByRatio(o,this.rectsRatio(r,t));return c(1===i||1===a)},e.prototype.inViewByRatio=function(e,t){var r=.5;return 242500<=e&&(r=.3),c(r<=t)},e.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];s.apply(void 0,__spreadArray([e],t,!1))},e.prototype.on=function(e){i.push(e)},e.prototype.un=function(e){for(var t=i.length-1;0<=t;t--){var r=i[t];r.event===e.event&&r.handler===e.handler&&i.splice(t,1)}},e.prototype.getIdleTimeout=function(){return n},e.prototype.initProcessing=function(r,n,o){var i=this;window.brandmetrics.cmd=window.brandmetrics.cmd||window._brandmetrics||[],window._brandmetrics||(window._brandmetrics=window.brandmetrics.cmd),window.brandmetrics.cmd.push=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return h.push.apply(h,e),w(r,n,i,o),Array.prototype.push.apply(this,e)},h.push.apply(h,window.brandmetrics.cmd)},e.prototype.process=function(e,t,r){w(e,t,this,r)},e.prototype.stop=function(){var e;e=window,u(e,"load",v),u(e,"touchstart",v),u(e,"keypress",v),u(e,"wheel",v),u(e,"pagehide",p),u(document,"visibilitychange",l),r&&r.unobserve(document.documentElement),clearTimeout(t)},e}();window.brandmetrics.register({id:2,ctor:g})}();
"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var n,e=1,o=arguments.length;e<o;e++)for(var r in n=arguments[e])Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);return t}).apply(this,arguments)},__spreadArray=this&&this.__spreadArray||function(t,n,e){if(e||2===arguments.length)for(var o,r=0,i=n.length;r<i;r++)!o&&r in n||(o||(o=Array.prototype.slice.call(n,0,r)),o[r]=n[r]);return t.concat(o||Array.prototype.slice.call(n))};!function(){var d,a,l,n,p,c,s,r={ANSWER:{},EXPOSURE:{}},f=function(t,n){var e=[];for(var o in n=n||{},s)if(s.hasOwnProperty(o)&&(0===t.length||0<=t.indexOf(o))||n.hasOwnProperty(o)){var r=s[o],i=n[o]||r.value||(void 0!==r.func?r.func():void 0);null!=i&&""!==i&&e.push("".concat(o,"=").concat(u(i)))}return e.join("&")},v=function(t){return!(t&&n&&(!n||-1===n.indexOf(t)))},g=function(t){var n=[];for(var e in r[t])if(r[t].hasOwnProperty(e)){var o=r[t][e];null!=o&&""!==o&&n.push("".concat(e,"=").concat(u(o)))}return n.join("&")},u=function(t){return"function"==typeof encodeURIComponent?encodeURIComponent(t):window.escape(t)},m=function(){if(window.sessionStorage&&"Session"===d.logConfiguration.level){var t="_bm_sessid";try{var n=window.sessionStorage.getItem(t);n?c=n:c&&window.sessionStorage.setItem(t,c)}catch(t){}}return c||void 0},h=function(t){if("file:"===window.location.protocol)return"localhost";var n=document.location.ancestorOrigins&&0<document.location.ancestorOrigins.length?document.location.ancestorOrigins:[window.document.location.href],e=n[n.length-1],o=document.createElement("a");if(o.href=e,t){var r=e.match(/:\/\/(.*)\/.*/);return r?r[1]:e}return o.host||""},y=function(t,n){var e="".concat(d.baseUrl,"/").concat(t,"?").concat(n);"ajax"===d.dataRequestType?w(e):(new Image).src=e},w=function(t,n){"fetch"in window?o(t,n):e(t,n)},e=function(t,n){var e=new XMLHttpRequest;e.overrideMimeType("application/json"),e.open("GET",t+"&json",!0),e.withCredentials=!0,e.onload=function(){if(n){var t=""!==e.responseText?JSON.parse(e.responseText):void 0;n(t)}},e.send(null)},o=function(t,n){fetch(t+"&json",{method:"GET",cache:"no-cache",credentials:"include",mode:"cors"}).then(function(t){n&&(0<parseInt(t.headers.get("Content-Length")||"0",10)?t.json().then(function(t){n(t)}):n())}).catch(function(t){n&&n()})},i=function(t,n,e,o){o=o||{};var r="";if(void 0!==e){for(var i=0,a=0,c=e.pixels;a<c.length;a++){i+=c[a].exp}r=""+i}var s,u=v(n)?null==p?void 0:p.join(","):void 0;return 10===t&&u&&(s=g("EXPOSURE")),f([],{siteid:"None"!==d.logConfiguration.level?d.siteId:void 0,test:"true"===o.test?"true":void 0,forced:"true"===o.forced?"true":void 0,dtname:o.dtname,pid:o.pid,eid:t.toString(),meta:s,ts:o.ts,state:r,mid:n,uid:u,first:"true"===o.first?"true":void 0,noel:"true"===o.noel?"true":void 0,custom:function(t){if("None"!==d.logConfiguration.level&&d.logConfiguration.customScript&&URLSearchParams)try{var n=new Function("event",d.logConfiguration.customScript)(t),e=new URLSearchParams(n).toString();return encodeURIComponent(e)}catch(t){return}}(t)})},S=function(n){a?a.lookup(function(t){p=t&&Array.isArray(t)?t:t?[t]:void 0,n()}):n()},t=function(){function t(t,n,e){var o,r,i;l=n.guid(),a=e,"Session"===(d=t).logConfiguration.level&&(c=n.guid()),"none"!==(null===(o=d.userMode)||void 0===o?void 0:o.type)&&this.RestrictSingleUserMesurement(null===(i=null===(r=d.userMode)||void 0===r?void 0:r.conf)||void 0===i?void 0:i.measurements),p=d.userIds,s={siteid:{value:d.siteId},toploc:{func:function(){return h(!1)}},path:{func:function(){return"None"!==d.logConfiguration.level?h(!0):void 0}},test:{value:d.isTest?"true":void 0},qdata:{},mid:{},pid:{},meta:{},state:{},ms:{},forced:{},msg:{},eid:{},ts:{},rt:{},rnd:{func:function(){return Math.floor(9999001*Math.random()+1e3).toString()}},adkey:{},dtname:{},slang:{value:d.language},sname:{},sit:{},uid:{value:p?p.join(","):void 0},tpl:{},first:{},noel:{},sessid:{func:function(){return m()}},clientsize:{},custom:{},wrapper:{},aid:{},tta:{},page:{},suid:{}}}return t.prototype.GetBaseUrl=function(){return d.baseUrl},t.prototype.GetTemplateUrl=function(t,n,e,o){var r,i={mid:t.measurementId,wrapper:d.scriptType.toString(),page:null===(r=t.displayOption.page)||void 0===r?void 0:r.toString()};n||o||e?(i.dtname=n,i.slang=o||d.language,i.clientsize=e):t.templateId&&(i.tpl=t.templateId);var a=f(["siteid","toploc","test","slang"],i);return"".concat(d.cdnUrl?d.cdnUrl:d.baseUrl,"/").concat("s.html","?").concat(a)},t.prototype.upsertParam=function(n,e,t){t||(t=["ANSWER"]),t.forEach(function(t){r[t][n]=e})},t.prototype.postAnswer=function(o,r,i,a,c,s,u,d){S(function(){var t="";if(void 0!==s){var n=Math.max.apply(Math,__spreadArray(__spreadArray([],s.pixels.map(function(t){return t.lastexp}),!1),[-1],!1));t="-;"+s.nbrOfSurveys+";"+s.pixels.map(function(t){return"".concat(t.uid,",").concat(t.exp,",").concat(t.time)}).join(";")+";"+n}var e=f([],{test:"true"===(u=u||{}).test?"true":void 0,pid:u.pid,forced:"true"===u.forced?"true":void 0,dtname:u.dtname,mid:o,qdata:r,state:t,meta:g("ANSWER"),sname:""!==i?i:void 0,sit:a,uid:v(o)?null==p?void 0:p.join(","):void 0,aid:l,tta:c||void 0,suid:d});y("a",e)})},t.prototype.postDiagnostics=function(t){if(d.logConfiguration.errors){var n=f(["rnd","siteid"],{msg:t});y("diagnostics",n)}},t.prototype.postOptout=function(){if(void 0!==d.siteId){var t=f(["siteid"]);y("optout",t)}},t.prototype.postEvent=function(n,e,o,r){S(function(){var t=i(n,e,o,r);y("i",t)})},t.prototype.GetRedirectUrl=function(t){var n=f([],{siteid:d.siteId,rt:t});return"".concat(d.baseUrl,"/").concat("r","?").concat(n)},t.prototype.ConfigureDefaultParams=function(t){s=__assign(__assign({},s),t)},t.prototype.RestrictSingleUserMesurement=function(t){n=t},t.prototype.ConfigureSingleUsers=function(t){p=t},t.prototype.ExecuteConfigRequest=function(n,e,o,r,i,a){void 0===e&&(e=!1),void 0===o&&(o=!1),S(function(){var t=function(t,n,e,o,r){void 0===n&&(n=!1),void 0===e&&(e=!1);var i="";if(0<r.length)for(var a=0,c=r;a<c.length;a++){var s=c[a];i=i+"-;"+s.mid+";"+s.pixels.map(function(t){return"".concat(t.uid,",").concat(t.exp)}).join(";")+"|"}var u=f([],{test:n?"true":void 0,forced:e?"true":void 0,dtname:o,mid:null===t?void 0:t,ms:i,uid:v(t)?null==p?void 0:p.join(","):void 0,slang:d.language});return"".concat(d.baseUrl,"/").concat("c.js","?").concat(u)}(n,e,o,r,i);"ajax"===d.dataRequestType?w(t,a):function(t,n){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=t,e.onload=n||null;var o=document.getElementsByTagName("script")[0];if(null==o||null==o.parentNode)throw new Error("can't find script tag");o.parentNode.insertBefore(e,o)}(t,function(){var t=brandmetrics.getModule(-1);a(t)})})},t}();window.brandmetrics.register({id:3,ctor:t})}();
"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};!function(){var g,v,m,w,h,_,i,b,S,T,z="created",O=!1,E=!1,k=[],o="brandmetrics-survey",s="yes",t="survey_answer",C=null,a=function(e){return e?e.replace("{measurementId}",g.measurementId):e},r=window.IntersectionObserver?new IntersectionObserver(function(e){.5<=e[0].intersectionRatio&&void 0===i?i=setTimeout(function(){if(!O){var e=_?_.updateSrv(g.measurementId,!1):void 0;w.postEvent(2,g.measurementId,e,g.props),O=!0}i=setTimeout(function(){if(!E){var e=_?_.state()[g.measurementId]:void 0;w.postEvent(5,g.measurementId,e,g.props),E=!0}},4e3)},1e3):void 0!==i&&(clearTimeout(i),i=void 0)},{threshold:[0,.5]}):void 0,d={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"},c=function(e){var t,n,i,r;try{if("get"===(null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.req)){if(!g&&v&&L(g=v),!g)return;if("created"===z||"completed"!==z&&"closed"!==z&&("dfp"===g.displayOption.type||"apn"===g.displayOption.type)){z="requested";var o=e.data.slang,s=e.data.dtname||g.dtname,a=e.data.clientsize;S=a,(s||o)&&(g.props||(g.props={}),g.props.dtname=s,g.props.slang=o);var d={key:e.data.key,iframeCss:g.displayOption.iframeCss,selector:g.displayOption.selector,url:w.GetTemplateUrl(g,s,a,o),mid:g.measurementId};return k.push(e.data.key),e.source.postMessage(d,"*"),void(C={origin:e.source,key:e.data.key})}}if(g){var c=(null===(n=null==e?void 0:e.data)||void 0===n?void 0:n.message)||(null==e?void 0:e.data);if(!((null===(i=null==e?void 0:e.data)||void 0===i?void 0:i.origin)===w.GetBaseUrl()||"null"===(null==e?void 0:e.origin)||(null===(r=null==e?void 0:e.data)||void 0===r?void 0:r.key)&&-1!==k.indexOf(e.data.key)))return void("string"==typeof(null==e?void 0:e.data)&&-1<e.data.indexOf(g.measurementId)&&w.postDiagnostics("Message origin not expected "+e.origin));var u=m.DeserializeXFrameMessage(c,g.measurementId);if(null===u)return;var p=void 0===_?void 0:_.state()[g.measurementId];switch(u.type){case"rendered":null==_||_.removeSurveyConfiguration(),"answered"===z||"closed"===z?T.close():"rendered"!==z&&(z="rendered",u.surveyTemplateId&&(g.props=g.props||{},g.props.dtname=u.surveyTemplateId),w.postEvent(1,u.mid,p,g.props),b=Date.now(),!u.surveyType||"2"!==u.surveyType&&"3"!==u.surveyType?I(T.element()):q(T.element()),T.resize(u.size),h.emit("survey_rendered",{mid:u.mid}));break;case"resize":T.resize(u.size);break;case"answer":var l=E?5:O?1:0,f=_?_.updateSrv(g.measurementId,!0):void 0;w.postAnswer(u.mid,u.answer,u.surveyName,l,b?Date.now()-b:0,f,g.props,g.surveyId),h.emit("survey_answer",{mid:u.mid,answers:u.answer});break;case"completed":z="completed",w.postEvent(3,u.mid,p,g.props),h.emit("survey_complete",{mid:u.mid});break;case"closed":u.timedout||w.postEvent(4,u.mid,p,g.props),T.close(),h.emit("survey_closed",{mid:u.mid});break;case"redirect":window.location.href=w.GetRedirectUrl(u.target);break;case"updateStyle":T.updateStyle(u.style);break;case"requestClientSize":T.requestClientSize(u.mid);break;case"surveyinview":1===u.time?(p=_?_.updateSrv(g.measurementId,!1):void 0,w.postEvent(2,u.mid,p,g.props),O=!0):1<u.time&&(w.postEvent(5,u.mid,p,g.props),E=!0);break;case"error":a=x();var y="SurveyStandard_v2 error"+"\n\nMeasurement: ".concat(u.mid)+"\nReported ClientSize: ".concat(a)+"\nReported AdSlotClientSize: ".concat(S)+"".concat(u.message);w.postDiagnostics(y)}}}catch(e){w.postDiagnostics("Error in handleMessage, "+e)}},I=function(e){r&&e&&!E&&r.observe(e)},q=function(t){if(void 0!==t){var e="";for(var n in d)""!==t.style.getPropertyValue(n)&&(e=d[n]);""!==e&&t.addEventListener(e,function(){var e;t.clientWidth<150||t.clientHeight<150?(e=t,r&&e&&(clearTimeout(i),i=void 0,r.unobserve(e))):I(t)},!1)}},u=function(){var e;return"inject"===g.displayOption.type&&(e=g.dtname||g.displayOption.displayTypeName),e},n=function(){var e=g,t=document.createElement("iframe");"inject"===e.displayOption.type&&e.displayOption.sandboxProps?t.sandbox.value=e.displayOption.sandboxProps+" allow-scripts":t.sandbox.value="allow-scripts",t.setAttribute("data-bmsurvey",""),t.height="0",t.style.cssText=g.displayOption.iframeCss;var n=x();return t.src=w.GetTemplateUrl(g,u(),n),t.scrolling="no",t},p=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},l=function(n,e){for(var t in n)n.hasOwnProperty(t)&&(n[t]=a(n[t]));if(void 0!==window.apntag&&window.apntag.loaded){var i=window.apntag;e?i.setKeywords(e,n):i.anq.push(function(){var e;e=i.requests?i.requests.keywords:{};var t=__assign(__assign({},e),n);i.setPageOpts({keywords:t})})}else setTimeout(function(){l(n,e)},200)},f=function(n){var i=window.apntag;i.anq.push(function(){var e=i.requests?i.requests.keywords:{};for(var t in n)n.hasOwnProperty(t)&&delete e[t];i.setPageOpts({keywords:e})})},y=function(t,i){if(void 0!==window.googletag&&window.googletag.apiReady){var r=window.googletag,e=function(e){for(var t in i)if(i.hasOwnProperty(t)){var n=a(i[t]);e(t,n)}};if(t){var o=r.pubads().getSlots().filter(function(e){return e.getSlotElementId()===t})[0];o&&(o.setConfig?e(function(e,t){var n={};n[e]=t,o.setConfig({targeting:n})}):e(o.setTargeting))}else r.setConfig?e(function(e,t){var n={};n[e]=t,r.setConfig({targeting:n})}):e(r.pubads().setTargeting),r&&r.pubads&&r.pubads().getTargetingKeys}else setTimeout(function(){y(t,i)},200)},j=function(e){if(window.googletag&&window.googletag.apiReady)for(var t in e)e.hasOwnProperty(t)&&window.googletag.pubads().clearTargeting(t)},D=function(e){if(void 0!==window.adhese){var t=window.adhese;for(var n in e)if(e.hasOwnProperty(n)){var i=a(e[n]);t.registerRequestParameters(n,i)}}else setTimeout(function(){D(e)},200)},P=function(e){if(e=a(e),void 0!==window.HZ){var t=window.HZ;t.hsc.showBrandLiftSurvey(t.hsc.PARTNER_ID.BRAND_METRICS,e)}else setTimeout(function(){P(e)},200)},x=function(){var e=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,t=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;return"".concat(t,",").concat(e)},K=function(){function e(e){var i=this;this._dc=e,h.on({event:e.removeTargetingEvent||t,handler:function(){var e,t=i._dc.targetKey||o,n=null!==(e=i._dc.targeting)&&void 0!==e?e:{};i._dc.targeting||(n[t]=""),j(n)}})}return e.prototype.state=function(){return z},e.prototype.resize=function(e){C&&C.origin.postMessage({key:C.key,message:"resize|size="+e},"*")},e.prototype.element=function(){},e.prototype.close=function(){z="closed"},e.prototype.updateStyle=function(){},e.prototype.requestClientSize=function(e){},e.prototype.show=function(){var e,t=this._dc.adSlot,n=null!==(e=this._dc.targeting)&&void 0!==e?e:{};if(!this._dc.targeting){var i=this._dc.targetKey||o,r=this._dc.targetValue||s;n[i]=r}y(t,n)},e}(),M=function(){function e(e){var i=this;this._dc=e,h.on({event:e.removeTargetingEvent||t,handler:function(){var e,t=i._dc.targetKeyword||o,n=null!==(e=i._dc.targeting)&&void 0!==e?e:{};i._dc.targeting||(n[t]=""),f(n)}})}return e.prototype.state=function(){return z},e.prototype.resize=function(){},e.prototype.element=function(){},e.prototype.close=function(){z="closed"},e.prototype.updateStyle=function(){},e.prototype.requestClientSize=function(e){},e.prototype.show=function(){var e,t=this._dc.adSlot,n=null!==(e=this._dc.targeting)&&void 0!==e?e:{};if(!this._dc.targeting){var i=this._dc.targetKeyword||o,r=this._dc.targetValue||s;n[i]=r}l(n,t)},e}(),R=function(){function e(e){this._dc=e}return e.prototype.state=function(){return z},e.prototype.resize=function(){},e.prototype.element=function(){},e.prototype.close=function(){z="closed"},e.prototype.updateStyle=function(){},e.prototype.requestClientSize=function(e){},e.prototype.show=function(){var e;if(this._dc.targetKeyword&&this._dc.targetValue||this._dc.targeting){var t=null!==(e=this._dc.targeting)&&void 0!==e?e:{};if(!this._dc.targeting){var n=this._dc.targetKeyword||o,i=this._dc.targetValue||s;t[n]=i}D(t)}},e}(),V=function(){function e(e){this._mid=e}return e.prototype.state=function(){return z},e.prototype.resize=function(){},e.prototype.element=function(){},e.prototype.close=function(){z="closed"},e.prototype.updateStyle=function(){},e.prototype.requestClientSize=function(e){},e.prototype.show=function(){this._mid&&P(this._mid)},e}(),A=function(){function e(t,e){var n=this;this._defaultKey="bmSurvey",this._dc=t,this._mid=e,h.on({event:"survey_answer",handler:function(){if(!t.targetFunction){var e=n._dc.targetKeyword||n._defaultKey;delete window[e]}}})}return e.prototype.state=function(){return z},e.prototype.resize=function(e){C&&C.origin.postMessage({key:C.key,message:"resize|size="+e},"*")},e.prototype.element=function(){},e.prototype.close=function(){z="closed"},e.prototype.updateStyle=function(){},e.prototype.requestClientSize=function(e){},e.prototype.show=function(){var e=function(e){return 0===e.indexOf("window.")&&(e=e.substring(7)),e},t=function(e,t){for(var n=t.split("."),i=0;i<n.length-1;i++)e=e[n[i]];return{containingObject:e,name:n[n.length-1]}},n=this._dc.targetValue||this._mid;if("string"==typeof n&&(n=a(n)),this._dc.targetFunction)try{var i=e(this._dc.targetFunction);(r=t(window,i)).containingObject[r.name](n)}catch(e){}else try{var r,o=e(this._dc.targetKeyword||this._defaultKey);(r=t(window,o)).containingObject[r.name]=n}catch(e){}},e}(),W=function(){function e(e){this._dc=e,this._iframe=n()}return e.prototype.state=function(){return z},e.prototype.resize=function(e){var t=function(e){var t=null,n=null;if(0<e.indexOf(",")){var i=e.split(",");t=i[0],n=i[1]}else t=e;return{height:t,width:n}}(e);this._iframe.height=t.height+"px",t.width&&(this._iframe.width=t.width+"px")},e.prototype.element=function(){return this._iframe},e.prototype.close=function(){z="closed",this._iframe.style.display="none"},e.prototype.updateStyle=function(e){for(var t=0,n=e.split(";");t<n.length;t++){var i=n[t];if(""!==i.trim()){var r=i.split(":");this._iframe.style.setProperty(r[0].trim(),r[1].trim())}}},e.prototype.requestClientSize=function(e){this._iframe.contentWindow&&this._iframe.contentWindow.postMessage("".concat(e,"|clientsize|").concat(x()),"*")},e.prototype.show=function(){if("block"!==this._iframe.style.display||null===this._iframe.parentElement){var e=this._dc.element||function(e){var t=e.selector;if(!t)throw new Error("No targetElement configured");var n=(!0===e.onTop?window.top.document:window.document).querySelectorAll(h.escapeSelector(t));if(n.length<=0)throw new Error("can't find target element: "+t);if(1<n.length)for(var i=0;i<=n.length;i++)if(p(n[i]))return n[i];return n[n.length-1]}(this._dc);if(null==e.querySelector("iframe[data-bmsurvey]")){var t=w.GetTemplateUrl(g,u(),x());this._iframe.src!==t&&(this._iframe.src=t),function(e,t,n){var i=t.offsetWidth;e.style.cssText=n.iframeCss.replace("{{targetwidth}}",i.toString()),t.ownerDocument!==window.document&&t&&t.ownerDocument&&t.ownerDocument.defaultView&&t.ownerDocument.defaultView.addEventListener("message",c,!1);var r=!1;try{var o="before"===n.injectType?"beforebegin":"after"===n.injectType?"afterend":"prepend"===n.injectType?"afterbegin":"append"===n.injectType?"beforeend":"";""!==o&&(t.insertAdjacentElement(o,e),r=!0)}catch(e){}!1===r&&t.appendChild(e)}(this._iframe,e,this._dc),this._iframe.style.display="block"}}},e}(),L=function(e){var t=(g=e).displayOption;switch(t.type){case"adh":case"apn":case"dfp":case"js":t.cache&&_&&_.setSurveyConfiguration(g);break;default:_&&_.removeSurveyConfiguration()}if(window.removeEventListener("message",c,!1),"vpaid"===t.type){var n=brandmetrics.getModule(25),i=getVPAIDAd().getSlot();i&&i.ownerDocument&&i.ownerDocument.defaultView&&i.ownerDocument.defaultView.addEventListener("message",c,!1),T=new n(t,new W(__assign(__assign({},t),{type:"inject",element:getVPAIDAd().getSlot()})),h)}else"inject"===g.displayOption.type&&!0===g.displayOption.onTop?window.top.addEventListener("message",c,!1):window.addEventListener("message",c,!1),T="dfp"===t.type?new K(t):"apn"===t.type?new M(t):"adh"===t.type?new R(t):"houzz"===t.type?new V(g.measurementId):"js"===t.type?new A(t,g.measurementId):"inject"===t.type?new W(t):{state:function(){return"failed"},resize:function(){},element:function(){},show:function(){},close:function(){},updateStyle:function(){},requestClientSize:function(){}};return T},e=function(){function e(e,t,n){w=e,h=t,_=n,m=new(brandmetrics.getModule(21)),(v=null==_?void 0:_.getSurveyConfiguration())&&window.addEventListener("message",c,!1)}return e.prototype.create=function(e){return L(e)},e}();window.brandmetrics.register({id:4,ctor:e})}();
"use strict";!function(){var r="gpt",n={exposedEvent:"slotRenderEnded"},i=function(t){var e=t,o=t.getResponseInformation(),n={source:"gpt",advertiserId:o&&o.advertiserId,campaignId:o&&o.campaignId,creativeId:""+(o&&o.creativeId),lineItemId:""+(o&&o.lineItemId)},i={type:0,key:n,element:e.getSlotElementId(),source:{type:r,data:t}};return i},t=function(){function t(t){this.active=!0,n=t.type===r&&t.conf?t.conf:n}return t.prototype.isReady=function(){var t=!(!window.googletag||!window.googletag.apiReady);return t},t.prototype.onReady=function(t){window.googletag=window.googletag||{},window.googletag.cmd=googletag.cmd||[],window.googletag.cmd.push(t)},t.prototype.getDisplayedSlots=function(){var t=window.googletag.pubads().getSlots().filter(function(t){return t.getResponseInformation()}).map(function(t){return i(t)});return t},t.prototype.slotDisplayed=function(e){var o=this;window.googletag.pubads().addEventListener(n.exposedEvent,function(t){o.active&&e(i(t.slot))})},t.prototype.setActive=function(t){this.active=t},t.prototype.trigger=function(t){},t.prototype.getType=function(){return r},t.prototype.slotEnded=function(t){},t.prototype.slotUpdated=function(t){},t}();window.brandmetrics.register({id:8,ctor:t})}();
"use strict";!function(){var w,s,e,t,p,v,n,r,o,d="ntv",h={},i=!1,y=function(n,e,t){var r="";switch(e.type){case"attribute":for(var o=function(e){var t=n;e.selector&&(t=n.querySelectorAll(e.selector)[0]),r=e.attributes.map(function(e){return t.getAttribute(e)}).join("-")},i=0,c=e.extractors;i<c.length;i++){o(c[i])}break;case"url":if(r=t||window.location.href,e.regex){var l=r.match(new RegExp(e.regex));l&&1<l.length&&(r=l.filter(function(e){return void 0!==e}).slice(1).join("-"))}}return r},b=function(e){if(p&&p.length===e.length){for(var t=!0,n=0;n<p.length;n++){var r=p[n],o=e[n];if(r.element!==o.element){t=!1;break}try{if(y(r.element,r.conf.id,v)!==y(o.element,o.conf.id)){t=!1;break}}catch(e){t=!1;break}}if(t)return}p=e,v=window.location.href;for(var i=0,c=e;i<c.length;i++){var l=c[i],a=y(l.element,l.conf.id),u=""===l.element.id?void 0:l.element.id,f=u+a;a&&(h[f]={type:0,key:{source:d,key:a},element:l.element,source:{type:d,data:void 0}},s&&s(h[f]))}},c=(n=function(){!function(){for(var e=[],t=0,n=w;t<n.length;t++){var r=n[t];switch(r.element.type){case"query":for(var o=0,i=Array.prototype.slice.call(document.querySelectorAll(r.element.selector));o<i.length;o++){for(var c=i[o],l=!0,a=0,u=r.element.subselectors||[];a<u.length;a++){var f=u[a];if(0===c.querySelectorAll(f).length){l=!1;break}}l&&e.push({element:c,conf:r})}break;case"url":var s=window.location.href,p=new RegExp(r.element.regex),v=s.match(p);if(v){var d=document.body,h=r.element.selector;if(1<v.length&&h){for(var y=1;y<v.filter(function(e){return void 0!==e}).length;y++){var m="\\$\\("+y+"\\)";h=h.replace(new RegExp(m,"g"),v[y])}try{var g=document.querySelector(h);g&&(d=g)}catch(e){}}e.push({element:d,conf:r})}}}b(e)}()},o=!(r=1e3),function(){o||(n(),o=!0,setTimeout(function(){o=!1},r))}),l=function(){document.location.href!==e&&(e=document.location.href,c())},a=function(){i||(document.addEventListener("scroll",c),i=!0,t=setInterval(l,500),c())},u=function(){function e(e){switch(this.active=!0,e.type){case"ntv":w=e.conf||[];break;default:throw new Error("Trying to initialize native listener with none native configuration.")}a()}return e.prototype.isReady=function(){return!0},e.prototype.onReady=function(e){e()},e.prototype.getDisplayedSlots=function(){var e=[];for(var t in h)h.hasOwnProperty(t)&&e.push(h[t]);return e},e.prototype.slotDisplayed=function(e){s=e},e.prototype.setActive=function(e){this.active=e,this.active?a():i&&(document.removeEventListener("scroll",c),clearInterval(t),i=!1)},e.prototype.trigger=function(e){},e.prototype.getType=function(){return d},e.prototype.slotEnded=function(e){},e.prototype.slotUpdated=function(e){},e}();window.brandmetrics.register({id:12,ctor:u})}();
"use strict";!function(){var e,u,n,i=[],r=function(t){e&&e(t)},o=function(o){var t=i.filter(function(t){var e,n,i=(e=t.element,0<(n=o.filter(function(t){return t.target===e})).length?n[0]:null);if(i){var r=u.inViewByRatio(u.getElementPixels(t.element),i.intersectionRatio);if(2===r&&i.isIntersecting&&i.rootBounds&&i.boundingClientRect)i.rootBounds.height*i.rootBounds.width<i.boundingClientRect.height*i.boundingClientRect.width&&(r=u.inView(t.element));if(t.state!==r)return t.state=r,!0}return!1});r(t)},t=function(){function t(t){e=t.callback,u=t.utils,n=new IntersectionObserver(o,{threshold:[0,.1,.2,.3,.4,.5]})}return t.prototype.observe=function(t){if(!this.isWatching(t)){var e={element:t,state:u.inView(t)};i.push(e),n.observe(t),r([e])}},t.prototype.unObserve=function(e){i=i.filter(function(t){return t.element!==e}),n.unobserve(e)},t.prototype.isWatching=function(e){return 0<i.filter(function(t){return t.element===e}).length},t}();window.brandmetrics.register({id:16,ctor:t})}();
"use strict";var __spreadArray=this&&this.__spreadArray||function(t,i,e){if(e||2===arguments.length)for(var n,r=0,s=i.length;r<s;r++)!n&&r in i||(n||(n=Array.prototype.slice.call(i,0,r)),n[r]=i[r]);return t.concat(n||Array.prototype.slice.call(i))};!function(){var n,e,r=[],s={},a=function(){if(0<r.length){var t=r.shift(),i=null;switch(t.type){case"auto":case"sessionSubsequent":i=brandmetrics.getModule(32);break;case"ntv":i=brandmetrics.getModule(33)}null!==i?new i({api:e,utils:n.utils,conf:t,bmConf:n.options}).execute(s,function(t){t&&a()}):a()}},t=function(){function t(t){var i;this.isInitiated=!1,e=t.bm,s=(null===(i=(n=t).storage)||void 0===i?void 0:i.state())||{},r=__spreadArray([],n.options.startMode,!0)}return t.prototype.start=function(){var t=n.bm,i=n.collection,e=n.callback;this.isInitiated||(n.utils.initProcessing(t,n.client,i),i&&i.start(),this.isInitiated=!0,n.utils.process(t,n.client,i),a()),e()},t}();window.brandmetrics.register({id:19,ctor:t})}();
"use strict";!function(){var e=function(){function e(){}return e.prototype.SerializeMeasurements=function(e){for(var r="",t=0,s=0,n=Object.keys(e);s<n.length;s++){var i=n[s];r+=0!==t?"¤":"";var a=e[i];r+=i+"|"+a.isAnswered+"|"+a.lastSurvey+"|"+a.nbrOfSurveys+"|-|"+a.created;for(var u=0,l=a.pixels;u<l.length;u++){var o=l[u];r+=";"+o.exp+"|"+o.lastexp+"|"+o.time+"|"+o.uid}t++}return r},e.prototype.DeserializeMeasurements=function(e){var i={};if(e&&""!==e)for(var a,r=0,t=e.split("¤");r<t.length;r++){t[r].split(";").forEach(function(e,r){if(e&&""!==e){var t=e.split("|");if(0===r){if(5!==t.length&&6!==t.length)throw new Error("The string cannot be deserialized");a={mid:t[0],isAnswered:(n=t[1],"true"===n.toLowerCase()),lastSurvey:parseInt(t[2],10),nbrOfSurveys:parseInt(t[3],10),created:6===t.length?parseInt(t[5],10):Date.now(),pixels:[]},i[a.mid]=a}else{if(4!==t.length)throw new Error;var s={exp:parseInt(t[0],10),lastexp:parseInt(t[1],10),time:parseInt(t[2],10),uid:t[3]};a.pixels.push(s)}}var n})}return i},e.prototype.SerializeSessions=function(e){var t="";return e.forEach(function(e,r){t+=0!==r?";":"",t+=e.last+"|"+e.mid+"|"+e.start+"|"+e.uid}),t},e.prototype.DeserializeSessions=function(e){var r=[];if(e&&""!==e)for(var t=0,s=e.split(";");t<s.length;t++){var n=s[t].split("|");if(4!==n.length)throw new Error("The string cannot be deserialized");r.push({last:parseInt(n[0],10),mid:n[1],start:parseInt(n[2],10),uid:n[3]})}return r},e.prototype.DeserializeXFrameMessage=function(e,r){if("string"!=typeof e||r&&-1===e.indexOf(r))return null;var t=e.split("|"),s=1<t.length?t[1]:void 0;switch(s){case"closed":return{mid:t[0],type:s,timedout:"true"===t[2]};case"completed":return{mid:t[0],type:s};case"rendered":var n=t[2],i=n.substring(n.lastIndexOf("=")+1),a="";if(3<t.length){var u=t[3];a=u.substring(u.lastIndexOf("=")+1)}var l=void 0;if(4<t.length){var o=t[4];l=o.substring(o.lastIndexOf("=")+1)}return{mid:t[0],type:s,size:i,surveyType:a,surveyTemplateId:l};case"resize":return{mid:t[0],type:s,size:e.substring(e.lastIndexOf("=")+1)};case"answer":var p=function(e,r){if(e){for(var t=-1,s=0;s<e.length;s++)if(e[s].substring(0,r.length)===r){t=s;break}if(0<=t){var n=e[t];return n.substring(n.lastIndexOf("=")+1)}}return""}(t,"surveyName");return{mid:t[0],type:s,answer:t[2],surveyName:p};case"redirect":return{target:t[2],type:s};case"updateStyle":return{mid:t[0],type:s,style:e.substring(e.lastIndexOf("=")+1)};case"requestClientSize":return{mid:t[0],type:s};case"surveyinview":return{mid:t[0],type:s,time:parseInt(t[2],10)};case"error":return{mid:t[0],type:s,message:t[2]};default:return null}},e}();window.brandmetrics.register({id:21,ctor:e})}();
"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};!function(){var o,d,p={},c=function(e){for(var t=e;t.parent!==window;)t=t.parent;for(var n=document.getElementsByTagName("iframe"),i=0;i<n.length;i++)if(n[i].contentWindow===t)return n[i]},t=function(e){var t=e.data;"bm"!==t.system||p[t.id]||function(e,t,n){switch(p[t.id]=!0,t.type){case"beacon":var i=c(e);o.triggerExposure({inviewHandling:0,element:i,key:t.key},{type:"beacon",data:n});var a={system:"bm",type:"accept",id:t.id};e.postMessage(a,"*");break;case"beacon_end":o.endExposure(c(e));break;case"query_host":var r=__assign(__assign({},d),{system:"bm",type:"query_host_reply",id:t.id});e.postMessage(r,"*");break;case"video_beacon":o.triggerExposure({type:1,inviewHandling:void 0!==t.inviewHandling?t.inviewHandling:0,exposureId:t.exposureId.toString(),key:t.key,element:1!==t.inviewHandling?c(e):void 0},{type:"beacon",data:n});var s={system:"bm",type:"accept",id:t.id};e.postMessage(s,"*");break;case"video_beacon_update":o.updateExposureProperties(t.exposureId.toString(),{active:{inview:t.inView,playing:t.playing},meta:{maxDuration:t.duration}});break;case"video_beacon_end":o.endExposure(t.exposureId.toString());break;default:throw new Error("brandmetrics: Host does not support message- type: "+t.type)}}(e.source,t,e)},e=function(e){o=e.collection,d=e.options.hostConfiguration||{surveysAtClient:{type:"none"},collectionAtHost:{type:"all"}},window.addEventListener("message",t,!1)};window.brandmetrics.register({id:26,ctor:e})}();
"use strict";!function(){var c,d=0,o=1,u=function(e){o=e,document.addEventListener("scroll",n)},n=function(e){var n=window.scrollY;o<n&&s()},s=function(){clearTimeout(d),document.removeEventListener("scroll",n),c.fn()},e=function(){function e(e){c=e}return e.prototype.execute=function(){var e,n,o,l=!1;if(c.delay||c.scroll){if(c.delay&&(c.delay.min||0===c.delay.min||c.delay.max||0===c.delay.max)){var r=(n=c.delay.min||0,o=c.delay.max||0,Math.floor(Math.random()*(o-n+1)+n));d=setTimeout(function(){s()},1e3*r),l=!0}switch(null===(e=c.scroll)||void 0===e?void 0:e.type){case"%":var t=1<c.scroll.value?c.scroll.value/100:c.scroll.value,a=document.body.scrollHeight,i=Math.max(a*t-window.innerHeight,0);u(i),l=!0;break;case"fold":u(window.innerHeight),l=!0;break;case"px":u(c.scroll.value),l=!0}}return l},e}();window.brandmetrics.register({id:1e3,ctor:e})}();
"use strict";!function(){var c,u,l,f=function(e,n){var o=l.escapeSelector(e),t=document.querySelector(o);if(!t&&n)for(var r=0,i=function(e){void 0===e&&(e=document);var r=[];return function e(n){n instanceof Element&&n.shadowRoot&&(r.push(n.shadowRoot),e(n.shadowRoot));for(var o=n.children||[],t=0;t<o.length;t++)e(o[t])}(e),r}(document);r<i.length;r++){if(null!==(t=i[r].querySelector(o)))break}return null!==t},d=function(o){var e,n,t,r,i=function(){l.emit("survey_loaded",{available:!1,showed:!1})};if("auto"===c.type||"sessionSubsequent"===c.type&&function(e){var n="__bmsessionviews",o=1,t=sessionStorage.getItem(n);null!==t&&(o=parseInt(t,10)+1);try{sessionStorage.setItem(n,o.toString())}catch(e){}return o>e.conf.count}(c)){if(!0===function(e){for(var n=window.location.href,o=0,t=e;o<t.length;o++){var r=t[o],i=new RegExp(r);if(n.match(i))return!0}return!1}((null===(e=c.conf)||void 0===e?void 0:e.excluded)||[]))return void i();new(brandmetrics.getModule(1e3))({delay:null!==(t=null===(n=c.conf)||void 0===n?void 0:n.delay)&&void 0!==t?t:{min:0},scroll:null===(r=c.conf)||void 0===r?void 0:r.scroll,fn:function(){var e,n=c;if(!(n.conf&&n.conf.blockingElement&&f(n.conf.blockingElement.selector,null!==(e=n.conf.blockingElement.checkShadowRoots)&&void 0!==e&&e)))return n.conf&&n.conf.requiredElement&&!f(n.conf.requiredElement,!1)?o?void setTimeout(function(){d(!1)},1e3):void i():void u.triggerSurvey();i()}}).execute()}},e=function(){function e(e){u=e.api,c=e.conf,l=e.utils}return e.prototype.execute=function(e,n){d(!0),n(!1)},e}();window.brandmetrics.register({id:32,ctor:e})}();
"use strict";!function(){var p,l,s,r,m="__bm_m",u="__bm_s",e="__bm_c",i=function(t){try{var e=p.SerializeMeasurements(t);l.setItem("__bm_m",e)}catch(t){}},f=function(){var a={},t=document.cookie.split(";"),s=[];if(t.forEach(function(t){var e,n=t.trim();if(e=m+"_",n.substring(0,e.length)===e){var r=n.substring(m.length+1).split("=")[0],o=c(r),i=l.getItem(o);if(i)try{a[r]=p.DeserializeMeasurements(i)[r],s.push(o)}catch(t){l.removeItem(o)}}}),0<s.length){for(var e=0,n=s;e<n.length;e++){var r=n[e];l.removeItem(r)}i(a)}else{var o=l.getItem(m);a=p.DeserializeMeasurements(o)}return a},c=function(t){return m+"_"+t},n=function(){return u+"#"+r},o=function(){function t(){this._dataSeparatorReplacement="^",this._dataSeparatorOrigVal=";";var t=window.location.hostname.split("."),e=t.length,n=1<e&&e<4;this._cookieDomain=n?"."+t.slice(-2).join("."):window.location.hostname}return Object.defineProperty(t.prototype,"length",{get:function(){return document.cookie.split(";").filter(function(t){return""!==t.trim()}).length},enumerable:!1,configurable:!0}),t.prototype.setItem=function(t,e){var n=new Date(Date.now()+432e7).toUTCString();e=e.replace(this._dataSeparatorOrigVal,this._dataSeparatorReplacement),document.cookie="".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(e),"; expires=").concat(n,"; path=/; domain=").concat(this._cookieDomain)},t.prototype.getItem=function(t){for(var e="".concat(encodeURIComponent(t),"="),n=0,r=decodeURIComponent(document.cookie).split(";");n<r.length;n++){var o=r[n].trim();if(0===o.indexOf(e))return o.substring(e.length,o.length).replace(this._dataSeparatorReplacement,this._dataSeparatorOrigVal)}return null},t.prototype.removeItem=function(t){document.cookie="".concat(encodeURIComponent(t),'=""; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=').concat(this._cookieDomain)},t.prototype.clear=function(){},t.prototype.key=function(t){var e=document.cookie.split(";");if(t<0||t>=e.length)return null;var n=e[t].trim(),r=n.indexOf("=");return-1<r?decodeURIComponent(n.substring(0,r)):null},t}(),a=function(){function t(){this._data={},this.length=0}return t.prototype.calcLength=function(){this.length=Object.keys(this._data).length},t.prototype.getItem=function(t){return this._data.hasOwnProperty(t)?this._data[t]:null},t.prototype.setItem=function(t,e){var n=this._data[t]=String(e);return this.calcLength(),n},t.prototype.removeItem=function(t){var e=delete this._data[t];return this.calcLength(),e},t.prototype.clear=function(){return this._data={},this.calcLength(),this._data},t.prototype.key=function(t){var e=Object.keys(this._data);return e.length<t?e[t]:null},t}(),h=function(){var t="__bm_ls_check";try{return localStorage.setItem(t,t),localStorage.removeItem(t),localStorage}catch(t){return new a}},d=function(){try{var t="__storage_test__",e=new o;return e.setItem(t,"1"),e.removeItem(t),new o}catch(t){return new a}},t=function(){function t(t,e,n){p=new(brandmetrics.getModule(21)),l=d(),s=h(),r=Math.floor(1e6*Math.random())}return t.prototype.clean=function(t){var e=f(),n=Date.now();for(var r in e)if(e.hasOwnProperty(r)){for(var o=e[r],i=Math.max(o.created,o.lastSurvey),a=0,s=o.pixels;a<s.length;a++){var u=s[a];i=Math.max(i,u.lastexp)}var c=n-i;!(-1!==t.indexOf(o.mid))&&c<n&&18144e5<c&&delete e[r]}l.setItem(m,p.SerializeMeasurements(e))},t.prototype.state=function(){return f()},t.prototype.setMeasurements=function(t){i(t)},t.prototype.internalUpdateExp=function(t,e,n,r,o){var i=f(),a=i[t];a&&!o||(a={mid:t,isAnswered:!1,lastSurvey:0,nbrOfSurveys:0,created:Date.now(),pixels:[]},i[t]=a);for(var s=null,u=0,c=a.pixels;u<c.length;u++){var p=c[u];if(p.uid===e){s=p;break}}return s||(s={uid:e,exp:0,lastexp:0,time:0},a.pixels.push(s)),s.exp+=n,s.time+=r,s.lastexp=Date.now(),this.setMeasurements(i),a},t.prototype.updateExp=function(t,e,n,r){return this.internalUpdateExp(t,e,n,r,!1)},t.prototype.setExp=function(t,e,n,r){return this.internalUpdateExp(t,e,n,r,!0)},t.prototype.updateSrv=function(e,t){var n=f(),r=n[e];if(void 0===r&&(r={mid:e,created:Date.now(),isAnswered:!1,lastSurvey:0,nbrOfSurveys:0,pixels:[]},n[e]=r),!0===t?r.isAnswered=!0:(r.lastSurvey=Date.now(),r.nbrOfSurveys=r.nbrOfSurveys+1),this.setMeasurements(n),!0===t)for(var o=function(e){var t=r.pixels.filter(function(t){return t.uid===e.uid})[0];void 0===t&&(t={uid:e.uid,exp:1,lastexp:0,time:0},r.pixels.push(t)),t.lastexp=e.last,t.time+=Math.round((e.last-e.start)/1e3)},i=0,a=this.getSession().filter(function(t){return t.mid===e});i<a.length;i++){o(a[i])}return r},t.prototype.getTemp=function(){return[]},t.prototype.setTemp=function(t){throw new Error("Method not implemented."+t)},t.prototype.getSession=function(){var t=s.getItem(n());return null!=t?p.DeserializeSessions(t):[]},t.prototype.setSession=function(t){s.setItem(n(),p.SerializeSessions(t))},t.prototype.getAndRemoveOutdatedSessions=function(){for(var a=[],t=0,e=l.length;t<e;t++){var n=l.key(t);0===(null==n?void 0:n.indexOf(u+"#"))&&l.removeItem(n)}var r=function(t,e){var n=s.key(t);if(0===(null==n?void 0:n.indexOf(u+"#"))){var r=p.DeserializeSessions(s.getItem(n)),o=(new Date).getTime(),i=!0;r.forEach(function(t){o-t.last<3e5&&(i=!1)}),i&&(a.push.apply(a,r),s.removeItem(n))}};for(t=0,e=s.length;t<e;t++)r(t);return a},t.prototype.setSurveyConfiguration=function(t){try{l.setItem(e,JSON.stringify(t))}catch(t){}},t.prototype.getSurveyConfiguration=function(){try{var t=l.getItem(e);if(t)return JSON.parse(t)}catch(t){}},t.prototype.removeSurveyConfiguration=function(){try{l.removeItem(e)}catch(t){}},t}();window.brandmetrics.register({id:35,ctor:t})}();
                brandmetrics.register({
                    id: -2,
                    ctor: {
                        storage: "1pc",
                        listeners: [
  {
    "type": "gpt",
    "conf": null
  },
  {
    "type": "ntv",
    "conf": [
      {
        "element": {
          "type": "url",
          "regex": "(?:https:\\/\\/)?(?:www\\.)?([^?]+)"
        },
        "id": {
          "type": "url",
          "regex": "(?:https:\\/\\/)?(?:www\\.)?([^?]+)"
        }
      }
    ]
  }
],
                        measurements: [
{

  id: "6cc29376b1994ad8aa2a1fc3230234bb", 
  
  keys: [{"source":"gpt","campaignId":3883912698}],
},
{

  id: "d996d17939c0409d867c38187409b5df", 
  
  keys: [{"source":"gpt","campaignId":3878420777}],
},
{

  id: "2f782a53e4474a19a6003a0cbf9827d2", 
  
  keys: [{"source":"gpt","campaignId":3886506937}],
},
{

  id: "56aa2050ad5f4101811fb78db5ddf741", 
  
  keys: [{"source":"gpt","campaignId":3880520283}],
},
{

  id: "22e45e42b68746458ab72381b32125ac", 
  
  keys: [{"source":"gpt","lineItemId":"7100023361"},{"source":"gpt","lineItemId":"7100023352"},{"source":"gpt","lineItemId":"7102873610"},{"source":"gpt","lineItemId":"7102873616"},{"source":"gpt","lineItemId":"7102873811"},{"source":"gpt","lineItemId":"7102873808"}],
},
{

  id: "5f05fd9867364af0a31a0314227d6a6b", 
  
  keys: [{"source":"gpt","campaignId":3855446129}],
},
{

  id: "89f78764b5e44dec94012b0149511eb7", 
  
  keys: [{"source":"gpt","lineItemId":"7097844405"},{"source":"gpt","lineItemId":"7101236816"},{"source":"gpt","lineItemId":"7101236870"},{"source":"gpt","lineItemId":"7101237098"},{"source":"gpt","lineItemId":"7100198077"},{"source":"gpt","lineItemId":"7101236810"},{"source":"gpt","lineItemId":"7101237047"},{"source":"gpt","lineItemId":"7101237056"},{"source":"gpt","lineItemId":"7101237065"},{"source":"gpt","lineItemId":"7101237074"},{"source":"gpt","lineItemId":"7101237029"}],
},
{

  id: "9cb2771a824c432a9c397a3c982df483", 
  
  keys: [{"source":"gpt","lineItemId":"7100198083"}],
},
{

  id: "4b6c86c1c2734bb5810386e898b95c1c", 
  
  keys: [{"source":"gpt","campaignId":3880666278}],
},
{

  id: "93fc6ec532eb4768883897049bf359a9", 
  
  keys: [{"source":"gpt","lineItemId":"7135027185"},{"source":"gpt","lineItemId":"7135027197"},{"source":"gpt","lineItemId":"7135027332"},{"source":"gpt","lineItemId":"7135027344"},{"source":"gpt","lineItemId":"7135027353"},{"source":"gpt","lineItemId":"7135027362"}],
},
{

  id: "b4f0f10d40b6437c8779a1283013d517", 
  
  keys: [{"source":"gpt","lineItemId":"7136192631"},{"source":"gpt","lineItemId":"7139894390"}],
},
{

  id: "23b4790ffeea4994af87843ca6bd6db6", 
  
  keys: [{"source":"gpt","lineItemId":"7105000017"},{"source":"gpt","lineItemId":"7105000020"},{"source":"gpt","lineItemId":"7108558754"},{"source":"gpt","lineItemId":"7108559465"},{"source":"gpt","lineItemId":"7108559468"},{"source":"gpt","lineItemId":"7108559471"},{"source":"gpt","lineItemId":"7108559477"},{"source":"gpt","lineItemId":"7108559480"},{"source":"gpt","lineItemId":"7108576523"}],
},
{

  id: "9c4b537dac8b4961a1fd22899af289af", 
  
  keys: [{"source":"gpt","campaignId":3830493070}],
},
{

  id: "9e2a42a330c64a5ba43389059a39b00b", 
  
  keys: [{"source":"gpt","campaignId":3830493070}],
},
{

  id: "91350c3a690444899c8d711d5fc0a4ec", 
  
  keys: [{"source":"gpt","campaignId":3856876486}],
},
{

  id: "1cba203a62a746c7b401beca320f6959", 
  
  keys: [{"source":"gpt","campaignId":3848129963}],
},
{

  id: "fec4b40866804619aebf61fcfcdc4293", 
  
  keys: [{"source":"gpt","lineItemId":"7100792395"},{"source":"gpt","lineItemId":"7100793766"},{"source":"gpt","lineItemId":"7100792398"},{"source":"gpt","lineItemId":"7101796448"}],
},
{

  id: "566c6a438117486ba3abd22f31908574", 
  
  keys: [{"source":"gpt","campaignId":3850723912}],
},
{

  id: "65b19be9dc624270ba121e5b8d3872cc", 
  
  keys: [{"source":"gpt","campaignId":3851502468}],
},
{

  id: "82c0e45418ee4107bf97b2e4c60090cf", 
  
  keys: [{"source":"gpt","campaignId":3850756210}],
},
{

  id: "82ce35bd49a1401da8473e73eaf3e4e9", 
  
  keys: [{"source":"gpt","campaignId":3858860777}],
},
{

  id: "98d1989053c849d5acdcf72ca8ae9c77", 
  
  keys: [{"source":"gpt","campaignId":3896565544},{"source":"gpt","campaignId":3896888361},{"source":"gpt","campaignId":3896957184},{"source":"gpt","campaignId":3896564389},{"source":"gpt","campaignId":3896886936},{"source":"gpt","campaignId":3896468545}],
},
{

  id: "334328714cf4462891ad16d9349d1d6d", 
  
  keys: [{"source":"gpt","campaignId":3846085634}],
},
{

  id: "a43ab34580b748668cf7df4cea38fcaa", 
  
  keys: [{"source":"gpt","lineItemId":"7082768352"},{"source":"gpt","lineItemId":"7084935748"},{"source":"gpt","lineItemId":"7086136055"}],
},
{

  id: "085bbbfbf73b4e04922132e403662f07", 
  
  keys: [{"source":"gpt","campaignId":3862945808}],
},
{

  id: "27fe333d60b64bd9be41e146bcac22fc", 
  
  keys: [{"source":"gpt","campaignId":3872428759}],
},
{

  id: "2d0d84f6964f4e5cb4567010199ca0ea", 
  
  keys: [{"source":"gpt","campaignId":3869914703}],
},
{

  id: "cff0d9b0e38c47f7af2d06c75fb48551", 
  
  keys: [{"source":"gpt","campaignId":3864538202}],
},
{

  id: "318bc88b151648738ff6603f54261d8e", 
  
  keys: [{"source":"gpt","campaignId":3867516408}],
},
{

  id: "7272d90be5db4a009103ffd2a2b845eb", 
  
  keys: [{"source":"gpt","campaignId":3870192844}],
},
{

  id: "7f7b586a91054784a56e51996a5d05f4", 
  
  keys: [{"source":"gpt","campaignId":3898277215}],
},
{

  id: "0f2bd25569c444a199e2b702997bee37", 
  
  keys: [{"source":"gpt","campaignId":3891284594}],
},
{

  id: "f90edef9a01940d681b32a58f148c5fe", 
  
  keys: [{"source":"gpt","campaignId":3892527501}],
},
{

  id: "8420e1dbf91f44ce8759391ec54d7118", 
  
  keys: [{"source":"gpt","campaignId":3893345676}],
},
{

  id: "f5e8645257424c4fa27c47461dcb8305", 
  
  keys: [{"source":"gpt","campaignId":3885759020}],
},
{

  id: "dfc08da14882407f8c74e9d2ba2cacb5", 
  
  keys: [{"source":"gpt","lineItemId":"7136245092"},{"source":"gpt","lineItemId":"7138498495"},{"source":"gpt","lineItemId":"7138502593"},{"source":"gpt","lineItemId":"7136255943"},{"source":"gpt","lineItemId":"7138499716"},{"source":"gpt","lineItemId":"7139914244"}],
},
{

  id: "313e566d40fe41b6936ae3ba7717fd95", 
  
  keys: [{"source":"gpt","campaignId":3892295920}],
},
{

  id: "c54a715d40f2495dae245d69dd49c10d", 
  
  keys: [{"source":"gpt","lineItemId":"6905499285"},{"source":"gpt","lineItemId":"6909266576"},{"source":"gpt","lineItemId":"6909266612"},{"source":"gpt","lineItemId":"7025924369"}],
},
{

  id: "fe83c54d3b194b3dbc4c93c3c86e7719", 
  
  keys: [{"source":"gpt","lineItemId":"6905498856"},{"source":"gpt","lineItemId":"6908154430"},{"source":"gpt","lineItemId":"6909265370"},{"source":"gpt","lineItemId":"6909265373"},{"source":"gpt","lineItemId":"6909265895"},{"source":"gpt","lineItemId":"6909265910"},{"source":"gpt","lineItemId":"6905498877"},{"source":"gpt","lineItemId":"6905499033"},{"source":"gpt","lineItemId":"6905499591"},{"source":"gpt","lineItemId":"6909265916"},{"source":"gpt","lineItemId":"6909266048"},{"source":"gpt","lineItemId":"6909266069"},{"source":"gpt","lineItemId":"6905499720"},{"source":"gpt","lineItemId":"6905499759"},{"source":"gpt","lineItemId":"6905499783"},{"source":"gpt","lineItemId":"6905499804"},{"source":"gpt","lineItemId":"6909266147"}],
},
{

  id: "18041952bb094def8cf836eaa18e1d4c", 
  
  keys: [{"source":"gpt","campaignId":3801739143}],
},
{

  id: "5c5c2050e9f346e9b47a8ca6316922b6", 
  
  keys: [{"source":"gpt","lineItemId":"7135051674"},{"source":"gpt","lineItemId":"7137339979"},{"source":"gpt","lineItemId":"7137339994"},{"source":"gpt","lineItemId":"7137340006"},{"source":"gpt","lineItemId":"7137340012"},{"source":"gpt","lineItemId":"7137340018"}],
},
{

  id: "f648fc9aed104152bc7fae700a3e3e45", 
  
  keys: [{"source":"gpt","lineItemId":"7105667506"},{"source":"gpt","lineItemId":"7106737670"},{"source":"gpt","lineItemId":"7106738375"},{"source":"gpt","lineItemId":"7106738540"},{"source":"gpt","lineItemId":"7106738594"},{"source":"gpt","lineItemId":"7106738627"},{"source":"gpt","lineItemId":"7105668124"},{"source":"gpt","lineItemId":"7105668130"},{"source":"gpt","lineItemId":"7105668151"},{"source":"gpt","lineItemId":"7105668154"},{"source":"gpt","lineItemId":"7106738837"}],
},
{

  id: "77322531e1784421a4c7e90b4acadb83", 
  
  keys: [{"source":"gpt","campaignId":3863650532}],
},
{

  id: "ba3d0dd5a0344405a7b0f383bda2abef", 
  
  keys: [{"source":"gpt","lineItemId":"7109037060"},{"source":"gpt","lineItemId":"7112634941"},{"source":"gpt","lineItemId":"7112634953"},{"source":"gpt","lineItemId":"7112635103"}],
},
{

  id: "bb0f624d723943f38467b47fd5042331", 
  
  keys: [{"source":"gpt","campaignId":7121104557}],
},
{

  id: "d365240ba4194e50860acbf4b50f6b64", 
  
  keys: [{"source":"gpt","lineItemId":"7143302338"}],
},
{

  id: "9c47c152a7ad4fd18d6ace0c5e8d2109", 
  
  keys: [{"source":"gpt","lineItemId":"7121287404"},{"source":"gpt","lineItemId":"7121290449"},{"source":"gpt","lineItemId":"7121290452"},{"source":"gpt","lineItemId":"7123641055"},{"source":"gpt","lineItemId":"7125047690"},{"source":"gpt","lineItemId":"7125047705"},{"source":"gpt","lineItemId":"7123641058"},{"source":"gpt","lineItemId":"7123641754"},{"source":"gpt","lineItemId":"7123641790"},{"source":"gpt","lineItemId":"7125047648"},{"source":"gpt","lineItemId":"7121287425"},{"source":"gpt","lineItemId":"7121290035"},{"source":"gpt","lineItemId":"7121290050"},{"source":"gpt","lineItemId":"7121290473"},{"source":"gpt","lineItemId":"7144491100"},{"source":"gpt","lineItemId":"7146023408"}],
},
{

  id: "a5b0a0a8748a48a6b847a20324e65572", 
  
  keys: [{"source":"gpt","lineItemId":"7137339790"}],
},
{

  id: "05cb1b233c384125b4c2974816267606", 
  
  keys: [{"source":"gpt","campaignId":3896464780}],
},
{

  id: "ec368fc88f334651bc2b4b3dd8f3244a", 
  
  keys: [{"source":"gpt","campaignId":3865778783}],
}],
                        
                        
                        
                        surveyRandomization:1,
                        
                        startMode:[{"type":"auto"}],
                        
                        
                        
                        
                    }
                });