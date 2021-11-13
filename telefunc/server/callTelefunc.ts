import { stringify } from '@brillout/json-s'
import { parse } from '@brillout/json-s'
import type { ViteDevServer } from 'vite'
import { BodyParsed, Telefunction, Telefunctions } from '../shared/types'
import {
  assert,
  assertUsage,
  assertWarning,
  cast,
  checkType,
  hasProp,
  isCallable,
  isObject,
  isPromise,
  objectAssign,
} from './utils'
import { loadTelefuncFiles } from '../plugin/loadTelefuncFiles'
import { RequestProps, TelefuncFiles, TelefuncFilesUntyped, Config } from './types'
import { getContextOrUndefined, provideContextOrNull } from './getContext'
import { posix } from 'path'

export { setTelefuncFiles }
export { callTelefunc }

type TelefuncContextRequestProps = {
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

async function callTelefunc(requestProps: RequestProps, config: Config, args: unknown[]): Result {
  try {
    return await callTelefunc_(requestProps, config, args)
  } catch (err: unknown) {
    handleError(err, config)
    return {
      contentType: 'text/plain',
      body: 'Internal Server Error',
      etag: null,
      statusCode: 500,
    }
  }
}

async function callTelefunc_(requestProps: RequestProps, config: Config, args: unknown[]): Result {
  validateArgs(requestProps, args)
  const telefuncContext = {}

  objectAssign(telefuncContext, {
    _url: requestProps.url,
    _method: requestProps.method,
    _providedContext: getContextOrUndefined() || null,
  })

  objectAssign(telefuncContext, {
    _isProduction: config.isProduction,
    _root: config.root,
    _viteDevServer: config.viteDevServer,
    _baseUrl: config.baseUrl,
    _disableCache: config.disableCache,
    _urlPath: config.urlPath,
  })

  {
    const urlPathResolved = getTelefuncUrlPath(telefuncContext)
    objectAssign(telefuncContext, {
      _urlPathResolved: urlPathResolved,
    })
  }

  if (telefuncContext._method !== 'POST' && telefuncContext._method !== 'post') {
    return null
  }
  if (telefuncContext._url !== telefuncContext._urlPathResolved) {
    return null
  }

  const requestBodyParsed = parseBody(requestProps)
  objectAssign(telefuncContext, {
    _url: requestProps.url,
    _method: requestProps.method,
    _body: requestBodyParsed.body,
    _bodyParsed: requestBodyParsed.bodyParsed,
    _telefunctionName: requestBodyParsed.bodyParsed.name,
    _telefunctionArgs: requestBodyParsed.bodyParsed.args,
  })
  checkType<TelefuncContextRequestProps>(telefuncContext)

  const { telefuncFiles, telefuncs } = await getTelefuncs(telefuncContext)
  objectAssign(telefuncContext, {
    _telefuncFiles: telefuncFiles,
    _telefuncs: telefuncs,
  })
  checkType<{
    _telefuncFiles: TelefuncFiles
    _telefuncs: Record<string, Telefunction>
  }>(telefuncContext)

  assertUsage(
    telefuncContext._telefunctionName in telefuncContext._telefuncs,
    `Could not find telefunc \`${
      telefuncContext._telefunctionName
    }\`. Did you reload the browser (or deploy a new frontend) without reloading the server (or deploying the new backend)? Loaded telefuncs: [${Object.keys(
      telefuncContext._telefuncs,
    ).join(', ')}]`,
  )

  const { telefuncResult, telefuncHasErrored, telefuncError } = await executeTelefunc(telefuncContext)
  objectAssign(telefuncContext, {
    _telefuncResult: telefuncResult,
    _telefuncHasError: telefuncHasErrored,
    _telefuncError: telefuncError,
    _err: telefuncError,
  })

  if (telefuncContext._telefuncError) {
    throw telefuncContext._telefuncError
  }

  {
    const serializationResult = serializeTelefuncResult(telefuncContext)
    assertUsage(
      !('serializationError' in serializationResult),
      [
        `Couldn't serialize value returned by telefunc \`${telefuncContext._telefunctionName}\`.`,
        'Make sure returned values',
        'to be of the following types:',
        '`Object`, `string`, `number`, `Date`, `null`, `undefined`, `Inifinity`, `NaN`, `RegExp`.',
      ].join(' '),
    )
    const { httpResponseBody } = serializationResult
    objectAssign(telefuncContext, { _httpResponseBody: httpResponseBody })
  }

  {
    let httpResponseEtag: null | string = null
    if (!telefuncContext._disableCache) {
      const { computeEtag } = await import('./cache/computeEtag')
      const httpResponseEtag = computeEtag(telefuncContext._httpResponseBody)
      assert(httpResponseEtag)
    }
    objectAssign(telefuncContext, {
      _httpResponseEtag: httpResponseEtag,
    })
  }

  return {
    body: telefuncContext._httpResponseBody,
    statusCode: 200,
    etag: telefuncContext._httpResponseEtag,
    contentType: 'text/plain',
  }
}

async function executeTelefunc(telefuncContext: {
  _telefunctionName: string
  _telefunctionArgs: unknown[]
  _telefuncs: Record<string, Telefunction>
  _providedContext: Record<string, unknown> | null
}) {
  const telefunctionName = telefuncContext._telefunctionName
  const telefunctionArgs = telefuncContext._telefunctionArgs
  const telefuncs = telefuncContext._telefuncs
  const telefunc = telefuncs[telefunctionName]

  provideContextOrNull(telefuncContext._providedContext)

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

function serializeTelefuncResult(telefuncContext: { _telefuncResult: unknown }) {
  try {
    const httpResponseBody = stringify({
      telefuncResult: telefuncContext._telefuncResult,
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

function validateArgs(requestProps: unknown, args: unknown[]) {
  assertUsage(requestProps, '`callTelefunc(requestProps)`: argument `requestProps` is missing.')
  assertUsage(args.length === 1, '`callTelefunc()`: all arguments should be passed as a single argument object.')
  assertUsage(isObject(requestProps), '`callTelefunc(requestProps)`: argument `requestProps` should be an object.')
  assertUsage(hasProp(requestProps, 'url'), '`callTelefunc({ url })`: argument `url` is missing.')
  assertUsage(hasProp(requestProps, 'url', 'string'), '`callTelefunc({ url })`: argument `url` should be a string.')
  assertUsage(hasProp(requestProps, 'method'), '`callTelefunc({ method })`: argument `method` is missing.')
  assertUsage(
    hasProp(requestProps, 'method', 'string'),
    '`callTelefunc({ method })`: argument `method` should be a string.',
  )
  assertUsage('body' in requestProps, '`callTelefunc({ body })`: argument `body` is missing.')
}

var telefuncFilesManuallySet: undefined | TelefuncFiles
function setTelefuncFiles(telefuncFiles: TelefuncFiles) {
  telefuncFilesManuallySet = telefuncFiles
}

async function getTelefuncs(telefuncContext: {
  _viteDevServer?: ViteDevServer
  _root?: string
  _isProduction: boolean
}): Promise<{
  telefuncFiles: TelefuncFiles
  telefuncs: Record<string, Telefunction>
}> {
  const telefuncFiles = await getTelefuncFiles(telefuncContext)
  assert(telefuncFiles)
  const telefuncs: Telefunctions = {}
  Object.entries(telefuncFiles).forEach(([telefuncFileName, telefuncFileExports]) => {
    Object.entries(telefuncFileExports).forEach(([exportName, exportValue]) => {
      const telefunctionName = telefuncFileName + ':' + exportName
      assertTelefunction(exportValue, {
        exportName,
        telefuncFileName,
      })
      telefuncs[telefunctionName] = exportValue
    })
  })
  cast<TelefuncFiles>(telefuncFiles)
  return { telefuncFiles, telefuncs }
}

async function getTelefuncFiles(telefuncContext: {
  _viteDevServer?: ViteDevServer
  _root?: string
  _isProduction: boolean
}): Promise<TelefuncFilesUntyped> {
  if (telefuncFilesManuallySet) {
    return telefuncFilesManuallySet
  }
  assert(hasProp(telefuncContext, '_root', 'string'))
  const telefuncFiles = await loadTelefuncFiles(telefuncContext)
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

function handleError(err: unknown, config: Config) {
  // We ensure we print a string; Cloudflare Workers doesn't seem to properly stringify `Error` objects.
  const errStr = (hasProp(err, 'stack') && String(err.stack)) || String(err)
  if (!config.isProduction && config.viteDevServer) {
    // TODO: check if Vite already logged the error
  }
  console.error(errStr)
}

function getTelefuncUrlPath(telefuncContext: { _baseUrl: string; _urlPath: string }) {
  const { _baseUrl, _urlPath } = telefuncContext
  const urlPathResolved = posix.resolve(_baseUrl, _urlPath)
  return urlPathResolved
}
