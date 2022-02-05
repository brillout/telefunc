export { runTelefunc }

import type { TelefuncFiles } from './types'
import type { ViteDevServer } from 'vite'
import { assert, objectAssign } from '../utils'
import { getContextOptional } from './getContext'
import { loadTelefuncFiles } from './runTelefunc/loadTelefuncFiles'
import { parseHttpRequest } from './runTelefunc/parseHttpRequest'
import { getEtag } from './runTelefunc/getEtag'
import { getTelefunctions } from './runTelefunc/getTelefunctions'
import { executeTelefunction } from './runTelefunc/executeTelefunction'
import { serializeTelefunctionResult } from './runTelefunc/serializeTelefunctionResult'
import { handleError } from './runTelefunc/handleError'
import { executeServerErrorListeners } from './runTelefunc/onTelefuncServerError'
import { applyShield } from './runTelefunc/applyShield'
import { findTelefunction } from './runTelefunc/findTelefunction'

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
  httpRequest: { url: string; method: string; body: unknown }
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
    const telefuncFiles = runContext.telefuncFiles || (await loadTelefuncFiles(runContext))
    assert(telefuncFiles, 'No `.telefunc.js` file found')
    objectAssign(runContext, { telefuncFiles })
    runContext.telefuncFiles
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
