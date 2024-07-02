import assert from 'assert'
import type { NextApiRequest, NextApiResponse } from 'next'
import { config, telefunc } from 'telefunc'
import { getUser } from '../../auth/getUser'

config.telefuncUrl = '/api/_telefunc'

export default async function telefuncMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const { url, method, body } = req
  assert(url && method)
  const context = { user: getUser(req) }
  const httpResponse = await telefunc({ url, method, body, context })
  res.status(httpResponse.statusCode).send(httpResponse.body)
}
