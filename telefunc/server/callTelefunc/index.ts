export { callTelefuncStart }

import { stringify } from '@brillout/json-s'
import type { ViteDevServer } from 'vite'
import { assert, assertUsage, checkType, hasProp, isPromise, objectAssign } from '../utils'
import { Telefunction, Telefunctions } from '../../shared/types'
import { loadTelefuncFiles } from './loadTelefuncFiles'
import { HttpRequest, TelefuncFiles } from '../types'
import { getContextOptional, provideContext } from '../getContext'
import type { Telefunc } from '../getContext'
import { parseHttpRequest } from './parseHttpRequest'
import { getEtag } from './getEtag'
import { getTelefunctions } from './getTelefunctions'

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
    handleInternalError(err, callContext)
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

  const { telefuncResult, telefuncHasErrored, telefuncError } = await executeTelefunction(callContext)
  objectAssign(callContext, {
    _telefuncResult: telefuncResult,
    _telefuncHasErrored: telefuncHasErrored,
    _telefuncError: telefuncError,
    _err: telefuncError,
  })

  if (callContext._telefuncError) {
    throw callContext._telefuncError
  }

  {
    const serializationResult = serializeTelefuncResult(callContext)
    assertUsage(
      !('serializationError' in serializationResult),
      [
        `Couldn't serialize value returned by telefunction \`${callContext._telefunctionName}\`.`,
        'Make sure returned values',
        'to be of the following types:',
        '`Object`, `string`, `number`, `Date`, `null`, `undefined`, `Inifinity`, `NaN`, `RegExp`.',
      ].join(' '),
    )
    const { httpResponseBody } = serializationResult
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

async function executeTelefunction(callContext: {
  _telefunctionName: string
  _telefunctionArgs: unknown[]
  _telefunctions: Record<string, Telefunction>
  _providedContext: Telefunc.Context | null
}) {
  const telefunctionName = callContext._telefunctionName
  const telefunctionArgs = callContext._telefunctionArgs
  const telefunctions = callContext._telefunctions
  const telefunction = telefunctions[telefunctionName]

  if (callContext._providedContext) {
    provideContext(callContext._providedContext)
  }

  let resultSync: unknown
  let telefuncError: unknown
  let telefuncHasErrored = false
  try {
    resultSync = telefunction.apply(null, telefunctionArgs)
  } catch (err) {
    telefuncHasErrored = true
    telefuncError = err
  }

  let telefuncResult: unknown
  if (!telefuncHasErrored) {
    assertUsage(
      isPromise(resultSync),
      `Your telefunction ${telefunctionName} did not return a promise. A telefunction should always return a promise. E.g. define ${telefunctionName} as a \`async function\` (or \`async () => {}\`).`,
    )
    try {
      telefuncResult = await resultSync
    } catch (err) {
      telefuncHasErrored = true
      telefuncError = err
    }
  }

  // console.log({ telefuncResult, telefuncHasErrored, telefuncError })
  return { telefuncResult, telefuncHasErrored, telefuncError }
}

function serializeTelefuncResult(callContext: { _telefuncResult: unknown }) {
  try {
    const httpResponseBody = stringify({
      telefuncResult: callContext._telefuncResult,
    })
    return { httpResponseBody }
  } catch (serializationError: unknown) {
    return { serializationError }
  }
}

function handleInternalError(
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
