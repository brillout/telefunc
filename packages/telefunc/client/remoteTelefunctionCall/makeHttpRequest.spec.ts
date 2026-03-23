import { describe, expect, it, vi } from 'vitest'
import { makeHttpRequest } from './makeHttpRequest.js'
import { ValidationError } from '../../shared/ValidationError.js'
import {
  DETAILED_VALIDATION_ERROR_REQUEST_HEADER,
  STATUS_BODY_SHIELD_VALIDATION_ERROR,
  STATUS_CODE_SHIELD_VALIDATION_ERROR,
} from '../../shared/constants.js'
import { stringify } from '@brillout/json-serializer/stringify'

describe('makeHttpRequest', () => {
  it('requests detailed validation errors and throws ValidationError', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(
      new Response(
        stringify({
          version: 1,
          vendor: 'telefunc',
          message: 'Detailed validation message',
        }),
        { status: STATUS_CODE_SHIELD_VALIDATION_ERROR },
      ),
    )

    const err = await getThrownError(fetch)

    expect(fetch).toHaveBeenCalledOnce()
    const requestInit = fetch.mock.calls[0]?.[1]
    expect(requestInit?.headers).toMatchObject({
      [DETAILED_VALIDATION_ERROR_REQUEST_HEADER]: 'detailed',
    })
    expect(err).toBeInstanceOf(ValidationError)
    expect(err.message).toBe('Detailed validation message')
  })

  it('keeps supporting legacy plain-text validation errors', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValueOnce(
      new Response(STATUS_BODY_SHIELD_VALIDATION_ERROR, {
        status: STATUS_CODE_SHIELD_VALIDATION_ERROR,
      }),
    )

    const err = await getThrownError(fetch)

    expect(err).not.toBeInstanceOf(ValidationError)
    expect(err.message).toBe('Shield Validation Error — see server logs (if enabled: https://telefunc.com/log)')
  })
})

async function getThrownError(fetch: typeof globalThis.fetch) {
  try {
    await makeHttpRequest({
      telefuncUrl: '/_telefunc',
      httpRequestBody: '{}',
      telefunctionName: 'hello',
      telefuncFilePath: '/hello.telefunc.ts',
      httpHeaders: null,
      fetch,
    })
  } catch (err) {
    return err as Error
  }

  throw new Error('Expected makeHttpRequest() to throw')
}
