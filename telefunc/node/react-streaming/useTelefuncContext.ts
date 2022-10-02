export { useTelefuncContext }
export { TelefuncSSR }

import { createContext, useContext, createElement } from 'react'
import type { Telefunc } from '../../node/server/getContext/TelefuncNamespace'

const TelefuncReactContext = createContext<null | Telefunc.Context>(null)

function TelefuncSSR({ context, children }: { context: Telefunc.Context; children: React.ReactNode }) {
  const telefuncContext = context
  const { Provider } = TelefuncReactContext
  return createElement(Provider, { value: telefuncContext, children })
}

function useTelefuncContext() {
  const telefuncContext = useContext(TelefuncReactContext)
  return telefuncContext
}
