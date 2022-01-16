export { runTelefunc }

import type { HttpRequest, TelefuncFiles, Telefunction } from './types'
import type { ViteDevServer } from 'vite'
import { assert, assertUsage, checkType, objectAssign } from './utils'
import { getContextOptional } from './getContext'
import { loadTelefuncFiles } from './runTelefunc/loadTelefuncFiles'
import { parseHttpRequest } from './runTelefunc/parseHttpRequest'
import { getEtag } from './runTelefunc/getEtag'
import { getTelefunctions } from './runTelefunc/getTelefunctions'
import { executeTelefunction } from './runTelefunc/executeTelefunction'
import { serializeTelefunctionResult } from './runTelefunc/serializeTelefunctionResult'
import { handleError } from './runTelefunc/handleError'

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

const internnalError = {
  body: 'Internal Server Error',
  statusCode: 500 as const,
  contentType: 'text/plain' as const,
  etag: null,
}

async function runTelefunc(runContext: Parameters<typeof runTelefunc_>[0]) {
  try {
    return await runTelefunc_(runContext)
  } catch (err: unknown) {
    // - There is a bug in Telefunc's source code, or
    // - a telefunction throw an error that is not `Abort()`.
    handleError(err, runContext)
    return internnalError
  }
}

async function runTelefunc_(runContext: {
  _httpRequest: HttpRequest
  _viteDevServer: ViteDevServer | null
  _telefuncFilesProvidedByUser: TelefuncFiles | null
  _isProduction: boolean
  _root: string | null
  _telefuncUrl: string
  _disableEtag: boolean
}): Promise<HttpResponse> {
  objectAssign(runContext, {
    _providedContext: getContextOptional() || null,
  })

  if (runContext._httpRequest.method !== 'POST' && runContext._httpRequest.method !== 'post') {
    assert(runContext._isProduction) // We don't expect any third-party requests in development and we can assume requests to always originate from the Telefunc Client.
    return malformedRequest
  }
  assert(runContext._httpRequest.url === runContext._telefuncUrl)

  {
    const parsed = parseHttpRequest(runContext)
    if (parsed.isMalformed) {
      return malformedRequest
    }
    const { telefunctionName, telefunctionArgs } = parsed
    objectAssign(runContext, {
      _telefunctionName: telefunctionName,
      _telefunctionArgs: telefunctionArgs,
    })
  }

  {
    const telefuncFiles = runContext._telefuncFilesProvidedByUser || (await loadTelefuncFiles(runContext))
    assert(telefuncFiles, 'No `.telefunc.js` file found')
    checkType<TelefuncFiles>(telefuncFiles)
    objectAssign(runContext, { _telefuncFiles: telefuncFiles })
  }

  {
    const { telefunctions } = await getTelefunctions(runContext)
    checkType<Record<string, Telefunction>>(telefunctions)
    objectAssign(runContext, {
      _telefunctions: telefunctions,
    })
  }

  assertUsage(
    runContext._telefunctionName in runContext._telefunctions,
    `Could not find telefunction \`${
      runContext._telefunctionName
    }\`. Is your browser-side JavaScript out-of-sync with your server-side JavaScript? Loaded telefunctions: [${Object.keys(
      runContext._telefunctions,
    ).join(', ')}]`,
  )

  const { telefunctionReturn, telefunctionAborted, telefunctionHasErrored, telefunctionError } =
    await executeTelefunction(runContext)
  objectAssign(runContext, {
    _telefunctionReturn: telefunctionReturn,
    _telefunctionHasErrored: telefunctionHasErrored,
    _telefunctionAborted: telefunctionAborted,
    _telefuncError: telefunctionError,
    _err: telefunctionError,
  })

  if (runContext._telefunctionHasErrored) {
    throw runContext._telefuncError
  }

  {
    const httpResponseBody = serializeTelefunctionResult(runContext)
    objectAssign(runContext, { _httpResponseBody: httpResponseBody })
  }

  {
    const etag = await getEtag(runContext)
    objectAssign(runContext, {
      _httpResponseEtag: etag,
    })
  }

  return {
    body: runContext._httpResponseBody,
    statusCode: runContext._telefunctionAborted ? 403 : 200,
    etag: runContext._httpResponseEtag,
    contentType: 'text/plain',
  }
}
