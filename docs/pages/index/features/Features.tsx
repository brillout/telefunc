import React from "react";
import { Emoji } from "libframe-docs/utils/Emoji";
import { FeatureList } from "libframe-docs/landing-page/features/FeatureList";

export { Features };

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
                Telefunctions make{" "}
                <b>all server utilities available to the frontend</b>.
              </p>
              <p>
                Your <b>frontend can simply use any SQL/ORM query</b> to
                retrieve & mutate data. No API needed.
              </p>
            </>
          ),
          learnMore: (
            <>
              <p>
                Your server utilities are one telefunction away; The frontend
                can use any The frontend can use any server utility to do it's
                job. Use any SQL With <code>vite-plugin-ssr</code> you integrate
                tools manually instead of using a plugin system.
              </p>
              <p></p>
              <>
                The barrier between frontend and backend is almost non-existent;
                it really is just a telefunction.
              </>
              (Thanks to recent trend continously deploying Frontend & Backend
              together, there is no API needed anymore!) Historically, APIs were
              historically needed because frontend and backed was deployed
              independently of each other; with the now ubiquitous continous
              deployement, APIs are not needed anymore
            </>
          ),
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
                Thanks to Telefunc's novel <code>Abort()</code> feature,{" "}
                <b>permissions can be defined programmatically</b>.
              </p>
              <p>
                It's both <b>simple</b> and <b>flexible</b>. Say goodbye to ACL
                mess.
              </p>
            </>
          ),
          learnMore: <></>,
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
                The frontend can tap into the <b>full power of the server</b>;
                highly tailored & optimized SQL/ORM queries can be used for
                high-performance data retrieval & mutations.
              </p>
              <p>
                <b>Fast Node.js cold start</b>: telefunctions are lazy-loaded so
                that adding telefunctions doesn't increase the cold start of
                your serverless functions.
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
                Every release is assailed against a heavy suite of{" "}
                <b>automated tests</b>.
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
              <Emoji name="plug" /> Any stack
            </>
          ),
          desc: (
            <>
              <p>
                Telefunc supports most bundlers (Webpack/Vite/Rollup) and has
                first-class support for both React SSR and Vue SSR.
              </p>
              <p>
                In other words, it works with your favorite stack (CRA, Next.js,
                Nuxt, Gatsby, SvelteKit, <code>vite-plugin-ssr</code>, etc.)
              </p>
              <p>
                Also, Telefunc has been designed to work with non-JavaScript
                backends such as Ruby on Rails or Django.
              </p>
            </>
          ),
          isSecondaryFeature: true,
        },
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
      ]}
    />
  );
}
