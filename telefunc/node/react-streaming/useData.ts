export { useData }

import { useData as useData_ } from '../../shared/react-streaming'
import { restoreContext, isAsyncMode } from '../server/getContext'

import { useTelefuncContext } from './useTelefuncContext'

const useData: typeof useData_ = (...args) => {
  if (!isAsyncMode()) {
    const context = useTelefuncContext()
    restoreContext(context)
  }
  return useData_(...args)
}
