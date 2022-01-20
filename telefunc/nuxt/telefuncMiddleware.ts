import { Context } from '@nuxt/types'
import { telefunc } from '../server'
import { assert } from '../shared/utils'

export { telefuncMiddleware }

const telefuncMiddleware = async (
  req: Context['req'] & { url: string; method: string; body: string },
  res: Context['res'],
  next: Context['next'],
) => {
  const { url, method, body } = req

  if (url !== '/_telefunc') {
    next?.()
    return
  }

  const httpResponse = await telefunc({ url, method, body })
  assert(httpResponse)
  res.writeHead(httpResponse.statusCode).end(httpResponse.body)
}
