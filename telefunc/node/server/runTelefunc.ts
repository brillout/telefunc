export { runTelefunc }

import { assert, objectAssign, isProduction } from '../utils'
import { getContextOptional, isAsyncMode } from './getContext'
import { loadTelefuncFiles } from './runTelefunc/loadTelefuncFiles'
import { parseHttpRequest } from './runTelefunc/parseHttpRequest'
// import { getEtag } from './runTelefunc/getEtag'
import { getTelefunctions } from './runTelefunc/getTelefunctions'
import { executeTelefunction } from './runTelefunc/executeTelefunction'
import { serializeTelefunctionResult } from './runTelefunc/serializeTelefunctionResult'
import { handleError } from './runTelefunc/handleError'
import { callBugListeners } from './runTelefunc/onBug'
import { applyShield } from './runTelefunc/applyShield'
import { findTelefunction } from './runTelefunc/findTelefunction'
import { globalContext } from './globalContext'
import { telefuncConfig } from './telefuncConfig'

type HttpResponse = {
  statusCode: 200 | 403 | 500 | 400
  body: string
  contentType: 'text/plain'
  etag: string | null
}

// Status code for `throw Abort()`
const abortedRequestStatusCode = 403

// HTTP Response for:
// - User's telefunction threw an error (that isn't `Abort()`).
// - Telefunc throw an error (i.e. Telefunc has a bug).
const serverError = {
  statusCode: 500 as const,
  body: 'Internal Server Error (Telefunc)',
  contentType: 'text/plain' as const,
  etag: null
}

// HTTP Response for:
// - The telefunction couldn't be found.
// - Some non-telefunc client makes a malformed HTTP request.
const invalidRequest = {
  statusCode: 400 as const,
  body: 'Invalid Request (Telefunc)',
  contentType: 'text/plain' as const,
  etag: null
}

async function runTelefunc(runContext: Parameters<typeof runTelefunc_>[0]) {
  try {
    return await runTelefunc_(runContext)
  } catch (err: unknown) {
    callBugListeners(err)
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
    const logInvalidRequests = !isProduction() || runContext.debug
    objectAssign(runContext, { logInvalidRequests })
  }

  objectAssign(runContext, {
    providedContext: isAsyncMode() ? null : getContextOptional() || null
  })
  {
    const parsed = parseHttpRequest(runContext)
    if (parsed.isMalformed) {
      return invalidRequest
    }
    const { telefunctionName, telefunctionKey, telefunctionArgs, telefuncFilePath, telefunctionFileExport } = parsed
    objectAssign(runContext, {
      telefunctionName,
      telefunctionKey,
      telefunctionArgs,
      telefuncFilePath,
      telefunctionFileExport
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
      return invalidRequest
    }
    objectAssign(runContext, { telefunction })
  }

  {
    const { isValidRequest } = applyShield(runContext)
    objectAssign(runContext, { isValidRequest })
    if (!isValidRequest) {
      objectAssign(runContext, {
        telefunctionAborted: true,
        telefunctionReturn: undefined
      })
      const httpResponseBody = serializeTelefunctionResult(runContext)
      return {
        statusCode: abortedRequestStatusCode,
        body: httpResponseBody,
        contentType: 'text/plain' as const,
        etag: null
      }
    }
  }

  {
    assert(runContext.isValidRequest)
    const { telefunctionReturn, telefunctionAborted, telefunctionHasErrored, telefunctionError } =
      await executeTelefunction(runContext)
    objectAssign(runContext, {
      telefunctionReturn,
      telefunctionHasErrored,
      telefunctionAborted,
      telefunctionError
    })
  }

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
    statusCode: runContext.telefunctionAborted ? abortedRequestStatusCode : 200,
    body: runContext.httpResponseBody,
    contentType: 'text/plain',
    // etag: runContext.httpResponseEtag,
    etag: null
  }
}
