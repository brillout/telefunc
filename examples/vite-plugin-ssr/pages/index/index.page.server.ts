import { Todo } from '../../db/Todo'
import { getUser } from '../../telefunc/utils'

export { onBeforeRender }
export type PageProps = PromiseType<ReturnType<typeof onBeforeRender>>['pageContext']['pageProps']

async function onBeforeRender() {
  const { todoItemsInitial, user } = await getInitialData()
  const pageProps = { todoItemsInitial, user }
  return {
    pageContext: {
      pageProps,
    },
  }
}

// This is *not* a telefunction. We don't need a telefunction here since `.page.server.js` files are always called in Node.js
// Note that we can still use our utility function `getUser()` (Telefunc's `getContext()` also works outside of Telefunctions.)
async function getInitialData() {
  const user = getUser()
  const todoItemsInitial = Todo.getAll(user.id)
  return { todoItemsInitial, user }
}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T
