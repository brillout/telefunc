import{o,a as r}from"../chunks/chunk-Dy3mUagX.js";import{j as e}from"../chunks/chunk-Cv4Or4mx.js";import{L as s}from"../chunks/chunk-BL3rSK6L.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */const a=[{pageSectionId:"example",pageSectionLevel:2,pageSectionTitle:"Example"},{pageSectionId:"convention",pageSectionLevel:4,pageSectionTitle:"Convention"},{pageSectionId:"too-restrictive-convention",pageSectionLevel:4,pageSectionTitle:"Too restrictive convention?"},{pageSectionId:"naming-convention",pageSectionLevel:2,pageSectionTitle:"Naming convention"},{pageSectionId:"opt-out",pageSectionLevel:3,pageSectionTitle:"Opt-out"},{pageSectionId:"exception-several-clients",pageSectionLevel:2,pageSectionTitle:"Exception: several clients"}];function t(l){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",figure:"figure",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"What is this page about?"})}),`
`,e.jsx(n.p,{children:"This page explains how to use Telefunc in a way that significantly increases development speed. We recommend reading it — it's worth it!"}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(s,{href:"/RPC"})," if you aren't familiar with RPC."]}),`
`]}),`
`,e.jsx(n.p,{children:"With REST and GraphQL, API endpoints are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Generic (agnostic to your frontend needs)"}),`
`,e.jsx(n.li,{children:"Backend-owned (defined and implemented by the backend team)"}),`
`]}),`
`,e.jsx(n.p,{children:"With Telefunc, it's usually the opposite — telefunctions are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Tailored (specific to your frontend needs)"}),`
`,e.jsx(n.li,{children:"Frontend-owned (defined and implemented by the frontend team)"}),`
`]}),`
`,e.jsx(n.p,{children:"This inversion is at the cornerstone of using Telefunc efficiently."}),`
`,e.jsxs(n.p,{children:["You may be tempted to create generic telefunctions out of habit from REST/GraphQL (or to keep things ",e.jsx(n.a,{href:"https://softwareengineering.stackexchange.com/questions/400183/what-should-i-consider-when-the-dry-and-kiss-principles-are-incompatible",children:"DRY"}),") but we recommend against it. Instead, we recommend implementing what we call ",e.jsx(n.em,{children:"event-based telefunctions"}),"."]}),`
`,e.jsx(n.p,{children:"In the example below, we explain why event-based telefunctions lead to increased:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Development speed (and we explain how to keep things DRY)"}),`
`,e.jsx(n.li,{children:"Security"}),`
`,e.jsx(n.li,{children:"Performance"}),`
`]}),`
`,e.jsx("h2",{id:"example",children:"Example"}),`
`,e.jsxs(n.p,{children:["Imagine an existing to-do list app, and the product manager requests a new feature: add a new button ",e.jsx(n.code,{children:"Mark all tasks as completed"}),"."]}),`
`,e.jsx(n.p,{children:"With a RESTful API, the app would typically do this:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"shell","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"shell","data-theme":"github-light",style:{display:"grid"},children:[e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"HTTP"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            URL"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                                           PAYLOAD"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#24292E"},children:"=========       "}),e.jsx(n.span,{style:{color:"#032F62"},children:"========================================="}),e.jsx(n.span,{style:{color:"#032F62"},children:"     ====================="})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"# Make a request to fetch all non-completed tasks"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"GET"}),e.jsx(n.span,{style:{color:"#032F62"},children:"             https://api.todo.com/task?completed="}),e.jsx(n.span,{style:{color:"#005CC5"},children:"false"}),e.jsx(n.span,{style:{color:"#032F62"},children:"     ∅"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"# Make a request per task to update it"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"POST"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            https://api.todo.com/task/42"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                  {"}),e.jsx(n.span,{style:{color:"#032F62"},children:' "completed":'}),e.jsx(n.span,{style:{color:"#005CC5"},children:" true"}),e.jsx(n.span,{style:{color:"#032F62"},children:" }"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"POST"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            https://api.todo.com/task/1337"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                {"}),e.jsx(n.span,{style:{color:"#032F62"},children:' "completed":'}),e.jsx(n.span,{style:{color:"#005CC5"},children:" true"}),e.jsx(n.span,{style:{color:"#032F62"},children:" }"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"POST"}),e.jsx(n.span,{style:{color:"#032F62"},children:"            https://api.todo.com/task/7"}),e.jsx(n.span,{style:{color:"#032F62"},children:"                   {"}),e.jsx(n.span,{style:{color:"#032F62"},children:' "completed":'}),e.jsx(n.span,{style:{color:"#005CC5"},children:" true"}),e.jsx(n.span,{style:{color:"#032F62"},children:" }"})]})]})})}),`
`,`
`,e.jsxs(n.p,{children:["This is inefficient as it makes a lot of HTTP requests (the infamous ",e.jsx(n.code,{children:"N+1"})," problem)."]}),`
`,e.jsx(n.p,{children:"With Telefunc, you can do this instead:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// components/TodoList.telefunc.ts"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { Tasks } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" '../database/Tasks'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onMarkAllAsCompleted"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // With an ORM:"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Tasks."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"update"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"true"}),e.jsx(n.span,{style:{color:"#24292E"},children:" })."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"where"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"false"}),e.jsx(n.span,{style:{color:"#24292E"},children:" })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  /* Or with SQL:"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  await sql('UPDATE tasks SET completed = true WHERE completed = false')"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  */"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["The telefunction ",e.jsx(n.code,{children:"onMarkAllAsCompleted()"})," is tailored: it's created specifically to serve the needs of the ",e.jsx(n.code,{children:"<TodoList>"})," component. It's simpler and a lot more efficient."]}),`
`,e.jsx("h4",{id:"convention",children:"Convention"}),`
`,e.jsxs(n.p,{children:["We recommend naming telefunctions ",e.jsx(n.code,{children:"onSomeEvent()"})," (see ",e.jsx(s,{href:"#naming-convention"}),"), because telefunction calls are always triggered by some kind of event — typically a user action, such as the user clicking on a button."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"shell","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"shell","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"# Also: we recommend co-locating .telefunc.js files"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"components/TodoList.telefunc.ts"}),e.jsx(n.span,{style:{color:"#6A737D"},children:" # telefunctions for <TodoList>"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"components/TodoList.tsx"}),e.jsx(n.span,{style:{color:"#6A737D"},children:" # <TodoList> implementation"})]})]})})}),`
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
`,e.jsx(n.p,{children:"This naming convention ensures telefunctions are tightly coupled to UI components."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"With Telefunc, you think in terms of what the frontend needs (instead of thinking of the backend as a generic data provider). From that perspective, it makes more sense to co-locate telefunctions next to UI components (instead of next to where data comes from)."}),`
`]}),`
`,e.jsx("h4",{id:"too-restrictive-convention",children:"Too restrictive convention?"}),`
`,e.jsx(n.p,{children:"The naming convention is slightly restrictive, but it's worth it."}),`
`,e.jsxs(n.p,{children:["To keep things ",e.jsx(n.a,{href:"https://softwareengineering.stackexchange.com/questions/400183/what-should-i-consider-when-the-dry-and-kiss-principles-are-incompatible",children:"DRY"})," you may be tempted to define a single telefunction that is re-used by many UI components. For example:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"ts","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"ts","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// database/actions/tasks.telefunc.ts"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { Task } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" '../models/Task'"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { getContext } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// One telefunction used by multiple UI components"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" updateTask"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" number"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"mods"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Partial"}),e.jsx(n.span,{style:{color:"#24292E"},children:"<"}),e.jsx(n.span,{style:{color:"#D73A49"},children:"typeof"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Task>) {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"user"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getContext"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" task"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Task."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"update"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(mods)."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"where"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ id, author: user.id })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // Returns the updated value task.modifiedAt"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" task"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx(n.p,{children:"But this generic telefunction has two issues:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["It isn't safe.",`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["As explained at ",e.jsx(s,{href:"/RPC"}),", telefunctions are public. This means any user can call ",e.jsx(n.code,{children:"updateTask({ author: Math.floor(Math.random()*100000) })"})," which is a big security issue."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["It isn't efficient.",`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Because ",e.jsx(n.code,{children:"updateTask()"})," is generic, it must ",e.jsx(n.code,{children:"return task"})," in case a component requires ",e.jsx(n.code,{children:"task.modifiedAt"})," — but if some components don't need it, this results in wasted network bandwidth."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"This shows how easy it is to introduce security issues and inefficiencies with generic telefunctions."}),`
`,e.jsx(n.p,{children:"Generic telefunctions typically:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Make reasoning about ",e.jsx(s,{href:"/RPC#security",children:"RPC security"})," harder, leading to subtle bugs and security issues."]}),`
`,e.jsxs(n.li,{children:["Decrease ",e.jsx(s,{href:"/RPC#performance",children:"RPC performance"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"We recommend the following instead:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// database/actions/task.ts"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { getContext } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// This isn't a telefunction: it's a normal server-side function"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" updateTask"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" number"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"mods"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" Partial"}),e.jsx(n.span,{style:{color:"#24292E"},children:"<"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"Task"}),e.jsx(n.span,{style:{color:"#24292E"},children:">) {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"user"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getContext"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() "}),e.jsx(n.span,{style:{color:"#6A737D"},children:"// Can also be used in normal functions"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" task"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" Task."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"update"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(mods)."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"where"}),e.jsx(n.span,{style:{color:"#24292E"},children:"({ id, author: user.id })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"  // Returns the updated value task.modifiedAt"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" task"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// components/TodoList.telefunc.ts"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { updateTask } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" '../database/actions/task'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Returns task.modifiedAt"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" const"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onTodoTextUpdate"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" number"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" string"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" updateTask"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(id, { text })"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Doesn't return task.modifiedAt"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" const"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onTodoCompleted"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" number"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"await"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" updateTask"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(id, { completed: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"false"}),e.jsx(n.span,{style:{color:"#24292E"},children:" }) }"})]})]})})}),`
`,e.jsx(n.p,{children:"It's slightly less DRY but, in exchange, you get a much clearer structure around security and performance."}),`
`,e.jsx(n.p,{children:"When a telefunction is tightly coupled with a component:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The telefunction's return value can be minimal (exactly and only what is needed by the component), which leads to increased performance."}),`
`,e.jsx(n.li,{children:"The telefunction's arguments can be minimal (exactly and only what is needed by the component), which leads to increased security."}),`
`,e.jsxs(n.li,{children:["The telefunction can allow only what is strictly required by the component.",`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"A cornerstone of security is to grant only the permissions that are strictly required."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Thus, we recommend creating event-based telefunctions while following the naming convention."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"If there are two UI components that could use the exact same telefunction — wouldn't it be nice to create a single telefunction instead of two?"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"It's a rare situation (UI components usually have slightly different requirements)."}),`
`,e.jsx(n.li,{children:"Consider creating a new shared UI component used by these two components instead."}),`
`,e.jsxs(n.li,{children:["Using the deduplication approach shown above, only one line of duplicated code remains:",`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoItem.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Defined once for <TodoItem>"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" const"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onTodoTextUpdate"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" number"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" string"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" updateTask"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(id, { text })"})]})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Defined again for <TodoList> — the code duplication is only one line of code"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" const"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" onTodoTextUpdate"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#E36209"},children:"id"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" number"}),e.jsx(n.span,{style:{color:"#24292E"},children:", "}),e.jsx(n.span,{style:{color:"#E36209"},children:"text"}),e.jsx(n.span,{style:{color:"#D73A49"},children:":"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" string"}),e.jsx(n.span,{style:{color:"#24292E"},children:") "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"=>"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" updateTask"}),e.jsx(n.span,{style:{color:"#24292E"},children:"(id, { text })"})]})]})})}),`
`]}),`
`]}),`
`]}),`
`,e.jsx("h2",{id:"naming-convention",children:"Naming convention"}),`
`,e.jsxs(n.p,{children:["As explained in ",e.jsx(s,{href:"#example",children:"the example above"}),", for a clear structure and more effective use of Telefunc, we recommend the following convention."]}),`
`,e.jsxs(n.p,{children:["Name telefunctions ",e.jsx(n.code,{children:"onSomeEvent()"}),":"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"bash","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"bash","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    TELEFUNCTIONS"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    ============="})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  updateTodo"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onTodoTextUpdate"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onTodoComplete"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  loadData"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onLoad"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onPagination"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  onInfiniteScroll"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]})]})})}),`
`,e.jsxs(n.p,{children:["Co-locate ",e.jsx(n.code,{children:".telefunc.js"})," files next to UI component files:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{style:{backgroundColor:"#fff",color:"#24292e"},tabIndex:"0","data-language":"shell","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"shell","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    FILES"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    ====="})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    components/TodoItem.tsx"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  components/TodoItem.telefunc.ts"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  database/todo.telefunc.ts"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6F42C1"},children:"    components/User.vue"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"✅"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  components/User.telefunc.js"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#6F42C1"},children:"❌"}),e.jsx(n.span,{style:{color:"#032F62"},children:"  database/user/getLoggedInUser.telefunc.js"})]})]})})}),`
`,e.jsx(n.p,{children:"This convention is optional and you can opt-out."}),`
`,e.jsx("h3",{id:"opt-out",children:"Opt-out"}),`
`,e.jsxs(n.p,{children:["Telefunc shows a warning if you don't follow the naming convention — you can remove the warning with ",e.jsx(s,{text:e.jsx(n.code,{children:"config.disableNamingConvention"}),href:"/disableNamingConvention"}),"."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Not following the naming convention is perfectly fine, though we recommend having a clear reason for breaking the rule."}),`
`,e.jsxs(n.p,{children:["We recommend reading ",e.jsx(s,{href:"#example",children:"the example above"})," before opting out of the convention. It explains why event-based telefunctions lead to increased:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Development speed"}),`
`,e.jsx(n.li,{children:"Security"}),`
`,e.jsx(n.li,{children:"Performance"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://github.com/brillout/telefunc/issues/new",children:"Feel free to reach out"})," if you have questions."]}),`
`]}),`
`,e.jsx("h2",{id:"exception-several-clients",children:"Exception: several clients"}),`
`,e.jsx(n.p,{children:"If your telefunctions are used by multiple clients, it can make sense to define a few generic telefunctions that cover all clients, instead of creating different telefunctions for each client."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Alternatively, you can deploy one Telefunc server per client to preserve the fast development speed of tailored telefunctions."}),`
`]})]})}function i(l={}){const{wrapper:n}=l.components||{};return n?e.jsx(n,{...l,children:e.jsx(t,{...l})}):t(l)}const c=Object.freeze(Object.defineProperty({__proto__:null,default:i,pageSectionsExport:a},Symbol.toStringTag,{value:"Module"})),b={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/renderer/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:r}},onCreatePageContext:{type:"cumulative",definedAtData:[{filePathToShowToUser:"@brillout/docpress/renderer/onCreatePageContext",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:o}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/event-based/+Page.mdx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:c}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}}};export{b as configValuesSerialized};
