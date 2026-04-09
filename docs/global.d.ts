declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const MdxComponent: ComponentType
  export default MdxComponent
}

declare module '*.css'

declare global {
  namespace Vike {
    interface GlobalContext {
      docs: import('@unterberg/nivel').DocsGlobalContextData
    }
  }
}
