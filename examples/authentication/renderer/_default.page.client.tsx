export { render }
export const clientRouting = true
export const hydrationCanBeAborted = true

import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageShell } from './PageShell'
import type { PageContextClient } from './types'

import { onAbort } from 'telefunc/client'

let root: ReactDOM.Root
async function render(pageContext: PageContextClient) {
  const { Page } = pageContext
  const page = (
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>
  )
  const container = document.getElementById('page-view')!
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
}

onAbort((err) => {
  if (err.abortValue === 'LOGGED_OUT') {
    window.location.reload()
  }
})
