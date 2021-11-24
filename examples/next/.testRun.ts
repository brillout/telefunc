import { page, run, urlBase, autoRetry, isGitHubAction } from '../../libframe/test/setup'

export { testRun }

function testRun(cmd: 'npm run prod' | 'npm run dev') {
  if (cmd === 'npm run prod' && isGitHubAction()) {
    test("SKIPED: Next.js prod build doesn't work in GitHub Actions", () => {})
    return
  }

  run(cmd, {
    serverIsRunningMessage: 'started server on',
    /* Attempt to figure out why Next.js doesn't properly run in GitHub Actions:
    debug: true,
    additionalTimeout: 240 * 1000,
    serverIsRunningDelay: 20 * 1000,
    //*/
  })

  test('telefunction call', async () => {
    await page.goto(`${urlBase}/`)

    const text = await page.textContent('#view')

    expect(text).toContain('First name: Alan')

    expect(text).toContain('Last name: Turing')
    expect(text).toContain('server: true')
  })
}
