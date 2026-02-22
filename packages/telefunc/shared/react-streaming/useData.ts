export { useData }

import { useAsync } from 'react-streaming'
import { assertUsage } from '../../utils/assert.js'
import { isCallable } from '../../utils/isCallable.js'

function useData<Telefunction extends (...args: any[]) => any>(
  telefunction: Telefunction,
  ...args: Parameters<Telefunction>
): Awaited<ReturnType<Telefunction>> {
  assertUsage(isCallable(telefunction), '`useData(fn)`: argument `fn` should be a function')
  const telefunctionKey = (telefunction as any)._key as string
  const fnName = telefunction.name
  assertUsage(
    telefunctionKey,
    `The function \`${fnName || 'fn'}\` passed to \`useData(${fnName ? '' : 'fn'})\` isn't a telefunction`,
  )
  const asyncFn: () => ReturnType<Telefunction> = () => {
    return telefunction(...args)
  }
  const key = [telefunctionKey, ...args]
  const result = useAsync(key, asyncFn)
  return result
}
