import { page, urlBase, autoRetry, run, isLinux } from '../../libframe/test/setup'
import { NUXT_APP_IS_READY } from './NUXT_APP_IS_READY'

export { runTest }

function runTest(cmd: 'npm run dev' | 'npm run prod') {
  const serverIsReadyDelay = !isLinux() ? 10 * 1000 : undefined
  run(cmd, { serverIsReadyMessage: NUXT_APP_IS_READY, serverIsReadyDelay })

  test('telefunction call', async () => {
    await page.goto(`${urlBase}/`)

    let text: string
    // `autoRetry` to ensure JavaScript has loaded & executed
    await autoRetry(async () => {
      text = await page.textContent('#view')
      expect(text).toContain('First name: Alan')
    })
    expect(text).toContain('Last name: Turing')
    expect(text).toContain('server: true')
  })
}
