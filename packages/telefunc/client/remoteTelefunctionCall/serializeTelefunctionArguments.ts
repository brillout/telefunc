export { serializeTelefunctionArguments }
export { serializeMultipartTelefunctionArguments }

import { stringify } from '@brillout/json-serializer/stringify'
import { assert, assertUsage, lowercaseFirstLetter, hasProp } from '../utils.js'
import { constructMultipartKey } from '../../shared/multipart.js'

type CallContext = {
  telefuncFilePath: string
  telefunctionName: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
}

function serializeTelefunctionArguments(callContext: CallContext): string {
  const bodyParsed = {
    file: callContext.telefuncFilePath,
    name: callContext.telefunctionName,
    args: callContext.telefunctionArgs,
  }
  return serializeBody(bodyParsed, callContext)
}

function serializeMultipartTelefunctionArguments(callContext: CallContext): FormData {
  const formData = new FormData()
  const processedArgs: unknown[] = []

  callContext.telefunctionArgs.forEach((arg, i) => {
    if (arg instanceof File || arg instanceof Blob) {
      const key = constructMultipartKey(i)
      processedArgs.push(key)
      formData.append(key, arg)
    } else {
      processedArgs.push(arg)
    }
  })

  const bodyParsed = {
    file: callContext.telefuncFilePath,
    name: callContext.telefunctionName,
    args: processedArgs,
  }
  formData.append('__telefunc', serializeBody(bodyParsed, callContext))

  return formData
}

function serializeBody(bodyParsed: Record<string, unknown>, callContext: CallContext): string {
  let serialized: string
  try {
    serialized = stringify(bodyParsed, { forbidReactElements: true })
  } catch (err) {
    assert(hasProp(err, 'message', 'string'))
    assertUsage(
      false,
      [
        `Cannot serialize arguments for telefunction ${callContext.telefunctionName}() (${callContext.telefuncFilePath}).`,
        'Make sure that the arguments passed to telefunction calls are always serializable.',
        `Serialization error: ${lowercaseFirstLetter(err.message)}`,
      ].join(' '),
    )
  }
  assert(serialized)
  return serialized
}
