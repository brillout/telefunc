export type { Loader }
export type { Compiler }

// Subset of `import type { LoaderDefinitionFunction } from 'webpack'`
type Loader = {
  _compiler: Compiler
  resource: string
  mode: 'production' | 'development'
  // https://webpack.js.org/api/loaders/#thisasync
  async: () => void
  // https://webpack.js.org/api/loaders/#thiscallback
  callback: (err: Error | null, content: string | Buffer, sourceMap?: SourceMap, meta?: any) => void
}

// Subset of:
// ```ts
// declare interface SourceMap {
// 	version: number;
// 	sources: string[];
// 	mappings: string;
// 	file?: string;
// 	sourceRoot?: string;
// 	sourcesContent?: string[];
// 	names?: string[];
// 	debugId?: string;
// }
// ```
// https://github.com/webpack/webpack/blob/79c5575cfc85f5edd76a5b07c52311d87d1d77a5/types.d.ts#L14365-L14374
type SourceMap = {
  mappings: string
}

type Compiler = {
  name: string
  context: string
  hooks: any
}
