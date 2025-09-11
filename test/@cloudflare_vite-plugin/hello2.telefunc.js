export { hello2 }

import { shield } from 'telefunc'
const t = shield.type

const hello2 = shield([{ name: t.string }], async function ({ name }) {
  const message = `Welcome ${name}`
  return { message }
})
