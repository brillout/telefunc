import { testRun } from '../vite/.testRun'
testRun('npm run start', {
  skipShieldGenerationTest: true,
  // Babel prints build result `created dist in 693ms` on stderr
  onlyFailOnBrowserError: true
})
