import{u as a,o as t,a as o}from"../chunks/chunk-CeChWwBg.js";import{j as e}from"../chunks/chunk-DJirElMN.js";import{L as s}from"../chunks/chunk-DNq9zuIM.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */const c=[{pageSectionId:"basic-example",pageSectionLevel:2,pageSectionTitle:"Basic example"},{pageSectionId:"orm-sql",pageSectionLevel:2,pageSectionTitle:"ORM & SQL"},{pageSectionId:"how-it-works",pageSectionLevel:2,pageSectionTitle:"How it works"},{pageSectionId:"security",pageSectionLevel:2,pageSectionTitle:"Security"},{pageSectionId:"throw-abort",pageSectionLevel:2,pageSectionTitle:"`throw Abort()`"},{pageSectionId:"shield",pageSectionLevel:2,pageSectionTitle:"`shield()`"},{pageSectionId:"random-telefunction-calls",pageSectionLevel:2,pageSectionTitle:"Random telefunction calls"},{pageSectionId:"performance",pageSectionLevel:2,pageSectionTitle:"Performance"}];function r(l){const n={a:"a",blockquote:"blockquote",code:"code",figure:"figure",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Telefunc's approach — seamlessly calling remote functions — is known as ",e.jsxs(n.a,{href:"https://en.wikipedia.org/wiki/Remote_procedure_call",children:["RPC (",e.jsx(n.strong,{children:"R"}),"emote ",e.jsx(n.strong,{children:"P"}),"rocedure ",e.jsx(n.strong,{children:"C"}),"all)"]}),"."]}),`
`,e.jsx(n.p,{children:"This page explains:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"What is RPC?"}),`
`,e.jsx(n.li,{children:"How does RPC work?"}),`
`,e.jsx(n.li,{children:"How to enforce RPC security?"}),`
`,e.jsx(n.li,{children:"How to maximize RPC performance?"}),`
`]}),`
`,e.jsx("h2",{id:"basic-example",children:"Basic example"}),`
`,e.jsx(n.p,{children:"Telefunc enables functions defined on the server-side to be called remotely from the browser-side."}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// hello.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { hello }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// hello() always runs on the server-side"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ "}),e.jsx(n.span,{style:{color:"#E36209"},children:"name"}),e.jsx(n.span,{style:{color:"#24292E"},children:" }) {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" message"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'Welcome '"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" +"}),e.jsx(n.span,{style:{color:"#24292E"},children:" name"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { message }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"html","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"html","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"<!-- index.html -->"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"<!-- Environment: client -->"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"<"}),e.jsx(n.span,{style:{color:"#22863A"},children:"html"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"  <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"body"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"script"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" type"}),e.jsx(n.span,{style:{color:"#24292E"},children:"="}),e.jsx(n.span,{style:{color:"#032F62"},children:'"module"'}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"      // This import doesn't actually load the hello.telefunc.js file: Telefunc transforms"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"      // hello.telefunc.js into a thin HTTP client."})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"      import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { hello } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" './hello.telefunc.js'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"      // This thin HTTP client makes an HTTP request when the hello() function is called."})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"      const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"message"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ name: "}),e.jsx(n.span,{style:{color:"#032F62"},children:"'Eva'"}),e.jsx(n.span,{style:{color:"#24292E"},children:" })"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"      console."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"log"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(message) "}),e.jsx(n.span,{style:{color:"#6A737D"},children:"// Prints 'Welcome Eva'"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    </"}),e.jsx(n.span,{style:{color:"#22863A"},children:"script"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"  </"}),e.jsx(n.span,{style:{color:"#22863A"},children:"body"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"</"}),e.jsx(n.span,{style:{color:"#22863A"},children:"html"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]})]})})}),`
`,e.jsxs(n.p,{children:["The central aspect here is that ",e.jsx(n.code,{children:"hello()"})," is always executed on the server side, which enables ",e.jsx(n.code,{children:"hello()"})," to use server-side utilities such as SQL and ORMs."]}),`
`,e.jsx("h2",{id:"orm-sql",children:"ORM & SQL"}),`
`,e.jsx(n.p,{children:"As we have seen in the previous section, telefunctions always run on the server-side and can therefore use server utilities such as SQL and ORMs."}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onLoad }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onLoad"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ORM"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" todoItems"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Task."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"findMany"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ select: "}),e.jsx(n.span,{style:{color:"#032F62"},children:"'text'"}),e.jsx(n.span,{style:{color:"#24292E"},children:" })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // SQL"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" todoItems"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" execute"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#032F62"},children:'"SELECT text FROM todo_items;"'}),e.jsx(n.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" todoItems"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:".telefunc.js"})," files are guaranteed to be loaded only on the server-side. You can therefore save secret information, such as the database passwords, in ",e.jsx(n.code,{children:".telefunc.js"})," files."]}),`
`]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"jsx","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"jsx","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.jsx"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: client"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// This doesn't actually load CreateTodo.telefunc.js which we'll explain in the next section"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onLoad } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" './TodoList.telefunc.js'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" TodoList"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // The frontend uses the telefunction onLoad() to retrieve data by executing a SQL/ORM query"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" todoItems"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onLoad"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"ul"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"      {todoItems."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"map"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(("}),e.jsx(n.span,{style:{color:"#E36209"},children:"item"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"        <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"li"}),e.jsx(n.span,{style:{color:"#24292E"},children:">{item.text}</"}),e.jsx(n.span,{style:{color:"#22863A"},children:"li"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"      ))}"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    </"}),e.jsx(n.span,{style:{color:"#22863A"},children:"ul"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  )"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["We name and co-locate ",e.jsx(n.code,{children:"TodoList.telefunc.js"})," next to ",e.jsx(n.code,{children:"TodoList.jsx"})," — a practice explained at ",e.jsx(s,{href:"/event-based"}),"."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"While the examples here use JSX, Telefunc works with any UI framework (React, Vue, Svelte, Solid, ...)."}),`
`]}),`
`,e.jsx(n.p,{children:"Telefunctions can also be used to mutate data:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// CreateTodo.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onNewTodo }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { shield } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// We'll talk about shield() later"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"shield"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(onNewTodo, [shield.type.string])"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onNewTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ORM"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" todoItem"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" new"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Task"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ text })"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" todoItem."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"save"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // SQL"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" execute"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#032F62"},children:"'INSERT INTO todo_items VALUES (:text)'"}),e.jsx(n.span,{style:{color:"#24292E"},children:", { text })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"jsx","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"jsx","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// CreateTodo.jsx"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: client"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onNewTodo } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" './CreateTodo.telefunc.js'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onClick"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"form"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" text"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" form.input.value"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onNewTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(text)"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" CreateTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"form"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"      <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"input"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" input"}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#032F62"},children:'"text"'}),e.jsx(n.span,{style:{color:"#24292E"},children:"></"}),e.jsx(n.span,{style:{color:"#22863A"},children:"input"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"      <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onClick"}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#24292E"},children:"{onClick}>Add To-Do</"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    </"}),e.jsx(n.span,{style:{color:"#22863A"},children:"form"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  )"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx(n.p,{children:"RPC enables your frontend to tap directly into the full power of the server such as SQL and ORMs. For most use cases it's simpler, more flexible, and more performant than REST and GraphQL."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"GraphQL and RESTful can be better than RPC if:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"you want to give third parties generic access to your data, or"}),`
`,e.jsx(n.li,{children:"you are a very large company with highly complex databases."}),`
`]}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(s,{href:"/RPC-vs-GraphQL-REST"}),"."]}),`
`]}),`
`,e.jsx("h2",{id:"how-it-works",children:"How it works"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Understanding the basic mechanics of Telefunc is paramount in order to proficiently use it."}),`
`]}),`
`,e.jsx(n.p,{children:"Let's see what happens when a telefunction is called."}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// hello.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { hello }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ "}),e.jsx(n.span,{style:{color:"#E36209"},children:"name"}),e.jsx(n.span,{style:{color:"#24292E"},children:" }) {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" message"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'Welcome '"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" +"}),e.jsx(n.span,{style:{color:"#24292E"},children:" name"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { message }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: client"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { hello } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" './hello.telefunc.js'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"message"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#032F62"},children:"'Eva'"}),e.jsx(n.span,{style:{color:"#24292E"},children:")"})]})]})})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"hello.telefunc.js"})," file is never loaded in the browser: instead Telefunc transforms ",e.jsx(n.code,{children:"hello.telefunc.js"})," into the following:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// hello.telefunc.js (after Telefunc transformation)"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: Browser"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { __internal_makeHttpRequest } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc/client'"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" const"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" hello"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#D73A49"},children:"..."}),e.jsx(n.span,{style:{color:"#E36209"},children:"args"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" __internal_makeHttpRequest"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#032F62"},children:"'/hello.telefunc.js:hello'"}),e.jsx(n.span,{style:{color:"#24292E"},children:", args)"})]})]})})}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"hello('Eva')"})," is called in the browser-side, the following happens:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["On the browser-side, the ",e.jsx(n.code,{children:"__internal_makeHttpRequest()"})," function makes an HTTP request to the server.",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`POST /_telefunc HTTP/1.1
{
  "path": "/hello.telefunc.js:hello",
  "args": [{"name": "Eva"}]
}
`})}),`
`]}),`
`,e.jsxs(n.li,{children:["On the server-side, the Telefunc middleware:",`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// server.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Server (Express.js/Hono/Fastify/...)"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { telefunc } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Telefunc middleware"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"app."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"use"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#032F62"},children:"'/_telefunc'"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#E36209"},children:"req"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Request"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"res"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Response"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" httpResponse"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" telefunc"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(req)"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"  res."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"send"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(httpResponse.body)"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"})"})})]})})}),`
`,"Replies following HTTP response:",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`HTTP/1.1 200 OK
{
  "return": {
    "message": "Welcome Eva"
  }
}
`})}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:[`In other words,
the `,e.jsx(n.code,{children:"hello()"}),` function is always executed on the server-side
while the browser-side can remotely call it in a seamless fashion.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"You can also call telefunctions from the server-side, in which case the telefunction is directly called (without making an HTTP request)."}),`
`]}),`
`,e.jsx("h2",{id:"security",children:"Security"}),`
`,e.jsx(n.p,{children:"Anyone — not just your frontend — can remotely call your telefunctions."}),`
`,e.jsxs(n.p,{children:["For example, anyone can call the ",e.jsx(n.code,{children:"hello()"})," telefunction we've seen in the previous section by opening a Linux terminal and making this HTTP request:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"bash","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"curl"}),e.jsxs(n.span,{style:{color:"#032F62"},children:[" ",e.jsx(n.a,{href:"https://your-website.com/_telefunc",children:"https://your-website.com/_telefunc"})]}),e.jsx(n.span,{style:{color:"#005CC5"},children:" --data"}),e.jsx(n.span,{style:{color:"#032F62"},children:" '{"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#032F62"},children:'   "path": "/hello.telefunc.js:hello",'})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#032F62"},children:'   "args": [{"name": "Elisabeth"}]'})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#032F62"},children:" }'"})})]})})}),`
`,e.jsx(n.p,{children:"Thus, such telefunction is problematic:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// sql.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// run() is public: it can be called by anyone"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { run }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" run"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"sql"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" database."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"execute"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(sql)"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["This ",e.jsx(n.code,{children:"run()"}),` telefunction essentially exposes the entire database to the world as
anyone can make this HTTP request:`]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"bash","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"curl"}),e.jsxs(n.span,{style:{color:"#032F62"},children:[" ",e.jsx(n.a,{href:"https://your-website.com/_telefunc",children:"https://your-website.com/_telefunc"})]}),e.jsx(n.span,{style:{color:"#005CC5"},children:" --data"}),e.jsx(n.span,{style:{color:"#032F62"},children:" '{"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#032F62"},children:'    "path": "/run.telefunc.js:run",'})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#032F62"},children:'    "args": ["SELECT login, password FROM users;"]'})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#032F62"},children:"  }'"})})]})})}),`
`,e.jsxs(n.p,{children:["Always keep in mind that your ",e.jsx(n.strong,{children:"telefunctions are public"})," and you must ",e.jsx(n.strong,{children:"always protect your telefunctions"}),"."]}),`
`,e.jsxs(n.p,{children:["In the sections below ",e.jsx(s,{href:"#throw-abort"})," and ",e.jsx(s,{href:"#shield"})," we explain how to achieve that."]}),`
`,e.jsx("h2",{id:"throw-abort",children:e.jsx("code",{children:"throw Abort()"})}),`
`,e.jsx(n.p,{children:`As we've seen in the previous section,
the following telefunction isn't safe.`}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// run.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// run() is public: it can be called by anyone"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { run }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" run"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"sql"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" database."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"execute"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(sql)"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["But we can use ",e.jsx(n.code,{children:"throw Abort()"})," to protect it:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// run.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// run() is public: it can be called by anyone"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { run }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { Abort, getContext } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" run"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"sql"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"user"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getContext"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // Only admins are allowed to run this telefunction"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  if"}),e.jsx(n.span,{style:{color:"#24292E"},children:" (user.isAdmin "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"!=="}),e.jsx(n.span,{style:{color:"#005CC5"},children:" true"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"throw"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Abort"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" database."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"execute"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(sql)"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Telefunctions can access contextual information by using ",e.jsx(s,{href:"/getContext",children:e.jsx(n.code,{children:"getContext()"})}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["We can use ",e.jsx(n.code,{children:"throw Abort()"})," to avoid any forbidden telefunction call."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onLoad }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { Abort, getContext } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onLoad"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"user"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getContext"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // We forbid onLoad() to be called by a user that isn't logged-in"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  if"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#D73A49"},children:"!"}),e.jsx(n.span,{style:{color:"#24292E"},children:"user) "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"throw"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Abort"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" todoList"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Task."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"findMany"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ authorId: user.id })"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" todoList"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["We essentially use ",e.jsx(n.code,{children:"throw Abort()"}),` to implement permission: only a logged-in user is allowed to fetch its to-do items.
We talk more about permissions at `,e.jsx(s,{href:"/permissions"}),"."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["In principle, we could also ",e.jsx(n.code,{children:"throw new Error()"})," instead of ",e.jsx(n.code,{children:"throw Abort()"})," as it also interrupts the telefunction call. But we recommend ",e.jsx(n.code,{children:"throw Abort()"})," as it comes with many conveniences."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["If, upon aborting a telefunction call, you want to pass information to the frontend then use ",e.jsx(n.code,{children:"return someValue"})," or ",e.jsx(n.code,{children:"throw Abort(someValue)"}),", see ",e.jsx(s,{href:"/permissions"}),"."]}),`
`]}),`
`,e.jsx("h2",{id:"shield",children:e.jsx("code",{children:"shield()"})}),`
`,e.jsxs(n.p,{children:["Since telefunctions are public and can be called by anyone, we cannot assuming anything about arguments. We can use ",e.jsx(n.code,{children:"throw Abort()"})," to ensure the type of telefunction arguments:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// CreateTodo.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onNewTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ❌ This may throw:"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ```"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // Uncaught TypeError: Cannot read properties of undefined (reading 'toUpperCase')"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ```"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // While the frontend may always call onNewTodo(text) with `typeof text === 'string'`,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // because onNewTodo() is public, anyone can call onNewTodo(undefined) instead."})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"  text "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#24292E"},children:" text."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"toUpperCase"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ✅ We ensure `text` is a string"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  if"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#D73A49"},children:"typeof"}),e.jsx(n.span,{style:{color:"#24292E"},children:" text "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"!=="}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'string'"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"    throw"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Abort"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  }"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"  text "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#24292E"},children:" text."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"toUpperCase"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["For more convenience, we can use ",e.jsx(n.code,{children:"shield()"})," instead:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// CreateTodo.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { shield } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" t"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" shield.type"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"shield"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(onNewTodo, [t.string])"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onNewTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ..."})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// CreateTodo.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { shield } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" t"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" shield.type"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"shield"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(onNewTodo, [{ text: t.string, isCompleted: t.boolean }])"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onNewTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ "}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"isCompleted"}),e.jsx(n.span,{style:{color:"#24292E"},children:" }) {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ..."})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["Not only does ",e.jsx(n.code,{children:"shield()"})," call ",e.jsx(n.code,{children:"throw Abort()"})," on our behalf, but it also infers the type of the arguments for TypeScript and IntelliSense."]}),`
`,e.jsxs(s,{href:"/shield#typescript-automatic",children:["When using TypeScript, Telefunc can automatically generate ",e.jsx(n.code,{children:"shield()"})," for each telefunction."]}),`
`,e.jsx("h2",{id:"random-telefunction-calls",children:"Random telefunction calls"}),`
`,e.jsx(n.p,{children:"Any of your telefunctions can be called by anyone, at any time, and with any arguments. One way to think about it is that any random telefunction call can happen at any time."}),`
`,e.jsx(n.p,{children:"You should always protect your telefunctions, even when your frontend calls a telefunction only in a certain way. For example:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"jsx","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"jsx","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Comment.jsx"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: client"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onDelete } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" './Comment.telefunc.js'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Comment"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ "}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#24292E"},children:" }) {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" deleteButton"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"    // The delete button is only shown to admins"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"    !"}),e.jsx(n.span,{style:{color:"#24292E"},children:"user.isAdmin "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"?"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" null"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" :"}),e.jsx(n.span,{style:{color:"#24292E"},children:" <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onClick"}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#24292E"},children:"{() "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onDelete"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(id)}>Delete</"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    <>"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"      <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"p"}),e.jsx(n.span,{style:{color:"#24292E"},children:">{text}</"}),e.jsx(n.span,{style:{color:"#22863A"},children:"p"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"      {deleteButton}"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    </>"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  )"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["Because the frontend shows the delete button only to admins, we can assume the user to be an admin whenever the frontend calls ",e.jsx(n.code,{children:"onDelete()"}),`.
But we still need to use `,e.jsx(n.code,{children:"throw Abort()"})," in order to protect the telefunction against calls that don't originate from the frontend."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Comment.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { getContext, Abort, shield } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"shield"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(onDelete, [shield.type.number])"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onDelete"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"user"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getContext"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // onDelete() is public and anyone can call it without being an admin."})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // We must abort if that happens."})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  if"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#D73A49"},children:"!"}),e.jsx(n.span,{style:{color:"#24292E"},children:"user.isAdmin) "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"throw"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Abort"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // ..."})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx("h2",{id:"performance",children:"Performance"}),`
`,e.jsx(n.p,{children:"When used correctly, RPC is highly efficient."}),`
`,e.jsx(n.p,{children:"Since telefunctions are tailored to your frontend, you can make them send only the strict minimum amount of data."}),`
`,e.jsx(n.p,{children:"For example, the following doesn't send a single byte of superfluous information:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { getContext } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"shield"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(onTodoComplete, [shield.type.number])"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onTodoComplete"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#24292E"},children:") {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"user"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getContext"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Task."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"update"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"true"}),e.jsx(n.span,{style:{color:"#24292E"},children:" })."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"where"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ id, author: user.id })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // No data is returned: the HTTP response status code 200 is enough information for the client"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"With REST, because API endpoints are generic you often end up returning superfluous data."}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Even with GraphQL, the client must specify and send the list of fields that the server needs to return. This isn't needed with RPC — that information is implicitly defined by the telefunction name (i.e. the information is compressed)."}),`
`]}),`
`,e.jsxs(n.p,{children:["For efficient telefunctions, we recommend creating tailored telefunctions instead of generic ones — see ",e.jsx(s,{href:"/event-based"}),"."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Telefunc newcomers often make the mistake of creating generic telefunctions — a habit that comes from using REST or GraphQL."}),`
`]})]})}function i(l={}){const{wrapper:n}={...a(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(r,{...l})}):r(l)}const d=Object.freeze(Object.defineProperty({__proto__:null,default:i,pageSectionsExport:c},Symbol.toStringTag,{value:"Module"})),w={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/renderer/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:o}},onCreatePageContext:{type:"cumulative",definedAtData:[{filePathToShowToUser:"@brillout/docpress/renderer/onCreatePageContext",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:t}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/RPC/+Page.mdx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:d}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}}};export{w as configValuesSerialized};
