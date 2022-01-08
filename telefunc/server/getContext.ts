// Infrastructure to toggle async/sync mode for context provisioning

import {
  getContext_sync,
  getContextOrUndefined_sync,
  provideContext_sync,
  provideContextOrNull_sync,
} from './getContext/sync'

export { getContext }
export { getContextOrUndefined }
export { provideContext }
export { provideContextOrNull }

export { installAsyncMode }

const getContext = <Context>() => _getContext<Context>()
const getContextOrUndefined = () => _getContextOrUndefined()
const provideContext = <Context extends Record<string, unknown> = Record<string, unknown>>(ctx: Context) =>
  _provideContext(ctx)
const provideContextOrNull = (ctx: Parameters<typeof _provideContextOrNull>[0]) => _provideContextOrNull(ctx)

let _getContext = getContext_sync
let _getContextOrUndefined = getContextOrUndefined_sync
let _provideContext = provideContext_sync
let _provideContextOrNull = provideContextOrNull_sync

async function installAsyncMode(
  getContext_async: typeof _getContext,
  getContextOrUndefined_async: typeof _getContextOrUndefined,
  provideContext_async: typeof _provideContext,
  provideContextOrNull_async: typeof _provideContextOrNull,
) {
  _getContext = getContext_async
  _getContextOrUndefined = getContextOrUndefined_async
  _provideContext = provideContext_async
  _provideContextOrNull = provideContextOrNull_async
}
