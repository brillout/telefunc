export { parseHttpRequest }

import { parse } from '@brillout/json-s/parse'
import { assertUsage, hasProp, getPluginError } from '../../utils'
import { getTelefunctionKey } from './getTelefunctionKey'

function parseHttpRequest(runContext: { httpRequest: { body: unknown }; isProduction: boolean; telefuncUrl: string }):
  | {
      telefunctionFilePath: string
      telefunctionExportName: string
      telefunctionKey: string
      telefunctionArgs: unknown[]
      isMalformed: false
    }
  | { isMalformed: true } {
  const { body } = runContext.httpRequest
  if (typeof body !== 'string') {
    if (!runContext.isProduction) {
      // In production `body` can be any value really.
      // Therefore we `assertBody(body)` only development.
      assertBody(body, runContext)
    }
    return { isMalformed: true }
  }
  const bodyString: string = body

  const devErrMsgPrefix =
    'Malformed request in development. This is unexpected since, in development, all requests are expected to originate from the Telefunc Client. If this error is happening in production, then this means that you forgot to set the environment variable `NODE_ENV="production"` or `telefunc({ isProduction: true })`.'

  let bodyParsed: unknown
  try {
    bodyParsed = parse(bodyString)
  } catch (err: unknown) {
    if (!runContext.isProduction) {
      console.error(
        getPluginError(
          [
            devErrMsgPrefix,
            `Following body string could not be parsed: \`${bodyString}\`.`,
            !hasProp(err, 'message') ? null : 'Parse error: ' + err.message,
          ]
            .filter(Boolean)
            .join(' '),
        ),
      )
    }
    return { isMalformed: true }
  }

  if (
    !hasProp(bodyParsed, 'file', 'string') ||
    !hasProp(bodyParsed, 'name', 'string') ||
    !hasProp(bodyParsed, 'args', 'array')
  ) {
    if (!runContext.isProduction) {
      console.error(
        getPluginError(
          [
            devErrMsgPrefix,
            'The `body` argument passed to `telefunc({ body })` is not valid',
            `(\`body === '${bodyString}'\`).`,
          ].join(' '),
        ),
      )
    }
    return { isMalformed: true }
  }

  const telefunctionFilePath = bodyParsed.file
  const telefunctionExportName = bodyParsed.name
  const telefunctionArgs = bodyParsed.args
  const telefunctionKey = getTelefunctionKey({ telefunctionFilePath, telefunctionExportName })

  return {
    telefunctionFilePath,
    telefunctionExportName,
    telefunctionKey,
    telefunctionArgs,
    isMalformed: false,
  }
}

function assertBody(body: unknown, runContext: { telefuncUrl: string }) {
  const errorNote = [
    `Make sure that \`body\` is the HTTP body of the request HTTP POST \`Content-Type: text/plain\` \`${runContext.telefuncUrl}\`.`,
    'Note that with some server frameworks, such as Express.js, you need to use a server middleware to process the HTTP body of `Content-Type: text/plain` requests.',
  ].join(' ')
  assertUsage(
    body !== undefined && body !== null,
    ['`telefunc({ body })`: argument `body` should be a string but', `\`body === ${body}\`.`, errorNote].join(' '),
  )
  assertUsage(
    typeof body === 'string',
    [
      '`telefunc({ body })`: argument `body` should be a string but',
      `\`typeof body === '${typeof body}'\`.`,
      errorNote,
    ].join(' '),
  )
  assertUsage(
    // Express.js sets `req.body === '{}'` upon wrong Content-Type
    body !== '{}',
    ["`telefunc({ body })`: argument `body` is an empty JSON object (`body === '{}'`).", errorNote].join(' '),
  )
}
