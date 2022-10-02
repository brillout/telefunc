export { useData }

import { useData as useData_ } from '../../shared/react-streaming'
import { provideTelefuncContext } from '../server'

import { useTelefuncContext } from './useTelefuncContext'

const useData: typeof useData_ = (...args) => {
  {
    const context = useTelefuncContext()
    if (context) {
      provideTelefuncContext(context)
    }
  }
  return useData_(...args)
}
