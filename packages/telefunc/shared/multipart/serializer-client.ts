export { createMultipartReplacer }

import { SERIALIZER_PREFIX_FILE, SERIALIZER_PREFIX_BLOB, SERIALIZER_PLACEHOLDER_KEY } from './constants.js'

function constructMultipartKey(index: number): string {
  return `${SERIALIZER_PLACEHOLDER_KEY}_${index}`
}

/**
 * Serialize `fileMetadata`/`blobMetadata`.
 *`onFile`/`onBlob` collect the file parts for the FormData.
 */
function createMultipartReplacer(callbacks: {
  onFile: (key: string, file: File) => void
  onBlob: (key: string, blob: Blob) => void
}) {
  let nextIndex = 0
  return (_key: string, value: unknown, serializer: (v: unknown) => string) => {
    if (value instanceof File) {
      const key = constructMultipartKey(nextIndex++)
      callbacks.onFile(key, value)
      const fileMetadata = {
        key,
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
      return {
        replacement: SERIALIZER_PREFIX_FILE + serializer(fileMetadata),
        resolved: true,
      }
    }
    if (value instanceof Blob) {
      const key = constructMultipartKey(nextIndex++)
      callbacks.onBlob(key, value)
      const blobMetadata = { key, size: value.size, type: value.type }
      return {
        replacement: SERIALIZER_PREFIX_BLOB + serializer(blobMetadata),
        resolved: true,
      }
    }
    return undefined
  }
}
