export { render }

import ReactDOM from 'react-dom'
import React from 'react'

function render(pageContext) {
  const { Page, pageProps } = pageContext
  ReactDOM.hydrate(<Page {...pageProps} />, document.getElementById('page-view'))
  // For `../.testRun.ts`
  window.hydrationFinished = true
}
