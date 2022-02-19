export type { TelefuncFiles }
export type { Telefunction }

type Telefunction = (...args: unknown[]) => Promise<unknown>
type FileExports = Record<string, unknown>
type TelefuncFiles = Record<string, FileExports>
