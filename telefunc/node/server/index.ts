export { telefunc } from './telefunc'
import { config } from './serverConfig'
export { config }
export { config as telefuncConfig }
export { getContext, provideTelefuncContext } from './getContext'
export { Abort } from './Abort'
export { shield } from './shield'
export { onBug } from './runTelefunc/onBug'

export { decorateTelefunction as __decorateTelefunction } from './runTelefunc/decorateTelefunction'

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
