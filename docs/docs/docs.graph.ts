import type { DocsGraph } from '@unterberg/nivel'

export const docsGraph = {
  items: [
    {
      kind: 'section',
      id: 'documentation',
      title: 'Docs',
      navTitle: 'Docs',
      items: [
        {
          kind: 'group',
          id: 'getting-started',
          title: 'Getting Started',
          items: [
            {
              kind: 'page',
              id: 'quickStart',
              title: 'Quick Start',
              slug: 'quick-start',
              source: 'content/quick-start/content.mdx',
              aliases: ['start', 'intro'],
              description:
                'Install Telefunc, add server middleware, create your first telefunction, secure it with guards, and learn where SSR initial data fits.',
            },
            {
              kind: 'page',
              id: 'concepts',
              title: 'Concepts',
              slug: 'concepts',
              source: 'content/concepts/content.mdx',
              description:
                "Understand Telefunc's RPC model, how telefunctions behave like local imports, and why colocated full-stack code improves DX and performance.",
            },
            {
              kind: 'page',
              id: 'bestPractices',
              title: 'Best Practices',
              slug: 'best-practices',
              source: 'content/best-practices/content.mdx',
              description:
                'Follow Telefunc best practices for event-based telefunctions, colocation, naming, guards, and keeping multi-client code slim.',
            },
          ],
        },
        {
          kind: 'group',
          id: 'guides',
          title: 'Guides',
          items: [
            {
              kind: 'group',
              id: 'server-guides',
              title: 'Server Integration',
              href: 'server-integration',
              collapsible: {
                isDefaultOpen: false,
              },
              items: [
                {
                  kind: 'page',
                  id: 'serverIntegration',
                  title: 'Server Integration',
                  slug: 'server-integration',
                  source: 'content/server-integration/content.mdx',
                  aliases: ['server'],
                  description:
                    'Add Telefunc middleware to Hono, Express, Fastify, and other servers, and pass request context into your telefunctions.',
                },
                {
                  kind: 'page',
                  id: 'next',
                  title: 'Next.js',
                  slug: 'next',
                  source: 'content/next/content.mdx',
                  description:
                    'Set up Telefunc in Next.js with `withTelefunc`, an `/api/telefunc` route handler, client config, and initial-data guidance.',
                },
                {
                  kind: 'page',
                  id: 'svelteKit',
                  title: 'SvelteKit',
                  slug: 'svelte-kit',
                  source: 'content/svelte-kit/content.mdx',
                  description:
                    'Integrate Telefunc with SvelteKit using the Vite plugin, a `+server.ts` endpoint, and framework-native initial data loading.',
                },
                {
                  kind: 'page',
                  id: 'vike',
                  title: 'Vike',
                  slug: 'vike',
                  source: 'content/vike/content.mdx',
                  description:
                    'Connect Telefunc to a Vike app with the Vite plugin, Hono middleware, and guidance for handling initial data outside Telefunc.',
                },
                {
                  kind: 'page',
                  id: 'nuxt',
                  title: 'Nuxt',
                  slug: 'nuxt',
                  source: 'content/nuxt/content.mdx',
                  description:
                    "Track the current WIP state of Telefunc's Nuxt integration and find the available Nuxt example while Nuxt 3 support is updated.",
                },
                {
                  kind: 'page',
                  id: 'reactRouter',
                  title: 'React Router',
                  slug: 'react-router',
                  source: 'content/react-router/content.mdx',
                  description:
                    'Use Telefunc with React Router by adding the Vite plugin, wiring an action handler, and following example integrations.',
                },
                {
                  kind: 'page',
                  id: 'reactNative',
                  title: 'React Native',
                  slug: 'react-native',
                  source: 'content/react-native/content.mdx',
                  description:
                    'Check the current WIP guidance for using Telefunc with React Native and the linked example project.',
                },
                {
                  kind: 'page',
                  id: 'bundler',
                  title: 'Bundlers',
                  slug: 'bundler',
                  source: 'content/bundler/content.mdx',
                  description:
                    'Use Telefunc with Vite, webpack, or Babel, or see the planned no-transformer setup for custom JavaScript environments.',
                },
              ],
            },
            {
              kind: 'page',
              id: 'initialData',
              title: 'Initial Data',
              slug: 'initial-data',
              source: 'content/initial-data/content.mdx',
              description:
                "Use your framework's SSR data loader for initial page data, then use Telefunc for follow-up requests such as pagination.",
            },
            {
              kind: 'page',
              id: 'permissions',
              title: 'Permissions',
              slug: 'permissions',
              source: 'content/permissions/content.mdx',
              description:
                'Protect public telefunctions with `throw Abort()`, early returns, `onAbort()` redirects, and reusable `getContext()` guards.',
            },
            {
              kind: 'page',
              id: 'validation',
              title: 'Validation',
              slug: 'validation',
              source: 'content/validation/content.mdx',
              aliases: ['form-validation'],
              description:
                'Return structured validation errors from telefunctions so forms can show invalid input feedback without treating it as a bug.',
            },
            {
              kind: 'page',
              id: 'fileUploads',
              title: 'File Uploads',
              slug: 'file-uploads',
              source: 'content/file-uploads/content.mdx',
              aliases: ['file-upload'],
              description:
                'Send `File` and `Blob` arguments through Telefunc, stream uploads efficiently, and learn the ordering and one-shot read limits.',
            },
            {
              kind: 'page',
              id: 'errorHandling',
              title: 'Error Handling',
              slug: 'error-handling',
              source: 'content/error-handling/content.mdx',
              description:
                'Handle expected errors, `throw Abort()` control flow, unexpected bugs, and network failures in Telefunc on both client and server.',
            },
          ],
        },
        {
          kind: 'group',
          id: 'learn-more',
          title: 'Learn More',
          items: [
            {
              kind: 'page',
              id: 'whySchemaless',
              title: 'Why Schemaless?',
              slug: 'why-schemaless',
              source: 'content/why-schemaless/content.mdx',
              description:
                "Compare Telefunc's schemaless RPC model with REST and GraphQL to understand when product-specific server functions are the better fit.",
            },
            {
              kind: 'page',
              id: 'howItWorks',
              title: 'How It Works',
              slug: 'how-it-works',
              source: 'content/how-it-works/content.mdx',
              description:
                'See how Telefunc transforms `.telefunc` imports into HTTP clients and how a telefunction call flows through the server middleware.',
            },
          ],
        },
      ],
    },
    {
      kind: 'section',
      id: 'api',
      title: 'API',
      items: [
        {
          kind: 'page',
          id: 'apiOverview',
          title: 'API Overview',
          slug: 'api',
          source: 'content/api/content.mdx',
          tableOfContents: false,
          showInNav: false,
          description: 'Browse the Telefunc API reference for server hooks, client hooks, and configuration options.',
        },
        {
          kind: 'group',
          id: 'server-api',
          title: 'Server',
          items: [
            {
              kind: 'page',
              id: 'apiTelefunc',
              title: '`telefunc()`',
              slug: 'telefunc',
              source: 'content/telefunc/content.mdx',
              description:
                'Learn how `telefunc()` turns incoming requests into telefunction calls, returns HTTP response data, and injects request context.',
            },
            {
              kind: 'page',
              id: 'throwAbort',
              title: '`throw Abort()`',
              slug: 'throw-abort',
              source: 'content/throw-abort/content.mdx',
              aliases: ['Abort'],
              description:
                'Use `throw Abort()` for permissions and expected request rejections, and pass abort data back to the client without logging a bug.',
            },
            {
              kind: 'page',
              id: 'getContext',
              title: '`getContext()`',
              slug: 'get-context',
              source: 'content/get-context/content.mdx',
              aliases: ['getContext'],
              description:
                'Access the Telefunc request context with `getContext()`, type it safely, and call it before any `await`.',
            },
            {
              kind: 'page',
              id: 'shield',
              title: '`shield()`',
              slug: 'shield',
              source: 'content/shield/content.mdx',
              description:
                'Validate telefunction arguments with `shield()`, including automatic TypeScript generation and manual runtime schemas.',
            },
            {
              kind: 'page',
              id: 'onBug',
              title: '`onBug()`',
              slug: 'on-bug',
              source: 'content/on-bug/content.mdx',
              aliases: ['onBug'],
              description:
                'Use `onBug()` to report unexpected Telefunc errors to monitoring tools such as Sentry, Bugsnag, or Rollbar.',
            },
          ],
        },
        {
          kind: 'group',
          id: 'client-api',
          title: 'Client',
          items: [
            {
              kind: 'page',
              id: 'onAbort',
              title: '`onAbort()`',
              slug: 'on-abort',
              source: 'content/on-abort/content.mdx',
              aliases: ['onAbort'],
              description:
                'Handle client-side Telefunc aborts with `onAbort()` and read typed `abortValue` data for redirects and auth flows.',
            },
          ],
        },
        {
          kind: 'group',
          id: 'config-api',
          title: 'Config',
          items: [
            {
              kind: 'page',
              id: 'telefuncUrl',
              title: '`telefuncURL`',
              slug: 'telefunc-url',
              source: 'content/telefunc-url/content.mdx',
              aliases: ['telefuncUrl'],
              description:
                "Configure Telefunc's request endpoint on the client and server, including custom paths and cross-domain setups.",
            },
            {
              kind: 'page',
              id: 'disableNamingConvention',
              title: '`disableNamingConvention`',
              slug: 'disable-naming-convention',
              source: 'content/disable-naming-convention/content.mdx',
              aliases: ['disableNamingConvention'],
              description:
                "Disable Telefunc's event-style naming warnings when you intentionally want telefunctions without the `onX` convention.",
            },
            {
              kind: 'page',
              id: 'httpHeaders',
              title: '`httpHeaders`',
              slug: 'http-headers',
              source: 'content/http-headers/content.mdx',
              aliases: ['httpHeaders'],
              description:
                'Send custom HTTP headers with Telefunc client requests, such as authentication tokens, by setting `config.httpHeaders`.',
            },
            {
              kind: 'page',
              id: 'fetch',
              title: '`fetch`',
              slug: 'fetch',
              source: 'content/fetch/content.mdx',
              description:
                'Provide a custom client-side `fetch` implementation for Telefunc to customize how requests and responses are handled.',
            },
            {
              kind: 'page',
              id: 'telefuncFiles',
              title: '`telefuncFiles`',
              slug: 'telefunc-files',
              source: 'content/telefunc-files/content.mdx',
              aliases: ['telefuncFiles'],
              description:
                "List telefunction files manually with `config.telefuncFiles` when you aren't using Telefunc's transformer on the server.",
            },
            {
              kind: 'page',
              id: 'root',
              title: '`root`',
              slug: 'root',
              source: 'content/root/content.mdx',
              description:
                'Set `config.root` for `config.telefuncFiles`, especially in monorepos, so Telefunc can match client and server telefunction files.',
            },
            {
              kind: 'page',
              id: 'configShield',
              title: '`config.shield`',
              slug: 'shield-config',
              source: 'content/shield-config/content.mdx',
              description:
                'Control when Telefunc generates `shield()` runtime validators in development and production builds.',
            },
            {
              kind: 'page',
              id: 'log',
              title: '`log`',
              slug: 'log',
              source: 'content/log/content.mdx',
              description: 'Configure Telefunc logging for `shield()` validation errors in development and production.',
            },
          ],
        },
      ],
    },
  ],
} satisfies DocsGraph
