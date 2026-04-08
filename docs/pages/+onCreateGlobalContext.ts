import { docsGlobalContextData } from './(nivel-generated)/_docsGlobalContext'

export const onCreateGlobalContext = (globalContext: { docs?: typeof docsGlobalContextData }) => {
  globalContext.docs = docsGlobalContextData
}
