export { runTelefunc }

import { assert, objectAssign } from '../utils'
import { getContextOptional } from './getContext'
import { loadTelefuncFiles } from './runTelefunc/loadTelefuncFiles'
import { parseHttpRequest } from './runTelefunc/parseHttpRequest'
// import { getEtag } from './runTelefunc/getEtag'
import { getTelefunctions } from './runTelefunc/getTelefunctions'
import { executeTelefunction } from './runTelefunc/executeTelefunction'
import { serializeTelefunctionResult } from './runTelefunc/serializeTelefunctionResult'
import { handleError } from './runTelefunc/handleError'
import { executeServerErrorListeners } from './runTelefunc/onTelefuncServerError'
import { applyShield } from './runTelefunc/applyShield'
import { findTelefunction } from './runTelefunc/findTelefunction'
import { globalContext } from './globalContext'
import { telefuncConfig } from './telefuncConfig'

type HttpResponse = {
  body: string
  statusCode: 200 | 500 | 400 | 403
  contentType: 'text/plain'
  etag: string | null
}

const malformedRequest = {
  body: 'Malformed Request',
  statusCode: 400 as const,
  contentType: 'text/plain' as const,
  etag: null,
}

const serverError = {
  body: 'Internal Server Error (Telefunc Request)',
  statusCode: 500 as const,
  contentType: 'text/plain' as const,
  etag: null,
}

async function runTelefunc(runContext: Parameters<typeof runTelefunc_>[0]) {
  try {
    return await runTelefunc_(runContext)
  } catch (err: unknown) {
    executeServerErrorListeners(err)
    handleError(err, globalContext.viteDevServer || null)
    return serverError
  }
}

async function runTelefunc_(httpRequest: { url: string; method: string; body: unknown }): Promise<HttpResponse> {
  const runContext = {}
  objectAssign(runContext, { httpRequest })
  objectAssign(runContext, telefuncConfig)
  runContext.viteDevServer = null
  objectAssign(runContext, globalContext)

  {
    const logInvalidRequests = !runContext.isProduction || runContext.debug
    objectAssign(runContext, { logInvalidRequests })
  }

  objectAssign(runContext, {
    providedContext: getContextOptional() || null,
  })
  {
    const parsed = parseHttpRequest(runContext)
    if (parsed.isMalformed) {
      return malformedRequest
    }
    const { telefunctionName, telefunctionKey, telefunctionArgs, telefunctionFilePath, telefunctionFileExport } = parsed
    objectAssign(runContext, {
      telefunctionName,
      telefunctionKey,
      telefunctionArgs,
      telefunctionFilePath,
      telefunctionFileExport,
    })
  }

  {
    const telefuncFilesLoaded = await loadTelefuncFiles(runContext)
    assert(telefuncFilesLoaded, 'No `.telefunc.js` file found')
    objectAssign(runContext, { telefuncFilesLoaded })
    runContext.telefuncFilesLoaded
  }

  {
    const { telefunctions } = await getTelefunctions(runContext)
    objectAssign(runContext, { telefunctions })
  }

  {
    const telefunction = findTelefunction(runContext)
    if (!telefunction) {
      return malformedRequest
    }
    objectAssign(runContext, { telefunction })
  }

  applyShield(runContext)

  const { telefunctionReturn, telefunctionAborted, telefunctionHasErrored, telefunctionError } =
    await executeTelefunction(runContext)
  objectAssign(runContext, {
    telefunctionReturn,
    telefunctionHasErrored,
    telefunctionAborted,
    telefunctionError,
  })

  if (runContext.telefunctionHasErrored) {
    throw runContext.telefunctionError
  }

  {
    const httpResponseBody = serializeTelefunctionResult(runContext)
    objectAssign(runContext, { httpResponseBody })
  }

  // {
  //   const httpResponseEtag = await getEtag(runContext)
  //   objectAssign(runContext, { httpResponseEtag })
  // }

  return {
    body: runContext.httpResponseBody,
    statusCode: runContext.telefunctionAborted ? 403 : 200,
    // etag: runContext.httpResponseEtag,
    etag: null,
    contentType: 'text/plain',
  }
}
