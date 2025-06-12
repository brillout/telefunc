import { assertUsage } from './utils.js'
assertUsage(false, "`import { something } from 'telefunc'` is forbidden in the browser")
