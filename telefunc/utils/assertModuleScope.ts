export { assertModuleScope }

import { assert } from './assert'
import { getGlobalObject } from './getGlobalObject'

const globalObject = getGlobalObject<{ loadedModules: string[] }>('./assertModuleScope.ts', {
  loadedModules: [],
})

/** Ensure that the module's variable scope is unique (i.e. not duplicated). Which is equivalent to ensure that the module was loaded only once.
 *
 * We should use `assertModuleScope()` everytime we define variables on the module scope.
 */
function assertModuleScope(moduleKey: `${string}.ts`) {
  assert(!globalObject.loadedModules.includes(moduleKey))
  globalObject.loadedModules.push(moduleKey)
}
