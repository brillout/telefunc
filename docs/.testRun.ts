export { testRun }

import { page, test, expect, run, fetchHtml, partRegex, urlBase } from '@brillout/test-e2e'

function testRun(cmd: 'pnpm run dev' | 'pnpm run preview') {
  {
    // Preview => `npm run preview` takes a long time
    // Dev => `Learn more collapsible` takes a long time
    const additionalTimeout = 120 * 1000
    run(cmd, { additionalTimeout })
  }

  const isPreview = cmd === 'pnpm run preview'

  test('page content is rendered to HTML', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<meta name="description" content="Remote Functions. Instead of API." />')
    expect(html).toMatch(partRegex`<h2>${/[^\/]+/}Simple</h2>`)
    expect(html).toMatch(partRegex`<h2>${/[^\/]+/}Rock-solid</h2>`)
    expect(html).toContain('no known bug')
  })

  if (isPreview) {
    test('Layout', async () => {
      await page.goto(urlBase + '/')
      const layout = await page.evaluate(() => {
        return {
          html: getWidths(document.documentElement),
          body: getWidths(document.body),
          page: getWidths(document.querySelector('#page-view')),
          left: getWidths(document.querySelector('#navigation-wrapper')),
          right: getWidths(document.querySelector('#page-wrapper'))
        }
        function getWidths(elem: Element | null): Widths {
          if (!elem) throw new Error('Elem missing')
          return {
            clientWidth: elem.clientWidth,
            scrollWidth: elem.scrollWidth
          }
        }
      })

      // Default viewport size: 1280x720
      //  - https://playwright.dev/docs/api/class-testoptions#test-options-viewport
      testWidth(layout.html, 1280)
      testWidth(layout.body, 1280)
      testWidth(layout.page, 1280)
      testWidth(layout.left, 300)
      testWidth(layout.right, 990)

      return

      type Widths = {
        clientWidth: number
        scrollWidth: number
      }

      function testWidth(widths: Widths, width: number) {
        expect(widths.clientWidth).toBe(width)
        expect(widths.scrollWidth).toBe(width)
      }
    })
  }
}
