import * as vite from 'vite'
import express from 'express'
import { createTelefuncCaller } from 'telefunc'

const isProduction = process.env.NODE_ENV === 'production'
const root = __dirname

startServer()

async function startServer() {
  const app = express()

  let viteDevServer: vite.ViteDevServer

  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'html' },
    })
  }

  const callTelefunc = await createTelefuncCaller({ viteDevServer, isProduction, root })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const httpResponse = await callTelefunc({ url: req.originalUrl, method: req.method, body: req.body })
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  if (viteDevServer) {
    app.use(viteDevServer.middlewares)
  }

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
