export { runTelefunc }
export type { HttpResponse }

import { assert } from '../../utils/assert.js'
import { isProduction } from '../../utils/isProduction.js'
import { objectAssign } from '../../utils/objectAssign.js'
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
import {
  STATUS_CODE_THROW_ABORT,
  STATUS_CODE_SHIELD_VALIDATION_ERROR,
  STATUS_BODY_SHIELD_VALIDATION_ERROR,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_BODY_INTERNAL_SERVER_ERROR,
  STATUS_CODE_MALFORMED_REQUEST,
  STATUS_BODY_MALFORMED_REQUEST,
  STATUS_CODE_SUCCESS,
} from '../../shared/constants.js'

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

const shieldValidationError = {
  statusCode: STATUS_CODE_SHIELD_VALIDATION_ERROR,
  body: STATUS_BODY_SHIELD_VALIDATION_ERROR,
  contentType: 'text/plain' as const,
  etag: null,
} as const

// HTTP Response for:
// - User's telefunction threw an error that isn't `Abort()` (i.e. the telefunction has a bug).
// - The `.telefunc.js` file exports a non-function value.
// - The Telefunc code threw an error (i.e. Telefunc has a bug).
const serverError = {
  statusCode: STATUS_CODE_INTERNAL_SERVER_ERROR,
  body: STATUS_BODY_INTERNAL_SERVER_ERROR,
  contentType: 'text/plain' as const,
  etag: null,
} as const

// HTTP Response for:
// - Some non-telefunc client makes a malformed HTTP request.
// - The telefunction couldn't be found.
const malformedRequest = {
  statusCode: STATUS_CODE_MALFORMED_REQUEST,
  body: STATUS_BODY_MALFORMED_REQUEST,
  contentType: 'text/plain' as const,
  etag: null,
} as const

async function runTelefunc(httpRequestResolved: Parameters<typeof runTelefunc_>[0]): Promise<HttpResponse> {
  try {
    return await runTelefunc_(httpRequestResolved)
  } catch (err: unknown) {
    callBugListeners(err)
    handleError(err)
    return {
      err,
      ...serverError,
    }
  }
}

async function runTelefunc_({
  request,
  context,
}: {
  request: Request
  context?: Telefunc.Context
}): Promise<HttpResponse> {
  const runContext = {}
  {
    // TO-DO/eventually: remove? Since `serverConfig` is global I don't think we need to set it to `runContext`, see for example https://github.com/brillout/telefunc/commit/5e3367d2d463b72e805e75ddfc68ef7f177a35c0
    const serverConfig = getServerConfig()
    objectAssign(runContext, {
      request,
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
    providedContext: context || null,
  })
  {
    const parsed = await parseHttpRequest(runContext)
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
    statusCode: runContext.telefunctionAborted ? STATUS_CODE_THROW_ABORT : STATUS_CODE_SUCCESS,
    body: runContext.httpResponseBody,
    contentType: 'text/plain',
    // etag: runContext.httpResponseEtag,
    etag: null,
  }
}
