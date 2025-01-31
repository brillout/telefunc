export { someFunc as hello }

const someFunc = async ({ name }: { name: string }) => {
  const message = 'Welcome ' + name
  return { message }
}
