import React from 'react'
import { Emoji } from '@brillout/docpress'
import { FeatureList } from '@brillout/docpress'

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
          )
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
              <p>Telefunc introduces new techniques to define advanced permissions and increase safety.</p>
            </>
          )
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
                Telefunc supports <b>Next.js</b>, <b>CRA</b>, <b>Nuxt</b>, <b>Vite</b>, <b>vite-plugin-ssr</b>,{' '}
                <b>React Native</b> and other frameworks based on Webpack, Babel, Parcel or Vite.
              </p>
            </>
          )
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
                The frontend can directly tap into the <b>full power of the server</b>. Use tailored SQL/ORM queries for
                highly performant data retrieval and mutations.
              </p>
            </>
          )
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
                <b>Seamless TypeScript support</b> out-of-the-box including all your favorite IDE features such as
                auto-import, replace-all-occurrences, etc.
              </p>
              <p>
                <b>Automatic runtime validation</b> for end-to-end type safety.
              </p>
            </>
          )
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
          )
        }
      ]}
    />
  )
}
