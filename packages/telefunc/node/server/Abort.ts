export { Abort }
export { isAbort }

import { assert, assertUsage } from '../../utils/assert.js'
import { objectAssign } from '../../utils/objectAssign.js'
const stamp = '__telefunc_isAbort'

function isAbort(thing: unknown): thing is ReturnType<typeof Abort> {
  assert(thing !== Abort) // Caught earlier in `executeTelefunction()`
  return typeof thing === 'object' && thing !== null && stamp in thing
}

function Abort(abortValue?: unknown) {
  {
    // @ts-ignore
    const that: unknown = this
    assertUsage(
      !(typeof that === 'object' && that?.constructor === Abort),
      'Do not use the `new` operator: use `throw Abort()` instead of `throw new Abort()`.',
    )
  }
  assertUsage(
    arguments.length <= 1,
    'Abort() accepts only a single argument: use `throw Abort([arg1, arg2])` instead of `throw Abort(arg1, arg2).`',
  )

  const abortError = new Error('Abort')
  objectAssign(abortError, {
    isAbort: true as const,
    abortValue,
    [stamp]: true as const,
  })

  return abortError
}
