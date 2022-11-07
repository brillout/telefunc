import { getUser } from '../../auth/getUser'
import { telefunc, config, provideTelefuncContext } from 'telefunc'
import type { NextApiRequest, NextApiResponse } from 'next'
import assert from 'assert'

config.telefuncUrl = '/api/_telefunc'

export default async function telefuncMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const user = getUser(req)
  provideTelefuncContext({ user })
  const { url, method, body } = req
  assert(url && method && typeof body === 'string')
  const httpRequest = { url, method, body }
  const httpResponse = await telefunc(httpRequest)
  res.status(httpResponse.statusCode).send(httpResponse.body)
}
