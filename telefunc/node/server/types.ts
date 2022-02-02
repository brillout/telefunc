export type { HttpRequest }
export type { TelefuncFiles }
export type { Telefunction }

type Telefunction = (...args: unknown[]) => Promise<unknown>

type HttpRequest = {
  url: string
  method: string
  body: unknown
}

type FileExports = Record<string, unknown>
type TelefuncFiles = Record<string, FileExports>
