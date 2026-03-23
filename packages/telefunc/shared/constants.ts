export const STATUS_CODE_SUCCESS = 200 as const // "OK"
export const STATUS_CODE_MALFORMED_REQUEST = 400 as const // "Bad Request"
export const STATUS_BODY_MALFORMED_REQUEST = 'Malformed Telefunc Request' as const
export const STATUS_CODE_THROW_ABORT = 403 as const // "Forbidden"
export const STATUS_CODE_SHIELD_VALIDATION_ERROR = 422 as const // "Unprocessable Content"
export const STATUS_BODY_SHIELD_VALIDATION_ERROR = 'Shield Validation Error' as const
export const STATUS_CODE_INTERNAL_SERVER_ERROR = 500 as const // "Internal Server Error"
export const STATUS_BODY_INTERNAL_SERVER_ERROR = 'Internal Server Error' as const

/** values: `detailed` */
export const DETAILED_VALIDATION_ERROR_REUEST_HEADER = 'x-telefunc-errors' as const