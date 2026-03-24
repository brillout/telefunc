export {
  createShieldValidationError,
  isShieldValidationErrorPayload,
  wantsDetailedShieldValidationErrors,
  detailedShieldValidationErrorsRequestHeader,
}
export type { ShieldValidationErrorPayload, ShieldValidationIssue }

import { isObject } from '../utils/isObject.js'

type ShieldValidationIssue = {
  message?: string
  path?: readonly (string | number)[]
}

type ShieldValidationErrorPayload = {
  isShieldValidationError: true
  message: string
  issues: readonly ShieldValidationIssue[]
  validator?: string
}

const detailedShieldValidationErrorsRequestHeader = 'x-telefunc-client'

function createShieldValidationError({
  message,
  issues,
  validator,
}: {
  message: string
  issues?: readonly ShieldValidationIssue[]
  validator?: string
}): ShieldValidationErrorPayload {
  issues = issues ?? [{ message }]
  return {
    isShieldValidationError: true,
    message,
    issues,
    validator,
  }
}

function isShieldValidationErrorPayload(thing: unknown): thing is ShieldValidationErrorPayload {
  return (
    isObject(thing) &&
    thing.isShieldValidationError === true &&
    typeof thing.message === 'string' &&
    'issues' in thing &&
    Array.isArray(thing.issues) &&
    (!('validator' in thing) || thing.validator === undefined || typeof thing.validator === 'string')
  )
}

function wantsDetailedShieldValidationErrors(request: { headers: Headers }): boolean {
  return request.headers.get(detailedShieldValidationErrorsRequestHeader) === 'true'
}
