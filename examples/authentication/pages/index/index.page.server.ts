export { onBeforeRender }
export type PageProps = Awaited<ReturnType<typeof onBeforeRender>>['pageContext']['pageProps']

import { TodoModel, UserModel, User } from '#app/db'

// Note that we do not use a telefunction to retrieve data. With vite-plugin-ssr we don't
// need telefunction for data queries, and we use telefunctions only for mutation data.

async function onBeforeRender({ user }: { user: User }) {
  return {
    pageContext: {
      pageProps: (() => {
        if (!user) {
          const userListInitial = UserModel.getAll()
          return { userListInitial, notLoggedIn: true as const }
        }
        const todoItemsInitial = TodoModel.getAll(user.id)
        return { todoItemsInitial, user }
      })(),
    },
  }
}
