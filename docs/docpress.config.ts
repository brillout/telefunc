import type { Config } from '@brillout/docpress'
import faviconUrl from './icons/telefunc.svg'
import { headings, headingsDetached } from './headings'
import { projectInfo } from './utils'

export default {
  projectInfo,
  faviconUrl,
  headings,
  headingsDetached,
  tagline: 'Remote Functions. Instead of API.',
  twitterHandle: '@brillout',
  websiteUrl: 'https://telefunc.com',
  algolia: null,
} satisfies Config
