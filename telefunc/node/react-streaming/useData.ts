export { useData }

import { useData as useData_ } from '../../shared/react-streaming/index.js'
import { restoreContext, isAsyncMode } from '../server/getContext.js'

import { useTelefuncContext } from './useTelefuncContext.js'

const useData: typeof useData_ = (...args) => {
  if (!isAsyncMode()) {
    const context = useTelefuncContext()
    restoreContext(context)
  }
  return useData_(...args)
}
