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
  const myTelefunctionShield = t.tuple([
    { a: t.number },
    t.or(t.string, t.number, t.null, {
      b: t.number,
      arr: t.tuple([t.number, t.undefined, t.or(t.value(1), t.value(true))]),
    }),
    t.optional(t.array(t.number)),
  ])
  console.log(shieldToHumandReadable(myTelefunctionShield))
}
