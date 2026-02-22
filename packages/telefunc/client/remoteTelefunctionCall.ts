export { remoteTelefunctionCall }

import { makeHttpRequest } from './remoteTelefunctionCall/makeHttpRequest.js'
import { serializeTelefunctionArguments } from './remoteTelefunctionCall/serializeTelefunctionArguments.js'
import { resolveClientConfig } from './clientConfig.js'
import { assertUsage } from '../utils/assert.js'
import { isBrowser } from '../utils/isBrowser.js'
import { objectAssign } from '../utils/objectAssign.js'

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
