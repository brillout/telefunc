export { remoteTelefunctionCall }

import { makeHttpRequest } from './remoteTelefunctionCall/makeHttpRequest'
import { serializeTelefunctionArguments } from './remoteTelefunctionCall/serializeTelefunctionArguments'
import { telefuncConfig } from './telefuncConfig'
import { objectAssign, assertUsage, isBrowser, assert } from './utils'

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

  objectAssign(callContext, telefuncConfig)

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