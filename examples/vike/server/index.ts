export default startServer()

import { Hono } from 'hono'
import { apply, serve } from '@photonjs/hono'

function startServer() {
  const app = new Hono()
  apply(app)
  return serve(app, { port: 3000 })
}
