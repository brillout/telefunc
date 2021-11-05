import { getTodoItems } from '../../todoItems.telefunc'

export { onBeforeRender }

async function onBeforeRender() {
  const todoItemsInitial = await getTodoItems()
  const pageProps = { todoItemsInitial }
  return {
    pageContext: {
      pageProps,
    },
  }
}
