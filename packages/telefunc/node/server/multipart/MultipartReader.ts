export { MultipartReader }

import { MultipartParser } from './MultipartParser.js'
import type { MultipartEvent } from './MultipartParser.js'
import { parseMultipartIndex } from '../../../shared/multipart/serializer-server.js'
import { assert, assertUsage, assertWarning } from '../../../utils/assert.js'

const decoder = new TextDecoder()

/**
 * Pull-based sequential multipart reader.
 *
 * Parts are consumed strictly in wire order. Each call to `readNextPartAsText()`
 * advances to the next part sequentially.
 *
 * `consumePart(key)` reads file parts by key. Concurrent calls are
 * serialized via a promise queue:
 * - In-order:  `file1.text(); file2.text()` — file2 waits for file1, zero buffering, no warning.
 * - Out-of-order: `file2.text(); file1.text()` — warns, drains file1, streams file2. file1 unreadable.
 */
class MultipartReader {
  #parser: MultipartParser
  #bodyReader: ReadableStreamDefaultReader<Uint8Array>
  #eventQueue: MultipartEvent[] = []
  #streamDone = false
  /** Index of the next file part expected on the wire (0-based, excludes FORM_DATA_MAIN_FIELD). */
  #nextPartIndex = 0
  /** Promise chain that serializes concurrent consumePart() calls. */
  #queue: Promise<void> = Promise.resolve()

  constructor(bodyStream: ReadableStream<Uint8Array>, boundary: string) {
    this.#parser = new MultipartParser(boundary)
    this.#bodyReader = bodyStream.getReader()
  }

  /** Read the next part's body as a UTF-8 string. Returns null if no more parts. */
  async readNextPartAsText(expectedKey?: string): Promise<string | null> {
    if (!(await this.#advanceToNextPart(expectedKey))) return null
    const chunks: Uint8Array[] = []
    while (true) {
      const event = await this.#nextEvent()
      if (!event || event.type === 'body-end') return concatToString(chunks)
      if (event.type === 'body-data') chunks.push(event.data)
    }
  }

  /**
   * Consume file part by its multipart `key` (e.g. `__telefunc_multipart_0`).
   *
   * Concurrent calls are serialized — each waits for the previous stream to
   * be fully consumed before reading from the wire:
   *   `file1.stream().pipeTo(w1); file2.stream().pipeTo(w2)` — works, no warning.
   *
   * Out-of-order access warns and drains skipped parts (they become unreadable).
   */
  consumePart(key: string): Promise<ReadableStream<Uint8Array>> {
    const partIndex = parseMultipartIndex(key)
    const queuePrevious = this.#queue

    let resolveStream!: (s: ReadableStream<Uint8Array>) => void
    let rejectStream!: (e: unknown) => void
    const streamReady = new Promise<ReadableStream<Uint8Array>>((res, rej) => {
      resolveStream = res
      rejectStream = rej
    })

    this.#queue = (async () => {
      await queuePrevious
      try {
        assertUsage(
          partIndex >= this.#nextPartIndex,
          `File argument ${partIndex} has already been consumed (currently at ${this.#nextPartIndex}). File arguments must be read in order.`,
        )

        assertWarning(
          partIndex === this.#nextPartIndex,
          `File arguments are being consumed out of order (reading ${partIndex}, expected ${this.#nextPartIndex}). Skipped files will be unreadable. For correct behavior, consume file arguments in the order they appear.`,
          { onlyOnce: true },
        )
        // Skip past earlier parts on the wire (drain their bodies, they become unreadable)
        while (this.#nextPartIndex < partIndex) {
          assert(await this.#advanceToNextPart())
          await this.#drainBody()
          this.#nextPartIndex++
        }

        // Advance to the target part (asserts wire name matches)
        assert(await this.#advanceToNextPart(key))
        this.#nextPartIndex++

        const { stream, done } = this.#createBodyStream()
        resolveStream(stream)
        await done
      } catch (err) {
        rejectStream(err)
      }
    })()

    return streamReady
  }

  // --- Internal ---

  /** Advance to the next part-begin and assert its name matches `expectedKey` (if provided). Returns false if stream ended. */
  async #advanceToNextPart(expectedKey?: string): Promise<boolean> {
    while (true) {
      const event = await this.#nextEvent()
      if (!event) return false
      if (event.type === 'part-begin') {
        if (expectedKey !== undefined) {
          assert(event.name === expectedKey)
        }
        return true
      }
    }
  }

  /** Drain body-data events until body-end. */
  async #drainBody(): Promise<void> {
    while (true) {
      const event = await this.#nextEvent()
      if (!event || event.type === 'body-end') return
    }
  }

  /** Create a ReadableStream that pulls from the wire. Returns the stream and a promise that resolves when the stream ends. */
  #createBodyStream(): { stream: ReadableStream<Uint8Array>; done: Promise<void> } {
    let resolveDone!: () => void
    const done = new Promise<void>((r) => {
      resolveDone = r
    })
    const stream = new ReadableStream<Uint8Array>({
      pull: async (controller) => {
        const event = await this.#nextEvent()
        if (!event || event.type === 'body-end') {
          controller.close()
          resolveDone()
          return
        }
        if (event.type === 'body-data') {
          controller.enqueue(event.data)
        }
      },
      cancel: async () => {
        await this.#drainBody()
        resolveDone()
      },
    })
    return { stream, done }
  }

  /**
   * Pull the next multipart event.
   *
   * Returns buffered events first, then pulls new chunks from the body
   * stream to produce more. Returns `null` when the body stream ends.
   */
  async #nextEvent(): Promise<MultipartEvent | null> {
    while (this.#eventQueue.length === 0) {
      if (this.#streamDone) return null
      const { done, value } = await this.#bodyReader.read()
      if (done) {
        this.#streamDone = true
        this.#eventQueue = this.#parser.finish()
      } else {
        this.#eventQueue = this.#parser.feed(value)
      }
    }
    return this.#eventQueue.shift()!
  }
}

function concatToString(chunks: Uint8Array[]): string {
  if (chunks.length === 0) return ''
  if (chunks.length === 1) return decoder.decode(chunks[0])
  let total = 0
  for (const c of chunks) total += c.byteLength
  const result = new Uint8Array(total)
  let offset = 0
  for (const c of chunks) {
    result.set(c, offset)
    offset += c.byteLength
  }
  return decoder.decode(result)
}
