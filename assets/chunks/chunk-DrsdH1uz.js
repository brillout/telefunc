import{j as t,a as i}from"./chunk-CBG2Izen.js";/* empty css              */function d(o){return t.jsx(e,{type:"warning",...o})}function m(o){return t.jsx(e,{icon:null,...o})}function j(o){const{icon:n}=o;if(!n)throw new Error(`<NoteWithCustomIcon icon={/*...*/}> property 'icon' is \`${n}\` which is forbidden`);return t.jsx(e,{...o})}function e({type:o,icon:n,iconMargin:l,children:a,style:c}){i(n===null||n||o,{icon:n,type:o}),l??(l=2);let s="custom-icon";if(o&&(s=`${s} type-${o}`),!n&&o){let r="";o==="danger"&&(n="⛔",r="note-color-red"),o==="warning"&&(n="⚠️",r="note-color-yellow"),o==="construction"&&(n="🚧",r="note-color-yellow"),o==="contribution"&&(n="💚",r="note-color-green"),o==="advanced"&&(n="🧠",r="note-color-pink"),i(n),i(r),s=`${s} ${r}`}return t.jsxs("blockquote",{className:s,style:c,children:[t.jsx("div",{style:{marginBottom:20}}),t.jsx("span",{style:{fontFamily:"emoji"},children:n}),t.jsx("span",{style:{width:l??void 0,display:"inline-block"}})," ",t.jsx("div",{className:"blockquote-content",children:a}),t.jsx("div",{style:{marginTop:20}})]})}export{m as N,d as W,j as a};
