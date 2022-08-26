import { telefunc } from 'telefunc/vite'

export default {
  plugins: [telefunc()],
  build: { target: 'esnext' },
  appType: 'mpa',
  server: {
    port: 3000,
    host: true
  }
}
