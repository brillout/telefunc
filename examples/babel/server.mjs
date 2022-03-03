import express from 'express'
import { telefunc, telefuncConfig } from 'telefunc'
import { createRequire } from 'module'

startServer()

{
  const require = createRequire(import.meta.url)
  telefuncConfig.telefuncFiles = [require.resolve('./hello.telefunc.mjs')]
}

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
  const root = await getRoot()
  console.log(root)
  app.use(express.static(`${root}/dist`))
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
