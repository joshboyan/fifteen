!function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return o(n?n:e)},c,c.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){(function(t,n,r,o,i,s,a,u,c){"use strict";function f(){T=[];for(var e=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];e.length>0;){var t=e[Math.ceil(Math.random()*e.length)-1];T.push(e.splice(e.indexOf(t),1))}T.push(null),l()||f()}function l(){var e=T.reduce(function(e,t,n,r){return r.map(function(r,o){o<n&&(r=15),parseInt(t)>parseInt(r)&&e++}),e},0);return e%2===0}function d(){function e(e,r){var o=document.createTextNode(r);n.appendChild(o),n.id=e,t.appendChild(n)}for(var t=document.getElementById("container"),n=void 0;t.hasChildNodes();)t.removeChild(t.lastChild);T.forEach(function(t,r){n=document.createElement("div"),n.className="box",t?e(r,t):e(t,String.fromCharCode(160))})}function h(){var e=x.open("scores",1,function(e){var t=e.createObjectStore("scores");t.createIndex("timer","timer"),t.createIndex("moves","moves")}).catch(function(e){console.error(e)});x.open("offline",1,function(e){e.createObjectStore("offline")}).then(function(e){var t=e.transaction("offline"),n=t.objectStore("offline");return n.getAll()}).then(function(e){e.forEach(function(t){fetch("/api/scores",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),console.log("The following entry has been made to mongo: ",e)})}).then(function(){x.open("offline",1).then(function(e){var t=e.transaction("offline","readwrite"),n=t.objectStore("offline","readwrite");n.clear()})}).catch(function(e){console.error("There was an error updating mongo with offline scores. ",e)});e.then(function(e){var t=e.transaction("scores","readwrite"),n=t.objectStore("scores","readwrite");return L=n.count()}).catch(function(e){console.error(e)})}function p(){fetch("/api/scores").then(function(e){return e.json()}).then(function(e){console.log(e),x.open("scores",1).then(function(t){var n=t.transaction("scores","readwrite");A=n.objectStore("scores","readwrite");var r=A.clear();return e.forEach(function(e){A.add(e,D),D++}),r}).catch(function(e){e.forEach(function(e){A.add(e,D),D++}),console.log("Repopulating indexedDB with scores")})}).catch(function(e){console.error("There was a problem communicating with the database",e)})}function y(){var e=document.getElementsByClassName("box");e=Array.prototype.slice.call(e,0),e.map(function(e){e.addEventListener("click",function(e){var t=parseInt(e.target.id);m(t)&&(T[T.indexOf(null)]=T[t],T[t]=null,console.log(L),ga("send","event","game play","click"),d(),E(),y())})})}function m(e){var t=T.indexOf(null);if(t===e-1||t===e+1||t===e-4||t===e+4)return document.getElementById("counter").innerHTML="Moves:"+S++,!0}function g(e,t){function n(n){for(t=document.getElementById(t);t.hasChildNodes();)t.removeChild(t.lastChild);n.forEach(function(n,r){var o=document.createElement("div");L>3&&n.key==L-1&&o.classList.add("latest"),o.innerHTML="<span>"+(r+1)+")</span><span>"+n.name+"</span><span>"+n[e]+"</span>",t.appendChild(o)})}x.open("scores",1).then(function(t){var n=t.transaction("scores"),r=n.objectStore("scores"),o=r.index(e);return o.getAll()}).then(function(e){n(e)}).catch(function(e){console.error(e)})}function b(){f(),d(),y(),v(),w(),document.getElementById("exitTimesWin").style.display="none",document.getElementById("exitTimes").style.display="block",document.getElementById("exitMovesWin").style.display="none",document.getElementById("exitMoves").style.display="block"}function v(){document.getElementById("timer").remove(timer);var e=document.createElement("p");e.id="timer",document.getElementById("gameStats").appendChild(e)}function w(){var e=document.getElementById("timer");C=0,j=0;var t=(new Date).getTime();window.setInterval(function(){return _=(new Date).getTime()-t,C=Math.round(_/1e3+.5),C>9?e.innerHTML=j+":"+C:e.innerHTML=j+":0"+C,C>59&&(j++,C=0,t=(new Date).getTime()),_},1e3)}function E(){0===k&&(L=L.request.result);var e=0;U.forEach(function(t,n){parseInt(t)===parseInt(T[n])&&e++}),15===e&&(document.getElementById("youWin").classList.add("open"),document.getElementById("name").autofocus=!0,"autofocus"in document.createElement("input")||document.getElementById("name").focus()),k++}function B(){var e={moves:S,timer:Math.floor(_/1e3),name:I,key:L};console.log("You Win!!"),v(),S=0,document.getElementById("counter").innerHTML="Moves:0",x.open("scores",1).then(function(t){var n=t.transaction("scores","readwrite"),r=n.objectStore("scores","readwrite");r.add(e,D),D++}).then(function(){console.log("The following entry has been made to indexedDB: ",e),window.navigator.onLine?fetch("/api/scores",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(){console.log("The following entry has been made to mongoDB: ",e)}).catch(function(e){console.log(e)}):x.open("offline",1).then(function(t){var n=t.transaction("offline","readwrite"),r=n.objectStore("offline","readwrite");r.add(e,P),P++}).then(function(){console.log("the following entry has bee added to indexedDB.offline",e)}).catch(function(e){console.error(e)})}).catch(function(e){console.error(e)}),L++,document.getElementById("exitTimes").style.display="none",document.getElementById("exitTimesWin").style.display="block",document.getElementById("exitMoves").style.display="none",document.getElementById("exitMovesWin").style.display="block",g("timer","timeEntries"),document.getElementById("timeScoreBoard").classList.add("open")}document.getElementById("instructionsTrigger").addEventListener("click",function(){document.getElementById("instructions").classList.remove("close-instructions"),ga("send","event","interface controls","click","instructions")}),document.getElementById("closeInstructions").addEventListener("click",function(){document.getElementById("instructions").classList.add("close-instructions")}),document.getElementById("refresh").addEventListener("click",function(){b(),ga("send","event","interface controls","click","refresh")}),document.getElementById("timeScores").addEventListener("click",function(){g("timer","timeEntries"),document.getElementById("timeScoreBoard").classList.add("open"),ga("send","event","inteface controls","click","time scores")}),document.getElementById("exitTimes").addEventListener("click",function(){document.getElementById("timeScoreBoard").classList.remove("open")}),document.getElementById("exitTimesWin").addEventListener("click",function(){document.getElementById("timeScoreBoard").classList.remove("open"),g("moves","moveEntries"),document.getElementById("movesScoreBoard").classList.add("open")}),document.getElementById("moveScores").addEventListener("click",function(){g("moves","moveEntries"),document.getElementById("movesScoreBoard").classList.add("open"),ga("send","event","interface controls","click","moves scores")}),document.getElementById("exitMoves").addEventListener("click",function(){document.getElementById("movesScoreBoard").classList.remove("open")}),document.getElementById("exitMovesWin").addEventListener("click",function(){document.getElementById("movesScoreBoard").classList.remove("open"),b()}),document.getElementById("info").addEventListener("click",function(){document.getElementById("infoBoard").classList.add("open"),ga("send","event","interface controls","click","info")}),document.getElementById("exitInfo").addEventListener("click",function(){document.getElementById("infoBoard").classList.remove("open")}),document.getElementById("exitYouWin").addEventListener("click",function(){document.getElementById("youWin").classList.remove("open"),document.getElementById("yourName").classList.add("open"),ga("send","event","game play","win")}),document.getElementById("exitYourName").addEventListener("click",function(e){e.preventDefault(),document.getElementById("yourName").classList.remove("open"),I=document.getElementsByTagName("input")[0].value,B()}),e("whatwg-fetch");var I,_,A,L,x=e("idb"),T=[],U=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null],S=1,k=0,C=0,j=0,D=1,P=1;b(),h(),p();var M=function(e,t,n){this.testImplement=e,this.testParams=t,this.repetitions=n||1e4,this.average=0};M.prototype={startTest:function(){if(this.testImplement(this.testParams)===!1)return void alert("Test failed with those parameters.");for(var e,t,n=0,r=0,o=this.repetitions;r<o;r++)e=+new Date,this.testImplement(this.testParams),t=+new Date,n+=t-e;return this.average=n/this.repetitions,console.log("Average execution across "+this.repetitions+": "+this.average)}},"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(function(e){console.log("Registration succeeded. Scope is "+e.scope)}).catch(function(e){console.error("Registration failed with "+e)})}).call(this,e("e/U+97"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_cbde049a.js","/")},{buffer:3,"e/U+97":6,idb:4,"whatwg-fetch":7}],2:[function(e,t,n){(function(e,t,r,o,i,s,a,u,c){var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===s||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<c+26?t-c:t<u+26?t-u+26:void 0}function n(e){function n(e){c[l++]=e}var r,i,s,a,u,c;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var f=e.length;u="="===e.charAt(f-2)?2:"="===e.charAt(f-1)?1:0,c=new o(3*e.length/4-u),s=u>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<s;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===u?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===u&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),c}function r(e){function t(e){return f.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,s=e.length%3,a="";for(r=0,i=e.length-s;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(s){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),s="/".charCodeAt(0),a="0".charCodeAt(0),u="a".charCodeAt(0),c="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("e/U+97"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\base64-js\\lib\\b64.js","/..\\..\\node_modules\\base64-js\\lib")},{buffer:3,"e/U+97":6}],3:[function(e,t,n){(function(t,r,o,i,s,a,u,c,f){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=P(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=N(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=N(e.length)}var s;o._useTypedArrays?s=o._augment(new Uint8Array(i)):(s=this,s.length=i,s._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)s._set(e);else if(F(e))for(a=0;a<i;a++)o.isBuffer(e)?s[a]=e.readUInt8(a):s[a]=e[a];else if("string"===r)s.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)s[a]=0;return s}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var s=t.length;z(s%2===0,"Invalid hex string"),r>s/2&&(r=s/2);for(var a=0;a<r;a++){var u=parseInt(t.substr(2*a,2),16);z(!isNaN(u),"Invalid hex string"),e[n+a]=u}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=J(q(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=J(W(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function y(e,t,n,r){var i=o._charsWritten=J(K(t),e,n,r);return i}function m(e,t,n,r){var i=o._charsWritten=J(H(t),e,n,r);return i}function g(e,t,n){return 0===t&&n===e.length?$.fromByteArray(e):$.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=Y(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+Y(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function w(e,t,n){return v(e,t,n)}function E(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=R(e[i]);return o}function B(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||(z("boolean"==typeof n,"missing or invalid endian"),z(void 0!==t&&null!==t,"missing offset"),z(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function _(e,t,n,r){r||(z("boolean"==typeof n,"missing or invalid endian"),z(void 0!==t&&null!==t,"missing offset"),z(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function A(e,t,n,r){r||(z("boolean"==typeof n,"missing or invalid endian"),z(void 0!==t&&null!==t,"missing offset"),z(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),s=32768&i;return s?(65535-i+1)*-1:i}}function L(e,t,n,r){r||(z("boolean"==typeof n,"missing or invalid endian"),z(void 0!==t&&null!==t,"missing offset"),z(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=_(e,t,n,!0),s=2147483648&i;return s?(4294967295-i+1)*-1:i}}function x(e,t,n,r){return r||(z("boolean"==typeof n,"missing or invalid endian"),z(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function T(e,t,n,r){return r||(z("boolean"==typeof n,"missing or invalid endian"),z(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function U(e,t,n,r,o){o||(z(void 0!==t&&null!==t,"missing value"),z("boolean"==typeof r,"missing or invalid endian"),z(void 0!==n&&null!==n,"missing offset"),z(n+1<e.length,"trying to write beyond buffer length"),G(t,65535));var i=e.length;if(!(n>=i))for(var s=0,a=Math.min(i-n,2);s<a;s++)e[n+s]=(t&255<<8*(r?s:1-s))>>>8*(r?s:1-s)}function S(e,t,n,r,o){o||(z(void 0!==t&&null!==t,"missing value"),z("boolean"==typeof r,"missing or invalid endian"),z(void 0!==n&&null!==n,"missing offset"),z(n+3<e.length,"trying to write beyond buffer length"),G(t,4294967295));var i=e.length;if(!(n>=i))for(var s=0,a=Math.min(i-n,4);s<a;s++)e[n+s]=t>>>8*(r?s:3-s)&255}function k(e,t,n,r,o){o||(z(void 0!==t&&null!==t,"missing value"),z("boolean"==typeof r,"missing or invalid endian"),z(void 0!==n&&null!==n,"missing offset"),z(n+1<e.length,"Trying to write beyond buffer length"),V(t,32767,-32768));var i=e.length;n>=i||(t>=0?U(e,t,n,r,o):U(e,65535+t+1,n,r,o))}function C(e,t,n,r,o){o||(z(void 0!==t&&null!==t,"missing value"),z("boolean"==typeof r,"missing or invalid endian"),z(void 0!==n&&null!==n,"missing offset"),z(n+3<e.length,"Trying to write beyond buffer length"),V(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,4294967295+t+1,n,r,o))}function j(e,t,n,r,o){o||(z(void 0!==t&&null!==t,"missing value"),z("boolean"==typeof r,"missing or invalid endian"),z(void 0!==n&&null!==n,"missing offset"),z(n+3<e.length,"Trying to write beyond buffer length"),X(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function D(e,t,n,r,o){o||(z(void 0!==t&&null!==t,"missing value"),z("boolean"==typeof r,"missing or invalid endian"),z(void 0!==n&&null!==n,"missing offset"),z(n+7<e.length,"Trying to write beyond buffer length"),X(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function P(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function M(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function N(e){return e=~~Math.ceil(+e),e<0?0:e}function O(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function F(e){return O(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function R(e){return e<16?"0"+e.toString(16):e.toString(16)}function q(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),s=0;s<i.length;s++)t.push(parseInt(i[s],16))}}return t}function W(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function H(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function K(e){return $.toByteArray(e)}function J(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function Y(e){try{return decodeURIComponent(e)}catch(e){return String.fromCharCode(65533)}}function G(e,t){z("number"==typeof e,"cannot write a non-number as a number"),z(e>=0,"specified a negative value for writing an unsigned value"),z(e<=t,"value is larger than maximum value for type"),z(Math.floor(e)===e,"value has a fractional component")}function V(e,t,n){z("number"==typeof e,"cannot write a non-number as a number"),z(e<=t,"value larger than maximum allowed value"),z(e>=n,"value smaller than minimum allowed value"),z(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){z("number"==typeof e,"cannot write a non-number as a number"),z(e<=t,"value larger than maximum allowed value"),z(e>=n,"value smaller than minimum allowed value")}function z(e,t){if(!e)throw new Error(t||"Failed assertion")}var $=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(e){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=q(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=K(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if(z(O(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var s=e[n];s.copy(r,i),i+=s.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var s;switch(r){case"hex":s=l(this,e,t,n);break;case"utf8":case"utf-8":s=d(this,e,t,n);break;case"ascii":s=h(this,e,t,n);break;case"binary":s=p(this,e,t,n);break;case"base64":s=y(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":s=m(this,e,t,n);break;default:throw new Error("Unknown encoding")}return s},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=E(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=w(r,t,n);break;case"base64":o=g(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=B(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){z(r>=n,"sourceEnd < sourceStart"),z(t>=0&&t<e.length,"targetStart out of bounds"),z(n>=0&&n<i.length,"sourceStart out of bounds"),z(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var s=r-n;if(s<100||!o._useTypedArrays)for(var a=0;a<s;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+s),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=M(e,n,0),t=M(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,void 0,!0),s=0;s<r;s++)i[s]=this[s+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||(z(void 0!==e&&null!==e,"missing offset"),z(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return _(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return _(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||(z(void 0!==e&&null!==e,"missing offset"),z(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return A(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return x(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return x(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return T(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return T(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||(z(void 0!==e&&null!==e,"missing value"),z(void 0!==t&&null!==t,"missing offset"),z(t<this.length,"trying to write beyond buffer length"),G(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){U(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){U(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||(z(void 0!==e&&null!==e,"missing value"),z(void 0!==t&&null!==t,"missing offset"),z(t<this.length,"Trying to write beyond buffer length"),V(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){D(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){D(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),z("number"==typeof e&&!isNaN(e),"value is not a number"),z(n>=t,"end < start"),n!==t&&0!==this.length){z(t>=0&&t<this.length,"start out of bounds"),z(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=R(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("e/U+97"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\buffer\\index.js","/..\\..\\node_modules\\buffer")},{"base64-js":2,buffer:3,"e/U+97":6,ieee754:5}],4:[function(e,t,n){(function(e,n,r,o,i,s,a,u,c){"use strict";!function(){function e(e){return Array.prototype.slice.call(e)}function n(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function r(e,t,r){var o,i=new Promise(function(i,s){o=e[t].apply(e,r),n(o).then(i,s)});return i.request=o,i}function o(e,t,n){var o=r(e,t,n);return o.then(function(e){if(e)return new f(e,o.request)})}function i(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function s(e,t,n,o){o.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return r(this[t],o,arguments)})})}function a(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function u(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return o(this[t],r,arguments)})})}function c(e){this._index=e}function f(e,t){this._cursor=e,this._request=t}function l(e){this._store=e}function d(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function h(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new d(n)}function p(e){this._db=e}i(c,"_index",["name","keyPath","multiEntry","unique"]),s(c,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),u(c,"_index",IDBIndex,["openCursor","openKeyCursor"]),i(f,"_cursor",["direction","key","primaryKey","value"]),s(f,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(f.prototype[e]=function(){var t=this,r=arguments;return Promise.resolve().then(function(){return t._cursor[e].apply(t._cursor,r),n(t._request).then(function(e){if(e)return new f(e,t._request)})})})}),l.prototype.createIndex=function(){return new c(this._store.createIndex.apply(this._store,arguments))},l.prototype.index=function(){return new c(this._store.index.apply(this._store,arguments))},i(l,"_store",["name","keyPath","indexNames","autoIncrement"]),s(l,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),u(l,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),a(l,"_store",IDBObjectStore,["deleteIndex"]),d.prototype.objectStore=function(){return new l(this._tx.objectStore.apply(this._tx,arguments))},i(d,"_tx",["objectStoreNames","mode"]),a(d,"_tx",IDBTransaction,["abort"]),h.prototype.createObjectStore=function(){return new l(this._db.createObjectStore.apply(this._db,arguments))},i(h,"_db",["name","version","objectStoreNames"]),a(h,"_db",IDBDatabase,["deleteObjectStore","close"]),p.prototype.transaction=function(){return new d(this._db.transaction.apply(this._db,arguments))},i(p,"_db",["name","version","objectStoreNames"]),a(p,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(t){[l,c].forEach(function(n){n.prototype[t.replace("open","iterate")]=function(){var n=e(arguments),r=n[n.length-1],o=this._store||this._index,i=o[t].apply(o,n.slice(0,-1));i.onsuccess=function(){r(i.result)}}})}),[c,l].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(o){n.iterateCursor(e,function(e){return e?(r.push(e.value),void 0!==t&&r.length==t?void o(r):void e.continue()):void o(r)})})})});var y={open:function(e,t,n){var o=r(indexedDB,"open",[e,t]),i=o.request;return i.onupgradeneeded=function(e){n&&n(new h(i.result,e.oldVersion,i.transaction))},o.then(function(e){return new p(e)})},delete:function(e){return r(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof t?t.exports=y:self.idb=y}()}).call(this,e("e/U+97"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\idb\\lib\\idb.js","/..\\..\\node_modules\\idb\\lib")},{buffer:3,"e/U+97":6}],5:[function(e,t,n){(function(e,t,r,o,i,s,a,u,c){n.read=function(e,t,n,r,o){var i,s,a=8*o-r-1,u=(1<<a)-1,c=u>>1,f=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-f)-1,h>>=-f,f+=a;f>0;i=256*i+e[t+l],l+=d,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=r;f>0;s=256*s+e[t+l],l+=d,f-=8);if(0===i)i=1-c;else{if(i===u)return s?NaN:(h?-1:1)*(1/0);s+=Math.pow(2,r),i-=c}return(h?-1:1)*s*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var s,a,u,c=8*i-o-1,f=(1<<c)-1,l=f>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,y=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=f):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),t+=s+l>=1?d/u:d*Math.pow(2,1-l),t*u>=2&&(s++,u/=2),s+l>=f?(a=0,s=f):s+l>=1?(a=(t*u-1)*Math.pow(2,o),s+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),s=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(s=s<<o|a,c+=o;c>0;e[n+h]=255&s,h+=p,s/=256,c-=8);e[n+h-p]|=128*y}}).call(this,e("e/U+97"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\ieee754\\index.js","/..\\..\\node_modules\\ieee754")},{buffer:3,"e/U+97":6}],6:[function(e,t,n){(function(e,n,r,o,i,s,a,u,c){function f(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=f,e.addListener=f,e.once=f,e.off=f,e.removeListener=f,e.removeAllListeners=f,e.emit=f,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("e/U+97"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\process\\browser.js","/..\\..\\node_modules\\process");
},{buffer:3,"e/U+97":6}],7:[function(e,t,n){(function(e,t,n,r,o,i,s,a,u){!function(e){"use strict";function t(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function n(e){return"string"!=typeof e&&(e=String(e)),e}function r(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return g.iterable&&(t[Symbol.iterator]=function(){return t}),t}function o(e){this.map={},e instanceof o?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function i(e){return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function s(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function a(e){var t=new FileReader,n=s(t);return t.readAsArrayBuffer(e),n}function u(e){var t=new FileReader,n=s(t);return t.readAsText(e),n}function c(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}function f(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(g.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(g.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(g.arrayBuffer&&g.blob&&v(e))this._bodyArrayBuffer=f(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!g.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e)&&!w(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=f(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},g.blob&&(this.blob=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(c(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},g.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function d(e){var t=e.toUpperCase();return E.indexOf(t)>-1?t:e}function h(e,t){t=t||{};var n=t.body;if(e instanceof h){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new o(e.headers)),this.method=e.method,this.mode=e.mode,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new o(t.headers)),this.method=d(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function p(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(o))}}),t}function y(e){var t=new o;return e.split(/\r?\n/).forEach(function(e){var n=e.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();t.append(r,o)}}),t}function m(e,t){t||(t={}),this.type="default",this.status="status"in t?t.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new o(t.headers),this.url=t.url||"",this._initBody(e)}if(!e.fetch){var g={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(g.arrayBuffer)var b=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],v=function(e){return e&&DataView.prototype.isPrototypeOf(e)},w=ArrayBuffer.isView||function(e){return e&&b.indexOf(Object.prototype.toString.call(e))>-1};o.prototype.append=function(e,r){e=t(e),r=n(r);var o=this.map[e];this.map[e]=o?o+","+r:r},o.prototype.delete=function(e){delete this.map[t(e)]},o.prototype.get=function(e){return e=t(e),this.has(e)?this.map[e]:null},o.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},o.prototype.set=function(e,r){this.map[t(e)]=n(r)},o.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},o.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),r(e)},o.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),r(e)},o.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),r(e)},g.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var E=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this,{body:this._bodyInit})},l.call(h.prototype),l.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},m.error=function(){var e=new m(null,{status:0,statusText:""});return e.type="error",e};var B=[301,302,303,307,308];m.redirect=function(e,t){if(B.indexOf(t)===-1)throw new RangeError("Invalid status code");return new m(null,{status:t,headers:{location:e}})},e.Headers=o,e.Request=h,e.Response=m,e.fetch=function(e,t){return new Promise(function(n,r){var o=new h(e,t),i=new XMLHttpRequest;i.onload=function(){var e={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var t="response"in i?i.response:i.responseText;n(new m(t,e))},i.onerror=function(){r(new TypeError("Network request failed"))},i.ontimeout=function(){r(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&g.blob&&(i.responseType="blob"),o.headers.forEach(function(e,t){i.setRequestHeader(t,e)}),i.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},e.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}).call(this,e("e/U+97"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\whatwg-fetch\\fetch.js","/..\\..\\node_modules\\whatwg-fetch")},{buffer:3,"e/U+97":6}]},{},[1]);