import { page, run, urlBase, autoRetry } from '../../libframe/test/setup'

export { runTest }

function runTest(cmd: 'npm run dev' | 'npm run prod') {
  run(cmd)

  test('remote shell with telefunc', async () => {
    if (isWindows()) {
      // Running Node.js' exec in windows hangs the GitHub action
      return
    }
    page.goto(`${urlBase}/`)
    expect(await page.textContent('body')).not.toContain('node_modules')
    await page.click('button#cmd-ls')
    // `autoRetry` to ensure JavaScript has loaded & executed
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('node_modules')
    })
  })
}

function isWindows() {
  return process.platform === 'win32'
}
