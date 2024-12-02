import telefunc from 'telefunc/vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import vikeNode from 'vike-node/plugin'

export default {
  plugins: [react(), vike(), telefunc(), vikeNode('./server/index.ts')],
  resolve: {
    alias: {
      '#app': __dirname,
    },
  },
}
