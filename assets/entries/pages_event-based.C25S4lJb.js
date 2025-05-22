import{j as e,i as t,L as a,o as i}from"../chunks/chunk-DRkjpTJa.js";import{L as o}from"../chunks/chunk-wzxJdVeh.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-CKwDVdYI.js";/* empty css                      */const r=[{pageSectionId:"example",pageSectionLevel:2,pageSectionTitle:"Example"},{pageSectionId:"naming-convention",pageSectionLevel:2,pageSectionTitle:"Naming convention"},{pageSectionId:"exceptions",pageSectionLevel:2,pageSectionTitle:"Exceptions"}];function l(s){const n={blockquote:"blockquote",code:"code",em:"em",figure:"figure",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"With REST/GraphQL, API endpoints are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Generic."}),`
`,e.jsx(n.li,{children:"Backend-owned. (It's the backend development/team that creates and defines API endpoints.)"}),`
`]}),`
`,e.jsx(n.p,{children:"With Telefunc, it's usually the opposite as telefunctions usually are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Tailored."}),`
`,e.jsx(n.li,{children:"Frontend-owned. (It's the frontend development/team that creates and defines telefunctions.)"}),`
`]}),`
`,e.jsx(n.p,{children:"This inversion leads to a significantly faster development speed."}),`
`,e.jsxs(n.p,{children:["You may be tempted to create generic telefunctions out of the habit of using REST/GraphQL, but this is usually an anti-pattern as explained in the example below. Instead, we recommend implementing what we call ",e.jsx(n.em,{children:"event-based"})," telefunctions."]}),`
`,e.jsx("h2",{id:"example",children:"Example"}),`
`,e.jsx(n.p,{children:`Let's imagine a to-do list app that got a new feature request to implement a new button "mark all tasks as completed".`}),`
`,e.jsx(n.p,{children:"With a RESTful API, the app would typically do these requests:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`HTTP VERB       HTTP URL                                      HTTP BODY PAYLOAD
=========       =========================================     =====================
GET             https://api.todo.com/task?completed=false     ∅
POST            https://api.todo.com/task/42                  { "completed": true }
POST            https://api.todo.com/task/1337                { "completed": true }
POST            https://api.todo.com/task/7                   { "completed": true }
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"With REST, it's usually the backend team that owns and is responsible for implementing and modelling the API."}),`
`]}),`
`,e.jsxs(n.p,{children:["This is inefficient as the app does ",e.jsx(n.code,{children:"N+1"})," requests, where ",e.jsx(n.code,{children:"N"})," is the number of tasks that needs to be updated."]}),`
`,e.jsx(n.p,{children:"With Telefunc, you can do this instead:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.telefunc.ts"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onMarkAllAsCompleted"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // With SQL"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" sql"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#032F62"},children:"'UPDATE tasks SET completed = true WHERE completed = false'"}),e.jsx(n.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // With an ORM"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" updateUser"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Tasks."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"update"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    where: {"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"      completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"false"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    },"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    data: {"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"      completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"true"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    }"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  })"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"With Telefunc, it's usually the frontend team that owns and is responsible for defining telefunctions."}),`
`]}),`
`,e.jsxs(n.p,{children:["The key difference is that the telefunction ",e.jsx(n.code,{children:"onMarkAllAsCompleted()"})," is created specifically to serve the needs of the component ",e.jsx(n.code,{children:"TodoList.tsx"}),", whereas a RESTful API is a set of generic endpoints that are agnostic to your frontend."]}),`
`,e.jsx(n.p,{children:"Not only is it more performant, but it's also faster to implement tailored telefunctions. You can implement telefunctions hand-in-hand with your frontend development instead of having to implement an entire RESTful API before even getting started with your frontend development."}),`
`,e.jsx(n.p,{children:"Thus, in general, we recommend implementing telefunctions that are tailored instead of generic."}),`
`,e.jsxs(n.p,{children:["We recommend naming telefunctions ",e.jsx(n.code,{children:"onSomeEvent()"})," since they are usually triggered by some kind of event. For example, the telefunction ",e.jsx(n.code,{children:"onMarkAllAsCompleted()"})," is triggered by the user clicking on a button:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"tsx","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"tsx","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.tsx"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: client"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onMarkAllAsCompleted } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" './TodoList.telefunc.ts'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" TodoList"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" <>"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    {"}),e.jsx(n.span,{style:{color:"#6A737D"},children:"/* ... */"}),e.jsx(n.span,{style:{color:"#24292E"},children:"}"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onClick"}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#24292E"},children:"{() "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onMarkAllAsCompleted"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()}>"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"      Mark all as completed"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    </"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  </>"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx("h2",{id:"naming-convention",children:"Naming convention"}),`
`,e.jsxs(n.p,{children:["In general, we recommend naming telefunctions ",e.jsx(n.code,{children:"onSomeEvent()"})," such as:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"bash","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"bash","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"    TELEFUNCTION"}),e.jsx(n.span,{style:{color:"#032F62"},children:" NAME"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    ================="})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#6A737D"},children:"  # Generic telefunction:"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  updateTodoItem"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#6A737D"},children:"  # Telefunctions tailored to user events:"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onTodoItemTextUpdate"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onTodoItemCompleteToggle"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"    # Fetching data:"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  loadData"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onLoad"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onPagination"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onInfiniteScroll"})]})]})})}),`
`,e.jsxs(n.p,{children:["We also recommend to collocate ",e.jsx(n.code,{children:".telefunc.js"})," files with UI component files:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"bash","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"bash","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    FILES"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    ==============================="})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"    # UI Component"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    components/TodoItem.tsx"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"    # Telefunction"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  components/TodoItem.telefunc.ts"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  db/todo.telefunc.ts"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"    # UI Component"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    pages/edit/+Page.vue"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"    # Telefunction"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  pages/edit/Page.telefunc.js"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  pages/edit/all.telefunc.js"})]})]})})}),`
`,e.jsx(n.p,{children:"First-time Telefunc users often create generic telefunctions out of the habit of using REST/GraphQL, but defining tailored telefunctions instead is usually the better approach as explained above."}),`
`,e.jsxs(n.p,{children:["Telefunc displays a warning whenever the naming convention isn't followed. You can remove the warning with ",e.jsx(o,{text:e.jsx(n.code,{children:"config.disableNamingConvention"}),href:"/disableNamingConvention"}),"."]}),`
`,e.jsx("h2",{id:"exceptions",children:"Exceptions"}),`
`,e.jsx(n.p,{children:"While we generally recommend implementing telefunctions that are tailored instead of generic, there are exceptions."}),`
`,e.jsx(n.p,{children:"The most common exception is if your telefunctions are consumed by not only one client but several clients that are are developed and deployed independently of each other. In that case it can make sense to define few generic telefunctions covering all clients, instead of defining different telefunctions for each client. Alternatively, you can deploy one Telefunc server per client in order to preserve the fast development speed of tailored telefunctions."})]})}function d(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(l,{...s})}):l(s)}const c=Object.freeze(Object.defineProperty({__proto__:null,default:d,pageSectionsExport:r},Symbol.toStringTag,{value:"Module"})),b={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/renderer/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:i}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/event-based/+Page.mdx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:c}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/Layout",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:a}},TopNavigation:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+TopNavigation.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:t}}};export{b as configValuesSerialized};
