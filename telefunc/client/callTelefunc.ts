export { __internal_fetchTelefunc }

import { makeHttpRequest } from './callTelefunc/makeHttpRequest'
import { serializeTelefunctionArguments } from './callTelefunc/serializeTelefunctionArguments'
import { getTelefunctionName } from './callTelefunc/getTelefunctionName'
import { telefuncConfig } from './telefuncConfig'
import { objectAssign, assertUsage, isBrowser, assert } from './utils'

async function __internal_fetchTelefunc(
  telefunctionFilePath: string,
  telefunctionFileExport: string,
  telefunctionArgs: unknown[]
): Promise<unknown> {
  assertUsage(isBrowser(), 'The Telefunc Client is meant to be run only in the browser.')

  const callContext = {}
  {
    const telefunctionName = getTelefunctionName({ telefunctionFileExport, telefunctionFilePath })
    objectAssign(callContext, {
      telefunctionName,
      telefunctionFilePath,
      telefunctionFileExport,
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
