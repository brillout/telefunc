// Infrastructure to toggle async/sync mode for context provisioning

import {
  getContext_sync,
  getContextOrUndefined_sync,
  provideContext_sync,
  provideContextOrNull_sync,
} from './getContext/sync'

export { installAsyncMode }

export { getContext }
export { getContextOrUndefined }
export { provideContext }
export { provideContextOrNull }

const getContext = () => _getContext()
const getContextOrUndefined = () => _getContextOrUndefined()
const provideContext = (ctx: Parameters<typeof _provideContext>[0]) => _provideContext(ctx)
const provideContextOrNull = (ctx: Parameters<typeof _provideContextOrNull>[0]) => _provideContextOrNull(ctx)

let _getContext = getContext_sync
let _getContextOrUndefined = getContextOrUndefined_sync
let _provideContext = provideContext_sync
let _provideContextOrNull = provideContextOrNull_sync

let isAsyncMode = false
async function installAsyncMode() {
  if (isAsyncMode) return
  isAsyncMode = true
  const { getContext_async, getContextOrUndefined_async, provideContext_async, provideContextOrNull_async } =
    await import('./getContext/async')
  _getContext = getContext_async
  _getContextOrUndefined = getContextOrUndefined_async
  _provideContext = provideContext_async
  _provideContextOrNull = provideContextOrNull_async
}
