import React from 'react'
import DefineTelefunctionSnippet from './DefineTelefunctionSnippet.mdx'
import ServerSetupSnippet from './ServerSetupSnippet.mdx'
import SimpleQuerySnippet from './SimpleQuerySnippet.mdx'
import './QuickStart.css'

export { Quickstart }

function Quickstart() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 1000,
        margin: '0 auto',
        marginTop: 80,
        lineHeight: 1.75,
      }}
    >
      <div className="setup-step" style={{ display: 'flex', padding: 8, columnGap: 48 }}>
        <div className="setup-info">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <Digit value={1} />
            <h2 style={{ margin: 0 }}>Define your telefunction</h2>
          </div>
          <p style={{ lineHeight: 2 }}>
            Telefunctions are slim server functions that are scoped to UI events or interactions.
          </p>
          <p style={{ lineHeight: 2 }}>
            To invoke them remotely, Telefunc wraps front-end calls with a lightweight HTTP client that handles the
            request boilerplate. Server-side, Telefunc middleware intercepts the call and runs our function.
          </p>
          <p style={{ lineHeight: 2 }}>
            Telefunc automatically generates a runtime **shield** from your argument types, so we don't need to worry
            about validation. In this example, we just need to check user permissions, then run our SQL.
          </p>
          <p style={{ lineHeight: 2 }}>
            Since our telefunction is scoped to a specific event, we only need to return the data our UI needs (in this
            case, nothing).
          </p>
        </div>
        <div>
          <DefineTelefunctionSnippet />
        </div>
      </div>
      <div className="setup-step" style={{ display: 'flex', padding: 8, columnGap: 48 }}>
        <div className="setup-info">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <Digit value={2} />
            <h2 style={{ margin: 0 }}>Add to your server</h2>
          </div>
          <p style={{ lineHeight: 2 }}>
            Telefunc is built on Web Standards, and works out-of-box with any <code>Request</code>- or Node.js-
            <code>req</code>-compatible server.
          </p>
          <p style={{ lineHeight: 2 }}>
            This includes metaframeworks like Next.js, Nuxt, or Vike, backend servers like Hono or Express, and bundlers
            or frameworks like Vite or Cloudflare Workers. We simply add middleware at <code>/_telefunc</code> to adapt
            the request and response as needed.
          </p>
          <p style={{ lineHeight: 2 }}>
            This is also our opportunity to populate the Telefunc <code>Context</code>, e.g., with _required_ server
            request context.
            <b>Remember, Telefunc is all about keeping things small: security and performance through omission.</b>
          </p>
          <p style={{ lineHeight: 2 }}>
            The Telefunc middleware supports standard JSON and <code>File</code> data, and&nbsp;
            <a href="https://github.com/telefunc/telefunc/pull/236" style={{ fontWeight: 'bold' }}>
              streaming is coming soon
            </a>
            .
          </p>
        </div>
        <div>
          <ServerSetupSnippet />
        </div>
      </div>
      <div className="setup-step" style={{ display: 'flex', padding: 8, columnGap: 48 }}>
        <div className="setup-info">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <Digit value={3} />
            <h2 style={{ margin: 0 }}>Start querying</h2>
          </div>
          <p style={{ lineHeight: 2 }}>
            With Telefunc added to our server, we just need to import and call our telefunction!
          </p>
          <p style={{ lineHeight: 2 }}>
            By defining telefunctions in a `*.telefunc.ts` file next to the component that calls them, we get type
            inference and autocompletion for free.
          </p>
          <p style={{ lineHeight: 2 }}>
            Likewise, naming telefunctions <code>onSomeEvent</code> is an easy wasy to prevent scope keep. That way our
            app is more secure and performant by design.
          </p>
        </div>
        <div>
          <SimpleQuerySnippet />
        </div>
      </div>
      <div>
        <h2>You may not need an API schema</h2>
        <figure>
          <blockquote>Premature optimization is the root of all evil.</blockquote>
          <figcaption style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <small>
              <em>Turing Award winner, Donal Knuth</em>
            </small>
          </figcaption>
        </figure>
        <p>
          Telefunc enables you to stay lean, iterating faster and pivoting more flexibly. Many apps will never need a
          public (or schema-full) API, but if that changes, adopting REST or GraphQL is fairly straightforward.
          Telefunctions are just functions.
        </p>
        <p>
          If your goal is to enable third party developers to access your data, then you need a generic API and you'll
          have to use REST or GraphQL.
        </p>
        <p>
          But but if your goal is to seamlessly add data and interactivity to a front-end, then Telefunc can improve DX
          and enable security and performance optimizations.
        </p>
      </div>
    </div>
  )
}

function Digit({ value }: { value: number }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        background: 'rgb(247, 224, 24)',
        borderRadius: '50%',
        padding: '6px 13px',
        margin: 4,
        marginRight: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        float: 'left',
      }}
    >
      {value}
    </div>
  )
}
