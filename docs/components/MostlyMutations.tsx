export { MostlyMutations }

import React from 'react'

function MostlyMutations({ toolName }: { toolName: JSX.Element | string }) {
  return (
    <>
      <p>
        We recommend against using Telefunc for fetching the initial data of a page. Instead, we recommend to use{' '}
        {toolName}
        's built-in data fetching mechanism.
      </p>
      <p>
        However, we can use Telefunc for fetching data after the initial page render, for example for pagination or
        infinite scroll.
      </p>
    </>
  )
}
