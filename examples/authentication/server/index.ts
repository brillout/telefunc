import express from 'express'
import { telefunc } from 'telefunc'
import cookieParser from 'cookie-parser'
import { retrieveUser } from '#app/auth'
import vike from 'vike-node/express'
import type { Get, UniversalMiddleware } from "@universal-middleware/core";
import { createMiddleware } from "@universal-middleware/express";

const contextMiddleware = ((value) => (request, ctx, runtime) => {
  // @ts-ignore
  const { req } = runtime
  const user = retrieveUser(req)
  return {
    ...ctx,
    user,
  };
}) satisfies Get<[string], UniversalMiddleware>;

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

  app.use(createMiddleware(contextMiddleware)("world"));

  // TODO: set pageContext.user
  app.use(vike())

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
