import { page, urlBase, autoRetry, run } from '../../libframe/test/setup'
import { SERVER_IS_READY } from './SERVER_IS_READY'

export { runTest }

function runTest(cmd: 'npm run dev' | 'npm run prod') {
  const additionalTimeout = 10 * 1000
  const serverIsReadyDelay = 3 * 1000
  run(cmd, { serverIsReadyMessage: SERVER_IS_READY, serverIsReadyDelay, additionalTimeout })

  test('telefunction call', async () => {
    await page.goto(`${urlBase}/`)

    let text: string
    // `autoRetry` to ensure JavaScript has loaded & executed
    await autoRetry(async () => {
      text = await page.textContent('#view')
      expect(text).toContain('First name: Alan')
    })
    expect(text).toContain('Telefunction ran on the server-side: true')
    expect(text).toContain('Last name: Turing')
  })
}
