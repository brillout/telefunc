import type { ViteDevServer } from 'vite'
export * from '../shared/types'
import { Telefunctions } from '../shared/types'

export type RequestProps = {
  url: string
  method: string
  body: string | unknown
}

export type Config = {
  viteDevServer?: ViteDevServer
  telefunctions?: Record<string, Telefunctions>
  root?: string
  isProduction: boolean
  baseUrl: string
  urlPath: string
  disableCache: boolean
}

export type TelefuncContextUserProvided = Record<string, unknown>

type TelefuncFilePath = string
export type TelefuncFiles = Record<TelefuncFilePath, Telefunctions>
type FileExports = Record<string, unknown>
export type TelefuncFilesUntyped = Record<TelefuncFilePath, FileExports>
