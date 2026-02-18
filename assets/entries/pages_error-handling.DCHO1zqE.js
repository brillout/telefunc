import{u as o,o as t,a as i}from"../chunks/chunk-CeChWwBg.js";import{j as e}from"../chunks/chunk-DJirElMN.js";import{L as l}from"../chunks/chunk-DNq9zuIM.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */const c=[{pageSectionId:"bugs",pageSectionLevel:2,pageSectionTitle:"Bugs"},{pageSectionId:"expected-errors",pageSectionLevel:2,pageSectionTitle:"Expected Errors"},{pageSectionId:"network-errors",pageSectionLevel:2,pageSectionTitle:"Network Errors"}];function a(n){const s={blockquote:"blockquote",code:"code",div:"div",figure:"figure",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...o(),...n.components},{ChoiceGroup:r}=s;return r||h("ChoiceGroup"),e.jsxs(e.Fragment,{children:[e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:"This page is about handling bugs, expected errors, and network errors."}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["To block unauthorized access: ",e.jsx(l,{href:"/permissions"})]}),`
`,e.jsxs(s.li,{children:["To handle invalid ",e.jsx(s.code,{children:"<form>"})," values: ",e.jsx(l,{href:"/form-validation"})]}),`
`,e.jsxs(s.li,{children:["To install error tracking: ",e.jsx(l,{href:"/onBug"})]}),`
`]}),`
`]}),`
`,e.jsx("h2",{id:"bugs",children:"Bugs"}),`
`,e.jsx(s.p,{children:"If a telefunction has a bug:"}),`
`,e.jsxs(r,{choices:["JavaScript","TypeScript"],children:[e.jsx(s.div,{"data-choice-value":"JavaScript",className:"choice",children:e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// hello.telefunc.js"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { hello }"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(s.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#E36209"},children:"name"}),e.jsx(s.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"  // This telefunction has a bug: it should be `name` instead of `namee`"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(s.span,{style:{color:"#032F62"},children:" 'Hello '"}),e.jsx(s.span,{style:{color:"#D73A49"},children:" +"}),e.jsx(s.span,{style:{color:"#24292E"},children:" namee"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"}"})})]})})})}),e.jsx(s.div,{"data-choice-value":"TypeScript",className:"choice",children:e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// hello.telefunc.ts"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { hello }"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(s.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#E36209"},children:"name"}),e.jsx(s.span,{style:{color:"#D73A49"},children:":"}),e.jsx(s.span,{style:{color:"#005CC5"},children:" string"}),e.jsx(s.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"  // This telefunction has a bug: it should be `name` instead of `namee`"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(s.span,{style:{color:"#032F62"},children:" 'Hello '"}),e.jsx(s.span,{style:{color:"#D73A49"},children:" +"}),e.jsx(s.span,{style:{color:"#24292E"},children:" namee"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"}"})})]})})})})]}),`
`,e.jsx(s.p,{children:"Then a telefunction call throws an error:"}),`
`,e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"html","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"html","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"<!-- index.html -->"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"<!-- Environment: client -->"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"<"}),e.jsx(s.span,{style:{color:"#22863A"},children:"html"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"  <"}),e.jsx(s.span,{style:{color:"#22863A"},children:"body"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"    <"}),e.jsx(s.span,{style:{color:"#22863A"},children:"script"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" type"}),e.jsx(s.span,{style:{color:"#24292E"},children:"="}),e.jsx(s.span,{style:{color:"#032F62"},children:'"module"'}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"      import"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { hello } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62"},children:" './hello.telefunc.js'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"      try"}),e.jsx(s.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"        await"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#032F62"},children:"'Eva'"}),e.jsx(s.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"        console."}),e.jsx(s.span,{style:{color:"#6F42C1"},children:"log"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#032F62"},children:`"I'm never printed"`}),e.jsx(s.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"      } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"catch"}),e.jsx(s.span,{style:{color:"#24292E"},children:"(err) {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"        console."}),e.jsx(s.span,{style:{color:"#6F42C1"},children:"log"}),e.jsx(s.span,{style:{color:"#24292E"},children:"(err.message) "}),e.jsx(s.span,{style:{color:"#6A737D"},children:"// Prints 'Internal Server Error'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:'        // E.g. show a popup "Something went wrong. Try again (later)."'})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"        // ..."})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"      }"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"    </"}),e.jsx(s.span,{style:{color:"#22863A"},children:"script"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"  </"}),e.jsx(s.span,{style:{color:"#22863A"},children:"body"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"</"}),e.jsx(s.span,{style:{color:"#22863A"},children:"html"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]})]})})}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:["To avoid leaking sensitive information, Telefunc doesn't send the original ",e.jsx(s.code,{children:"Error"})," object to the frontend."]}),`
`]}),`
`,e.jsx("h2",{id:"expected-errors",children:"Expected Errors"}),`
`,e.jsx(s.p,{children:"An error thrown by a telefunction may not be a bug but an expected error instead."}),`
`,e.jsx(s.p,{children:"For example:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Some authentication libraries throw an error if the user isn't logged in."}),`
`,e.jsx(s.li,{children:"Some validation libraries throw errors upon invalid data."}),`
`]}),`
`,e.jsx(s.p,{children:"We can:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Propagate the error to the frontend, or"}),`
`,e.jsx(s.li,{children:"handle the error on the server-side."}),`
`]}),`
`,e.jsx("br",{}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"1. Propagate the error to the frontend."})}),`
`,e.jsx(s.p,{children:"We can propagate error information to the frontend like this:"}),`
`,e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { validate } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62"},children:" 'some-library'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"function"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" onFormSubmit"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#E36209"},children:"data"}),e.jsx(s.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  try"}),e.jsx(s.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#6F42C1"},children:"    validate"}),e.jsx(s.span,{style:{color:"#24292E"},children:"(data)"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"  } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"catch"}),e.jsx(s.span,{style:{color:"#24292E"},children:" (err) {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"    return"}),e.jsx(s.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"      errorMessage: "}),e.jsx(s.span,{style:{color:"#032F62"},children:"`Data is invalid: ${"}),e.jsx(s.span,{style:{color:"#24292E"},children:"err"}),e.jsx(s.span,{style:{color:"#032F62"},children:"."}),e.jsx(s.span,{style:{color:"#24292E"},children:"message"}),e.jsx(s.span,{style:{color:"#032F62"},children:"}. Please enter valid data.`"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"    }"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"  }"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(s.p,{children:["We can also use ",e.jsx(s.code,{children:"throw Abort(someValue)"}),":"]}),`
`,e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { validate } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62"},children:" 'some-library'"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { Abort } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"function"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" onFormSubmit"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#E36209"},children:"data"}),e.jsx(s.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  try"}),e.jsx(s.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#6F42C1"},children:"    validate"}),e.jsx(s.span,{style:{color:"#24292E"},children:"(data)"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"  } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"catch"}),e.jsx(s.span,{style:{color:"#24292E"},children:" (err) {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"    throw"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" Abort"}),e.jsx(s.span,{style:{color:"#24292E"},children:"({"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"      errorMessage: "}),e.jsx(s.span,{style:{color:"#032F62"},children:"`Data is invalid: ${"}),e.jsx(s.span,{style:{color:"#24292E"},children:"err"}),e.jsx(s.span,{style:{color:"#032F62"},children:"."}),e.jsx(s.span,{style:{color:"#24292E"},children:"message"}),e.jsx(s.span,{style:{color:"#032F62"},children:"}. Please enter valid data.`"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"    })"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"  }"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(s.p,{children:["In general, we recommend using ",e.jsx(s.code,{children:"return { someValue }"})," instead of ",e.jsx(s.code,{children:"throw Abort(someValue)"}),", see explanation at ",e.jsx(l,{href:"/form-validation#throw-abort-somevalue",doNotInferSectionTitle:!0}),"."]}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:["We need to catch the error and use ",e.jsx(s.code,{children:"throw Abort(someValue)"})," because Telefunc doesn't send the original ",e.jsx(s.code,{children:"Error"})," object to the frontend (in order to avoid leaking sensitive information)."]}),`
`]}),`
`,e.jsxs(s.p,{children:["Also see ",e.jsx(l,{href:"/permissions#getcontext-wrapping",doNotInferSectionTitle:!0}),"."]}),`
`,e.jsx("br",{}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"2. Handle the error on the server-side."})}),`
`,e.jsx(s.p,{children:"We can handle the thrown error at our Telefunc server middleware:"}),`
`,e.jsxs(r,{choices:["JavaScript","TypeScript"],children:[e.jsx(s.div,{"data-choice-value":"JavaScript",className:"choice",children:e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// server.js"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// Server (Express.js/Fastify/...)"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { telefunc } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// Telefunc middleware"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"app."}),e.jsx(s.span,{style:{color:"#6F42C1"},children:"all"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#032F62"},children:"'/_telefunc'"}),e.jsx(s.span,{style:{color:"#24292E"},children:", "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(s.span,{style:{color:"#24292E"},children:" ("}),e.jsx(s.span,{style:{color:"#E36209"},children:"req"}),e.jsx(s.span,{style:{color:"#24292E"},children:", "}),e.jsx(s.span,{style:{color:"#E36209"},children:"res"}),e.jsx(s.span,{style:{color:"#24292E"},children:") "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(s.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(s.span,{style:{color:"#005CC5"},children:" httpResponse"}),e.jsx(s.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(s.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" telefunc"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#6A737D"},children:"/* ... */"}),e.jsx(s.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"  // Telefunc exposes any error thrown by a telefunction at httpResponse.err"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  if"}),e.jsx(s.span,{style:{color:"#24292E"},children:" (httpResponse.err) {"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"    // Our error handling"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"  }"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"})"})})]})})})}),e.jsx(s.div,{"data-choice-value":"TypeScript",className:"choice",children:e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// server.ts"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// Server (Express.js/Fastify/...)"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { telefunc } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"// Telefunc middleware"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"app."}),e.jsx(s.span,{style:{color:"#6F42C1"},children:"all"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#032F62"},children:"'/_telefunc'"}),e.jsx(s.span,{style:{color:"#24292E"},children:", "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(s.span,{style:{color:"#24292E"},children:" ("}),e.jsx(s.span,{style:{color:"#E36209"},children:"req"}),e.jsx(s.span,{style:{color:"#D73A49"},children:":"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" Request"}),e.jsx(s.span,{style:{color:"#24292E"},children:", "}),e.jsx(s.span,{style:{color:"#E36209"},children:"res"}),e.jsx(s.span,{style:{color:"#D73A49"},children:":"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" Response"}),e.jsx(s.span,{style:{color:"#24292E"},children:") "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(s.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(s.span,{style:{color:"#005CC5"},children:" httpResponse"}),e.jsx(s.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(s.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" telefunc"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#6A737D"},children:"/* ... */"}),e.jsx(s.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"  // Telefunc exposes any error thrown by a telefunction at httpResponse.err"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"  if"}),e.jsx(s.span,{style:{color:"#24292E"},children:" (httpResponse.err) {"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"    // Our error handling"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"  }"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"})"})})]})})})})]}),`
`,e.jsxs(s.p,{children:["Also see ",e.jsx(l,{href:"/getContext#provide"}),"."]}),`
`,e.jsx("h2",{id:"network-errors",children:"Network Errors"}),`
`,e.jsx(s.p,{children:"If the user's browser can't connect to our server:"}),`
`,e.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(s.pre,{tabIndex:"0","data-language":"html","data-theme":"github-light",children:e.jsxs(s.code,{"data-language":"html","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"<!-- index.html -->"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"<!-- Environment: client -->"})}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"<"}),e.jsx(s.span,{style:{color:"#22863A"},children:"html"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"  <"}),e.jsx(s.span,{style:{color:"#22863A"},children:"body"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"    <"}),e.jsx(s.span,{style:{color:"#22863A"},children:"script"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" type"}),e.jsx(s.span,{style:{color:"#24292E"},children:"="}),e.jsx(s.span,{style:{color:"#032F62"},children:'"module"'}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"      import"}),e.jsx(s.span,{style:{color:"#24292E"},children:" { hello } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62"},children:" './hello.telefunc.js'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:" "}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"      try"}),e.jsx(s.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"        await"}),e.jsx(s.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(s.span,{style:{color:"#24292E"},children:"("}),e.jsx(s.span,{style:{color:"#032F62"},children:"'Eva'"}),e.jsx(s.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"      } "}),e.jsx(s.span,{style:{color:"#D73A49"},children:"catch"}),e.jsx(s.span,{style:{color:"#24292E"},children:"(err) {"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#D73A49"},children:"        if"}),e.jsx(s.span,{style:{color:"#24292E"},children:" (err.isConnectionError) {"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"          // There is a network problem:"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"          //  - the user isn't connected to the internet, or"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#6A737D"},children:"          //  - our server is down."})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"          console."}),e.jsx(s.span,{style:{color:"#6F42C1"},children:"log"}),e.jsx(s.span,{style:{color:"#24292E"},children:"(err.message) "}),e.jsx(s.span,{style:{color:"#6A737D"},children:"// Prints 'No Server Connection'"})]}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"        }"})}),`
`,e.jsx(s.span,{"data-line":"",children:e.jsx(s.span,{style:{color:"#24292E"},children:"      }"})}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"    </"}),e.jsx(s.span,{style:{color:"#22863A"},children:"script"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"  </"}),e.jsx(s.span,{style:{color:"#22863A"},children:"body"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(s.span,{"data-line":"",children:[e.jsx(s.span,{style:{color:"#24292E"},children:"</"}),e.jsx(s.span,{style:{color:"#22863A"},children:"html"}),e.jsx(s.span,{style:{color:"#24292E"},children:">"})]})]})})})]})}function d(n={}){const{wrapper:s}={...o(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(a,{...n})}):a(n)}function h(n,s){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}const p=Object.freeze(Object.defineProperty({__proto__:null,default:d,pageSectionsExport:c},Symbol.toStringTag,{value:"Module"})),C={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/renderer/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:i}},onCreatePageContext:{type:"cumulative",definedAtData:[{filePathToShowToUser:"@brillout/docpress/renderer/onCreatePageContext",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:t}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/error-handling/+Page.mdx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:p}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}}};export{C as configValuesSerialized};
