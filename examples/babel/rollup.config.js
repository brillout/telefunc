import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const config = {
  input: 'index.js',
  output: { dir: 'dist' },
  plugins: [
    babel({ babelHelpers: 'bundled', skipPreflightCheck: true }),
    nodeResolve({ exportConditions: ['browser'] }),
  ],
}

export default config
