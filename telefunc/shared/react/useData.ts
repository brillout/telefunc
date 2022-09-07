export { useData }

import { useAsync } from 'react-streaming'
import { assert } from './utils'

function useData<Telefunction extends (...args: any[]) => any>(
  telefunction: Telefunction,
  ...args: Parameters<Telefunction>
): Awaited<ReturnType<Telefunction>> {
  // @ts-ignore
  const telefunctionKey = telefunction._key as string
  assert(telefunctionKey)
  const asyncFn: () => ReturnType<Telefunction> = () => telefunction(...args)
  const key = [telefunctionKey, ...args]
  const result = useAsync(key, asyncFn)
  return result
}
