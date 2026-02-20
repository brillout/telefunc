export { parseMultipartBody }

import { parse } from '@brillout/json-serializer/parse'
import { hasProp, getTelefunctionKey } from '../../utils.js'
import { logParseError, type ParseResult } from './utils.js'

const MULTIPART_PLACEHOLDER_KEY = '__telefunc_multipart'

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

  // Replace multipart placeholders with actual File/Blob objects from the FormData
  const telefunctionArgs = bodyParsed.args.map((arg: unknown) => {
    if (!hasProp(arg, MULTIPART_PLACEHOLDER_KEY, 'number')) return arg
    const partIndex = arg[MULTIPART_PLACEHOLDER_KEY]
    return formData.get(`${MULTIPART_PLACEHOLDER_KEY}_${partIndex}`)
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
