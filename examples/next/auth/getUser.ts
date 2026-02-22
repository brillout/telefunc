export { getUser }
export type { User }

type User = {
  id: number
  name: string
}

function getUser(): User {
  // Fake implementation. A real implementation would, for example, use cookies() from next/headers to retrieve the logged-in user.
  return {
    id: 0,
    name: 'Elisabeth',
  }
}
