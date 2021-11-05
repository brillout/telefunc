import { assertUsage } from './utils'

export { assertEnv }

function assertEnv(isBrowser?: true) {
  const isNodejs =
    !isBrowser && typeof 'process' !== 'undefined' && process && process.versions && process.versions.node
  assertUsage(
    isNodejs,
    [
      'You are loading the `telefunc` module in the browser, but',
      'the `telefunc` module can only be imported in Node.js.',
    ].join(' '),
  )
}
