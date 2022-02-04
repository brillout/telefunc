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
              <p>
                With Telefunc, you get a <b>simple frontend-backend relationship</b>: it's just a set of remote
                functions.
              </p>
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
                Telefunc enables <b>programmatically defined permissions</b>. It's both <b>simple</b> and{' '}
                <b>flexible</b>.
              </p>
              <p>
                Telefunc introduces new techniques that enable advanced permissions and <b>hardened safety</b>.
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
                Telefunc supports{' '}
                <b>Next.js</b>, <b>Nuxt</b>, <b>SvelteKit</b>, <b>Vite</b>, <b>Vike</b> and any framework{' '}
                based on Webpack or Vite.
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
                The frontend can directly tap into the <b>full power of the server</b>. You can use tailored and
                optimized SQL/ORM queries for highly performant data retrieval and mutations.
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
