import vikeReact from 'vike-react/config'
import vikeServer from 'vike-server/config'
import type { Config } from 'vike/types'

export default {
  extends: [vikeReact, vikeServer],
  server: {
    entry: 'server/index.ts',
  },
} satisfies Config
