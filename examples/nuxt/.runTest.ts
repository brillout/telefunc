import { page, urlBase, autoRetry, run } from '../../libframe/test/setup'

export { runTest }

function runTest(cmd: 'npm run dev' | 'npm run prod') {
  test('SKIPED: Nuxt server logs cannot be listened to', () => {})
  /*
  const additionalTimeout = 120 * 1000
  run(cmd, { serverIsReadyMessage: 'Listening on: http://localhost:3000/', additionalTimeout })

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
  //*/
}
