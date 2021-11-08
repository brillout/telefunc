import express from 'express'
import { createPageRenderer } from 'vite-plugin-ssr'
import { createTelefuncCaller, provideContext } from 'telefunc'
import {Context} from '../telefunc/Context'

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

  app.use(function (_req, _res, next) {
    provideContext<Context>({
      user: null/* {
        id: 1,
        name: 'Rom',
      },
      */
    })
    next()
  })

  const callTelefunc = await createTelefuncCaller({ viteDevServer, isProduction, root })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const httpResponse = await callTelefunc({ url: req.originalUrl, method: req.method, body: req.body })
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
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
