export { MostlyMutations }

import React from 'react'

function MostlyMutations({
  toolName,
  builtInMechanism,
}: {
  toolName: React.JSX.Element | string
  builtInMechanism?: string
}) {
  return (
    <>
      <p>
        For fetching the initial data of pages (SSR data) use {toolName}
        's built-in data fetching mechanism instead of Telefunc.
      </p>
      {builtInMechanism}
      <p>
        You can still use Telefunc for fetching data but only after the initial rendering of the page, for example for
        pagination or infinite scroll.
      </p>
      <blockquote>
        <p>
          <b>In case you're curious</b>: you cannot use Telefunc for server-side rendered (SSR) data because only the
          framework can pass SSR data from the server to the client-side (which is needed for hydration). This is common
          to all SSR frameworks like {toolName}.
        </p>
      </blockquote>
    </>
  )
}
