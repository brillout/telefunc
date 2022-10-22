export { telefunc } from './telefunc'
export { telefuncConfig } from './telefuncConfig'
export { getContext, provideTelefuncContext } from './getContext'
export { Abort } from './Abort'
export { shield } from './shield'
export { onBug } from './runTelefunc/onBug'

// In order to allow users to override `Telefunc.Context`, we need to export `Telefunc` (even if the user never imports `Telefunc`)
export type { Telefunc } from './getContext/TelefuncNamespace'

export { registerTelefunction as __registerTelefunction } from './runTelefunc/loadTelefuncFilesWithRegistration'
export { assertTelefunction as __assertTelefunction } from './runTelefunc/assertTelefunction'

import { assertUsage } from '../utils'

assertServerSide()

function assertServerSide() {
  const isBrowser = typeof window !== 'undefined' && 'innerHTML' in (window?.document?.body || {})
  assertUsage(
    !isBrowser,
    [
      'You are loading the `telefunc` module in the browser, but',
      'the `telefunc` module can only be imported in Node.js.'
    ].join(' ')
  )
}
