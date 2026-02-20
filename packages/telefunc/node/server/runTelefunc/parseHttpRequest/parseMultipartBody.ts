export { parseMultipartBody }

import { parse } from '@brillout/json-serializer/parse'
import { hasProp, getTelefunctionKey } from '../../utils.js'
import { logParseError, type ParseResult } from './utils.js'

const FILE_PLACEHOLDER_KEY = '__telefunc_file'

function parseMultipartBody(formData: FormData, runContext: { logMalformedRequests: boolean }): ParseResult {
  const metaString = formData.get('__telefunc')
  if (typeof metaString !== 'string') {
    logParseError('The multipart request body is missing the `__telefunc` field.', runContext)
    return { isMalformedRequest: true }
  }

  let bodyParsed: unknown
  try {
    bodyParsed = parse(metaString)
  } catch (err: unknown) {
    logParseError(
      [
        'The `__telefunc` field in the multipart request body',
        "couldn't be parsed.",
        !hasProp(err, 'message') ? null : `Parse error: ${err.message}.`,
      ]
        .filter(Boolean)
        .join(' '),
      runContext,
    )
    return { isMalformedRequest: true }
  }

  if (
    !hasProp(bodyParsed, 'file', 'string') ||
    !hasProp(bodyParsed, 'name', 'string') ||
    !hasProp(bodyParsed, 'args', 'array')
  ) {
    logParseError('The `__telefunc` field in the multipart request body has unexpected content.', runContext)
    return { isMalformedRequest: true }
  }

  const telefuncFilePath = bodyParsed.file
  const telefunctionName = bodyParsed.name

  // Replace file placeholders with actual File/Blob objects from the FormData
  const telefunctionArgs = bodyParsed.args.map((arg: unknown) => {
    if (
      arg !== null &&
      typeof arg === 'object' &&
      FILE_PLACEHOLDER_KEY in arg &&
      typeof (arg as Record<string, unknown>)[FILE_PLACEHOLDER_KEY] === 'number'
    ) {
      const fileIndex = (arg as Record<string, unknown>)[FILE_PLACEHOLDER_KEY] as number
      const file = formData.get(`${FILE_PLACEHOLDER_KEY}_${fileIndex}`)
      return file
    }
    return arg
  })

  const telefunctionKey = getTelefunctionKey(telefuncFilePath, telefunctionName)

  return {
    telefuncFilePath,
    telefunctionName,
    telefunctionKey,
    telefunctionArgs,
    isMalformedRequest: false,
  }
}
