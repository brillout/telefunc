export { getUser }
export type { User }

type User = {
  id: number
  name: string
}

function getUser(_req: unknown): User {
  // Fake implementation. A real implementation would, for example, use `req.headers.cookie` to retrieve the logged-in user.
  return {
    id: 0,
    name: 'Elisabeth'
  }
}
