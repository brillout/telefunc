import { stringify } from '@brillout/json-s'
import { parse } from '@brillout/json-s'
import type { ViteDevServer } from 'vite'
import { posix } from 'path'
import { assert, assertUsage, cast, checkType, hasProp, isCallable, isObject, isPromise, objectAssign } from './utils'
import { BodyParsed, Telefunction, Telefunctions } from '../shared/types'
import { loadTelefuncFiles } from '../plugin/loadTelefuncFiles'
import { HttpRequest, TelefuncFiles, TelefuncFilesUntyped, UserConfig } from './types'
import { getContextOrUndefined, provideContextOrNull } from './getContext'
import { telefuncInternallySet } from './telefunctionsInternallySet'

export { callTelefunc }

type TelefuncContextHttpRequest = {
  _url: string
  _method: string
  _body: string | Record<string, unknown>
  _bodyParsed: BodyParsed
  _telefunctionName: string
  _telefunctionArgs: unknown[]
}

type Result = Promise<null | {
  body: string
  etag: string | null
  statusCode: 200 | 500
  contentType: 'text/plain'
}>

async function callTelefunc(httpRequest: HttpRequest, config: UserConfig, args: unknown[]): Result {
  try {
    return await callTelefunc_(httpRequest, config, args)
  } catch (err: unknown) {
    // There is a bug in Telefunc's source code
    handleInternalError(err, config)
    return {
      contentType: 'text/plain',
      body: 'Internal Server Error',
      etag: null,
      statusCode: 500,
    }
  }
}

async function callTelefunc_(httpRequest: HttpRequest, config: UserConfig, args: unknown[]): Result {
  validateArgs(httpRequest, args)
  const callContext = {}

  objectAssign(callContext, {
    _url: httpRequest.url,
    _method: httpRequest.method,
    _providedContext: getContextOrUndefined() || null,
  })

  objectAssign(callContext, {
    _isProduction: config.isProduction,
    _root: config.root,
    _viteDevServer: config.viteDevServer,
    _telefuncFilesProvidedByUser: config.telefuncFiles || null,
    _baseUrl: config.baseUrl,
    _disableCache: config.disableCache,
    _telefuncUrl: config.telefuncUrl,
  })

  {
    const urlPathResolved = getTelefuncUrlPath(callContext)
    objectAssign(callContext, {
      _urlPathResolved: urlPathResolved,
    })
  }

  if (callContext._method !== 'POST' && callContext._method !== 'post') {
    return null
  }
  if (callContext._url !== callContext._urlPathResolved) {
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

  const { telefuncFiles, telefuncs } = await getTelefuncs(callContext)

  objectAssign(callContext, {
    _telefuncFiles: telefuncFiles,
    _telefuncs: telefuncs,
  })
  checkType<{
    _telefuncFiles: TelefuncFiles
    _telefuncs: Record<string, Telefunction>
  }>(callContext)

  assertUsage(
    callContext._telefunctionName in callContext._telefuncs,
    `Could not find telefunc \`${
      callContext._telefunctionName
    }\`. Did you reload the browser (or deploy a new frontend) without reloading the server (or deploying the new backend)? Loaded telefuncs: [${Object.keys(
      callContext._telefuncs,
    ).join(', ')}]`,
  )

  const { telefuncResult, telefuncHasErrored, telefuncError } = await executeTelefunc(callContext)
  objectAssign(callContext, {
    _telefuncResult: telefuncResult,
    _telefuncHasError: telefuncHasErrored,
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
        `Couldn't serialize value returned by telefunc \`${callContext._telefunctionName}\`.`,
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
    if (!callContext._disableCache) {
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
  _telefuncs: Record<string, Telefunction>
  _providedContext: Record<string, unknown> | null
}) {
  const telefunctionName = callContext._telefunctionName
  const telefunctionArgs = callContext._telefunctionArgs
  const telefuncs = callContext._telefuncs
  const telefunc = telefuncs[telefunctionName]

  provideContextOrNull(callContext._providedContext)

  let resultSync: unknown
  let telefuncError: unknown
  let telefuncHasErrored = false
  try {
    resultSync = telefunc.apply(null, telefunctionArgs)
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

function validateArgs(httpRequest: unknown, args: unknown[]) {
  assertUsage(httpRequest, '`callTelefunc(httpRequest)`: argument `httpRequest` is missing.')
  assertUsage(args.length === 1, '`callTelefunc()`: all arguments should be passed as a single argument object.')
  assertUsage(isObject(httpRequest), '`callTelefunc(httpRequest)`: argument `httpRequest` should be an object.')
  assertUsage(hasProp(httpRequest, 'url'), '`callTelefunc({ url })`: argument `url` is missing.')
  assertUsage(hasProp(httpRequest, 'url', 'string'), '`callTelefunc({ url })`: argument `url` should be a string.')
  assertUsage(hasProp(httpRequest, 'method'), '`callTelefunc({ method })`: argument `method` is missing.')
  assertUsage(
    hasProp(httpRequest, 'method', 'string'),
    '`callTelefunc({ method })`: argument `method` should be a string.',
  )
  assertUsage('body' in httpRequest, '`callTelefunc({ body })`: argument `body` is missing.')
}

async function getTelefuncs(callContext: {
  _viteDevServer?: ViteDevServer
  _root?: string
  _telefuncFilesProvidedByUser: null | TelefuncFiles
  _isProduction: boolean
}): Promise<{
  telefuncFiles: TelefuncFiles
  telefuncs: Record<string, Telefunction>
}> {
  const telefuncFiles = await getTelefuncFiles(callContext)
  assert(telefuncFiles || callContext._telefuncFilesProvidedByUser, 'No telefunctions found')
  const telefuncs: Telefunctions = {}

  Object.entries(telefuncFiles || callContext._telefuncFilesProvidedByUser || false).forEach(
    ([telefuncFileName, telefuncFileExports]) => {
      Object.entries(telefuncFileExports).forEach(([exportName, exportValue]) => {
        const telefunctionName = telefuncFileName + ':' + exportName
        assertTelefunction(exportValue, {
          exportName,
          telefuncFileName,
        })
        telefuncs[telefunctionName] = exportValue
      })
    },
  )

  cast<TelefuncFiles>(telefuncFiles)
  return { telefuncFiles: telefuncFiles || callContext._telefuncFilesProvidedByUser, telefuncs }
}

async function getTelefuncFiles(callContext: {
  _viteDevServer?: ViteDevServer
  _root?: string
  _isProduction: boolean
  _telefuncFilesProvidedByUser: null | TelefuncFiles
}): Promise<TelefuncFilesUntyped | null> {
  if (telefuncInternallySet) {
    return telefuncInternallySet
  }
  assert(hasProp(callContext, '_root', 'string'))
  const telefuncFiles = await loadTelefuncFiles(callContext)
  return telefuncFiles
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

  if (viteAlreadyLoggedError(err, userConfig.viteDevServer)) {
    return
  }
  viteErrorCleanup(err, userConfig.viteDevServer)

  console.error(errStr)
}

function getTelefuncUrlPath(callContext: { _baseUrl: string; _telefuncUrl: string }) {
  const { _baseUrl, _telefuncUrl } = callContext
  const urlPathResolved = posix.resolve(_baseUrl, _telefuncUrl)
  return urlPathResolved
}

function viteAlreadyLoggedError(err: unknown, viteDevServer: ViteDevServer | undefined) {
  if (viteDevServer) {
    return viteDevServer.config.logger.hasErrorLogged(err as Error)
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
