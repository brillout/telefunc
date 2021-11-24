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
              <p>Telefunc simplifies your frontend-backend liason: it's now all really just a function.</p>
              <p>
                Your frontend can <b>directly use any SQL/ORM query</b> to retrieve & mutate data.
              </p>
              <p>Say goodbye to the API layer, which is an unnecessary indirection for the vast majority of apps.</p>
            </>
          ),
          learnMore: <Simple />,
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
                Telefunc's <code>Abort()</code> and <code>shield()</code> enable{' '}
                <b>programmatically defined permissions</b>.
              </p>
              <p>
                It's both <b>simple</b> and <b>flexible</b>.
              </p>
              <p>
                Say goodbye to declaratively defined permissions, which are inherently messy and thus a security hazard.
              </p>
            </>
          ),
          learnMore: <Permissions />,
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
                The frontend can tap into the <b>full power of the server</b>; highly tailored & optimized SQL/ORM
                queries can be used for highly-performant data retrieval & mutations.
              </p>
              <p>
                <b>Fast Node.js cold start</b>: telefunctions are lazy-loaded so that adding telefunctions doesn't
                increase the cold start of your serverless functions.
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
                <b>Seamless TypeScript support</b> out-of-the-box.
              </p>
              <p>
                Use your types across frontend and backend to enable <b>end-to-end type safety</b>.
              </p>
              <p><code>shield()</code> infers types so you define your times only once for both runtime and compile-time.</p>
              <p>
                From TypeScript's perspective, the frontend directly imports server functions (TypeScript doens't know
                that the
                <code>.telefunc.js</code> files are transformed). In other words: TypeScript just works.
              </p>
            </>
          ),
          learnMore: <>Bla</>,
        },
        {
          title: (
            <>
              <Emoji name="plug" /> Any stack
            </>
          ),
          desc: (
            <>
              <p>
                Telefunc supports React, Vue, SSR, Webpack, and Vite. In other words, it works with: <b>Next.js</b>,{' '}
                <b>Nuxt</b>, <b>Gatsby</b>, <b>SvelteKit</b>, <b>CRA</b>, <b>etc.</b>
              </p>
              <p>You want to change your stack? You can bring Telefunc along.</p>
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
                The source code of Telefunc has <b>no known bug</b> (bugs are fixed swiftly), and every release is
                assailed against a heavy suite of <b>automated tests</b>.
              </p>
            </>
          ),
        },
        /*
        {
          title: (
            <>
              <Emoji name="red-heart" /> Craftmanship
            </>
          ),
          desc: (
            <>
              <p>
                Crafted with <b>attention to details</b> and{" "}
                <b>care for simplicity</b>.
              </p>
              <p>
                GitHub and Discord <b>conversations are welcome</b>.
              </p>
            </>
          ),
          isSecondaryFeature: true,
        },
        {
          title: <>Bla</>,
          desc: <></>,
          isSecondaryFeature: true,
        },
        */
      ]}
    />
  )
}
