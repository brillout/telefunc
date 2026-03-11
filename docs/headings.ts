export { categories }
export { headings }
export { headingsDetached }
export type { HeadingsURL }

import type {
  Config,
  HeadingDefinition,
  HeadingDetachedDefinition as HeadingDetachedDefinition_,
} from '@brillout/docpress'
import { iconScroll, iconEyes, iconGear, iconSeedling } from '@brillout/docpress' with { type: 'vike:pointer' }
type HeadingDetachedDefinition = Omit<HeadingDetachedDefinition_, 'category'> & {
  category: CategoryNames | 'Miscellaneous'
}

type ExtractHeadingUrl<C> = C extends { url: infer N extends string } ? N : C extends string ? C : never
type HeadingsURL = ExtractHeadingUrl<(typeof headings)[number]> | ExtractHeadingUrl<(typeof headingsDetached)[number]>
type ExtractCategoryName<C> = C extends { name: infer N extends string } ? N : C extends string ? C : never
type CategoryNames = ExtractCategoryName<(typeof categories)[number]>

const categories = ['Guides', 'API', 'Get Started', 'Overview', 'Miscellaneous'] as const satisfies Config['categories']

const headingsDetached = [
  // ...misc(),
] satisfies HeadingDetachedDefinition[]

const headings = [
  {
    level: 1,
    title: 'Get started',
    titleIcon: iconSeedling,
    color: '#74d717',
  },
  {
    level: 2,
    title: 'Introduction',
    titleDocument: 'Telefunc',
    url: '/',
  },
  {
    level: 2,
    title: 'Quick Start',
    url: '/start',
    sectionTitles: ['My first telefunction'],
  },

  // #region Server Integration
  {
    level: 4,
    title: 'Server frameworks',
  },
  {
    level: 2,
    title: 'Hono, Express, etc.',
    url: '/server',
  },
  {
    level: 4,
    title: 'Metaframeworks',
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
    title: 'React Router',
    url: '/react-router',
  },
  {
    level: 4,
    title: 'Native',
  },
  {
    level: 2,
    title: 'React Native',
    url: '/react-native',
  },
  {
    level: 4,
    title: 'Bundlers',
  },
  {
    level: 2,
    title: 'Custom bundler',
    titleInNav: 'Custom bundler',
    url: '/install',
  },
  {
    level: 2,
    title: 'Vite',
    url: '/vite-plugin',
  },
  {
    level: 2,
    title: 'Webpack',
    url: '/webpack-plugin',
  },
  {
    level: 2,
    title: 'Babel',
    url: '/babel-plugin',
  },
  // #endregion

  // #region API
  {
    level: 1,
    title: 'API',
    titleIcon: iconGear,
    color: '#80c1db',
    // menuModalFullWidth: true,
  },
  {
    level: 4,
    title: 'Server',
  },
  {
    level: 2,
    title: '`telefunc()',
    url: '/telefunc',
  },
  {
    level: 2,
    title: '`throw Abort()`',
    url: '/Abort',
  },
  {
    level: 2,
    title: '`getContext()`',
    url: '/getContext',
  },
  {
    level: 2,
    title: '`shield()`',
    url: '/shield',
    sectionTitles: ['Automatic (from TypeScript)', 'Manual'],
  },
  {
    level: 2,
    title: '`onBug()`',
    url: '/onBug',
  },
  {
    level: 4,
    title: 'Client',
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
    title: '`httpHeaders`',
    url: '/httpHeaders',
  },
  {
    level: 2,
    title: '`fetch`',
    url: '/fetch',
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
  // #endregion

  // #region Guides
  {
    level: 1,
    title: 'Guides',
    titleIcon: iconScroll,
    color: '#ffd511',
  },
  {
    level: 2,
    title: 'Initial Data',
    url: '/initial-data',
  },
  {
    level: 2,
    title: 'Permissions',
    url: '/permissions',
    sectionTitles: ['DRY Permissions'],
  },
  {
    level: 2,
    title: 'Validation',
    url: '/form-validation',
  },
  {
    level: 2,
    title: 'Error handling',
    url: '/error-handling',
  },
  {
    level: 2,
    title: 'File uploads',
    url: '/file-upload',
  },
  // #endregion

  // #region Concepts
  {
    level: 1,
    title: 'Concepts',
    titleIcon: iconEyes,
    color: '#bd55dd',
    titleIconStyle: {
      width: 30,
      height: 30,
      position: 'relative',
      top: -2,
    },
  },
  {
    level: 2,
    title: 'Design philosophy',
    url: '/philosophy',
    // sectionTitles: ['Why', 'RPC', 'Event-Based', 'Security'],
  },
  {
    level: 2,
    title: 'Best Practices',
    url: '/best-practices',
    // sectionTitles: ['Initial Data'],
  },
  {
    level: 2,
    title: 'How it works',
    url: '/how-it-works',
    sectionTitles: ['Transformer'],
    // sectionTitles: ['Server integration', 'Context],
  },
  {
    level: 2,
    title: 'FAQ',
    url: '/faq',
    // sectionTitles: ['RPC vs GraphQL/REST', 'Why Telefunc?', 'Should we use it?'],
  },
  // #endregion
]
