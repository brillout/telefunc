import type { HeadingDefinition, HeadingWithoutLink } from 'libframe-docs/headings'

export { headingsWithoutLink }

const headingsWithoutLink: HeadingWithoutLink[] = [
  {
    title: '`Abort()` or `new Error()`',
    url: '/abort-or-error',
  },
  {
    title: 'Isomorphic `import`',
    url: '/isomorphic-import',
  },
]

export const headings: HeadingDefinition[] = [
  {
    level: 1,
    title: 'Overview',
    titleEmoji: 'compass',
  },
  {
    level: 2,
    title: 'Introduction',
    titleDocument: 'Telefunc',
    url: '/',
  },
  {
    level: 2,
    title: 'Tour',
    url: '/tour',
    sectionTitles: ['TypeScript'],
  },
  {
    level: 2,
    title: 'RPC vs GraphQL/REST',
    url: '/RPC-vs-GraphQL-REST',
  },
  {
    level: 1,
    title: 'Get started',
    titleEmoji: 'seedling',
  },
  {
    level: 2,
    title: 'Install',
    url: '/install',
  },
  {
    level: 1,
    title: 'Guides',
    titleEmoji: 'books',
  },
  {
    level: 4,
    title: 'Basics',
  },
  {
    level: 2,
    title: '`Abort()` & `shield()`',
    url: '/abort-shield',
  },
  {
    level: 2,
    title: 'Authentication',
    url: '/auth',
  },
  {
    level: 2,
    title: 'Permissions',
    url: '/permissions',
    sectionTitles: ['`getContext()` wrappers'],
  },
  {
    level: 2,
    title: 'File structure',
    url: '/file-structure',
  },
  {
    level: 2,
    title: 'Form validation',
    url: '/form-validation',
  },
  {
    level: 4,
    title: 'More',
  },
  {
    level: 2,
    title: 'TypeScript',
    url: '/typescript',
    sectionTitles: ['`shield()`', '`getContext()`'],
  },
  {
    level: 2,
    title: 'Telefunc Server',
    url: '/telefunc-server',
  },
  {
    level: 2,
    title: 'Waterfalls',
    url: '/waterfalls',
  },
  {
    level: 2,
    title: 'SSR (Server-Side Rendering)',
    url: '/ssr',
  },
  {
    level: 1,
    title: 'API',
    titleEmoji: 'gear',
  },
  {
    level: 4,
    title: 'Protection',
  },
  {
    level: 2,
    title: '`shield()`',
    url: '/shield',
  },
  {
    level: 2,
    title: '`Abort()`',
    url: '/Abort',
  },
  {
    level: 4,
    title: 'Context',
  },
  {
    level: 2,
    title: '`getContext()`',
    url: '/getContext',
  },
  {
    level: 2,
    title: '`provideTelefuncContext()`',
    url: '/provideTelefuncContext',
  },
  {
    level: 4,
    title: 'Integration',
  },
  {
    level: 2,
    title: '`createTelefuncCaller()`',
    url: '/createTelefuncCaller',
  },
  {
    level: 2,
    title: '`config',
    url: '/config',
  },
]
