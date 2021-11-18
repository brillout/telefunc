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
    const { originalUrl: url, method, body } = req

    const result = await callTelefunc({ url, method, body })
    if (!result) return next()
    res.status(result.statusCode).type(result.contentType).send(result.body)
  })

  if (viteDevServer) {
    app.use(viteDevServer.middlewares)
  }

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
