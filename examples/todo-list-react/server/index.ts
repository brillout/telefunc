import express from 'express'
import { createPageRenderer } from 'vite-plugin-ssr'
import { callTelefunc, telefuncConfig, provideContext } from 'telefunc'
import 'telefunc/async_hooks'
import cookieParser from 'cookie-parser'
import { getLoggedUser } from '#root/auth/server/getLoggedUser'

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
  app.use(function (req, _res, next) {
    const user = getLoggedUser(req.cookies)
    // We use `provideContext()` for *all* requests. (Not only for Telefunc's URL `/_telefunc` but also for SSR URLs such as `/about`.)
    // That way, the context is always available, including while rendering HTML on the server-side.
    // More infos at https://telefunc.com/ssr
    provideContext({
      user,
    })
    next()
  })

  app.use(express.text()) // Parse & make HTTP request body available at `req.body`
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
