import React from 'react'
import { Emoji } from 'libframe-docs/utils/Emoji'
import { FeatureList } from 'libframe-docs/landing-page/features/FeatureList'
import Simple from './Simple.mdx'
import Permissions from './Permissions.mdx'

export { Features }

function Features() {
  return (
    <FeatureList
      features={[
        {
          title: (
            <>
              <Emoji name="dizzy" /> Simple
            </>
          ),
          desc: (
            <>
              <p>Telefunc simplifies the frontend-backend relationship &mdash; with Telefunc it's really just a set of remote function.</p>
              <p>
                Your frontend can <b>directly use any SQL/ORM query</b> to retrieve & mutate data.
              </p>
            </>
          ),
        },
        {
          title: (
            <>
              <Emoji name="shield" /> Permissions
            </>
          ),
          desc: (
            <>
              <p>
                Telefunc's <code>Abort()</code> enables you to <b>define permissions programmatically</b>.
              </p>
              <p>
                It's both <b>simple</b> and <b>flexible</b>.
              </p>
            </>
          ),
        },
        {
          title: (
            <>
              <Emoji name="plug" /> Any Stack
            </>
          ),
          desc: (
            <>
              <p>
                Telefunc supports both Webpack and Vite based stacks.
                This means it works with any framework: <b>Next.js</b>, <b>Nuxt</b>
                , <b>Vite/Vike</b>, <b>Angular</b>, <b>SvelteKit</b>, <b>CRA</b>, <b>Gatsby</b>, etc.
              </p>
              <p>You want to change your stack? Bring Telefunc along.</p>
            </>
          ),
        },
        {
          title: (
            <>
              <Emoji name="high-voltage" /> Performance
            </>
          ),
          desc: (
            <>
              <p>
                The frontend can directly tap into the <b>full power of the server</b>; highly tailored & optimized SQL/ORM
                queries can be used for highly-performant data retrieval & mutations.
              </p>
            </>
          ),
        },
        {
          title: (
            <>
              <Emoji name="typescript" /> TypeScript
            </>
          ),
          desc: (
            <>
              <p>
                Seamless <b>TypeScript support out-of-the-box</b>.
              </p>
              <p>
                Use your types across frontend-backend for <b>end-to-end type safety</b>.
              </p>
            </>
          ),
        },
        {
          title: (
            <>
              <Emoji name="gem-stone" /> Rock-solid
            </>
          ),
          desc: (
            <>
              <p>
                The source code of Telefunc has <b>no known bug</b> (bugs are fixed swiftly) and every release is
                assailed against a heavy suite of <b>automated tests</b>.
              </p>
            </>
          ),
        },
      ]}
    />
  )
}
