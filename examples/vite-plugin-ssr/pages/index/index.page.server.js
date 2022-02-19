import { loadData } from './TodoList.telefunc.js'
import { provideTelefuncContext } from 'telefunc'

export { onBeforeRender }

async function onBeforeRender(pageContext) {
  provideTelefuncContext({ user: pageContext.user })
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
