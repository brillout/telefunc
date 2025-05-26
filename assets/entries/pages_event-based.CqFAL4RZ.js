import{j as e,i as t,L as a,o}from"../chunks/chunk-DuMg0zop.js";import{L as i}from"../chunks/chunk-B0egaOTt.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-CnoLyw1e.js";/* empty css                      */const r=[{pageSectionId:"example",pageSectionLevel:2,pageSectionTitle:"Example"},{pageSectionId:"naming-convention",pageSectionLevel:2,pageSectionTitle:"Naming convention"},{pageSectionId:"exception-several-clients",pageSectionLevel:2,pageSectionTitle:"Exception: several clients"}];function s(l){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",figure:"figure",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"With REST or GraphQL, API endpoints are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Generic"}),`
`,e.jsx(n.li,{children:"Backend-owned (defined and implemented by the backend team)"}),`
`]}),`
`,e.jsx(n.p,{children:"With Telefunc, it's usually the opposite — telefunctions are typically:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Tailored"}),`
`,e.jsx(n.li,{children:"Frontend-owned (defined and implemented by the frontend team)"}),`
`]}),`
`,e.jsx(n.p,{children:"This inversion leads to a significantly faster development speed."}),`
`,e.jsxs(n.p,{children:["You may be tempted to create generic telefunctions out of habit from working with REST or GraphQL, but this is usually an anti-pattern as shown in the example below. Instead, we recommend implementing what we call ",e.jsx(n.em,{children:"event-based"})," telefunctions."]}),`
`,e.jsx("h2",{id:"example",children:"Example"}),`
`,e.jsxs(n.p,{children:["Imagine an existing to-do list app, and the product team requests a new feature: add a new button ",e.jsx(n.code,{children:"Mark all tasks as completed"}),"."]}),`
`,e.jsx(n.p,{children:"With a RESTful API, the app would typically do this:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"shell","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"shell","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"HTTP"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            URL"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                                           PAYLOAD"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"=========       "}),e.jsx(n.span,{style:{color:"#032F62"},children:"========================================="}),e.jsx(n.span,{style:{color:"#032F62"},children:"     ====================="})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"# Make a request to fetch all non-completed tasks"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"GET"}),e.jsx(n.span,{style:{color:"#032F62"},children:"             https://api.todo.com/task?completed="}),e.jsx(n.span,{style:{color:"#005CC5"},children:"false"}),e.jsx(n.span,{style:{color:"#032F62"},children:"     ∅"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"# Make a request per task to update it"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"POST"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            https://api.todo.com/task/42"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                  {"}),e.jsx(n.span,{style:{color:"#032F62"},children:' "completed":'}),e.jsx(n.span,{style:{color:"#005CC5"},children:" true"}),e.jsx(n.span,{style:{color:"#032F62"},children:" }"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"POST"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            https://api.todo.com/task/1337"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                {"}),e.jsx(n.span,{style:{color:"#032F62"},children:' "completed":'}),e.jsx(n.span,{style:{color:"#005CC5"},children:" true"}),e.jsx(n.span,{style:{color:"#032F62"},children:" }"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"POST"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            https://api.todo.com/task/7"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                   {"}),e.jsx(n.span,{style:{color:"#032F62"},children:' "completed":'}),e.jsx(n.span,{style:{color:"#005CC5"},children:" true"}),e.jsx(n.span,{style:{color:"#032F62"},children:" }"})]})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"With REST, it's usually the backend team that is responsible for defining and implementing the API."}),`
`]}),`
`,`
`,e.jsxs(n.p,{children:["This is inefficient as it makes a lot of HTTP requests (the infamous ",e.jsx(n.code,{children:"N+1"})," problem)."]}),`
`,e.jsx(n.p,{children:"With Telefunc, you can do this instead:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// components/TodoList.telefunc.ts"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { Tasks } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" '../data/Tasks'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onMarkAllAsCompleted"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // With an ORM"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Tasks."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"update"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"true"}),e.jsx(n.span,{style:{color:"#24292E"},children:"  })."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"where"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"false"}),e.jsx(n.span,{style:{color:"#24292E"},children:" })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // Or with SQL"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" sql"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#032F62"},children:"'UPDATE tasks SET completed = true WHERE completed = false'"}),e.jsx(n.span,{style:{color:"#24292E"},children:")"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"With Telefunc, it's usually the frontend team that is responsible for defining and implementing telefunctions."}),`
`]}),`
`,e.jsxs(n.p,{children:["The telefunction ",e.jsx(n.code,{children:"onMarkAllAsCompleted()"})," is created specifically to serve the needs of the component ",e.jsx(n.code,{children:"TodoList.tsx"}),", whereas a RESTful API is a set of generic endpoints agnostic to your frontend."]}),`
`,e.jsx(n.p,{children:"Not only is it more performant, but it's also faster to implement. You can implement telefunctions hand-in-hand with your frontend development, instead of having to implement an entire RESTful API before even getting started with your frontend development."}),`
`,e.jsx(n.p,{children:"Thus, in general, we recommend implementing telefunctions that are tailored instead of generic."}),`
`,e.jsxs(n.p,{children:["We recommend naming telefunctions ",e.jsx(n.code,{children:"onSomeEvent()"})," since they are typically triggered by some kind of event."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"shell","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"shell","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"components/TodoList.tsx"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"# Co-locating the component's telefunctions"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"components/TodoList.telefunc.ts"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"tsx","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"tsx","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// components/TodoList.tsx"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: client"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { onMarkAllAsCompleted } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" './TodoList.telefunc.ts'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" TodoList"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" <>"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    {"}),e.jsx(n.span,{style:{color:"#6A737D"},children:"/* ... */"}),e.jsx(n.span,{style:{color:"#24292E"},children:"}"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    <"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onClick"}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#24292E"},children:"{onMarkAllAsCompleted}>"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"      Mark all as completed"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"    </"}),e.jsx(n.span,{style:{color:"#22863A"},children:"button"}),e.jsx(n.span,{style:{color:"#24292E"},children:">"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  </>"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx("h2",{id:"naming-convention",children:"Naming convention"}),`
`,e.jsx(n.p,{children:"As explained above, we recommend creating tailored telefunctions (instead of generic ones)."}),`
`,e.jsxs(n.p,{children:["For a crystal-clear structure, we recommend naming telefunctions ",e.jsx(n.code,{children:"onSomeEvent()"}),"."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"bash","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"bash","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    TELEFUNCTIONS"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    ============="})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  updateTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() "}),e.jsx(n.span,{style:{color:"#6A737D"},children:"# generic telefunction"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onTodoTextUpdate"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() "}),e.jsx(n.span,{style:{color:"#6A737D"},children:"# tailored telefunction"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onTodoComplete"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() "}),e.jsx(n.span,{style:{color:"#6A737D"},children:"# tailored telefunction"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  loadData"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onLoad"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onPagination"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onInfiniteScroll"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]})]})})}),`
`,e.jsxs(n.p,{children:["We also recommend to co-locate ",e.jsx(n.code,{children:".telefunc.js"})," files next to UI component files."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"shell","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"shell","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    FILES"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    ====="})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    components/TodoItem.tsx"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  components/TodoItem.telefunc.ts"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  db/todo.telefunc.ts"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    components/User.vue"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  components/User.telefunc.js"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  db/user/getLoggedInUser.telefunc.js"})]})]})})}),`
`,e.jsxs(n.p,{children:["Telefunc displays a warning when the naming convention isn't followed. You can remove the warning with ",e.jsx(i,{text:e.jsx(n.code,{children:"config.disableNamingConvention"}),href:"/disableNamingConvention"}),"."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Not following the naming convention is perfectly fine, though we recommend having a clear reason for breaking the rule. ",e.jsx(n.a,{href:"https://github.com/brillout/telefunc/issues/new",children:"Feel free to reach out"})," if you are hesitant (we'll improve this page)."]}),`
`]}),`
`,e.jsx("h2",{id:"exception-several-clients",children:"Exception: several clients"}),`
`,e.jsx(n.p,{children:"If your telefunctions are used by multiple clients, it can make sense to define a few generic telefunctions that cover all clients, instead of creating different telefunctions for each client."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Alternatively, you can deploy one Telefunc server per client to preserve the fast development speed of tailored telefunctions."}),`
`]})]})}function c(l={}){const{wrapper:n}=l.components||{};return n?e.jsx(n,{...l,children:e.jsx(s,{...l})}):s(l)}const d=Object.freeze(Object.defineProperty({__proto__:null,default:c,pageSectionsExport:r},Symbol.toStringTag,{value:"Module"})),F={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/renderer/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:o}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/event-based/+Page.mdx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:d}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/Layout",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:a}},TopNavigation:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+TopNavigation.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:t}}};export{F as configValuesSerialized};
