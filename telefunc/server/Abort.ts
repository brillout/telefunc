export { Abort }
export { isAbort }

import { assertUsage, objectAssign } from './utils'
const isAbortSymbol = Symbol('isAbortSymbol')

function isAbort(thing: unknown): thing is ReturnType<typeof Abort> {
  return typeof thing === 'object' && thing !== null && isAbortSymbol in thing
}

function Abort(value?: unknown) {
  {
    // @ts-ignore
    const that: unknown = this
    assertUsage(
      !(typeof that === 'object' && that?.constructor === Abort),
      'Superfluous `new` operator: use `throw Abort()` instead of `throw new Abort()`.',
    )
  }
  assertUsage(
    arguments.length <= 1,
    'Abort() accepts only a single argument: use `throw Abort([arg1, arg2])` instead of `throw Abort(arg1, arg2).`',
  )

  const abortError = new Error('Abort')
  objectAssign(abortError, {
    isAbort: true as const,
    value,
    [isAbortSymbol]: true as const,
  })

  return abortError
}
