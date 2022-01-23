export { __internal_fetchTelefunc }

import { makeHttpRequest } from './callTelefunc/makeHttpRequest'
import { serializeTelefunctionArguments } from './callTelefunc/serializeTelefunctionArguments'
import { config } from './config'
import { objectAssign, assertUsage, isBrowser, assert } from './utils'

async function __internal_fetchTelefunc(
  telefunctionFilePath: string,
  telefunctionExportName: string,
  telefunctionArgs: unknown[],
): Promise<unknown> {
  assertUsage(
    isBrowser(),
    'The Telefunc Client is meant to be run only in the browser. Reach out if you need to run the Telefunc Client on the server.',
  )

  const callContext = {}
  {
    objectAssign(callContext, {
      telefunctionFilePath,
      telefunctionExportName,
      telefunctionArgs,
    })
  }

  objectAssign(callContext, config)

  {
    const httpRequestBody = serializeTelefunctionArguments(callContext)
    objectAssign(callContext, { httpRequestBody })
  }

  const resp = await makeHttpRequest(callContext)
  if ('telefunctionCallError' in resp) {
    const { telefunctionCallError } = resp
    assert(telefunctionCallError)
    throw telefunctionCallError
  }
  const { telefunctionReturn } = resp
  return telefunctionReturn
}
