export { onNewTodo }

import { shield } from 'telefunc'
import prisma from './client'

const t = shield.type

const onNewTodo = shield([{ title: t.string, content: t.string }], async ({ title, content }) => {
  await prisma.todo.create({
    data: {
      title,
      content,
      completed: false
    }
  })
})
