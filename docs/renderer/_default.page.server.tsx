export * from 'libframe-docs/_default.page.server'
import { setFrame } from 'libframe-docs/setFrame'
import { headings, headingsWithoutLink } from '../headings'
import { projectInfo } from '../utils'
import faviconUrl from '../icons/telefunc-favicon.svg'
import React from 'react'
import { NavHeader, NavHeaderMobile } from './NavHeader'

setFrame({
  projectInfo,
  algolia: null,
  faviconUrl,
  headings,
  headingsWithoutLink,
  navHeader: <NavHeader />,
  navHeaderMobile: <NavHeaderMobile />,
  titleNormalCase: true,
  tagline: 'Remote Functions. Instead of API.'
})
