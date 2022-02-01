export { telefunc } from './telefunc'
export { telefuncConfig } from './telefuncConfig'
export { getContext, provideTelefuncContext } from './getContext'
export { Abort } from './Abort'
export { shield } from './shield'
export { onTelefuncServerError } from './runTelefunc/onTelefuncServerError'

// In order to allow users to override `Telefunc.Context`, we need to export `Telefunc` (even if the user never imports `Telefunc`)
export type { Telefunc } from './getContext/TelefuncNamespace'

export {
  __internal_setTelefuncFiles,
  __internal_addTelefunction,
} from './runTelefunc/loadTelefuncFilesWithInternalMechanism'

import { assertUsage } from '../utils'

assertEnv()

function assertEnv(isBrowser?: true) {
  const isNodejs =
    !isBrowser && typeof 'process' !== 'undefined' && process && process.versions && process.versions.node
  assertUsage(
    isNodejs,
    [
      'You are loading the `telefunc` module in the browser, but',
      'the `telefunc` module can only be imported in Node.js.',
    ].join(' '),
  )
}
