export const telefunc = err('telefunc')
export const config = new Proxy({}, { set: err('config'), get: err('config') })
export const getContext = err('getContext')
export const provideContext = err('provideContext')
export const Abort = err('Abort')
export const shield = err('shield')
export const withShield = err('withShield')
export const onTelefuncServerError = err('onTelefuncServerError')

import { assertUsage } from './utils'

function err(importName: string) {
  return () => {
    const isFunction = importName !== 'config'
    const name = importName + (isFunction ? '()' : '')
    assertUsage(
      false,
      `Using \`${name}\` (\`import { ${importName} } from 'telefunc'\`) is forbidden on the client-side, see https://telefunc.com/isomorphic-import`,
    )
  }
}
