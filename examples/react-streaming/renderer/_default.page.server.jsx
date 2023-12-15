export { render }
export { passToClient }

import React from 'react'
import { escapeInject } from 'vike/server'
import { renderToStream } from 'react-streaming/server'
import { PageLayout } from './PageLayout'

// See https://vike.dev/data-fetching
const passToClient = ['pageProps']

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  const page = (
    <PageLayout>
      <Page {...pageProps} />
    </PageLayout>
  )
  const stream = await renderToStream(page, { disable: false })

  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>`
}
