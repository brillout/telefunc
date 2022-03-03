import { telefunc } from 'telefunc/vite'

export default {
  plugins: [telefunc()],
  build: { target: 'esnext' } // Needed for Cloudflare Workers (we should transpile to ES Modules and not to CommonJS)
}
