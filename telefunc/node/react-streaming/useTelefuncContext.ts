export { useTelefuncContext }
export { TelefuncSSR }

import { type ReactNode, createContext, createElement, useContext } from 'react'
import type { Telefunc } from '../../node/server/getContext/TelefuncNamespace'
import { assertUsage, isObject } from '../utils'

const TelefuncReactContext = createContext<null | Telefunc.Context>(null)

function TelefuncSSR({
  context,
  children,
}: {
  context?: Telefunc.Context
  // Using type `unknown` instead of type `ReactNode` in order to avoid mismatch when user has a different @types/react version.
  children: unknown
}) {
  assertUsage(
    context === undefined || isObject(context),
    '[<TelefuncSSR context={context}/>] context should be an object',
  )
  const { Provider } = TelefuncReactContext
  return createElement(Provider, { value: context ?? null, children: children as ReactNode })
}

function useTelefuncContext() {
  const context = useContext(TelefuncReactContext)
  return context
}
