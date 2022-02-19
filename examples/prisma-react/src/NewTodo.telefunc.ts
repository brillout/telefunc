import { shield } from 'telefunc'
import prisma from './client'

const t = shield.type

export { onNewTodo }

async function onNewTodo({ title, content }: { title: string; content: string }) {
  await prisma.todo.create({
    data: {
      title,
      content,
      completed: false,
    },
  })
}
