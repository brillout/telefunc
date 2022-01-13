import { stringify } from '@brillout/json-s'
import { parse } from '@brillout/json-s'
import type { ViteDevServer } from 'vite'
import { assert, assertUsage, cast, checkType, hasProp, isCallable, isObject, isPromise, objectAssign } from './utils'
import { BodyParsed, Telefunction, Telefunctions } from '../shared/types'
import { loadTelefuncFiles } from './loadTelefuncFiles'
import { HttpRequest, TelefuncFiles, UserConfig } from './types'
import { getContextOptional, provideContext } from './getContext'
import type { Telefunc } from './getContext'

export { callTelefunc }

type TelefuncContextHttpRequest = {
  _url: string
  _method: string
  _body: string | Record<string, unknown>
  _bodyParsed: BodyParsed
  _telefunctionName: string
  _telefunctionArgs: unknown[]
}

type HttpResponse = Promise<null | {
  body: string
  etag: string | null
  statusCode: 200 | 500
  contentType: 'text/plain'
}>

async function callTelefunc(httpRequest: HttpRequest, config: UserConfig): HttpResponse {
  try {
    return await callTelefunc_(httpRequest, config)
  } catch (err: unknown) {
    // - There is a bug in Telefunc's source code, or
    // - a telefunction throw an error that is not `Abort()`.
    handleInternalError(err, config)
    return {
      contentType: 'text/plain',
      body: 'Internal Server Error',
      etag: null,
      statusCode: 500,
    }
  }
}

async function callTelefunc_(httpRequest: HttpRequest, config: UserConfig): HttpResponse {
  const callContext = {}

  objectAssign(callContext, {
    _url: httpRequest.url,
    _method: httpRequest.method,
    _providedContext: getContextOptional() || null,
  })

  objectAssign(callContext, {
    _isProduction: config.isProduction,
    _root: config.root,
    _viteDevServer: config.viteDevServer,
    _telefuncFilesProvidedByUser: config.telefuncFiles || null,
    _disableEtag: config.disableEtag,
    _telefuncUrl: config.telefuncUrl,
  })

  if (callContext._method !== 'POST' && callContext._method !== 'post') {
    return null
  }
  if (callContext._url !== callContext._telefuncUrl) {
    return null
  }

  const requestBodyParsed = parseBody(httpRequest)
  objectAssign(callContext, {
    _url: httpRequest.url,
    _method: httpRequest.method,
    _body: requestBodyParsed.body,
    _bodyParsed: requestBodyParsed.bodyParsed,
    _telefunctionName: requestBodyParsed.bodyParsed.name,
    _telefunctionArgs: requestBodyParsed.bodyParsed.args,
  })
  checkType<TelefuncContextHttpRequest>(callContext)

  const { telefuncFiles, telefunctions } = await getTelefunctions(callContext)

  objectAssign(callContext, {
    _telefuncFiles: telefuncFiles,
    _telefunctions: telefunctions,
  })
  checkType<{
    _telefuncFiles: TelefuncFiles
    _telefunctions: Record<string, Telefunction>
  }>(callContext)

  assertUsage(
    callContext._telefunctionName in callContext._telefunctions,
    `Could not find telefunction \`${
      callContext._telefunctionName
    }\`. Is your browser-side JavaScript out-of-sync with your server-side JavaScript? Loaded telefunctions: [${Object.keys(
      callContext._telefunctions,
    ).join(', ')}]`,
  )

  const { telefuncResult, telefuncHasErrored, telefuncError } = await executeTelefunc(callContext)
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
    let httpResponseEtag: null | string = null
    if (!callContext._disableEtag) {
      const { computeEtag } = await import('./cache/computeEtag')
      const httpResponseEtag = computeEtag(callContext._httpResponseBody)
      assert(httpResponseEtag)
    }
    objectAssign(callContext, {
      _httpResponseEtag: httpResponseEtag,
    })
  }

  return {
    body: callContext._httpResponseBody,
    statusCode: 200,
    etag: callContext._httpResponseEtag,
    contentType: 'text/plain',
  }
}

async function executeTelefunc(callContext: {
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

function parseBody({ url, body }: { url: string; body: unknown }) {
  assertUsage(
    body !== undefined && body !== null,
    '`callTelefunc({ body })`: argument `body` should be a string or an object but `body === ' +
      body +
      '`. Note that with some server frameworks, such as Express.js and Koa, you need to use a server middleware that parses the body.',
  )
  assertUsage(
    typeof body === 'string' || isObject(body),
    "`callTelefunc({ body })`: argument `body` should be a string or an object but `typeof body === '" +
      typeof body +
      "'`. (Server frameworks, such as Express.js, provide the body as object if the HTTP request body is already JSON-parsed, or as string if not.)",
  )
  const bodyString = typeof body === 'string' ? body : JSON.stringify(body)

  let bodyParsed: unknown
  try {
    bodyParsed = parse(bodyString)
  } catch (err_) {}
  assertUsage(
    hasProp(bodyParsed, 'name', 'string') && hasProp(bodyParsed, 'args', 'array'),
    '`callTelefunc({ body })`: The `body` you provided to `callTelefunc()` should be the body of the HTTP request `' +
      url +
      '`. This is not the case; make sure you are properly retrieving the HTTP request body and pass it to `callTelefunc({ body })`. ' +
      '(Parsed `body`: `' +
      JSON.stringify(bodyParsed) +
      '`.)',
  )

  return { body, bodyParsed }
}

async function getTelefunctions(callContext: {
  _viteDevServer?: ViteDevServer
  _root?: string
  _telefuncFilesProvidedByUser: null | TelefuncFiles
  _isProduction: boolean
}): Promise<{
  telefuncFiles: TelefuncFiles
  telefunctions: Record<string, Telefunction>
}> {
  const telefuncFiles = await loadTelefuncFiles(callContext)
  assert(telefuncFiles || callContext._telefuncFilesProvidedByUser, 'No telefunctions found')
  const telefunctions: Telefunctions = {}

  Object.entries(telefuncFiles || callContext._telefuncFilesProvidedByUser || false).forEach(
    ([telefuncFileName, telefuncFileExports]) => {
      Object.entries(telefuncFileExports).forEach(([exportName, exportValue]) => {
        const telefunctionName = telefuncFileName + ':' + exportName
        assertTelefunction(exportValue, {
          exportName,
          telefuncFileName,
        })
        telefunctions[telefunctionName] = exportValue
      })
    },
  )

  cast<TelefuncFiles>(telefuncFiles)
  return { telefuncFiles: telefuncFiles || callContext._telefuncFilesProvidedByUser, telefunctions }
}

function assertTelefunction(
  telefunction: unknown,
  {
    exportName,
    telefuncFileName,
  }: {
    exportName: string
    telefuncFileName: string
  },
): asserts telefunction is Telefunction {
  const errPrefix = `The telefunction \`${exportName}\` defined in \`${telefuncFileName}\``
  assertUsage(
    isCallable(telefunction),
    `${errPrefix} is not a function. A tele-*func*tion should always be a function.`,
  )
}

function handleInternalError(err: unknown, userConfig: UserConfig) {
  // We ensure we print a string; Cloudflare Workers doesn't seem to properly stringify `Error` objects.
  const errStr = (hasProp(err, 'stack') && String(err.stack)) || String(err)
  if (!userConfig.isProduction && userConfig.viteDevServer) {
    // TODO: check if Vite already logged the error
  }

  if (viteAlreadyLoggedError(err, userConfig)) {
    return
  }
  viteErrorCleanup(err, userConfig.viteDevServer)

  console.error(errStr)
}

function viteAlreadyLoggedError(
  err: unknown,
  { isProduction, viteDevServer }: { isProduction: boolean; viteDevServer?: ViteDevServer },
) {
  if (isProduction) {
    return false
  }
  if (viteDevServer && viteDevServer.config.logger.hasErrorLogged(err as Error)) {
    return true
  }
  return false
}

function viteErrorCleanup(err: unknown, viteDevServer: ViteDevServer | undefined) {
  if (viteDevServer) {
    if (hasProp(err, 'stack')) {
      // Apply source maps
      viteDevServer.ssrFixStacktrace(err as Error)
    }
  }
}
