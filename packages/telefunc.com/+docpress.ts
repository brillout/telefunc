import type { Config } from '@brillout/docpress'
import faviconUrl from './icons/telefunc.svg'
import { categories, headings, headingsDetached } from './headings'
import { projectInfo } from './utils'

export default {
  projectInfo,
  docsDir: 'packages/telefunc.com',
  faviconUrl,
  headings,
  headingsDetached,
  categories,
  tagline: 'Remote Functions. Instead of API.',
  twitterHandle: '@brillout',
  websiteUrl: 'https://telefunc.com',
  algolia: {
    appId: 'NONXS2JSTL',
    apiKey: '9bf6a6f9bc168ca425e8e19a62cd8ba1',
    indexName: 'telefunc',
  },
} satisfies Config
