export { remoteTelefunctionCall }

import { makeHttpRequest } from './remoteTelefunctionCall/makeHttpRequest'
import { serializeTelefunctionArguments } from './remoteTelefunctionCall/serializeTelefunctionArguments'
import { resolveClientConfig } from './clientConfig'
import { objectAssign, assertUsage, isBrowser } from './utils'

async function remoteTelefunctionCall(
  telefuncFilePath: string,
  telefunctionName: string,
  telefunctionArgs: unknown[]
): Promise<unknown> {
  assertUsage(isBrowser(), 'The Telefunc Client is meant to be run only in the browser.')

  const callContext = {}
  {
    objectAssign(callContext, {
      telefuncFilePath,
      telefunctionName,
      telefunctionArgs
    })
  }

  objectAssign(callContext, resolveClientConfig())

  {
    const httpRequestBody = serializeTelefunctionArguments(callContext)
    objectAssign(callContext, { httpRequestBody })
  }

  const { telefunctionReturn } = await makeHttpRequest(callContext)
  return telefunctionReturn
}
