import{a as n}from"../../chunks/3cff9a67.js";l();i();window.__docpress_hydrationFinished=!0;function l(){m("https://platform.twitter.com/widgets.js")}function i(){Array.from(document.getElementById("features").querySelectorAll(".feature.has-learn-more")).forEach(e=>{e.onclick=()=>{u(e)}})}function u(t){const e=t.id;n(e.startsWith("feature-"),{featureId:e});const c=e.slice(8),s="selected",a="learn-more-"+c,o=document.getElementById(a);if(n(o,{learnId:a}),!t.classList.contains(s)){const r=t.parentNode;f(r,"display")==="grid"&&[...r.querySelectorAll(".learn-more"),...r.querySelectorAll(".feature")].forEach(d=>{d.classList.remove(s)})}[t,o].forEach(r=>{r.classList.toggle(s)})}function m(t){n(t.startsWith("https://"));const e=document.createElement("script");e.src=t,e.async=!0,e.setAttribute("charset","utf-8"),document.getElementsByTagName("head")[0].appendChild(e)}function f(t,e){return window.document.defaultView.getComputedStyle(t).getPropertyValue(e)}
