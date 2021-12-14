import type { HeadingDefinition, HeadingWithoutLink } from 'libframe-docs/headings'

export { headingsWithoutLink }

const headingsWithoutLink: HeadingWithoutLink[] = []

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
  },
  {
    level: 2,
    title: 'RPC vs GraphQL/REST',
    url: '/RPC-vs-GraphQL-REST',
  },
  {
    level: 1,
    title: 'Get Started',
    titleEmoji: 'seedling',
  },
  {
    level: 2,
    title: 'Scaffold new app',
    url: '/scaffold',
  },
  {
    level: 2,
    title: 'Add to existing app',
    url: '/add',
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
    url: '/shield',
  },
  {
    level: 2,
    title: 'Permissions',
    url: '/permissions',
  },
  {
    level: 2,
    title: 'Authentication',
    url: '/auth',
  },
  {
    level: 2,
    title: 'Inversion of Control',
    url: '/inversion-of-control',
  },
  {
    level: 2,
    title: 'File Structure',
    url: '/file-structure',
  },
  {
    level: 4,
    title: 'More',
  },
  {
    level: 2,
    title: 'TypeScript',
    url: '/typescript',
  },
  {
    level: 1,
    title: 'Integration',
    titleEmoji: 'plug',
  },
]
