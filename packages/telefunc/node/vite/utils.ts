// Utils needed by Telefunc's Vite plugin

// We call onLoad() here so that it's called even when only a subset of the plugin is loaded. (Making the assert() calls inside onLoad() a lot stronger.)
import { onLoad } from './onLoad.js'
onLoad()

export * from '../../utils/assert.js'
export * from '../../utils/projectInfo.js'
export * from '../../utils/path.js'
export * from '../../utils/isScriptFile.js'
export * from '../../utils/isObject.js'
export * from '../../utils/getGlobalObject.js'
export * from '../../utils/hasProp.js'
export * from '../../utils/checkType.js'
export * from '../../utils/rollupSourceMap.js'
export * from '../../utils/requireResolve.js'
export * from '../../utils/debug.js'
