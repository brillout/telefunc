export { __internal_fetchTelefunc }

import { makeHttpRequest } from './makeRemoteCall/makeHttpRequest'
import { serializeTelefunctionArguments } from './makeRemoteCall/serializeTelefunctionArguments'
import { resolveConfigDefaults, telefuncConfig } from './telefuncConfig'
import { objectAssign, assertUsage, isBrowser, assert } from './utils'

async function __internal_fetchTelefunc(
  telefuncFilePath: string,
  telefuncFileExportName: string,
  telefunctionArgs: unknown[],
): Promise<unknown> {
  assertUsage(
    isBrowser(),
    'The Telefunc Client is meant to be run only in the browser. Reach out if you need to run the Telefunc Client on the server.',
  )

  const callContext = {}
  {
    const telefunctionName = `${telefuncFilePath}:${telefuncFileExportName}`
    objectAssign(callContext, {
      telefunctionName,
      telefunctionArgs,
    })
  }
  {
    const configResolved = resolveConfigDefaults(telefuncConfig)
    objectAssign(callContext, configResolved)
  }

  {
    const httpRequestBody = serializeTelefunctionArguments(callContext)
    objectAssign(callContext, { httpRequestBody })
  }

  const resp = await makeHttpRequest(callContext)
  if ('telefuncCallError' in resp) {
    const { telefuncCallError } = resp
    assert(telefuncCallError)
    throw telefuncCallError
  }
  const { telefunctionReturn } = resp
  return telefunctionReturn
}
