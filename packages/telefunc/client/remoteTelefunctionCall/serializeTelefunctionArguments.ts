export { serializeTelefunctionArguments }

import { stringify } from '@brillout/json-serializer/stringify'
import { assert, assertUsage } from '../../utils/assert.js'
import { hasProp } from '../../utils/hasProp.js'
import { lowercaseFirstLetter } from '../../utils/lowercaseFirstLetter.js'
import { createMultipartReplacer } from '../../shared/multipart/serializer-client.js'
import { FORM_DATA_MAIN_FIELD } from '../../shared/multipart/constants.js'

type CallContext = {
  telefuncFilePath: string
  telefunctionName: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
}

function serializeTelefunctionArguments(callContext: CallContext): string | FormData {
  const dataMain = {
    file: callContext.telefuncFilePath,
    name: callContext.telefunctionName,
    args: callContext.telefunctionArgs,
  }

  const files: { key: string; value: File | Blob }[] = []
  const replacer = createMultipartReplacer({
    onFile: (key, file) => files.push({ key, value: file }),
    onBlob: (key, blob) => files.push({ key, value: blob }),
  })

  const dataMainSerialized = serialize(dataMain, callContext, replacer)
  if (files.length === 0) return dataMainSerialized

  const formData = new FormData()
  // dataMainSerialized MUST come first — it contains the files metadata, which streaming needs before the files data
  formData.append(FORM_DATA_MAIN_FIELD, dataMainSerialized)
  for (const { key, value } of files) {
    formData.append(key, value)
  }
  return formData
}

type Replacer = Parameters<typeof stringify>[1] extends infer O ? (O extends { replacer?: infer R } ? R : never) : never
function serialize(dataMain: Record<string, unknown>, callContext: CallContext, replacer?: Replacer): string {
  let serialized: string
  try {
    serialized = stringify(dataMain, { forbidReactElements: true, replacer })
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
