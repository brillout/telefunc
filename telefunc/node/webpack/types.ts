export type { Loader }
export type { Compiler }

// Subset of `import type { LoaderDefinitionFunction } from 'webpack'`
type Loader = {
  _compiler: Compiler
  resource: string
  mode: 'production' | 'development'
}

type Compiler = {
  name: string
  context: string
  hooks: any
}
