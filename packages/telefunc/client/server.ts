import { assertUsage } from '../utils/assert.js'
assertUsage(false, "`import { something } from 'telefunc'` is forbidden in the browser")
