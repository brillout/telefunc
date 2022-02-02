import express from 'express'
import { createPageRenderer } from 'vite-plugin-ssr'
import { telefunc, telefuncConfig, provideTelefuncContext } from 'telefunc'
import cookieParser from 'cookie-parser'
import { retrieveUser } from '#app/auth'

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
    telefuncConfig.viteDevServer = viteDevServer
  }

  app.use(cookieParser())
  app.use(express.text()) // Parse & make HTTP request body available at `req.body`
  app.all('/_telefunc', async (req, res, next) => {
    const user = retrieveUser(req)
    provideTelefuncContext({ user })
    const httpResponse = await telefunc({ url: req.originalUrl, method: req.method, body: req.body })
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const user = retrieveUser(req)
    const pageContextInit = {
      url,
      user,
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
