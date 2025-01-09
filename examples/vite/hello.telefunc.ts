export const hello = async ({ name }: { name: string }) => {
  const message = 'Welcome ' + name
  return { message }
}
