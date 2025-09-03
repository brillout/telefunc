export { onLoad }

import { assertIsNotBrowser } from '../../utils/assertIsNotBrowser.js'
import { assertVersion } from '../../utils/assertVersion.js'
import { version } from 'vite'

function onLoad() {
  assertIsNotBrowser()
  // package.json#peerDependencies isn't enough as users often ignore it
  // This assertion isn't reliable: the user may still use a Vite version older than 6.0.0 — see https://github.com/vitejs/vite/pull/19355
  // TO-DO/eventually: let's also use this.meta.viteVersion
  // - https://github.com/vitejs/vite/pull/20088
  // - https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#700-2025-06-24
  assertVersion('Vite', version, '6.0.0')
}
