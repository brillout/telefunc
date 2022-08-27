import type { Config } from 'vikepress'
import React from 'react'
import faviconUrl from './icons/telefunc-favicon.svg'
import { headings, headingsWithoutLink } from './headings'
import { projectInfo } from './utils'
import { NavHeader, NavHeaderMobile } from './NavHeader'

export default {
  projectInfo,
  faviconUrl,
  algolia: null,
  navHeader: <NavHeader />,
  navHeaderMobile: <NavHeaderMobile />,
  tagline: 'Remote Functions. Instead of API.',
  titleNormalCase: true,
  headings,
  headingsWithoutLink
} as Config
