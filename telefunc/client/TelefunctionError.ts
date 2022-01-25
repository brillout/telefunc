export type { TelefunctionError }

type TelefunctionError = Error &
  (
    | {
        isConnectionError?: undefined
        isAbort?: undefined
      }
    | {
        isConnectionError: true
        isAbort?: undefined
      }
    | {
        isConnectionError?: undefined
        isAbort: true
        abortValue: unknown
      }
  )
