export { runTelefunc }
export type { HttpResponse }

import { assert, objectAssign, isProduction } from './utils.js'
import { Telefunc } from './getContext.js'
import { loadTelefuncFiles } from './runTelefunc/loadTelefuncFiles.js'
import { parseHttpRequest } from './runTelefunc/parseHttpRequest.js'
// import { getEtag } from './runTelefunc/getEtag.js'
import { executeTelefunction } from './runTelefunc/executeTelefunction.js'
import { serializeTelefunctionResult } from './runTelefunc/serializeTelefunctionResult.js'
import { handleError } from './runTelefunc/handleError.js'
import { callBugListeners } from './runTelefunc/onBug.js'
import { applyShield } from './runTelefunc/applyShield.js'
import { findTelefunction } from './runTelefunc/findTelefunction.js'
import { getServerConfig } from './serverConfig.js'

/** The HTTP Response of a telefunction remote call HTTP Request */
type HttpResponse = {
  /** HTTP Response Status Code */
  statusCode: 200 | 400 | 403 | 422 | 500
  /** HTTP Response Body */
  body: string
  /** HTTP Response Header `Content-Type` */
  contentType: 'text/plain'
  /** HTTP Response Header `ETag` */
  etag: string | null
  /** Error thrown by your telefunction */
  err?: unknown
}

// TODO dedupe
// HTTP Response for:
//  - `throw Abort()`
const abortedRequestStatusCode = 403 // "Forbidden"

// TODO dedupe
// HTTP Response for:
//  - shield() error
const shieldValidationError = {
  statusCode: 422 as const, // "Unprocessable Content"
  // TODO dedupe
  body: 'Shield Validation Error',
  contentType: 'text/plain' as const,
  etag: null,
}

// HTTP Response for:
// - User's telefunction threw an error that isn't `Abort()` (i.e. the telefunction has a bug).
// - The `.telefunc.js` file exports a non-function value.
// - The Telefunc code threw an error (i.e. Telefunc has a bug).
const serverError = {
  // TODO dedupe
  statusCode: 500 as const, // "Internal Server Error"
  // TODO dedupe
  body: 'Internal Server Error',
  contentType: 'text/plain' as const,
  etag: null,
}

// HTTP Response for:
// - Some non-telefunc client makes a malformed HTTP request.
// - The telefunction couldn't be found.
const malformedRequest = {
  statusCode: 400 as const, // "Bad Request"
  body: 'Invalid Telefunc Request',
  contentType: 'text/plain' as const,
  etag: null,
}

async function runTelefunc(runContext: Parameters<typeof runTelefunc_>[0]): Promise<HttpResponse> {
  try {
    return await runTelefunc_(runContext)
  } catch (err: unknown) {
    callBugListeners(err)
    handleError(err)
    return {
      err,
      ...serverError,
    }
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
    // TO-DO/eventually: remove? Since `serverConfig` is global I don't think we need to set it to `runContext`, see for example https://github.com/brillout/telefunc/commit/5e3367d2d463b72e805e75ddfc68ef7f177a35c0
    const serverConfig = getServerConfig()
    objectAssign(runContext, {
      httpRequest,
      serverConfig: {
        disableNamingConvention: serverConfig.disableNamingConvention,
        telefuncUrl: serverConfig.telefuncUrl,
        log: serverConfig.log,
      },
      appRootDir: serverConfig.root,
      telefuncFilesManuallyProvidedByUser: serverConfig.telefuncFiles,
    })
  }

  {
    const logMalformedRequests = !isProduction() /* || process.env.DEBUG.includes('telefunc') */
    objectAssign(runContext, { logMalformedRequests })
  }

  objectAssign(runContext, {
    providedContext: httpRequest.context || null,
  })
  {
    const parsed = parseHttpRequest(runContext)
    if (parsed.isMalformedRequest) {
      return malformedRequest
    }
    const { telefunctionKey, telefunctionArgs, telefuncFilePath, telefunctionName } = parsed
    objectAssign(runContext, {
      telefunctionKey,
      telefunctionArgs,
      telefuncFilePath,
      telefunctionName,
    })
  }

  {
    const { telefuncFilesLoaded, telefuncFilesAll } = await loadTelefuncFiles(runContext)
    assert(telefuncFilesLoaded, 'No `.telefunc.js` file found')
    objectAssign(runContext, { telefuncFilesLoaded, telefuncFilesAll })
  }

  {
    const telefunction = await findTelefunction(runContext)
    if (!telefunction) {
      return malformedRequest
    }
    objectAssign(runContext, { telefunction })
  }

  {
    const { isValidRequest } = applyShield(runContext)
    objectAssign(runContext, { isValidRequest })
    if (!isValidRequest) {
      objectAssign(runContext, {
        telefunctionAborted: true,
        telefunctionReturn: undefined,
      })
      return shieldValidationError
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
      telefunctionError,
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
    etag: null,
  }
}
