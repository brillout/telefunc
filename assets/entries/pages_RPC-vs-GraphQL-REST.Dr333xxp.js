import{u as o,o as r,a as l}from"../chunks/chunk-CeChWwBg.js";import{j as e}from"../chunks/chunk-DJirElMN.js";import{L as t}from"../chunks/chunk-DNq9zuIM.js";/* empty css                      */import{N as i,a as d}from"../chunks/chunk-D3mbYYKC.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */const c=[{pageSectionId:"third-parties",pageSectionLevel:2,pageSectionTitle:"Third Parties"},{pageSectionId:"decoupled-frontend-backend",pageSectionLevel:2,pageSectionTitle:"Decoupled frontend-backend"},{pageSectionId:"telefunc-server",pageSectionLevel:2,pageSectionTitle:"Telefunc Server"},{pageSectionId:"multiple-frontends",pageSectionLevel:2,pageSectionTitle:"Multiple Frontends"},{pageSectionId:"complex-databases",pageSectionLevel:2,pageSectionTitle:"Complex Databases"},{pageSectionId:"which-one-to-choose",pageSectionLevel:2,pageSectionTitle:"Which one to choose?"}];function a(s){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",figure:"figure",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["See ",e.jsx(t,{href:"/RPC"})," if you don't know what it is."]}),`
`]}),`
`,e.jsxs(i,{children:[e.jsx("b",{children:"TL;DR"}),e.jsx(n.p,{children:"A GraphQL/RESTful API is only needed if:"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"We want to give third parties access to our database."}),`
`,e.jsx(n.li,{children:"We are a very large company with highly complex databases."}),`
`]}),e.jsx(n.p,{children:"Otherwise, we can use RPC for a significant increase in development speed."}),e.jsx(n.p,{children:`Contrary to common belief, we can use RPC while having
a decoupled frontend-backend development.`})]}),`
`,e.jsx("h2",{id:"third-parties",children:"Third Parties"}),`
`,e.jsx(n.p,{children:`The most eminent use case for REST and GraphQL is giving
third parties access to our database.`}),`
`,e.jsx(n.p,{children:`For example, Facebook's API is used by ~200k third parties.
It makes sense that Facebook uses (and invented) GraphQL,
as GraphQL enables any third-party developer to extensively access Facebook's database,
thus enabling all kinds of applications to be built on top of Facebook's data.`}),`
`,e.jsx(n.p,{children:`GraphQL/RESTful APIs are generic:
they are meant to serve frontends without knowing the frontends' data query/mutation requirements.`}),`
`,e.jsxs(n.p,{children:[`In contrast,
as we discussed in `,e.jsx(t,{href:"/event-based"}),`,
telefunctions (RPC endpoints) are tailored to our frontend's UI components.
This means that our telefunctions are only useful for our frontend and
third parties cannot use them to build third-party frontends.`]}),`
`,e.jsx(d,{icon:e.jsx(n.span,{style:{fontSize:"1.1em"},children:"⚗️"}),children:e.jsxs(n.p,{children:[e.jsx("b",{children:"Research Area"}),`.
It is theoretically possible to also use RPC for giving third parties access to our database,
but this has not been done so far.
Reach out to the Telefunc maintainers if you are interested in exploring this topic.`]})}),`
`,e.jsx("h2",{id:"decoupled-frontend-backend",children:"Decoupled frontend-backend"}),`
`,e.jsx(n.p,{children:"A common misbelief is that GraphQL/REST is required to decouple the frontend development from the backend development."}),`
`,e.jsx(n.p,{children:`It is true that GraphQL/REST induces a decoupling:
as we have seen in the last section,
a GraphQL/RESTful API is generic which
means that the frontend team can develop independently of the backend team.`}),`
`,e.jsxs(n.p,{children:["But we can as well achieve a decoupled frontend-backend development with RPC by using what we call a ",e.jsx(n.em,{children:"Telefunc Server"}),"."]}),`
`,e.jsx("h2",{id:"telefunc-server",children:"Telefunc Server"}),`
`,e.jsx(n.p,{children:`We usually install Telefunc as a Node.js server middleware.
This induces a tight coupling between our frontend and our Node.js server.`}),`
`,e.jsx(n.p,{children:"For example, let's consider this telefunction:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"js","data-theme":"github-light",children:e.jsxs(n.code,{"data-language":"js","data-theme":"github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// TodoList.telefunc.js"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// Environment: server"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"import"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { getContext } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"from"}),e.jsx(n.span,{style:{color:"#032F62"},children:" 'telefunc'"})]}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// This telefunction is tightly coupled to the frontend: it returns exactly and"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#6A737D"},children:"// only what the <TodoList /> component needs."})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"export"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" async"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" function"}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getInitialData"}),e.jsx(n.span,{style:{color:"#24292E"},children:"() {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"user"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#6F42C1"},children:" getContext"}),e.jsx(n.span,{style:{color:"#24292E"},children:"()"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  if"}),e.jsx(n.span,{style:{color:"#24292E"},children:" ("}),e.jsx(n.span,{style:{color:"#D73A49"},children:"!"}),e.jsx(n.span,{style:{color:"#24292E"},children:"user) {"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"    return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { isNotLoggedIn: "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"true"}),e.jsx(n.span,{style:{color:"#24292E"},children:" }"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  }"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#005CC5"},children:" todoItems"}),e.jsx(n.span,{style:{color:"#D73A49"},children:" ="}),e.jsx(n.span,{style:{color:"#D73A49"},children:" await"}),e.jsx(n.span,{style:{color:"#24292E"},children:" database."}),e.jsx(n.span,{style:{color:"#6F42C1"},children:"query"}),e.jsx(n.span,{style:{color:"#24292E"},children:"("})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#032F62"},children:"    'SELECT id, text FROM todos WHERE authorId = :authorId'"}),e.jsx(n.span,{style:{color:"#24292E"},children:","})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    { authorId: user.id }"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  )"})}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  const"}),e.jsx(n.span,{style:{color:"#24292E"},children:" { "}),e.jsx(n.span,{style:{color:"#005CC5"},children:"firstName"}),e.jsx(n.span,{style:{color:"#24292E"},children:" } "}),e.jsx(n.span,{style:{color:"#D73A49"},children:"="}),e.jsx(n.span,{style:{color:"#24292E"},children:" user"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{color:"#D73A49"},children:"  return"}),e.jsx(n.span,{style:{color:"#24292E"},children:" {"})]}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    user: { firstName },"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"    todoItems"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"  }"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{color:"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["If we change our ",e.jsx(n.code,{children:"<TodoList>"}),` component to also show the to-do items' creation date,
then we need to change the SQL query of our `,e.jsx(n.code,{children:"getInitialData()"})," telefunction from ",e.jsx(n.code,{children:"SELECT id, text"})," to ",e.jsx(n.code,{children:"SELECT id, text, created_at"}),"."]}),`
`,e.jsx(n.p,{children:"This means that the frontend developers need to make changes to the Node.js server and re-deploy it."}),`
`,e.jsx(n.p,{children:`If we are a small team of full-stack developers, then such frontend-backend coupling is not a problem.
But, as we grow, we may want to have a frontend team that develops independently of a backend team.`}),`
`,e.jsx(n.p,{children:"We can achieve a decoupling by using a Telefunc Server: a dedicated Node.js server with the sole purpose of serving telefunctions."}),`
`,e.jsx(n.p,{children:`The frontend and the Telefunc server are developed & deployed hand-in-hand,
while the backend (another Node.js server, Ruby on Rails, ...) can be developed & deployed independently.`}),`
`,e.jsx("h2",{id:"multiple-frontends",children:"Multiple Frontends"}),`
`,e.jsx(n.p,{children:"Another common misbelief is that GraphQL/REST is required to develop several frontends."}),`
`,e.jsxs(n.p,{children:["We can develop multiple frontends as well with RPC by having one ",e.jsx(n.a,{href:"#telefunc-server",children:"Telefunc Server"})," per frontend."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`The rise of edge computing,
such as Cloudflare Workers,
makes Telefunc Servers
highly performant,
cheap (with generous free tiers),
and easy to set up.`}),`
`]}),`
`,e.jsx("h2",{id:"complex-databases",children:"Complex Databases"}),`
`,e.jsx(n.p,{children:"A less common but nonetheless widespread use case is the usage of GraphQL in very large companies."}),`
`,e.jsx(n.p,{children:`The databases of large companies can become too complex for
the frontend team.`}),`
`,e.jsx(n.p,{children:`Instead of the frontend team directly accessing the databases with Telefunc & SQL/ORM queries,
we create a GraphQL API that is simpler to use.
We essentially use GraphQL to abstract away the complexities of our databases.`}),`
`,e.jsx(n.p,{children:`For performance-critical apps deployed at large scale,
such as Twitter or Facebook,
it is common to use several database technologies at once.
We can then even use GraphQL to simplify the life of
not only the frontend developers but also the backend developers:
the backend developers then also use the GraphQL API instead of directly accessing our databases.`}),`
`,e.jsx(n.p,{children:`A GraphQL API enables an independent database development
which can become a crucial strategy at scale.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`GraphQL is the state-of-the-art for this use case;
a RESTful API would be too limiting.`}),`
`]}),`
`,e.jsx("h2",{id:"which-one-to-choose",children:"Which one to choose?"}),`
`,e.jsx(n.p,{children:`RPC enables our frontend to directly use ORM/SQL queries which is not only a fundamentally simpler approach,
but also more powerful (we can achieve more with ORM/SQL queries than with GraphQL/RESTful queries).
So we should use RPC whenever we can for a significant increase in development speed.`}),`
`,e.jsx(n.p,{children:"Also, RPC is a natural fit for the increasingly ubiquitous practice of full-stack development with frameworks such as Next.js."}),`
`,e.jsx(n.p,{children:`On the other hand, we need GraphQL/REST if we need to
give third parties access to our database.`}),`
`,e.jsx(n.p,{children:"Also, using a GraphQL API can be a crucial strategy for very large companies with highly complex databases."}),`
`,e.jsx(n.p,{children:"In general, a sensible default is to start with RPC and use GraphQL/REST only when the need arises."})]})}function h(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}const p=Object.freeze(Object.defineProperty({__proto__:null,default:h,pageSectionsExport:c},Symbol.toStringTag,{value:"Module"})),L={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/renderer/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:l}},onCreatePageContext:{type:"cumulative",definedAtData:[{filePathToShowToUser:"@brillout/docpress/renderer/onCreatePageContext",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:r}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/RPC-vs-GraphQL-REST/+Page.mdx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:p}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"@brillout/docpress/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}}};export{L as configValuesSerialized};
