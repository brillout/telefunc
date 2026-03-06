import{u as l,o as s,a}from"../chunks/chunk-6p_N6XgV.js";import{j as e}from"../chunks/chunk-Cslf-x1t.js";import{L as t}from"../chunks/chunk-C2VlO_yI.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */const i=[{pageSectionId:"see-also",pageSectionLevel:2,pageSectionTitle:"See also"}];function o(n){const r={a:"a",blockquote:"blockquote",code:"code",em:"em",figure:"figure",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Environment"}),": server."]}),`
`,e.jsxs(r.p,{children:["To track bugs, use ",e.jsx(r.code,{children:"onBug()"}),":"]}),`
`,e.jsx(r.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(r.pre,{tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(r.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(r.span,{"data-line":"",children:[e.jsx(r.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(r.span,{style:{color:"#24292E"},children:" { onBug } "}),e.jsx(r.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(r.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(r.span,{"data-line":"",children:" "}),`
`,e.jsxs(r.span,{"data-line":"",children:[e.jsx(r.span,{style:{color:"#6F42C1"},children:"onBug"}),e.jsx(r.span,{style:{color:"#24292E"},children:"(("}),e.jsx(r.span,{style:{color:"#E36209"},children:"err"}),e.jsx(r.span,{style:{color:"#24292E"},children:") "}),e.jsx(r.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(r.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsx(r.span,{"data-line":"",children:e.jsx(r.span,{style:{color:"#6A737D"},children:"  // ..."})}),`
`,e.jsx(r.span,{"data-line":"",children:e.jsx(r.span,{style:{color:"#24292E"},children:"})"})})]})})}),`
`,e.jsxs(r.p,{children:["This allows you, for example, to install the tracker code of some tracking service (",e.jsx(r.a,{href:"https://sentry.io/",children:"Sentry"}),", ",e.jsx(r.a,{href:"https://www.bugsnag.com/",children:"Bugsnag"}),", ",e.jsx(r.a,{href:"https://rollbar.com/",children:"Rollbar"}),", ...)."]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"onBug()"})," is called:"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["When a telefunction throws an error ",e.jsxs(r.strong,{children:["that is not ",e.jsx(r.code,{children:"Abort()"})]}),". (The telefunction has a bug.)"]}),`
`,e.jsx(r.li,{children:"When Telefunc throws an error. (Telefunc has a bug.)"}),`
`]}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"throw Abort()"})," does ",e.jsx(r.em,{children:"not"})," trigger ",e.jsx(r.code,{children:"onBug()"}),". Telefunc handles ",e.jsx(r.code,{children:"Abort"})," as an expected error, and returns the error data (if any) as part of a >= ",e.jsx(r.code,{children:"4xx"})," response, see ",e.jsx(t,{href:"/abort-vs-error"}),"."]}),`
`]}),`
`,e.jsx("h2",{id:"see-also",children:"See also"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsx(t,{href:"/error-handling"}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsx(t,{href:"/error-handling#error-tracking"}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsx(t,{href:"/abort-vs-error"}),`
`]}),`
`]})]})}function d(n={}){const{wrapper:r}={...l(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(o,{...n})}):o(n)}const c=Object.freeze(Object.defineProperty({__proto__:null,default:d,pageSectionsExport:i},Symbol.toStringTag,{value:"Module"})),z={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},guardEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/renderer/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:a}},onCreatePageContext:{type:"cumulative",definedAtData:[{filePathToShowToUser:"@brillout/docpress/renderer/onCreatePageContext",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:s}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/onBug/+Page.mdx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:c}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}}};export{z as configValuesSerialized};
