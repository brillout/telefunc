export { __internal_fetchTelefunc }

import { makeHttpRequest } from './makeRemoteCall/makeHttpRequest'
import { serializeTelefunctionArguments } from './makeRemoteCall/serializeTelefunctionArguments'
import { resolveConfigDefaults, telefuncConfig } from './telefuncConfig'
import { objectAssign, assertUsage, isBrowser } from './utils'

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

  const { telefunctionReturn, requestError } = await makeHttpRequest(callContext)
  if (requestError) {
    throw requestError
  }
  return telefunctionReturn
}
