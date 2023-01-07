import type { Config } from '@brillout/docpress'
import React from 'react'
import faviconUrl from './icons/telefunc.svg'
import { headings, headingsWithoutLink } from './headings'
import { projectInfo } from './utils'
import { NavHeader, NavHeaderMobile } from './NavHeader'

export default {
  projectInfo,
  faviconUrl,
  navHeader: <NavHeader />,
  navHeaderMobile: <NavHeaderMobile />,
  headings,
  headingsWithoutLink,
  tagline: 'Remote Functions. Instead of API.',
  titleNormalCase: true,
  twitterHandle: '@brillout',
  websiteUrl: 'https://telefunc.com',
  algolia: null
} as Config
