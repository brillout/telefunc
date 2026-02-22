export { parseMultipartIndex }
export { createMultipartReviver }

import type { Reviver } from '@brillout/json-serializer/parse'
import type { LazyBlob, LazyFile } from '../../node/server/multipart/LazyFile.js'
import { SERIALIZER_PREFIX_FILE, SERIALIZER_PREFIX_BLOB, SERIALIZER_PLACEHOLDER_KEY } from './constants.js'
import { assertIsNotBrowser } from '../../utils/assertIsNotBrowser.js'
assertIsNotBrowser()

/** Extract the numeric index from a multipart key (e.g. `__telefunc_multipart_2` → `2`). */
function parseMultipartIndex(key: string): number {
  return parseInt(key.slice(SERIALIZER_PLACEHOLDER_KEY.length + 1), 10)
}

type FileMetadata = { key: string; name: string; size: number; type: string; lastModified: number }
type BlobMetadata = { key: string; size: number; type: string }

/**
 * Deserialize:
 * - FileMetadata => LazyFile
 * - BlobMetadata => LazyBlob
 */
function createMultipartReviver(callbacks: {
  createFile: (fileMetadata: FileMetadata) => LazyFile
  createBlob: (blobMetadata: BlobMetadata) => LazyBlob
}): Reviver {
  return (_key: undefined | string, value: string, parser: (str: string) => unknown) => {
    if (value.startsWith(SERIALIZER_PREFIX_FILE)) {
      const fileMetadata = parser(value.slice(SERIALIZER_PREFIX_FILE.length)) as FileMetadata
      return { replacement: callbacks.createFile(fileMetadata) }
    }
    if (value.startsWith(SERIALIZER_PREFIX_BLOB)) {
      const blobMetadata = parser(value.slice(SERIALIZER_PREFIX_BLOB.length)) as BlobMetadata
      return { replacement: callbacks.createBlob(blobMetadata) }
    }
    return undefined
  }
}
