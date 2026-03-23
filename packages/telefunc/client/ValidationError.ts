export { ValidationError }

import type { ShieldValidationErrorPayload, ShieldValidationIssue } from '../shared/shieldValidationError.js'

class ValidationError extends Error {
  isValidationError = true as const
  validationError: ShieldValidationErrorPayload
  issues: readonly ShieldValidationIssue[]
  validator?: string

  constructor(validationError: ShieldValidationErrorPayload) {
    super(validationError.message)
    this.name = 'ValidationError'
    this.validationError = validationError
    this.issues = validationError.issues
    this.validator = validationError.validator
  }
}
