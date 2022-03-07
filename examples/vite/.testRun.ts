import { page, run, urlBase, autoRetry, fetchHtml } from '../../libframe/test/setup'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run prod' | 'npm run start') {
  run(cmd)

  test('Telefunc works', async () => {
    {
      const html = await fetchHtml('/')
      expect(html).toContain('Loading...')
      expect(html).not.toContain('Eva')
    }
    {
      page.goto(`${urlBase}/`)
      // `autoRetry` to ensure that async JavaScript has loaded & executed
      await autoRetry(async () => {
        expect(await page.textContent('body')).toContain('Welcome Eva')
      })
      expect(await page.textContent('body')).not.toContain('Loading')
    }
  })
}
