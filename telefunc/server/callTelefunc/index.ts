export { callTelefuncStart }

import type { ViteDevServer } from 'vite'
import { assert, assertUsage, checkType, hasProp, objectAssign } from '../utils'
import { Telefunctions } from '../../shared/types'
import { loadTelefuncFiles } from './loadTelefuncFiles'
import { HttpRequest, TelefuncFiles } from '../types'
import { getContextOptional } from '../getContext'
import { parseHttpRequest } from './parseHttpRequest'
import { getEtag } from './getEtag'
import { getTelefunctions } from './getTelefunctions'
import { executeTelefunction } from './executeTelefunction'
import { serializeTelefunctionResult } from './serializeTelefunctionResult'

type HttpResponse = {
  body: string
  statusCode: 200 | 500 | 400
  contentType: 'text/plain'
  etag: string | null
}

const malformedRequest = {
  body: 'Malformed Request',
  statusCode: 400 as const,
  contentType: 'text/plain' as const,
  etag: null,
}

const internnalError = {
  body: 'Internal Server Error',
  statusCode: 500 as const,
  contentType: 'text/plain' as const,
  etag: null,
}

async function callTelefuncStart(callContext: Parameters<typeof callTelefuncStart_>[0]) {
  try {
    return await callTelefuncStart_(callContext)
  } catch (err: unknown) {
    // - There is a bug in Telefunc's source code, or
    // - a telefunction throw an error that is not `Abort()`.
    handleError(err, callContext)
    return internnalError
  }
}

async function callTelefuncStart_(callContext: {
  _httpRequest: HttpRequest
  _viteDevServer: ViteDevServer | null
  _telefuncFilesProvidedByUser: TelefuncFiles | null
  _isProduction: boolean
  _root: string | null
  _telefuncUrl: string
  _disableEtag: boolean
}): Promise<HttpResponse> {
  objectAssign(callContext, {
    _providedContext: getContextOptional() || null,
  })

  if (callContext._httpRequest.method !== 'POST' && callContext._httpRequest.method !== 'post') {
    assert(callContext._isProduction) // We don't expect any third-party requests in development and we can assume requests to always originate from the Telefunc Client.
    return malformedRequest
  }
  assert(callContext._httpRequest.url === callContext._telefuncUrl)

  {
    const parsed = parseHttpRequest(callContext)
    if (parsed.isMalformed) {
      return malformedRequest
    }
    const { telefunctionName, telefunctionArgs } = parsed
    objectAssign(callContext, {
      _telefunctionName: telefunctionName,
      _telefunctionArgs: telefunctionArgs,
    })
  }

  {
    const telefuncFiles = callContext._telefuncFilesProvidedByUser || (await loadTelefuncFiles(callContext))
    assert(telefuncFiles, 'No `.telefunc.js` file found')
    checkType<TelefuncFiles>(telefuncFiles)
    objectAssign(callContext, { _telefuncFiles: telefuncFiles })
  }

  {
    const { telefunctions } = await getTelefunctions(callContext)
    checkType<Telefunctions>(telefunctions)
    objectAssign(callContext, {
      _telefunctions: telefunctions,
    })
  }

  assertUsage(
    callContext._telefunctionName in callContext._telefunctions,
    `Could not find telefunction \`${
      callContext._telefunctionName
    }\`. Is your browser-side JavaScript out-of-sync with your server-side JavaScript? Loaded telefunctions: [${Object.keys(
      callContext._telefunctions,
    ).join(', ')}]`,
  )

  const { telefunctionReturn, telefunctionHasErrored, telefunctionError } = await executeTelefunction(callContext)
  objectAssign(callContext, {
    _telefunctionReturn: telefunctionReturn,
    _telefunctionHasErrored: telefunctionHasErrored,
    _telefuncError: telefunctionError,
    _err: telefunctionError,
  })

  if (callContext._telefunctionHasErrored) {
    throw callContext._telefuncError
  }

  {
    const httpResponseBody = serializeTelefunctionResult(callContext)
    objectAssign(callContext, { _httpResponseBody: httpResponseBody })
  }

  {
    const etag = await getEtag(callContext)
    objectAssign(callContext, {
      _httpResponseEtag: etag,
    })
  }

  return {
    body: callContext._httpResponseBody,
    statusCode: 200,
    etag: callContext._httpResponseEtag,
    contentType: 'text/plain',
  }
}

function handleError(
  err: unknown,
  callContext: { _isProduction: boolean; _viteDevServer: ViteDevServer | null },
) {
  // We ensure we print a string; Cloudflare Workers doesn't seem to properly stringify `Error` objects.
  const errStr = (hasProp(err, 'stack') && String(err.stack)) || String(err)
  if (!callContext._isProduction && callContext._viteDevServer) {
    // TODO: check if Vite already logged the error
  }

  if (viteAlreadyLoggedError(err, callContext)) {
    return
  }
  viteErrorCleanup(err, callContext._viteDevServer)

  console.error(errStr)
}

function viteAlreadyLoggedError(
  err: unknown,
  callContext: { _isProduction: boolean; _viteDevServer: ViteDevServer | null },
) {
  if (callContext._isProduction) {
    return false
  }
  if (callContext._viteDevServer && callContext._viteDevServer.config.logger.hasErrorLogged(err as Error)) {
    return true
  }
  return false
}

function viteErrorCleanup(err: unknown, viteDevServer: ViteDevServer | null) {
  if (viteDevServer) {
    if (hasProp(err, 'stack')) {
      // Apply source maps
      viteDevServer.ssrFixStacktrace(err as Error)
    }
  }
}
