const express = require('express')
const { createPageRenderer } = require('vite-plugin-ssr')
const { createTelefuncCaller, provideContext } = require('telefunc')

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
      server: { middlewareMode: 'ssr' },
    })
    app.use(viteDevServer.middlewares)
  }

  app.use(function (req, _res, next) {
    req.user = {
      id: 0,
      name: 'Rom'
    }
    next()
  })

  const callTelefunc = createTelefuncCaller({ viteDevServer, isProduction, root })
  app.use(express.text()) // Parse & make HTTP request body available at `req.body`
  app.all('/_telefunc', async (req, res, next) => {
    const { user } = req
    provideContext({ user })
    const httpResponse = await callTelefunc({ url: req.originalUrl, method: req.method, body: req.body })
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
  app.get('*', async (req, res, next) => {
    const { user, originalUrl: url } = req
    const pageContextInit = {
      user,
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
