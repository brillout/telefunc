export { getEtag }

import { assert } from '../../../utils/assert.js'
import type { createHash as createHashType } from 'node:crypto'

type CreateHash = typeof createHashType

async function getEtag(runContext: { disableEtag: boolean; httpResponseBody: string }): Promise<string | null> {
  if (runContext.disableEtag) {
    return null
  }
  let createHash: CreateHash
  try {
    createHash = (await import('node:crypto')).createHash
  } catch (err) {
    /*
    assertWarning(
      false,
      'The HTTP response ETag header missing because the Node.js module `crypto` could not be loaded. Set `config.disableEtag = true` to remove this warning.',
      { onlyOnce: true }
    )
    */
    return null
  }

  const etag = computeEtag(runContext.httpResponseBody, createHash)
  return etag
}

function computeEtag(body: string, createHash: CreateHash): string {
  const etagValue = computeEtagValue(body, createHash)
  assert(!etagValue.includes('"'))
  const etag = `"${etagValue}"`
  return etag
}

function computeEtagValue(body: string, createHash: CreateHash): string {
  if (body.length === 0) {
    // fast-path empty body
    return '1B2M2Y8AsgTpgAmY7PhCfg=='
  }

  return createHash('md5').update(body, 'utf8').digest('base64')
}
