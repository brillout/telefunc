import type { Config } from '@brillout/docpress'
import faviconUrl from './icons/telefunc.svg'
import { categories, headings, headingsDetached } from './headings'
import { PROJECT_VERSION } from './PROJECT_VERSION.js'
import { TopNavigation } from './TopNavigation'
import React from 'react'

export default {
  projectInfo: {
    projectName: 'Telefunc',
    projectVersion: PROJECT_VERSION,
    githubRepository: 'https://github.com/brillout/telefunc',
    githubIssues: 'https://github.com/brillout/telefunc/issues/new',
    twitterProfile: 'https://twitter.com/brillout',
  },
  docsDir: 'packages/telefunc.com',
  faviconUrl,
  headings,
  headingsDetached,
  categories,
  topNavigation: <TopNavigation />,
  tagline: 'Remote Functions. Instead of API.',
  twitterHandle: '@brillout',
  websiteUrl: 'https://telefunc.com',
  algolia: {
    appId: 'NONXS2JSTL',
    apiKey: '9bf6a6f9bc168ca425e8e19a62cd8ba1',
    indexName: 'telefunc',
  },
} satisfies Config
