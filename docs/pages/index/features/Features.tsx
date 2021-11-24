import React from 'react'
import { Emoji } from 'libframe-docs/utils/Emoji'
import { FeatureList } from 'libframe-docs/landing-page/features/FeatureList'
import Simple from './Simple.mdx'
import Secure from './Secure.mdx'

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
                The idea is simple: you define functions on the server and call remotely from the client.
              </p>
              <p>
                Telefunctions enables your frontend to <b>directly use SQL/ORM queries</b> to retrieve & mutate data.
              </p>
            <p>
              This means that your frontend can use any SQL/ORM query to "directly" retrieve and mutate data.
            </p>
              <p>Not only is that powerful, but it's fundamentally simpler than a RESTful/GraphQL API.</p>
            </>
          ),
          learnMore: <Simple />,
        },
        {
          title: (
            <>
              <Emoji name="shield" /> Secure
            </>
          ),
          desc: (
            <>
              <p>
                Thanks to Telefunc's <code>Abort()</code>, <b>permissions can be defined programmatically</b>.
              </p>
              <p>
                It's both <b>simple</b> and <b>flexible</b>. Say goodbye to ACL mess.
              </p>
            </>
          ),
          learnMore: <Secure />,
        },
        {
          title: (
            <>
              <Emoji name="high-voltage" /> High-performance
            </>
          ),
          desc: (
            <>
              <p>
                The frontend can tap into the <b>full power of the server</b>; highly tailored & optimized SQL/ORM
                queries can be used for high-performance data retrieval & mutations.
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
              <Emoji name="gem-stone" /> Rock-solid
            </>
          ),
          desc: (
            <>
              <p>
                The source code of Telefunc has <b>no known bug</b>.
              </p>
              <p>
                Every release is assailed against a heavy suite of <b>automated tests</b>.
              </p>
              <p>
                <b>Used in production</b> by many comp&shy;anies.
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
                First-class & <b>seamless TypeScript support out-of-the-box</b>.
              </p>
              <p>
                Use your types across frontend and backend for <b>end-to-end type safety</b>.
              </p>
              <p>
            From TypeScript perspective, the frontend imoports server functions (TypeScript doens't know that the server function is actullay transformed).
            This means TypeScript just works.
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
                Telefunc supports <b>Webpack</b>, <b>Vite</b>, and <b>Rollup</b> and has first-class support for{' '}
                <b>React SSR</b> and <b>Vue SSR</b>.
              </p>
              <p>
                In other words, it works with any stack (CRA, Next.js, Nuxt, Gatsby, SvelteKit,{' '}
                <code>vite-plugin-ssr</code>, <b>Cloudflare Workers</b>, etc.)
              </p>
              <p>
                Also, Telefunc has been designed to work with{' '}
                <b>non-JavaScript backends such as Ruby on Rails or Django</b>.
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
