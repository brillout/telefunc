export { hello }

async function hello({ name }) {
  const message = 'Welcome ' + name
  return { message }
}
