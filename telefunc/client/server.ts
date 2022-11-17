import { assertUsage } from './utils'
assertUsage(false, "`import { something } from 'telefunc'` is forbidden in the browser")
