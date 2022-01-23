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
import { executeServerErrorListeners } from './runTelefunc/onTelefuncServerError'

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
    handleError(err, runContext)
    return serverError
  }
}

async function runTelefunc_(runContext: {
  httpRequest: HttpRequest
  viteDevServer: ViteDevServer | null
  telefuncFiles: TelefuncFiles | null
  isProduction: boolean
  root: string | null
  telefuncUrl: string
  disableEtag: boolean
}): Promise<HttpResponse> {
  objectAssign(runContext, {
    providedContext: getContextOptional() || null,
  })

  if (runContext.httpRequest.method !== 'POST' && runContext.httpRequest.method !== 'post') {
    assert(runContext.isProduction) // We don't expect any third-party requests in development and we can assume requests to always originate from the Telefunc Client.
    return malformedRequest
  }
  assert(runContext.httpRequest.url === runContext.telefuncUrl)

  {
    const parsed = parseHttpRequest(runContext)
    if (parsed.isMalformed) {
      return malformedRequest
    }
    const { telefunctionName, telefunctionArgs } = parsed
    objectAssign(runContext, {
      telefunctionName,
      telefunctionArgs,
    })
  }

  {
    const telefuncFiles = runContext.telefuncFiles || (await loadTelefuncFiles(runContext))
    assert(telefuncFiles, 'No `.telefunc.js` file found')
    checkType<TelefuncFiles>(telefuncFiles)
    objectAssign(runContext, { telefuncFiles })
    runContext.telefuncFiles
  }

  {
    const { telefunctions } = await getTelefunctions(runContext)
    checkType<Record<string, Telefunction>>(telefunctions)
    objectAssign(runContext, { telefunctions })
  }

  assertUsage(
    runContext.telefunctionName in runContext.telefunctions,
    `Could not find telefunction \`${
      runContext.telefunctionName
    }\`. The client is likely out-of-sync with the server, see https://telefunc.com/out-of-sync. Try reloading the client and/or server. Loaded telefunctions: [${Object.keys(
      runContext.telefunctions,
    ).join(', ')}]`,
  )

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

  {
    const httpResponseEtag = await getEtag(runContext)
    objectAssign(runContext, { httpResponseEtag })
  }

  return {
    body: runContext.httpResponseBody,
    statusCode: runContext.telefunctionAborted ? 403 : 200,
    etag: runContext.httpResponseEtag,
    contentType: 'text/plain',
  }
}
