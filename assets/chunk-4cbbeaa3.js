function F(e,t){let r;{var s=Error.stackTraceLimit;Error.stackTraceLimit=1/0,r=new Error(e),Error.stackTraceLimit=s}return r.stack=Q(r.stack,t),r}function Q(e,t){if(!e)return e;const r=Z(e);let s=0;return r.filter(o=>o.includes(" (internal/")||o.includes(" (node:internal")?!1:s<t&&X(o)?(s++,!1):!0).join(`
`)}function X(e){return e.startsWith("    at ")}function Z(e){return e.split(/\r?\n/)}function W(e,t){const r=globalThis.__vite_plugin_ssr=globalThis.__vite_plugin_ssr||{};return r[e]=r[e]||t}function D(e){return Array.from(new Set(e))}const x=W("assertPackageInstances.ts",{instances:[]});function ee(){const e=D(x.instances);if(e.length>1)throw new Error(`Multiple versions \`vite-plugin-ssr@${e[0]}\` and \`vite-plugin-ssr@${e[1]}\` loaded. Make sure only one version is loaded.`)}function B(){if(!!x.checkBundle&&!(x.instances.length<=1))throw new Error("vite-plugin-ssr is included twice in your bundle. Make sure it's inlcuded only once. (To reduce bundle size.)")}function Tt(){x.checkBundle=!0,B()}function te(e){x.instances.push(e),ee(),B()}const re="0.4.38",m={projectName:"vite-plugin-ssr",projectVersion:re,npmPackageName:"vite-plugin-ssr",githubRepository:"https://github.com/brillout/vite-plugin-ssr",discordInviteToolChannel:"https://discord.com/invite/qTq92FQzKb"};te(m.projectVersion);const $=`[${m.npmPackageName}@${m.projectVersion}]`,ne=`${$}[Bug]`,se=`${$}[Wrong Usage]`,ie=`${$}[Warning]`,oe=`${$}[Info]`,R=2;function i(e,t){if(e)return;const r=(()=>{if(!t)return"";const n=typeof t=="string"?t:"`"+JSON.stringify(t)+"`";return`Debug info (this is for the ${m.projectName} maintainers; you can ignore this): ${n}.`})();throw F([`${ne} You stumbled upon a bug in ${m.projectName}'s source code.`,`Reach out at ${m.githubRepository}/issues/new or ${m.discordInviteToolChannel} and include this error stack (the error stack is usually enough to fix the problem).`,"A maintainer will fix the bug (usually under 24 hours).",`Do not hesitate to reach out as it makes ${m.projectName} more robust.`,r].join(" "),R)}function g(e,t){if(e)return;const r=t.startsWith("[")?"":" ";throw F(`${se}${r}${t}`,R)}function ae(e){return F(`${$} ${e}`,R)}const U=W("assert.ts",{alreadyLogged:new Set});function le(e,t,{onlyOnce:r,showStackTrace:s}){if(e)return;const n=`${ie} ${t}`;if(r){const{alreadyLogged:o}=U,a=r===!0?n:r;if(o.has(a))return;o.add(a)}console.warn(s?new Error(n):n)}function wt(e,t,{onlyOnce:r}){if(e)return;const s=`${oe} ${t}`;if(r){const{alreadyLogged:n}=U,o=s;if(n.has(o))return;n.add(o)}console.log(s)}function N(e,t,r){return typeof e=="string"?L(e.split(""),t,r).join(""):L(e,t,r)}function L(e,t,r){const s=[];let n=t>=0?t:e.length+t;i(n>=0&&n<=e.length);let o=r>=0?r:e.length+r;for(i(o>=0&&o<=e.length);!(n===o||(n===e.length&&(n=0),n===o));){const a=e[n];i(a!==void 0),s.push(a),n++}return s}function ce(e){return e.startsWith("/")||e.startsWith("http")||e.startsWith(".")||e.startsWith("?")||e.startsWith("#")||e===""}function ue(e,t){i(ce(e),{url:e}),i(t.startsWith("/"),{url:e,baseUrl:t});const[r,...s]=e.split("#");i(r!==void 0);const n=["",...s].join("#")||null;i(n===null||n.startsWith("#"));const o=n===null?"":E(n.slice(1)),[a,...l]=r.split("?");i(a!==void 0);const c=["",...l].join("?")||null;i(c===null||c.startsWith("?"),{url:e,searchOriginal:c});const f={},S={};Array.from(new URLSearchParams(c||"")).forEach(([h,b])=>{f[h]=b,S[h]=[...S[h]||[],b]});const{origin:_,pathnameResolved:j}=de(e,t);i(_===null||_===E(_),{origin:_}),i(j.startsWith("/"),{url:e,pathnameResolved:j}),i(_===null||e.startsWith(_),{url:e,origin:_});const T=a.slice((_||"").length);{const h=`${_||""}${T}${c||""}${n||""}`;i(e===h,{url:e,urlRecreated:h})}let{pathname:u,hasBaseUrl:p}=pe(j,t);return u=fe(u),i(u.startsWith("/")),{origin:_,pathname:u,pathnameOriginal:T,hasBaseUrl:p,search:f,searchAll:S,searchOriginal:c,hash:o,hashOriginal:n}}function E(e){try{return decodeURIComponent(e)}catch{}try{return decodeURI(e)}catch{}return e}function fe(e){return e.split("/").map(t=>E(t).split("/").join("%2F")).join("/")}function de(e,t){var r;if(e.startsWith("//"))return{origin:null,pathnameResolved:e};let s,n;try{const o=new URL(e);s=o.origin,n=o.pathname}catch{s=null;let a=typeof window<"u"&&((r=window==null?void 0:window.document)===null||r===void 0?void 0:r.baseURI);a=a||"http://fake.example.org"+t,n=new URL(e,a).pathname}return i(n.startsWith("/"),{url:e,pathnameResolved:n}),i(n===n.split("?")[0].split("#")[0]),{origin:s,pathnameResolved:n}}function _e(e){i(e.startsWith("/"))}function ge(e){i(e.startsWith("/")),i(!e.includes("?")),i(!e.includes("#"))}function pe(e,t){ge(e),_e(t);let r=e;if(i(r.startsWith("/")),i(t.startsWith("/")),t==="/")return{pathname:e,hasBaseUrl:!0};let s=t;return t.endsWith("/")&&r===N(t,0,-1)&&(s=N(t,0,-1),i(r===s)),r.startsWith(s)?(i(r.startsWith("/")||r.startsWith("http")),i(r.startsWith(s)),r=r.slice(s.length),r.startsWith("/")||(r="/"+r),i(r.startsWith("/")),{pathname:r,hasBaseUrl:!0}):{pathname:e,hasBaseUrl:!1}}function G(e,t){Object.assign(e,t)}function I(e){return e instanceof Function||typeof e=="function"}function O(e){return typeof e=="object"&&e!==null}function Et(e){return(t,r)=>{const s=e(t),n=e(r);return s===n?0:s>n?-1:1}}function he(e){return(t,r)=>{const s=e(t),n=e(r);if(i([!0,!1,null].includes(s)),i([!0,!1,null].includes(n)),s===n)return 0;if(s===!0||n===!1)return-1;if(n===!0||s===!1)return 1;i(!1)}}function me(e){return he(t=>{const r=e(t);return r===null?null:!r})}function be(){return typeof window<"u"&&typeof window.scrollY=="number"}function d(e,t,r="unknown"){if(!(typeof e=="object"&&e!==null&&t in e))return r==="undefined";if(r==="unknown")return!0;const n=e[t];return r==="array"?Array.isArray(n):r==="string[]"?Array.isArray(n)&&n.every(o=>typeof o=="string"):r==="function"?I(n):Array.isArray(r)?typeof n=="string"&&r.includes(n):r==="null"?n===null:r==="undefined"?n===void 0:r==="true"?n===!0:r==="false"?n===!1:typeof n===r}function ye(e,t){return e.toLowerCase()<t.toLowerCase()?-1:e.toLowerCase()>t.toLowerCase()?1:0}const ve=e=>e!=null,Se="\\";function v(e){i(e&&!e.includes(Se),`Wrongly formatted path: ${e}`)}function je(e){return/\.(c|m)?(j|t)sx?$/.test(e)}const xe=["clientRouting"];function Oe(e){xe.forEach(t=>{if(i(e.fileExports),!(t in e.fileExports))return;const r=`The value of \`${t}\` is only allowed to be \`true\`.`;g(e.fileExports[t]!==!1,`${e.filePath} has \`export { ${t} }\` with the value \`false\` which is forbidden: remove \`export { ${t} }\` instead. (${r})`),g(e.fileExports[t]===!0,`${e.filePath} has \`export { ${t} }\` with a forbidden value. ${r}`)})}const V=["render","clientRouting","prerender","doNotPrerender"];function $e(e,t){g(!V.includes(e),`${t} has \`export default { ${e} }\` which is forbidden, use \`export { ${e} }\` instead.`)}function Pe(e){const t={};e.forEach(n=>{Ne(n).forEach(({exportName:a,exportValue:l,isFromDefaultExport:c})=>{var f;i(a!=="default"),t[a]=(f=t[a])!==null&&f!==void 0?f:[],t[a].push({exportValue:l,_filePath:n.filePath,_fileType:n.fileType,_isFromDefaultExport:c})})});const r=Te(),s={};return Object.entries(t).forEach(([n,o])=>{o.forEach(({exportValue:a,_fileType:l,_isFromDefaultExport:c})=>{var f;s[n]=(f=s[n])!==null&&f!==void 0?f:a,l===".page"&&!c&&(n in r||(r[n]=a))})}),i(!("default"in s)),i(!("default"in t)),{exports:s,exportsAll:t,pageExports:r}}function Ne(e){const{filePath:t,fileExports:r}=e;i(r);const s=[];return Object.entries(r).sort(me(([n])=>n==="default")).forEach(([n,o])=>{let a=n==="default";if(a)if(!je(t))n="Page";else{g(O(o),`The \`export default\` of ${t} should be an object.`),Object.entries(o).forEach(([l,c])=>{$e(l,t),s.push({exportName:l,exportValue:c,isFromDefaultExport:a})});return}s.push({exportName:n,exportValue:o,isFromDefaultExport:a})}),s.forEach(({exportName:n,isFromDefaultExport:o})=>{i(!(o&&V.includes(n)))}),s}function Te(){return new Proxy({},{get(...e){return be()||le(!1,"`pageContext.pageExports` is outdated. Use `pageContext.exports` instead, see https://vite-plugin-ssr.com/exports",{onlyOnce:!0,showStackTrace:!0}),Reflect.get(...e)}})}function J(e){const t=".page.",r=N(e.split(t),0,-1).join(t);return i(!r.includes("\\")),r}function zt(e){const t=e.filter(r=>M(r));if(g(t.length<=1,`Only one \`_error.page.js\` is allowed. Found several: ${t.join(" ")}`),t.length>0){const r=t[0];return i(r),r}return null}function M(e){return i(!e.includes("\\")),e.includes("/_error")}function we(e){const t=n=>s.pageId===n||s.isDefaultPageFile&&(s.isRendererPageFile||Fe(n,s.filePath)),r=Ee(e),s={filePath:e,fileType:r,isRelevant:t,isDefaultPageFile:z(e),isRendererPageFile:z(e)&&ze(e),isErrorPageFile:M(e),pageId:J(e)};return s}function Ee(e){v(e);const r=e.split("/").slice(-1)[0].split("."),s=r.slice(-3)[0],n=r.slice(-2)[0];if(n==="page")return".page";if(i(s==="page",{filePath:e}),n==="server")return".page.server";if(n==="client")return".page.client";if(n==="route")return".page.route";i(!1,{filePath:e})}function z(e){return v(e),i(e.startsWith("/")),M(e)?!1:e.includes("/_default")}function ze(e){return v(e),i(e.startsWith("/")),e.includes("/renderer/")}function Fe(e,t){v(e),v(t),i(e.startsWith("/")),i(t.startsWith("/")),i(!e.endsWith("/")),i(!t.endsWith("/")),i(z(t));const r=N(t.split("/"),0,-1).filter(s=>s!=="_default").join("/");return e.startsWith(r)}const We=[".page",".page.server",".page.route",".page.client"];function Re(e){i(d(e,"isGeneratedFile"),"Missing `isGeneratedFile`."),i(e.isGeneratedFile!==!1,"vite-plugin-ssr was re-installed(/re-built). Restart your app."),i(e.isGeneratedFile===!0,`\`isGeneratedFile === ${e.isGeneratedFile}\``),i(d(e,"pageFilesLazy","object")),i(d(e,"pageFilesEager","object")),i(d(e,"pageFilesExportNamesLazy","object")),i(d(e,"pageFilesExportNamesEager","object")),i(d(e.pageFilesLazy,".page")),i(d(e.pageFilesLazy,".page.client")||d(e.pageFilesLazy,".page.server"));const t={};P(e.pageFilesLazy).forEach(({filePath:s,pageFile:n,globValue:o})=>{var a;n=t[s]=(a=t[s])!==null&&a!==void 0?a:n;const l=o;A(l),n.loadFile=async()=>{"fileExports"in n||(n.fileExports=await l(),Oe(n))}}),P(e.pageFilesExportNamesLazy).forEach(({filePath:s,pageFile:n,globValue:o})=>{var a;n=t[s]=(a=t[s])!==null&&a!==void 0?a:n;const l=o;A(l),n.loadExportNames=async()=>{if(!("exportNames"in n)){const c=await l();g("exportNames"in c,"You seem to be using Vite 2 but the latest vite-plugin-ssr versions only work with Vite 3"),i(d(c,"exportNames","string[]"),n.filePath),n.exportNames=c.exportNames}}}),P(e.pageFilesEager).forEach(({filePath:s,pageFile:n,globValue:o})=>{var a;n=t[s]=(a=t[s])!==null&&a!==void 0?a:n;const l=o;i(O(l)),n.fileExports=l}),P(e.pageFilesExportNamesEager).forEach(({filePath:s,pageFile:n,globValue:o})=>{var a;n=t[s]=(a=t[s])!==null&&a!==void 0?a:n;const l=o;i(O(l)),i(d(l,"exportNames","string[]"),n.filePath),n.exportNames=l.exportNames});const r=Object.values(t);return r.forEach(({filePath:s})=>{i(!s.includes("\\"))}),r}function P(e){const t=[];return Object.entries(e).forEach(([r,s])=>{i(We.includes(r)),i(O(s)),Object.entries(s).forEach(([n,o])=>{const a=we(n);i(a.fileType===r),t.push({filePath:n,pageFile:a,globValue:o})})}),t}function A(e){i(I(e))}const y=globalThis.__vite_plugin_ssr__pageFiles=globalThis.__vite_plugin_ssr__pageFiles||{pageFilesAll:void 0,pageFilesGetter:void 0};function Ft(e){y.pageFilesAll=Re(e)}async function Wt(e,t){e?(i(!y.pageFilesGetter),i(t===void 0)):(i(y.pageFilesGetter),i(typeof t=="boolean"),(!y.pageFilesAll||!t)&&await y.pageFilesGetter()),i(y.pageFilesAll);const r=y.pageFilesAll,s=Ie(r);return{pageFilesAll:r,allPageIds:s}}function Ie(e){const t=e.filter(({isDefaultPageFile:s})=>!s).map(({filePath:s})=>s).map(J);return D(t)}function Me(e,t){return H(e,t,!0)}function Rt(e,t){return H(e,t,!1)}function H(e,t,r){const s=r?".page.client":".page.server",n=Le(s,t),o=e.filter(u=>u.isRelevant(t)),a=u=>o.filter(p=>p.isRendererPageFile&&p.fileType===u).sort(n)[0],l=u=>{const p=o.filter(b=>b.pageId===t&&b.fileType===u);g(p.length<=1,`Merge the following files into a single file: ${p.map(b=>b.filePath).join(" ")}`);const h=p[0];return i(h===void 0||!h.isDefaultPageFile),p[0]},c=o.filter(u=>u.isDefaultPageFile&&!u.isRendererPageFile&&(u.fileType===s||u.fileType===".page"));c.sort(n);const f=a(s),S=a(".page"),_=l(s),j=l(".page");return[_,j,...c,f,S].filter(ve)}function Le(e,t){return(o,a)=>{i(o.isDefaultPageFile&&a.isDefaultPageFile);{const l=o.isRendererPageFile,c=a.isRendererPageFile;if(!l&&c)return-1;if(!c&&l)return 1;i(l===c)}{const l=k(t,o.filePath),c=k(t,a.filePath);if(l<c)return-1;if(c<l)return 1;i(l===c)}{if(o.fileType===e&&a.fileType!==e)return-1;if(a.fileType===e&&o.fileType!==e)return 1}{if(o.fileType===".page"&&a.fileType!==".page")return 1;if(a.fileType===".page"&&o.fileType!==".page")return-1}return 0}}function k(e,t){v(e),v(t),i(e.startsWith("/")),i(t.startsWith("/"));let r=0;for(;r<e.length&&r<t.length&&e[r]===t[r];r++);const s=e.slice(r),n=t.slice(r),o=s.split("/").length,a=n.split("/").length;return o+a}function Ae(e,t){return Me(e,t)}const ke="modulepreload",Ce=function(e){return"/"+e},C={},It=function(t,r,s){return!r||r.length===0?t():Promise.all(r.map(n=>{if(n=Ce(n),n in C)return;C[n]=!0;const o=n.endsWith(".css"),a=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${a}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":ke,o||(l.as="script",l.crossOrigin=""),l.href=n,document.head.appendChild(l),o)return new Promise((c,f)=>{l.addEventListener("load",c),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t())},De=[],Mt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:De},Symbol.toStringTag,{value:"Module"})),Be=[],Lt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Be},Symbol.toStringTag,{value:"Module"})),Ue=["headings","default"],At=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ue},Symbol.toStringTag,{value:"Module"})),Ge=["headings","default"],kt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ge},Symbol.toStringTag,{value:"Module"})),Ve=["headings","default"],Ct=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ve},Symbol.toStringTag,{value:"Module"})),Je=["headings","default"],Dt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Je},Symbol.toStringTag,{value:"Module"})),He=["headings","default"],Bt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:He},Symbol.toStringTag,{value:"Module"})),qe=["headings","default"],Ut=Object.freeze(Object.defineProperty({__proto__:null,exportNames:qe},Symbol.toStringTag,{value:"Module"})),Ye=["headings","default"],Gt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ye},Symbol.toStringTag,{value:"Module"})),Ke=["headings","default"],Vt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ke},Symbol.toStringTag,{value:"Module"})),Qe=["headings","default"],Jt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Qe},Symbol.toStringTag,{value:"Module"})),Xe=["headings","default"],Ht=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Xe},Symbol.toStringTag,{value:"Module"})),Ze=["headings","default"],qt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:Ze},Symbol.toStringTag,{value:"Module"})),et=["headings","default"],Yt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:et},Symbol.toStringTag,{value:"Module"})),tt=["headings","default"],Kt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:tt},Symbol.toStringTag,{value:"Module"})),rt=["Page"],Qt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:rt},Symbol.toStringTag,{value:"Module"})),nt=["headings","default"],Xt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:nt},Symbol.toStringTag,{value:"Module"})),st=["headings","default"],Zt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:st},Symbol.toStringTag,{value:"Module"})),it=["headings","default"],er=Object.freeze(Object.defineProperty({__proto__:null,exportNames:it},Symbol.toStringTag,{value:"Module"})),ot=["headings","default"],tr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:ot},Symbol.toStringTag,{value:"Module"})),at=["headings","default"],rr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:at},Symbol.toStringTag,{value:"Module"})),lt=["headings","default"],nr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:lt},Symbol.toStringTag,{value:"Module"})),ct=["headings","default"],sr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:ct},Symbol.toStringTag,{value:"Module"})),ut=["headings","default"],ir=Object.freeze(Object.defineProperty({__proto__:null,exportNames:ut},Symbol.toStringTag,{value:"Module"})),ft=["headings","default"],or=Object.freeze(Object.defineProperty({__proto__:null,exportNames:ft},Symbol.toStringTag,{value:"Module"})),dt=["headings","default"],ar=Object.freeze(Object.defineProperty({__proto__:null,exportNames:dt},Symbol.toStringTag,{value:"Module"})),_t=["headings","default"],lr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:_t},Symbol.toStringTag,{value:"Module"})),gt=["headings","default"],cr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:gt},Symbol.toStringTag,{value:"Module"})),pt=["headings","default"],ur=Object.freeze(Object.defineProperty({__proto__:null,exportNames:pt},Symbol.toStringTag,{value:"Module"})),ht=["headings","default"],fr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:ht},Symbol.toStringTag,{value:"Module"})),mt=["render"],dr=Object.freeze(Object.defineProperty({__proto__:null,exportNames:mt},Symbol.toStringTag,{value:"Module"}));function _r(e){const t=window.location.href,{origin:r,searchOriginal:s,hashOriginal:n,pathnameOriginal:o}=ue(t,"/");let a;if(e!=null&&e.withoutHash){a=`${o}${s||""}`;const l=`${r||""}${a}${n||""}`;i(t===l,{url:t,urlRecreated:l})}else{a=`${o}${s||""}${n||""}`;const l=`${r||""}${a}`;i(t===l,{url:t,urlRecreated:l})}return a}const bt=[{is:e=>e===void 0,match:e=>e==="!undefined",serialize:()=>"!undefined",deserialize:()=>{}},{is:e=>e===1/0,match:e=>e==="!Infinity",serialize:()=>"!Infinity",deserialize:()=>1/0},{is:e=>e===-1/0,match:e=>e==="!-Infinity",serialize:()=>"!-Infinity",deserialize:()=>-1/0},{is:e=>typeof e=="number"&&isNaN(e),match:e=>e==="!NaN",serialize:()=>"!NaN",deserialize:()=>NaN},{is:e=>e instanceof Date,match:e=>e.startsWith("!Date:"),serialize:e=>"!Date:"+e.toISOString(),deserialize:e=>new Date(e.slice(6))},{is:e=>typeof e=="bigint",match:e=>e.startsWith("!BigInt:"),serialize:e=>"!BigInt:"+e.toString(),deserialize:e=>{if(typeof BigInt>"u")throw new Error("Your JavaScript environement does not support BigInt. Consider adding a polyfill.");return BigInt(e.slice(8))}},{is:e=>e instanceof RegExp,match:e=>e.startsWith("!RegExp:"),serialize:e=>"!RegExp:"+e.toString(),deserialize:e=>{e=e.slice(8);const t=e.match(/\/(.*)\/(.*)?/),r=t[1],s=t[2];return new RegExp(r,s)}},{is:e=>e instanceof Map,match:e=>e.startsWith("!Map:"),serialize:(e,t)=>"!Map:"+t(Array.from(e.entries())),deserialize:(e,t)=>new Map(t(e.slice(5)))},{is:e=>e instanceof Set,match:e=>e.startsWith("!Set:"),serialize:(e,t)=>"!Set:"+t(Array.from(e.values())),deserialize:(e,t)=>new Set(t(e.slice(5)))},{is:e=>typeof e=="string"&&e.startsWith("!"),match:e=>e.startsWith("!"),serialize:e=>"!"+e,deserialize:e=>e.slice(1)}];function q(e){const t=JSON.parse(e);return Y(t)}function Y(e){return typeof e=="string"?yt(e):(typeof e=="object"&&e!==null&&Object.entries(e).forEach(([t,r])=>{e[t]=Y(r)}),e)}function yt(e){for(const{match:t,deserialize:r}of bt)if(t(e))return r(e,q);return e}function gr(){var e;const t=(e=document.getElementById("vite-plugin-ssr_pageContext"))===null||e===void 0?void 0:e.textContent;i(t);const r=q(t);i(d(r,"pageContext","object"));const{pageContext:s}=r;if(i(d(s,"_pageId","string")),"_serverSideErrorWhileStreaming"in s)throw ae("An error occurred on the server while rendering/streaming to HTML. Check your server logs.");return G(s,{_pageContextRetrievedFromServer:{...s},_comesDirectlyFromServer:!0}),s}function vt(e,t){if(!(t in e.exports))return null;const r=e.exports[t],s=e.exportsAll[t][0];i(s.exportValue===r);const n=s._filePath;return i(n),i(!t.endsWith(")")),g(I(r),`\`export { ${t} }\` of ${n} should be a function`),{hook:r,filePath:n}}function St(e,t){vt(e,t)}function jt(e){const t=Object.entries(e);for(const r in e)delete e[r];t.sort(([r],[s])=>ye(r,s)).forEach(([r,s])=>{e[r]=s})}const w=W("releasePageContextCommon.ts",{});function pr(e){i("exports"in e),i("exportsAll"in e),i("pageExports"in e),i(O(e.pageExports));const t=e.exports.Page;return G(e,{Page:t}),Nt(e),jt(e),i([!0,!1].includes(e._comesDirectlyFromServer)),e._comesDirectlyFromServer?$t(e):e}const xt=["then","toJSON"],Ot=["_pageId","_serverSideErrorWhileStreaming"];function $t(e){return new Proxy(e,{get:r});function t(s){return!(s in e||xt.includes(s)||typeof s=="symbol"||typeof s!="string"||s.startsWith("__v_"))}function r(s,n){return w.disableAssertPassToClient!==n&&Pt(e._pageContextRetrievedFromServer,n,t(n)),w.disableAssertPassToClient=n,window.setTimeout(()=>{w.disableAssertPassToClient=void 0},0),e[n]}}function Pt(e,t,r){if(!r||e===null)return;const s=Object.keys(e).filter(n=>!Ot.includes(n));g(!1,[`\`pageContext.${t}\` is not available in the browser.`,`Make sure that \`passToClient.includes('${t}')\`.`,`(Currently \`passToClient\` is \`[${s.map(n=>`'${n}'`).join(", ")}]\`.)`,"See https://vite-plugin-ssr.com/passToClient"].join(" "))}function Nt(e){Object.entries(e).forEach(([t,r])=>{delete e[t],e[t]=r})}const K="__whileFetchingAssets";async function hr(e,t){const r=Ae(e,t);try{await Promise.all(r.map(l=>{var c;return(c=l.loadFile)===null||c===void 0?void 0:c.call(l)}))}catch(l){throw l&&Object.assign(l,{[K]:!0}),l}const{exports:s,exportsAll:n,pageExports:o}=Pe(r);return{exports:s,exportsAll:n,pageExports:o,_pageFilesLoaded:r}}function mr(e){return e?e[K]===!0:!1}function br(e){var t;if(d(e.exports,"render"))St(e,"render");else{const r=e._pageFilesLoaded.filter(n=>n.fileType===".page.client");let s;if(r.length===0){const n=(t=e.urlOriginal)!==null&&t!==void 0?t:window.location.href;s="No file `*.page.client.*` found for URL "+n}else s="One of the following files should export a `render()` hook: "+r.map(n=>n.filePath).join(" ");g(!1,s)}}export{q as $,Kt as A,Qt as B,Xt as C,Zt as D,er as E,tr as F,rr as G,nr as H,sr as I,ir as J,or as K,ar as L,lr as M,cr as N,ur as O,fr as P,dr as Q,Ft as R,W as S,_r as T,Rt as U,pr as V,gr as W,hr as X,zt as Y,vt as Z,It as _,i as a,ae as a0,_e as a1,Wt as a2,Ae as a3,ce as a4,wt as a5,mr as a6,St as a7,br as a8,Tt as a9,M as b,g as c,d,le as e,O as f,Mt as g,Et as h,I as i,Lt as j,At as k,kt as l,he as m,Ct as n,G as o,ue as p,Dt as q,Bt as r,N as s,Ut as t,Gt as u,Vt as v,Jt as w,Ht as x,qt as y,Yt as z};
