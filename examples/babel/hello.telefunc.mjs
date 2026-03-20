export { hello }

import { shield } from 'telefunc'
const t = shield.type

const hello = shield(
  async function ({ name }) {
    const message = `Welcome ${name}`
    return { message }
  },
  [{ name: t.string }],
)
