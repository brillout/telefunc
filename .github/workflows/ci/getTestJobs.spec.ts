import { getTestJobs } from './getTestJobs.mjs'
import { expect, describe, it } from 'vitest'

//*/
// We only use this `getTestJobs()` test for developing the getTestJobs() function. (Because, otherwise, the fixture down below would need to be updated everytime there is a new/(re)moved test file.)
const SKIP = true
/*/
const SKIP = false
//*/

describe('getTestJobs()', () => {
  if (SKIP) {
    const msg = 'SKIPPED getTestJobs() test'
    it(msg, () => {})
    return
  }

  it('basics', () => {
    const jobs = getTestJobs()
    expect(jobs).toMatchInlineSnapshot(`
      [
        {
          "jobCmd": "pnpm run test:units",
          "jobName": "Unit Tests",
          "jobSetups": [
            {
              "node_version": "14",
              "os": "windows-latest",
            },
          ],
          "jobTestFiles": [
            ".github/workflows/ci/getTestJobs.spec.ts",
            "telefunc/node/server/shield/codegen/transformer.spec.ts",
            "telefunc/node/server/shield/shield.spec.ts",
          ],
        },
        {
          "jobCmd": "pnpm run test:types",
          "jobName": "TypeScript",
          "jobSetups": [
            {
              "node_version": "18",
              "os": "ubuntu-latest",
            },
          ],
        },
        {
          "jobCmd": "pnpm run test:e2e",
          "jobName": "E2E Tests",
          "jobSetups": [
            {
              "node_version": "18",
              "os": "ubuntu-latest",
            },
          ],
          "jobTestFiles": [
            "examples/authentication/.dev.test.ts",
            "examples/authentication/.prod.test.ts",
            "examples/babel/.test.ts",
            "examples/cloudflare-workers/.dev.test.ts",
            "examples/cloudflare-workers/.test-miniflare.test.ts",
            "examples/cloudflare-workers/.test-wrangler.test.ts",
            "examples/next/.dev.test.ts",
            "examples/next/.prod.test.ts",
            "examples/nuxt2/.dev.test.ts",
            "examples/nuxt2/.prod.test.ts",
            "examples/prisma/.dev.test.ts",
            "examples/prisma/.prod.test.ts",
            "examples/vike/.dev.test.ts",
            "examples/vike/.prod.test.ts",
            "examples/vite/.dev.test.ts",
            "examples/vite/.preview.test.ts",
          ],
        },
      ]
    `)
  })
})
