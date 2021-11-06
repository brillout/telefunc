const express = require('express')
const { createTelefuncCaller, provideContext } = require('telefunc')
const { createPageRenderer } = require('vite-plugin-ssr')

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
    })
    app.use(viteDevServer.middlewares)
  }

  const callTelefunc = await createTelefuncCaller({ viteDevServer, isProduction, root })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const { originalUrl: url, method, body, headers } = req
    const userAgent = headers['user-agent']
    provideContext({
      userAgent,
    })
    const result = await callTelefunc({ url, method, body })
    if (!result) return next()
    res.status(result.statusCode).type(result.contentType).send(result.body)
  })

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
