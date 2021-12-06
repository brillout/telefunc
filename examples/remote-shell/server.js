const express = require('express')
const { createTelefuncCaller, provideContext } = require('telefunc')

const isProduction = process.env.NODE_ENV === 'production'
const root = __dirname

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
      server: { middlewareMode: 'html' },
    })
  }

  const callTelefunc = await createTelefuncCaller({ viteDevServer, isProduction, root })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const { originalUrl: url, method, body, headers } = req
    const userAgent = headers['user-agent']
    provideContext({
      userAgent,
    })
    const httpResponse = await callTelefunc({ url, method, body })
    if (!httpResponse) return next()
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })

  if (viteDevServer) {
    app.use(viteDevServer.middlewares)
  }

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
