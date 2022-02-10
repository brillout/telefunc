export { MostlyMutations }

import React from 'react'

function MostlyMutations({ toolName }: { toolName: JSX.Element | string }) {
  return (
    <>
      <p>{toolName} already offers mechanisms to fetch data from the server.</p>
      <p>
        We don't need Telefunc to fetch the initial data of the page, and we recommend to use Telefunc mostly to perform
        SQL/ORM queries that mutate data.
      </p>
      <p>
        That said, we can use Telefunc to dynamically load data after the page is already rendered & hydrated, such as
        to feed an infinite scroll implementation.
      </p>
    </>
  )
}
