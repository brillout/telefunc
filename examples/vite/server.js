import express from 'express'
import { telefunc } from 'telefunc'

startServer()

async function startServer() {
  const app = express()
  installTelefunc(app)
  await installFrontend(app)
  start(app)
}

function installTelefunc(app) {
  app.use(express.text())
  app.all('/_telefunc', async (req, res) => {
    const { originalUrl: url, method, body } = req
    const httpResponse = await telefunc({ url, method, body })
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })
}

async function installFrontend(app) {
  if (process.env.NODE_ENV === 'production') {
    const root = await getRoot()
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }
}

function start(app) {
  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
async function getRoot() {
  const { dirname } = await import('path')
  const { fileURLToPath } = await import('url')
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const root = __dirname
  return root
}
