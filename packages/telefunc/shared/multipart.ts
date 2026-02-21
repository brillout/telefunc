export { parseMultipartIndex }
export { createMultipartReplacer }
export { createMultipartReviver }

import { MULTIPART_PLACEHOLDER_KEY, TELEFUNC_FILE_PREFIX, TELEFUNC_BLOB_PREFIX } from './constants.js'

function constructMultipartKey(index: number): string {
  return `${MULTIPART_PLACEHOLDER_KEY}_${index}`
}

/** Extract the numeric index from a multipart key (e.g. `__telefunc_multipart_2` → `2`). */
function parseMultipartIndex(key: string): number {
  return parseInt(key.slice(MULTIPART_PLACEHOLDER_KEY.length + 1), 10)
}

// --- Serialization protocol (replacer + reviver) ---

type FileDescriptor = { key: string; name: string; size: number; type: string; lastModified: number }
type BlobDescriptor = { key: string; size: number; type: string }

/** Creates a stringify replacer that serializes File/Blob → prefixed string descriptors.
 *  `onFile`/`onBlob` are called to collect the binary parts for the FormData. */
function createMultipartReplacer(callbacks: {
  onFile: (key: string, file: File) => void
  onBlob: (key: string, blob: Blob) => void
}) {
  let nextIndex = 0
  return (_key: string, value: unknown, serializer: (v: unknown) => string) => {
    if (value instanceof File) {
      const key = constructMultipartKey(nextIndex++)
      callbacks.onFile(key, value)
      return {
        replacement:
          TELEFUNC_FILE_PREFIX +
          serializer({ key, name: value.name, size: value.size, type: value.type, lastModified: value.lastModified }),
        resolved: true,
      }
    }
    if (value instanceof Blob) {
      const key = constructMultipartKey(nextIndex++)
      callbacks.onBlob(key, value)
      return {
        replacement: TELEFUNC_BLOB_PREFIX + serializer({ key, size: value.size, type: value.type }),
        resolved: true,
      }
    }
    return undefined
  }
}

/** Creates a parse reviver that deserializes prefixed string descriptors → lazy file objects.
 *  `createFile`/`createBlob` construct the platform-specific lazy objects. */
function createMultipartReviver(callbacks: {
  createFile: (descriptor: FileDescriptor) => unknown
  createBlob: (descriptor: BlobDescriptor) => unknown
}) {
  return (_key: undefined | string, value: string, parser: (str: string) => unknown) => {
    if (value.startsWith(TELEFUNC_FILE_PREFIX)) {
      const descriptor = parser(value.slice(TELEFUNC_FILE_PREFIX.length)) as FileDescriptor
      return { replacement: callbacks.createFile(descriptor) }
    }
    if (value.startsWith(TELEFUNC_BLOB_PREFIX)) {
      const descriptor = parser(value.slice(TELEFUNC_BLOB_PREFIX.length)) as BlobDescriptor
      return { replacement: callbacks.createBlob(descriptor) }
    }
    return undefined
  }
}
