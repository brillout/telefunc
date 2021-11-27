import { Context } from '@nuxt/types'
import { createTelefuncCaller } from 'telefunc'
import { assert } from '../../shared/utils'

export { _telefunc }

const callTelefuncPromise = createTelefuncCaller({
  isProduction: process.env.NODE_ENV === 'production',
  root: process.cwd(),
})

const _telefunc = async (
  req: Context['req'] & { url: string; method: string; body: string },
  res: Context['res'],
  next: Context['next'],
) => {
  const { url, method, body } = req

  if (url !== '/_telefunc') {
    next?.()
    return
  }

  let callTelefunc = await callTelefuncPromise

  const httpResponse = await callTelefunc({ url, method, body })

  if (httpResponse) {
    res.writeHead(httpResponse.statusCode).end(httpResponse.body)
    return
  }
  assert(httpResponse)
}
