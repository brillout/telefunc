export * from 'libframe-docs/_default.page.server'
import { setFrame } from 'libframe-docs/setFrame'
import { headings, headingsWithoutLink } from '../headings'
import { projectInfo } from '../utils'
import logoUrl from '../icons/telefunc.svg'
import React from 'react'
import { NavHeader, NavHeaderMobile } from './NavHeader'

setFrame({
  projectInfo,
  algolia: null,
  logoUrl,
  headings,
  headingsWithoutLink,
  navHeader: <NavHeader />,
  navHeaderMobile: <NavHeaderMobile />,
  titleNormalCase: true,
})
