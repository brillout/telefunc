import { loadData } from './TodoList.telefunc.js'
import { provideContext } from 'telefunc'

export { onBeforeRender }

async function onBeforeRender(pageContext) {
  provideContext({ user: pageContext.user })
  const { user, todoItems } = await loadData()
  return {
    pageContext: {
      pageProps: {
        user,
        todoItemsInitial: todoItems,
      },
    },
  }
}
