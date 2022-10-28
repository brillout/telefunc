import type { HeadingDefinition, HeadingWithoutLink } from '@brillout/docpress'

export { headingsWithoutLink }

const headingsWithoutLink: HeadingWithoutLink[] = [
  {
    title: '`Abort()` vs `new Error()`',
    url: '/abort-vs-error'
  },
  {
    title: 'The SSR context problem',
    url: '/ssr-context'
  },
  {
    title: 'Isomorphic `import`',
    url: '/isomorphic-import'
  },
  {
    title: 'RPC',
    url: '/RPC'
  },
  {
    level: 2,
    title: 'Server-Side Rendering (SSR)',
    url: '/ssr',
    sectionTitles: ['SSR frameworks']
  },
]

export const headings: HeadingDefinition[] = [
  {
    level: 1,
    title: 'Overview',
    titleEmoji: 'compass'
  },
  {
    level: 2,
    title: 'Introduction',
    titleDocument: 'Telefunc',
    url: '/'
  },
  {
    level: 2,
    title: 'RPC vs GraphQL/REST',
    url: '/RPC-vs-GraphQL-REST'
  },
  {
    level: 1,
    title: 'Get started',
    titleEmoji: 'seedling'
  },
  {
    level: 2,
    title: 'Vite',
    url: '/vite'
  },
  {
    level: 2,
    title: 'Next.js',
    url: '/next'
  },
  {
    level: 2,
    title: 'Nuxt',
    url: '/nuxt'
  },
  {
    level: 2,
    title: 'Other installations',
    titleInNav: 'Other',
    url: '/install'
  },
  {
    level: 1,
    title: 'Guides',
    titleEmoji: 'books'
  },
  {
    level: 2,
    title: 'Permissions',
    url: '/permissions',
    sectionTitles: ['`getContext()` wrapping']
  },
  {
    level: 2,
    title: 'Event-based telefunctions',
    url: '/event-based'
  },
  {
    level: 2,
    title: 'Error Handling',
    url: '/error-handling'
  },
  {
    level: 2,
    title: 'Form validation',
    url: '/form-validation'
  },
  {
    level: 2,
    title: 'File Upload',
    url: '/file-upload'
  },
  {
    level: 1,
    title: 'API',
    titleEmoji: 'gear'
  },
  {
    level: 4,
    title: 'Protection'
  },
  {
    level: 2,
    title: '`throw Abort()`',
    url: '/Abort'
  },
  {
    level: 2,
    title: '`shield()`',
    url: '/shield'
  },
  {
    level: 4,
    title: 'Context'
  },
  {
    level: 2,
    title: '`getContext()`',
    url: '/getContext'
  },
  {
    level: 2,
    title: '`provideTelefuncContext()`',
    url: '/provideTelefuncContext'
  },
  {
    level: 4,
    title: 'Integration'
  },
  {
    level: 2,
    title: '`createTelefuncCaller()`',
    url: '/createTelefuncCaller'
  },
  {
    level: 2,
    title: '`config',
    url: '/config'
  }
]
