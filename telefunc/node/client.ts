export const telefuncConfig = new Proxy({}, { set: err('telefuncConfig'), get: err('telefuncConfig') })
export const onTelefunctionRemoteCallError = err('onTelefunctionRemoteCallError')

import { assertUsage } from './utils'

function err(importName: string) {
  return () => {
    const isFunction = importName !== 'telefuncConfig'
    const name = importName + (isFunction ? '()' : '')
    assertUsage(
      false,
      `Using \`${name}\` (\`import { ${importName} } from 'telefunc/client'\`) is forbidden on the server-side, see https://telefunc.com/isomorphic-import`
    )
  }
}
