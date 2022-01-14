export * from '../shared/types'

export type HttpRequest = {
  url: string
  method: string
  body: string | object
}

export type TelefuncContextUserProvided = Record<string, unknown>

type FileExports = Record<string, unknown>
export type TelefuncFiles = Record<string, FileExports>
