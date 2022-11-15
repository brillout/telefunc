import { assert, isObject, getGlobalObject, assertUsage } from '../../utils'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_sync }
export { provideTelefuncContext_sync }
export { restoreContext_sync }

const globalObject = getGlobalObject<{
  context: null | Telefunc.Context
  hasRestoreAccess: boolean
  neverProvided: boolean
  neverRestored: boolean
}>('getContext/sync.ts', {
  context: null,
  hasRestoreAccess: false,
  neverProvided: true,
  neverRestored: true
})

function getContext_sync(): Telefunc.Context {
  if (globalObject.context === null) {
    // Using `neverRestored` to detect SSR doesn't always work.
    if (globalObject.neverRestored) {
      assertUsage(false, 'Using Telefunc to fetch the initial data of your page is discouraged, see https://telefunc.com/initial-page-data') // prettier-ignore
    }
    if (globalObject.hasRestoreAccess || globalObject.neverProvided) {
      assertUsage(false, '[getContext()] Make sure to provide a context object, see https://telefunc.com/getContext#provide') // prettier-ignore
    } else {
      assertUsage(false, '[getContext()] Cannot access context object, see https://telefunc.com/getContext#access')
    }
  }
  const { context } = globalObject
  assert(isObject(context))
  return context
}

function restoreContext_sync(context: null | Telefunc.Context) {
  globalObject.neverRestored = false
  provide(context)
}

function provideTelefuncContext_sync(context: Telefunc.Context) {
  assertUsage(isObject(context), '[provideTelefuncContext(context)] Argument `context` should be an object')
  provide(context)
}

function provide(context: null | Telefunc.Context) {
  assert(context === null || isObject(context))
  if (context) {
    globalObject.neverProvided = false
    globalObject.context = context
  }
  globalObject.hasRestoreAccess = true
  process.nextTick(() => {
    globalObject.context = null
    globalObject.hasRestoreAccess = false
  })
}
