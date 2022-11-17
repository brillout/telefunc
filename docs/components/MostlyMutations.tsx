export { MostlyMutations }

import React from 'react'

function MostlyMutations({ toolName }: { toolName: JSX.Element | string }) {
  return (
    <>
      <p>
        We recommend against using Telefunc for fetching the initial data of a page (aka SSR data). Instead, use{' '}
        {toolName}
        's built-in data fetching mechanism.
      </p>
      <p>
        We can still use Telefunc for fetching data after the initial rendering of the page, for example pagination and
        infinite scroll.
      </p>
    </>
  )
}
