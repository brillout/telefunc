export { render }
export { passToClient }

import React from 'react'
import { escapeInject } from 'vite-plugin-ssr'
import { renderToStream } from 'react-streaming/server'

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ['pageProps']

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  const stream = await renderToStream(<Page {...pageProps} />, { userAgent: pageContext.userAgent })

  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>`
}
