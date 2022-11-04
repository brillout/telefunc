export type { TelefunctionError }
export type { TelefunctionCallAbort }

type TelefunctionError = TelefunctionCallErrorSsr | TelefunctionCallErrorConnection | TelefunctionCallAbort

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
