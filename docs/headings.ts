export { headings }
export { headingsDetached }

import type { HeadingDefinition, HeadingDetachedDefinition } from '@brillout/docpress'
import { iconScroll, iconCompass, iconGear, iconSeedling } from '@brillout/docpress'

const headingsDetached: HeadingDetachedDefinition[] = [
  {
    title: '`Abort()` vs `new Error()`',
    url: '/abort-vs-error',
  },
  {
    title: 'Telefunc Transformer',
    url: '/transformer',
  },
  {
    title: 'RPC vs GraphQL/REST',
    url: '/RPC-vs-GraphQL-REST',
  },
  {
    title: 'Initial Page Data',
    url: '/initial-page-data',
  },
  {
    title: 'Initial Data',
    url: '/initial-data',
  },
]

const headings: HeadingDefinition[] = [
  {
    level: 1,
    title: 'Overview',
    titleIcon: iconCompass,
    color: '#e1a524',
  },
  {
    level: 2,
    title: 'Introduction',
    titleDocument: 'Telefunc',
    url: '/',
  },
  {
    level: 2,
    title: 'RPC',
    url: '/RPC',
  },
  {
    level: 1,
    title: 'Get started',
    titleIcon: iconSeedling,
    color: '#74d717',
  },
  {
    level: 2,
    title: 'Next.js',
    url: '/next',
  },
  {
    level: 2,
    title: 'SvelteKit',
    url: '/svelte-kit',
  },
  {
    level: 2,
    title: 'Vike',
    url: '/vike',
  },
  {
    level: 2,
    title: 'Nuxt',
    url: '/nuxt',
  },
  {
    level: 2,
    title: 'React Native',
    url: '/react-native',
  },
  {
    level: 2,
    title: 'Remix',
    url: '/remix',
  },
  {
    level: 2,
    title: 'Other installations',
    titleInNav: 'Other',
    url: '/install',
  },
  {
    level: 1,
    title: 'Guides',
    titleIcon: iconScroll,
    color: '#ffd511',
  },
  {
    level: 2,
    title: 'Permissions',
    url: '/permissions',
    sectionTitles: ['`getContext()` wrapping'],
  },
  {
    level: 2,
    title: 'Error handling',
    url: '/error-handling',
  },
  {
    level: 2,
    title: 'Form validation',
    url: '/form-validation',
    sectionTitles: ['`throw Abort(someValue)`'],
  },
  {
    level: 2,
    title: 'Event-based telefunctions',
    url: '/event-based',
  },
  {
    level: 2,
    title: 'File upload',
    url: '/file-upload',
  },
  {
    level: 1,
    title: 'API',
    titleIcon: iconGear,
    color: '#80c1db',
    menuModalFullWidth: true,
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
    level: 4,
    title: 'Protection',
  },
  {
    level: 2,
    title: '`throw Abort()`',
    url: '/Abort',
  },
  {
    level: 2,
    title: '`shield()`',
    url: '/shield',
    sectionTitles: ['TypeScript - Automatic', 'TypeScript - Manual'],
  },
  {
    level: 4,
    title: 'Server Middleware',
  },
  {
    level: 2,
    title: '`telefunc()',
    url: '/telefunc',
  },
  {
    level: 4,
    title: 'Error Handling',
  },
  {
    level: 2,
    title: '`onBug()`',
    url: '/onBug',
  },
  {
    level: 2,
    title: '`onAbort()`',
    url: '/onAbort',
  },
  {
    level: 4,
    title: 'Config',
  },
  {
    level: 2,
    title: '`telefuncUrl`',
    url: '/telefuncUrl',
  },
  {
    level: 2,
    title: '`disableNamingConvention`',
    url: '/disableNamingConvention',
  },
  {
    level: 2,
    title: '`httpHeaders',
    url: '/httpHeaders',
  },
  {
    level: 2,
    title: '`telefuncFiles',
    url: '/telefuncFiles',
  },
  {
    level: 2,
    title: '`root`',
    url: '/root',
  },
  {
    level: 2,
    title: '`shield`',
    url: '/shield-config',
  },
  {
    level: 2,
    title: '`log`',
    url: '/log',
  },
  {
    level: 4,
    title: 'Plugins',
  },
  {
    level: 2,
    title: 'Vite Plugin',
    url: '/vite-plugin',
  },
  {
    level: 2,
    title: 'Webpack Plugin',
    url: '/webpack-plugin',
  },
  {
    level: 2,
    title: 'Babel Plugin',
    url: '/babel-plugin',
  },
]
