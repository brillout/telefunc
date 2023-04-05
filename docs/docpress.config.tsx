import type { Config } from '@brillout/docpress'
import React from 'react'
import faviconUrl from './icons/telefunc.svg'
import { headings, headingsDetached } from './headings'
import { projectInfo } from './utils'
import { NavHeader, NavHeaderMobile } from './NavHeader'

export default {
  projectInfo,
  faviconUrl,
  navHeader: <NavHeader />,
  navHeaderMobile: <NavHeaderMobile />,
  headings,
  headingsDetached,
  tagline: 'Remote Functions. Instead of API.',
  titleNormalCase: true,
  twitterHandle: '@brillout',
  websiteUrl: 'https://telefunc.com',
  algolia: null
} satisfies Config
