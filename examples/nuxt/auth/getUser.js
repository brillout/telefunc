import { getContext, Abort } from 'telefunc'

export { getUser }
export { getUserOrNull }

// We use `getUser()` if the user is expected to be logged-in.
// For example for an admin page.
//
// We use `getUserOrNull()` if it is expected that the user may not be logged in.
// For example for a header component <UserInfoSnippet /> showing the user whether she is logged-in and her username.

function getUser() {
  const user = getUserOrNull()
  if (user === null) {
    throw Abort({ userNotLoggedIn: true })
  }
  return user
}

function getUserOrNull() {
  const { req } = getContext()
  const user = retrieveUserFromReq(req)
  return user
}

// Fake implementation; a real implementation would, for example, use
// `req.headers.cookie` to retrieve the logged-in user.
function retrieveUserFromReq(req) {
  if (!req?.headers) {
    throw new Error('Something went wrong; `req` should be the HTTP request')
  }
  const notLoggedIn = false
  if (notLoggedIn) {
    return null
  }
  const user = {
    id: 0,
    name: 'Elisabeth',
  }
  return user
}
