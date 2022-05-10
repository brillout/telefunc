export const telefunc = err('telefunc')
export const telefuncConfig = new Proxy({}, { set: err('telefuncConfig'), get: err('telefuncConfig') })
export const getContext = err('getContext')
export const provideTelefuncContext = err('provideTelefuncContext')
export const Abort = err('Abort')
export const shield = err('shield')
export const onBug = err('onBug')

import { assertUsage } from './utils'

function err(importName: string) {
  return () => {
    const isFunction = importName !== 'telefuncConfig'
    const name = importName + (isFunction ? '()' : '')
    assertUsage(
      false,
      `Using \`${name}\` (\`import { ${importName} } from 'telefunc'\`) is forbidden on the client-side, see https://telefunc.com/isomorphic-import`
    )
  }
}
