import { telefunc } from 'telefunc/vite'

const port = 3000

export default {
  plugins: [telefunc()],
  build: { target: 'esnext' },
  appType: 'mpa',
  server: { port, host: true },
  preview: { port }
}
