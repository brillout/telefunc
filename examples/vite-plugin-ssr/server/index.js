const express = require('express')
const { renderPage } = require('vite-plugin-ssr')
const { telefunc, provideTelefuncContext } = require('telefunc')

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
      server: { middlewareMode: true }
    })
    app.use(viteDevServer.middlewares)
  }

  app.use(function (req, _res, next) {
    req.user = {
      id: 0,
      name: 'Elisabeth'
    }
    next()
  })

  app.use(express.text()) // Parse & make HTTP request body available at `req.body`
  app.all('/_telefunc', async (req, res) => {
    const { user } = req
    provideTelefuncContext({ user })
    const httpResponse = await telefunc({ url: req.originalUrl, method: req.method, body: req.body })
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      user: req.user,
      urlOriginal: req.originalUrl,
      userAgent: req.headers['user-agent']
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType)
    httpResponse.pipe(res)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
