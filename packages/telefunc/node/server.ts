export { telefunc } from './server/telefunc.js'
import { config } from './server/serverConfig.js'
export { config }
export { config as telefuncConfig }
export { getContext, provideTelefuncContext } from './server/getContext.js'
export { Abort } from './server/Abort.js'
export { shield } from './server/shield.js'
export { onBug } from './server/runTelefunc/onBug.js'

// In order to allow users to override `Telefunc.Context`, we need to export `Telefunc` (even if the user never imports `Telefunc`)
export type { Telefunc } from './server/getContext/TelefuncNamespace.js'

export { decorateTelefunction as __decorateTelefunction } from './server/runTelefunc/decorateTelefunction.js'

import { assertUsage } from './utils.js'

assertServerSide()

function assertServerSide() {
  const isBrowser = typeof window !== 'undefined' && 'innerHTML' in (window?.document?.body || {})
  assertUsage(
    !isBrowser,
    [
      'You are loading the `telefunc` module in the browser, but',
      'the `telefunc` module can only be imported in Node.js.',
    ].join(' '),
  )
}
