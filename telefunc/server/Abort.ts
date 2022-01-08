import { assertUsage } from './utils'

export { Abort }

function Abort(this: void, ...args: never[]) {
  assertUsage(
    this === undefined,
    'Using superflous `new` operator: use `throw Abort()` instead of `throw new Abort()`.',
  )
  assertUsage(args.length === 0, "Abort() doesn't accept any argument. Consider returning a JavaScript value instead, see https://telefunc.com/permissions")
  return new Error('Abort')
}
