import cm from '@classmatejs/react'
import { Alert } from '@unterberg/nivel'
import { ProseContainer } from '@unterberg/nivel/client'
import DefineTelefunctionSnippet from './DefineTelefunctionSnippet.mdx'
import ServerSetupSnippet from './ServerSetupSnippet.mdx'
import SimpleQuerySnippet from './SimpleQuerySnippet.mdx'

const QuickStartProse = cm.extend(ProseContainer)`
  prose-headings:my-0 
  prose-headings:mb-4 
  prose-img:my-0
`

const StyledHeadingNumber = cm.span`
  xl:-ml-12
  w-6 xl:w-9 
  h-6 xl:h-9
  text-base! xl:text-lg! 
  flex justify-center items-center 
  rounded-full 
  text-center font-bold 
  bg-primary text-primary-content 
`

export const Quickstart = () => {
  return (
    <QuickStartProse className="grid lg:grid-cols-2 gap-4 md:gap-y-12">
      <div className="lg:pr-10">
        <NumberedHeading index={1} label="Define your telefunction" />
        <p>Telefunctions are slim server functions that are scoped to UI events or interactions.</p>
        <p>
          To invoke them remotely, Telefunc wraps front-end calls with a lightweight HTTP client that handles the
          request boilerplate. Server-side, Telefunc middleware intercepts the call and runs our function.
        </p>
        <p>
          Telefunc automatically generates a runtime **shield** from your argument types, so we don't need to worry
          about validation. In this example, we just need to check user permissions, then run our SQL.
        </p>
        <p>
          Since our telefunction is scoped to a specific event, we only need to return the data our UI needs (in this
          case, nothing).
        </p>
      </div>
      <div>
        <DefineTelefunctionSnippet />
      </div>

      <div className="lg:pr-10">
        <NumberedHeading index={2} label="Add to your server" />
        <p>
          Telefunc is built on Web Standards, and works out-of-box with any <code>Request</code>- or Node.js-
          <code>req</code>-compatible server.
        </p>
        <p>
          This includes metaframeworks like Next.js, Nuxt, or Vike, backend servers like Hono or Express, and bundlers
          or frameworks like Vite or Cloudflare Workers. We simply add middleware at <code>/_telefunc</code> to adapt
          the request and response as needed.
        </p>
        <p>
          This is also our opportunity to populate the Telefunc <code>Context</code>, e.g., with <em>required</em>{' '}
          server request context.&nbsp;
          <b>Remember, Telefunc is all about keeping things small: security and performance through omission.</b>
        </p>
        <Alert>
          The Telefunc middleware supports standard JSON and <code>File</code> data, and&nbsp;
          <a href="https://github.com/telefunc/telefunc/pull/236" className="font-bold">
            streaming is coming soon.
          </a>
        </Alert>
      </div>
      <div>
        <ServerSetupSnippet />
      </div>

      <div className="lg:pr-10">
        <NumberedHeading index={3} label="Start querying" />
        <p>With Telefunc added to our server, we just need to import and call our telefunction!</p>
        <p>
          By defining telefunctions in a <code>*.telefunc.ts</code> file next to the component that calls them, we get
          type inference and autocompletion for free.
        </p>
        <p>
          Likewise, naming telefunctions <code>onSomeEvent</code> is an easy wasy to prevent scope keep. That way our
          app is more secure and performant by design.
        </p>
      </div>
      <div>
        <SimpleQuerySnippet />
      </div>
    </QuickStartProse>
  )
}

const NumberedHeading = ({ index, label }: { index: number; label: string }) => {
  return (
    <h3 className="flex items-center gap-3 text-2xl">
      <StyledHeadingNumber>{index}</StyledHeadingNumber>
      <span>{label}</span>
    </h3>
  )
}
