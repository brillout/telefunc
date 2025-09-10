import { testRun } from '../cloudflare-workers/.testRun'

// Reuse the test runner from the cloudflare-workers example
// since both examples test similar Cloudflare Workers functionality
testRun('npm run dev')
