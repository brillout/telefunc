import { stringify } from '@brillout/json-serializer/stringify'
import { describe, expect, it, vi } from 'vitest'
import { ValidationError } from '../ValidationError.js'
import { makeHttpRequest } from './makeHttpRequest.js'
import {
  createShieldValidationError,
  detailedShieldValidationErrorsRequestHeader,
} from '../../shared/shieldValidationError.js'

describe('makeHttpRequest', () => {
  it('surfaces detailed shield validation errors to clients', async () => {
    const validationError = createShieldValidationError({
      message: '[root] > [tuple: element 0] > [zod schema path `name`] Expected string',
      issues: [{ message: 'Expected string', path: ['name'] }],
      validator: 'zod',
    })
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(
      new Response(stringify(validationError), {
        status: 422,
      }),
    )

    const promise = makeHttpRequest({
      telefuncUrl: '/_telefunc',
      httpRequestBody: 'payload',
      telefunctionName: 'onLoad',
      telefuncFilePath: '/pages/index/Hello.telefunc.ts',
      httpHeaders: null,
      fetch,
    })

    await expect(promise).rejects.toBeInstanceOf(ValidationError)
    await expect(promise).rejects.toMatchObject({
      message: validationError.message,
      isValidationError: true,
      validationError,
      issues: validationError.issues,
      validator: 'zod',
    })

    const [, requestInit] = fetch.mock.calls[0]!
    expect(requestInit?.headers).toMatchObject({
      [detailedShieldValidationErrorsRequestHeader]: 'true',
    })
  })

  it('keeps backward compatibility with legacy shield error responses', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(
      new Response('Shield Validation Error', {
        status: 422,
      }),
    )

    const promise = makeHttpRequest({
      telefuncUrl: '/_telefunc',
      httpRequestBody: 'payload',
      telefunctionName: 'onLoad',
      telefuncFilePath: '/pages/index/Hello.telefunc.ts',
      httpHeaders: null,
      fetch,
    })

    await expect(promise).rejects.toThrow(
      'Shield Validation Error — see server logs (if enabled: https://telefunc.com/log)',
    )
  })
})
