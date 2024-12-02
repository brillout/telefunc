import express from 'express'
import { telefunc } from 'telefunc'
import cookieParser from 'cookie-parser'
import { retrieveUser } from '#app/auth'
import vike from 'vike-node/express'
import type { Get, UniversalMiddleware } from "@universal-middleware/core";
import {
  getCookie,
} from "@universal-middleware/core/cookie";
import { createMiddleware } from "@universal-middleware/express";
import { COOKIE_NAME } from '#app/auth/COOKIE_NAME'

const contextMiddleware = ((value) => (request, ctx, runtime) => {
  // @ts-ignore
  const { req } = runtime
  const user = retrieveUser(req)
  /*
  //console.log('runtime', runtime)
  //console.log('request', request)
  console.log('cookie userId', getCookie(request, COOKIE_NAME))
  console.log('req.cookies', req.cookies)
  // const req = { cookies: { [COOKIE_NAME]: getCookie(request, COOKIE_NAME)?.value }}
  console.log('req 1', req)
  console.log('req.cookies[COOKIE_NAME] 1', req.cookies[COOKIE_NAME])
  //console.log('cookies', req.cookies)
//*/
  console.log('user', user)
  // Return the new universal context, thus keeping complete type safety
  // A less typesafe way to do the same thing would be to `ctx.something = value` and return nothing
  return {
    ...ctx,
    user,
    hello: value,
  };
  // Using `satisfies` to not lose return type
}) satisfies Get<[string], UniversalMiddleware>;

startServer()

async function startServer() {
  const app = express()

  app.use(cookieParser())
  app.use(express.text()) // Parse & make HTTP request body available at `req.body`
  app.all('/_telefunc', async (req, res) => {
  console.log('req 2', req)
  console.log('req.cookies[COOKIE_NAME] 2', req.cookies[COOKIE_NAME])
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
