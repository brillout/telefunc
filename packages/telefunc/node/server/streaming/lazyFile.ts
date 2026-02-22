export { LazyBlob, LazyFile, isLazyBlob, isLazyFile }

import type { MultipartReader } from './multipartReader.js'
import { assertUsage } from '../../../utils/assert.js'

const LAZY_BLOB_BRAND = Symbol.for('telefunc.LazyBlob')
const LAZY_FILE_BRAND = Symbol.for('telefunc.LazyFile')

function isLazyBlob(value: unknown): value is LazyBlob {
  return typeof value === 'object' && value !== null && (value as any)[LAZY_BLOB_BRAND] === true
}

function isLazyFile(value: unknown): value is LazyFile {
  return typeof value === 'object' && value !== null && (value as any)[LAZY_FILE_BRAND] === true
}

/**
 * A Blob backed by a pull-based MultipartReader.
 *
 * `size` and `type` are available immediately from metadata.
 * Body data is pulled from the stream on demand — no background pump.
 * Each instance is **one-shot**: once consumed, further reads throw.
 */
class LazyBlob implements Blob {
  readonly size: number
  readonly type: string
  readonly [LAZY_BLOB_BRAND] = true

  #reader: MultipartReader
  #partKey: string
  #consumed = false

  constructor(reader: MultipartReader, partKey: string, metadata: { size: number; type: string }) {
    this.#reader = reader
    this.#partKey = partKey
    this.size = metadata.size
    this.type = metadata.type
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    const bytes = await this.bytes()
    return bytes.buffer as ArrayBuffer
  }

  async bytes(): Promise<Uint8Array<ArrayBuffer>> {
    const stream = this.stream()
    const reader = stream.getReader()
    let total = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      total += value.byteLength
    }
    const result = new Uint8Array(total)
    let offset = 0
    for (const c of chunks) {
      result.set(c, offset)
      offset += c.byteLength
    }
    return result as Uint8Array<ArrayBuffer>
  }

  async text(): Promise<string> {
    const bytes = await this.bytes()
    return new TextDecoder().decode(bytes)
  }

  stream(): ReadableStream<Uint8Array<ArrayBuffer>> {
    assertUsage(!this.#consumed, 'Stream has already been consumed. Each streaming Blob/File can only be read once.')
    this.#consumed = true
    // consumePart() returns a Promise<ReadableStream> — unwrap it lazily
    let inner: ReadableStreamDefaultReader<Uint8Array>
    return new ReadableStream<Uint8Array<ArrayBuffer>>({
      start: async () => {
        inner = (await this.#reader.consumePart(this.#partKey)).getReader()
      },
      pull: async (controller) => {
        const { done, value } = await inner.read()
        if (done) controller.close()
        else controller.enqueue(value as Uint8Array<ArrayBuffer>)
      },
      cancel: async () => {
        await inner?.cancel()
      },
    })
  }

  slice(_start?: number, _end?: number, _contentType?: string): Blob {
    assertUsage(
      false,
      'slice() is not supported on streaming file uploads. Use arrayBuffer() or text() to read the full content first, then create a new Blob to slice.',
    )
  }

  get [Symbol.toStringTag](): string {
    return 'Blob'
  }
}

/**
 * A File implementation backed by a pull-based MultipartReader.
 * Extends LazyBlob with `name`, `lastModified`, and `webkitRelativePath`.
 */
class LazyFile extends LazyBlob implements File {
  readonly name: string
  readonly lastModified: number
  readonly webkitRelativePath: string = ''
  readonly [LAZY_FILE_BRAND] = true

  constructor(
    reader: MultipartReader,
    partKey: string,
    metadata: { name: string; size: number; type: string; lastModified: number },
  ) {
    super(reader, partKey, metadata)
    this.name = metadata.name
    this.lastModified = metadata.lastModified
  }

  get [Symbol.toStringTag](): string {
    return 'File'
  }
}
