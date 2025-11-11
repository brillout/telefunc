import vikeReact from 'vike-react/config'
import vikePhoton from 'vike-photon/config'
import type { Config } from 'vike/types'

export default {
  extends: [vikeReact, vikePhoton],
  photon: {
    server: 'server/index.ts',
  },
} satisfies Config
