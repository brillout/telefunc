import express from 'express'
import { telefunc } from 'telefunc'
import cookieParser from 'cookie-parser'
import { retrieveUser } from '#app/auth'
import vike from 'vike-node/express'
import { createMiddleware } from "@universal-middleware/express";

startServer()

async function startServer() {
  const app = express()

  app.use(cookieParser())
  app.use(express.text()) // Parse & make HTTP request body available at `req.body`
  app.all('/_telefunc', async (req, res) => {
    const context = { user: retrieveUser(req) }
    const httpResponse = await telefunc({ url: req.originalUrl, method: req.method, body: req.body, context })
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  // Set pageContext.user
  // https://github.com/vikejs/vike-node#custom-pagecontext
  app.use(createMiddleware((() => (_request, ctx, runtime) => {
    // @ts-ignore
    const { req } = runtime
    const user = retrieveUser(req)
    return {
      ...ctx,
      user,
    };
  }))())
  app.use(vike())

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
