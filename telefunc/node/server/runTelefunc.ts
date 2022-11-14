export { runTelefunc }
export type { HttpResponse }

import { assert, objectAssign, isProduction } from '../utils'
import { Telefunc } from './getContext'
import { loadTelefuncFiles } from './runTelefunc/loadTelefuncFiles'
import { parseHttpRequest } from './runTelefunc/parseHttpRequest'
// import { getEtag } from './runTelefunc/getEtag'
import { executeTelefunction } from './runTelefunc/executeTelefunction'
import { serializeTelefunctionResult } from './runTelefunc/serializeTelefunctionResult'
import { handleError } from './runTelefunc/handleError'
import { callBugListeners } from './runTelefunc/onBug'
import { applyShield } from './runTelefunc/applyShield'
import { findTelefunction } from './runTelefunc/findTelefunction'
import { globalContext } from './globalContext'
import { resolveServerConfig } from './serverConfig'

/** The HTTP Response of a telefunction remote call HTTP Request */
type HttpResponse = {
  /** HTTP Response Status Code */
  statusCode: 200 | 403 | 500 | 400
  /** HTTP Response Body */
  body: string
  /** HTTP Response Header `Content-Type` */
  contentType: 'text/plain'
  /** HTTP Response Header `ETag` */
  etag: string | null
}

// Status code for `throw Abort()`
const abortedRequestStatusCode = 403

// HTTP Response for:
// - User's telefunction threw an error that isn't `Abort()` (i.e. the telefunction has a bug).
// - The Telefunc code threw an error (i.e. Telefunc has a bug).
const serverError = {
  statusCode: 500 as const,
  body: 'Internal Server Error',
  contentType: 'text/plain' as const,
  etag: null
}

// HTTP Response for:
// - Some non-telefunc client makes a malformed HTTP request.
// - The telefunction couldn't be found.
const invalidRequest = {
  statusCode: 400 as const,
  body: 'Invalid Telefunc Request',
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

async function runTelefunc_(httpRequest: {
  url: string
  method: string
  body: unknown
  context?: Telefunc.Context
}): Promise<HttpResponse> {
  const runContext = {}
  {
    const serverConfig = resolveServerConfig()
    objectAssign(runContext, {
      httpRequest,
      serverConfig: {
        disableNamingConvention: serverConfig.disableNamingConvention,
        telefuncUrl: serverConfig.telefuncUrl
      },
      appRootDir: serverConfig.root,
      telefuncFilesManuallyProvidedByUser: serverConfig.telefuncFiles,
      viteDevServer: globalContext.viteDevServer ?? null
    })
  }

  {
    const logInvalidRequests = !isProduction() /* || process.env.DEBUG.includes('telefunc') */
    objectAssign(runContext, { logInvalidRequests })
  }

  objectAssign(runContext, {
    providedContext: httpRequest.context || null
  })
  {
    const parsed = parseHttpRequest(runContext)
    if (parsed.isMalformed) {
      return invalidRequest
    }
    const { telefunctionKey, telefunctionArgs, telefuncFilePath, telefunctionName } = parsed
    objectAssign(runContext, {
      telefunctionKey,
      telefunctionArgs,
      telefuncFilePath,
      telefunctionName
    })
  }

  {
    const { telefuncFilesLoaded, telefuncFilesAll } = await loadTelefuncFiles(runContext)
    assert(telefuncFilesLoaded, 'No `.telefunc.js` file found')
    objectAssign(runContext, { telefuncFilesLoaded, telefuncFilesAll })
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
