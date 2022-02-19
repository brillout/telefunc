import { shield } from 'telefunc'
import prisma from './client'

const t = shield.type

export { onNewTodo }

shield(onNewTodo, [{ title: t.string, content: t.string }])
async function onNewTodo({ title, content }: { title: string; content: string }) {
  await prisma.todo.create({
    data: {
      title,
      content,
      completed: false,
    },
  })
}
