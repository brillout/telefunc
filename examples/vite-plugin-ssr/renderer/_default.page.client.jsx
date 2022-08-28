export { render }

import ReactDOM from 'react-dom/client'
import React from 'react'

function render(pageContext) {
  const { Page, pageProps } = pageContext
  ReactDOM.hydrateRoot(document.getElementById('page-view'), <Page {...pageProps} />)
  // For `../.testRun.ts`
  window.hydrationFinished = true
}
