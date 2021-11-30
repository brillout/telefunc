import { SERVER_IS_READY } from './SERVER_IS_READY'

export default {
  modules: ['telefunc/nuxt', sendServerIsReadyMessage],
  telemetry: false,
}

// Nuxt uses the logging library `consola` which breaks `libframe/test`'s log listening mechanism;
// we need to log a custom message so that `libframe/test` can know when the build is finished.
function sendServerIsReadyMessage() {
  this.nuxt.hook('build:done', () => {
    process.stdout.write(`${SERVER_IS_READY}\n`)
  })
}
