import type { HeadingDefinition, HeadingWithoutLink } from 'vikepress'

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
  }
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
    title: 'Tour',
    url: '/tour',
    sectionTitles: ['TypeScript']
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
    level: 4,
    title: 'Basics'
  },
  {
    level: 2,
    title: '`Abort()` & `shield()`',
    url: '/abort-shield'
  },
  {
    level: 2,
    title: 'Authentication',
    url: '/auth'
  },
  {
    level: 2,
    title: 'Permissions',
    url: '/permissions',
    sectionTitles: ['`getContext()` wrappers']
  },
  {
    level: 2,
    title: 'Error Handling',
    url: '/error-handling',
  },
  {
    level: 2,
    title: 'File structure',
    url: '/file-structure'
  },
  {
    level: 2,
    title: 'Form validation',
    url: '/form-validation'
  },
  {
    level: 4,
    title: 'More'
  },
  {
    level: 2,
    title: 'TypeScript',
    url: '/typescript',
    sectionTitles: ['`shield()`', '`getContext()`']
  },
  {
    level: 2,
    title: 'Error Tracking',
    url: '/error-tracking'
  },
  {
    level: 2,
    title: 'File Upload',
    url: '/file-upload'
  },
  {
    level: 2,
    title: 'Telefunc Server',
    url: '/telefunc-server'
  },
  {
    level: 2,
    title: 'Waterfalls',
    url: '/waterfalls'
  },
  {
    level: 2,
    title: 'Server-Side Rendering (SSR)',
    url: '/ssr',
    sectionTitles: ['SSR frameworks']
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
    title: '`shield()`',
    url: '/shield'
  },
  {
    level: 2,
    title: '`Abort()`',
    url: '/Abort'
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
