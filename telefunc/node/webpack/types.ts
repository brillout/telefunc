export type { Loader }
export type { Compiler }

// Subset of `import type { LoaderDefinitionFunction } from 'webpack'`
type Loader = {
  _compiler: Compiler
  resource: string
  mode: 'production' | 'development'
  // https://webpack.js.org/api/loaders/#thiscallback
  callback: (err: Error | null, content: string | Buffer, sourceMap?: any, meta?: any) => void
}

type Compiler = {
  name: string
  context: string
  hooks: any
}
