export { serializeMultipartArgs }

import { stringify } from '@brillout/json-serializer/stringify'
import { assert, assertUsage, lowercaseFirstLetter, hasProp } from '../utils.js'

const FILE_PLACEHOLDER_KEY = '__telefunc_file'

function serializeMultipartArgs(callContext: {
  telefuncFilePath: string
  telefunctionName: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
}): FormData {
  assert(typeof callContext.telefuncFilePath === 'string')
  assert(typeof callContext.telefunctionName === 'string')
  assert(Array.isArray(callContext.telefunctionArgs))

  const formData = new FormData()
  const processedArgs: unknown[] = []

  callContext.telefunctionArgs.forEach((arg, i) => {
    if (arg instanceof File || arg instanceof Blob) {
      processedArgs.push({ [FILE_PLACEHOLDER_KEY]: i })
      formData.append(`${FILE_PLACEHOLDER_KEY}_${i}`, arg)
    } else {
      processedArgs.push(arg)
    }
  })

  const bodyParsed = {
    file: callContext.telefuncFilePath,
    name: callContext.telefunctionName,
    args: processedArgs,
  }

  let metaString: string
  try {
    metaString = stringify(bodyParsed, { forbidReactElements: true })
  } catch (err) {
    assert(hasProp(err, 'message', 'string'))
    assertUsage(
      false,
      [
        `Cannot serialize arguments for telefunction ${callContext.telefunctionName}() (${callContext.telefuncFilePath}).`,
        'Make sure that the non-file arguments passed to telefunction calls are always serializable.',
        `Serialization error: ${lowercaseFirstLetter(err.message)}`,
      ].join(' '),
    )
  }
  assert(metaString)
  formData.append('__telefunc', metaString)

  return formData
}
