export { MostlyMutations }

import { Link } from 'libframe-docs/components'
import React from 'react'

function MostlyMutations({ toolName }: { toolName: JSX.Element | string }) {
  return (
    <>
      <p>
        We don't need to use Telefunc to fetch the initial data of pages; instead, we can use {toolName}'s built-in data
        fetching mechanism.
      </p>
      <p>
        We still use Telefunc for data mutations and data fetches occurring after the initial page is already rendered
        and hydrated. For example, for modifying a to-do item, or for feeding data to an infinite scroll component.
      </p>
      <p>
        Also see:
        <ul>
          <li>
            <Link href="/ssr#ssr-frameworks" doNotInferSectionTitle={true} />
          </li>
        </ul>
      </p>
    </>
  )
}
