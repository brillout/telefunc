import { getContext } from 'telefunc'

export { msg }

async function msg() {
  const context = getContext()
  console.log(context.headers)
  return {
    he: 42,
  }
}
