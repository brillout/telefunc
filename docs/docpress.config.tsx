import type { Config } from '@brillout/docpress'
import React from 'react'
import { NavHeader, NavHeaderMobile } from './NavHeader'
import { headings, headingsDetached } from './headings'
import faviconUrl from './icons/telefunc.svg'
import { projectInfo } from './utils'

export default {
  projectInfo,
  faviconUrl,
  navHeader: <NavHeader />,
  navHeaderMobile: <NavHeaderMobile />,
  headings,
  headingsDetached,
  tagline: 'Remote Functions. Instead of API.',
  twitterHandle: '@brillout',
  websiteUrl: 'https://telefunc.com',
  algolia: null,
} satisfies Config
