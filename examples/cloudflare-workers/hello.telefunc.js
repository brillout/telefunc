export { hello }

import { shield } from 'telefunc'
const t = shield.type

shield(hello, [{ name: t.string }])
async function hello({ name }) {
  const message = 'Welcome ' + name
  return { message }
}
