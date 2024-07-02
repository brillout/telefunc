import React from 'react'
import { renderToStream } from 'react-streaming/server'
import { TelefuncSSR } from 'telefunc/react-streaming/server'
import { escapeInject } from 'vike/server'
import { PageShell } from './PageShell'
import logoUrl from './logo.svg'
import type { PageContextServer } from './types'

export { render }
// See https://vike.dev/data-fetching
export const passToClient = ['pageProps']

async function render(pageContext: PageContextServer) {
  const { Page, user } = pageContext
  const telefuncContext = { user }

  const page = (
    <TelefuncSSR context={telefuncContext}>
      <PageShell pageContext={pageContext}>
        <Page />
      </PageShell>
    </TelefuncSSR>
  )

  const stream = await renderToStream(page, { disable: false })

  // See https://vike.dev/html-head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + Vike'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  }
}
