export type { TelefunctionError }
export type { TelefunctionCallAbort }

import type { ValidationError } from './ValidationError.js'

type TelefunctionError =
  | TelefunctionCallErrorSsr
  | TelefunctionCallErrorConnection
  | TelefunctionCallAbort
  | ValidationError

type TelefunctionCallErrorSsr = Error & {
  isConnectionError?: undefined
  isAbort?: undefined
}
type TelefunctionCallErrorConnection = Error & {
  isConnectionError: true
  isAbort?: undefined
}
type TelefunctionCallAbort = Error & {
  isConnectionError?: undefined
  isAbort: true
  abortValue: unknown
}
