import { shield } from 'telefunc'
import prisma from './client'

const t = shield.type

export { onGetTodos, onToggleTodo, onDeleteTodo }

async function onGetTodos() {
  const todos = await prisma.todo.findMany()
  return todos
}

shield(onToggleTodo, [t.number])
async function onToggleTodo(id: number) {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })
  if (!todo) {
    throw new Error('Todo not found')
  }
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !todo.completed,
    },
  })
}

shield(onDeleteTodo, [t.number])
async function onDeleteTodo(id: number) {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })
  if (!todo) {
    throw new Error('Todo not found')
  }
  await prisma.todo.delete({
    where: {
      id,
    },
  })
}
