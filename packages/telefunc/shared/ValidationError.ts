export { ValidationError }

import { StandardSchemaV1 } from '../standard-schema.js'
import { assert } from '../utils/assert.js'
import { isObject } from '../utils/isObject.js'

type ArgIssues = (readonly StandardSchemaV1.Issue[] | undefined)

type ValidationErrorData = {
  vendor: string
  message: string
  issues?: ArgIssues[]
}

class ValidationError extends Error {
  version = 1
  vendor: string
  issues?: ArgIssues[]

  constructor(errorData: ValidationErrorData) {
    // todo: assert data shape?
    super(errorData.message)
    this.name = 'ValidationError'
    this.vendor = errorData.vendor
    this.issues = errorData.issues
  }

  static isValidationErrorData(thing: unknown): thing is ValidationErrorData {
    return (
      isObject(thing)
      && thing.version === 1
      && typeof thing.vendor === 'string'
      && (!thing.issues || Array.isArray(thing.issues))
    )
  }
}
