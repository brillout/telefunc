import{j as t,a as e}from"./chunk-D7z9hZio.js";function f(o){return t.jsx(i,{type:"warning",...o})}function d(o){return t.jsx(i,{icon:null,...o})}function m(o){const{icon:n}=o;if(!n)throw new Error(`<NoteWithCustomIcon icon={/*...*/}> property 'icon' is \`${n}\` which is forbidden`);return t.jsx(i,{...o})}function i({type:o,icon:n,iconMargin:l,children:a,style:c}){e(n===null||n||o,{icon:n,type:o}),l??(l=2);let r="custom-icon";if(o&&(r=`${r} type-${o}`),!n&&o){let s="";o==="danger"&&(n="⛔",s="note-color-red"),o==="warning"&&(n="⚠️",s="note-color-yellow"),o==="construction"&&(n="🚧",s="note-color-yellow"),o==="contribution"&&(n="💚",s="note-color-green"),o==="advanced"&&(n="🧠",s="note-color-pink"),e(n),e(s),r=`${r} ${s}`}return t.jsxs("blockquote",{className:r,style:c,children:[t.jsx("div",{style:{marginBottom:20}}),t.jsx("span",{style:{fontFamily:"emoji"},children:n}),t.jsx("span",{style:{width:l??void 0,display:"inline-block"}})," ",t.jsx("div",{className:"blockquote-content",children:a}),t.jsx("div",{style:{marginTop:20}})]})}export{d as N,f as W,m as a};