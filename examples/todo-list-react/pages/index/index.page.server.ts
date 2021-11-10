import { TodoModel, UserModel } from '#root/db'
import { getUser } from '#root/telefunc/utils'

export { onBeforeRender }
export type PageProps = PromiseType<ReturnType<typeof onBeforeRender>>['pageContext']['pageProps']

async function onBeforeRender() {
  const pageProps = await getInitialData()
  return {
    pageContext: {
      pageProps,
    },
  }
}

// This is *not* a telefunction. We don't need a telefunction here since this `.page.server.js` file is always called in Node.js.
// Note that we can still use our utility function `getUser()` (Telefunc's `getContext()` also works outside of telefunctions.)
async function getInitialData() {
  const user = getUser({ allowAnynomous: true })
  if (!user) {
    const userListInitial = UserModel.getAll()
    return { userListInitial, notLoggedIn: true as const }
  }
  const todoItemsInitial = TodoModel.getAll(user.id)
  return { todoItemsInitial, user }
}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T
