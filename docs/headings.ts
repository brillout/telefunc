export { categories }
export { headings }
export { headingsDetached }
export type { HeadingsURL }

import type {
  Config,
  HeadingDefinition,
  HeadingDetachedDefinition as HeadingDetachedDefinition_,
} from '@brillout/docpress'
import { iconGear, iconSeedling } from '@brillout/docpress' with { type: 'vike:pointer' }
type HeadingDetachedDefinition = Omit<HeadingDetachedDefinition_, 'category'> & {
  category: CategoryNames | 'Miscellaneous'
}

type ExtractHeadingUrl<C> = C extends { url: infer N extends string } ? N : C extends string ? C : never
type HeadingsURL = ExtractHeadingUrl<(typeof headings)[number]> | ExtractHeadingUrl<(typeof headingsDetached)[number]>
type ExtractCategoryName<C> = C extends { name: infer N extends string } ? N : C extends string ? C : never
type CategoryNames = ExtractCategoryName<(typeof categories)[number]>

const categories = ['Get Started', 'API'] as const satisfies Config['categories']

const headingsDetached = [...serverIntegration()] satisfies HeadingDetachedDefinition[]

const headings: HeadingDefinition[] = [
  // #region Onboarding
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
  {
    level: 2,
    title: 'Concepts',
    url: '/concepts',
    // sectionTitles: ['Why', 'RPC', 'Event-Based', 'Security'],
  },
  {
    level: 2,
    title: 'Best Practices',
    url: '/best-practices',
    // sectionTitles: ['Initial Data'],
  },
  // #region Guides
  {
    level: 4,
    title: 'Guides',
  },

  // #region Server Integration
  {
    level: 2,
    title: 'Server Integration',
    url: '/server-integration',
  },
  // #endregion

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
    url: '/validation',
  },
  {
    level: 2,
    title: 'File uploads',
    url: '/file-upload',
  },
  {
    level: 2,
    title: 'Error handling',
    url: '/error-handling',
  },
  // #endregion

  {
    level: 4,
    title: 'Learn More',
  },
  {
    level: 2,
    title: 'Why Schemaless?',
    url: '/schemaless',
    sectionTitles: ['Schemaless vs schema-full', 'RPC vs GraphQL/REST'],
  },
  {
    level: 2,
    title: 'How it works',
    url: '/how-it-works',
    sectionTitles: ['Transformer', 'Telefunction lifecycle'],
  },
  // #endregion

  // #region API
  {
    level: 1,
    title: 'API',
    titleIcon: iconGear,
    color: '#80c1db',
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
]

function serverIntegration(): HeadingDetachedDefinition[] {
  return [
    // {
    //   level: 4,
    //   title: 'Server frameworks',
    // },
    // {
    //   level: 4,
    //   title: 'Metaframeworks',
    // },
    {
      category: 'Get Started',
      title: 'Next.js',
      url: '/next',
      sectionTitles: ['5. Initial data'],
    },
    {
      category: 'Get Started',
      title: 'SvelteKit',
      url: '/svelte-kit',
      sectionTitles: ['4. Initial data'],
    },
    {
      category: 'Get Started',
      title: 'Vike',
      url: '/vike',
      sectionTitles: ['4. Initial data'],
    },
    {
      category: 'Get Started',
      title: 'Nuxt',
      url: '/nuxt',
    },
    {
      category: 'Get Started',
      title: 'React Router',
      url: '/react-router',
    },
    // {
    //   level: 4,
    //   title: 'Native',
    // },
    {
      category: 'Get Started',
      title: 'React Native',
      url: '/react-native',
    },
    // {
    //   level: 4,
    //   title: 'Bundlers',
    // },
    {
      category: 'Get Started',
      title: 'Custom bundler',
      url: '/bundler',
    },
    {
      category: 'Get Started',
      title: 'Vite',
      url: '/vite-plugin',
    },
    {
      category: 'Get Started',
      title: 'Webpack',
      url: '/webpack-plugin',
    },
    {
      category: 'Get Started',
      title: 'Babel',
      url: '/babel-plugin',
    },
  ]
}
