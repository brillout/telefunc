export { nodeReadableToWebRequest }

import type { Readable } from 'node:stream'
import { assertIsNotBrowser } from './assertIsNotBrowser.js'
assertIsNotBrowser()

function nodeReadableToWebRequest(
  readable: Readable,
  url: string,
  method: string,
  headers: Record<string, string | string[] | undefined>,
): Request {
  const body = new ReadableStream({
    start(controller) {
      readable.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)))
      readable.on('end', () => controller.close())
      readable.on('error', (err) => controller.error(err))
    },
  })
  return new Request(url, {
    method,
    headers: headers as Record<string, string>,
    body,
    // @ts-ignore duplex required for streaming request bodies
    duplex: 'half',
  })
}
