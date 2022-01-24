export const config = new Proxy({}, { set: err('config'), get: err('config') })
export const onRemoteCallError = err('onRemoteCallError')

import { assertUsage } from './utils'

function err(importName: string) {
  return () => {
    const isFunction = importName !== 'config'
    const name = importName + (isFunction ? '()' : '')
    assertUsage(
      false,
      `Using \`${name}\` (\`import { ${importName} } from 'telefunc/client'\`) is forbidden on the server-side, see https://telefunc.com/isomorphic-import`,
    )
  }
}
