import { page, urlBase, autoRetry, run } from '../../libframe/test/setup'
import { SERVER_IS_READY } from './SERVER_IS_READY'

export { runTest }

function runTest(cmd: 'npm run dev' | 'npm run prod') {
  const serverIsReadyDelay = 30 * 1000
  const additionalTimeout = serverIsReadyDelay
  run(cmd, { serverIsReadyMessage: SERVER_IS_READY, serverIsReadyDelay, additionalTimeout })

  test('telefunction call', async () => {
    await page.goto(`${urlBase}/`)

    let text: string
    // `autoRetry` to ensure JavaScript has loaded & executed
    await autoRetry(async () => {
      text = await page.textContent('#view')
      expect(text).toContain('First name: Alan')
      expect(text).toContain('server: true')
    })
    expect(text).toContain('Last name: Turing')
  })
}
