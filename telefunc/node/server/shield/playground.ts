// Run this with `tsm` (https://www.npmjs.com/package/tsm)

import { shield, shieldApply, shieldToHumandReadable } from '../shield'

const t = shield.type

{
  shield(telefunction, [t.string])
  function telefunction(...[]: any) {}
  console.log(shieldApply(telefunction, ['a']))
}

{
  shield(telefunction, [t.string, t.optional(t.number)])
  function telefunction(...[]: any) {}
  console.log(shieldApply(telefunction, ['a', undefined, undefined]))
}

{
  const telefunction = shield([t.string, t.optional(t.number)], (_a, _b) => {})
  console.log(shieldApply(telefunction, ['a', 42, undefined]))
}

{
  const telefunction = shield([{ a: { b: { c: t.const(42) } } }], (_a) => {})
  console.log(shieldApply(telefunction, [{ a: { b: { c: 42 } } }]))
}

{
  const myTelefunctionShield = t.tuple(
    { a: t.number },
    t.or(t.string, t.number, t.const(null), {
      b: t.number,
      arr: t.tuple(t.number, t.const(undefined), t.or(t.const(1), t.const(true)))
    }),
    t.optional(t.array(t.number))
  )
  console.log(shieldToHumandReadable(myTelefunctionShield))
}
