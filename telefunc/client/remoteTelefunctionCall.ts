export { remoteTelefunctionCall }

import { resolveClientConfig } from './clientConfig'
import { makeHttpRequest } from './remoteTelefunctionCall/makeHttpRequest'
import { serializeTelefunctionArguments } from './remoteTelefunctionCall/serializeTelefunctionArguments'
import { assertUsage, isBrowser, objectAssign } from './utils'

async function remoteTelefunctionCall(
  telefuncFilePath: string,
  telefunctionName: string,
  telefunctionArgs: unknown[],
): Promise<unknown> {
  assertUsage(isBrowser(), 'The Telefunc Client is meant to be run only in the browser.')

  const callContext = {}
  {
    objectAssign(callContext, {
      telefuncFilePath,
      telefunctionName,
      telefunctionArgs,
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
