export { useTelefuncContext }
export { TelefuncSSR }

import { createContext, useContext, createElement } from 'react'
import type { Telefunc } from '../../node/server/getContext/TelefuncNamespace'
import { assertUsage, isObject } from '../utils'

const TelefuncReactContext = createContext<null | Telefunc.Context>(null)

function TelefuncSSR({ context, children }: { context?: Telefunc.Context; children: React.ReactNode }) {
  assertUsage(
    context === undefined || isObject(context),
    '[<TelefuncSSR context={context}/>] context should be an object'
  )
  const { Provider } = TelefuncReactContext
  return createElement(Provider, { value: context ?? null, children })
}

function useTelefuncContext() {
  const context = useContext(TelefuncReactContext)
  return context
}
