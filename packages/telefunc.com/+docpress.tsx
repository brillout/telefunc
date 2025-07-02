export { config as default }

import type { Config } from '@brillout/docpress'
import logo from './icons/telefunc.svg'
import { categories, headings, headingsDetached } from './headings'
import { PROJECT_VERSION } from './utils/PROJECT_VERSION.js'
import { TopNavigation } from './TopNavigation'
import React from 'react'

const config: Config = {
  name: 'Telefunc',
  version: PROJECT_VERSION,
  url: 'https://telefunc.com',
  tagline: 'Remote Functions. Instead of API.',
  logo,

  github: 'https://github.com/brillout/telefunc',
  twitter: '@brillout',

  headings,
  headingsDetached,
  categories,

  algolia: {
    appId: 'NONXS2JSTL',
    apiKey: '9bf6a6f9bc168ca425e8e19a62cd8ba1',
    indexName: 'telefunc',
  },

  docsDir: 'packages/telefunc.com',

  topNavigation: <TopNavigation />,
} satisfies Config
