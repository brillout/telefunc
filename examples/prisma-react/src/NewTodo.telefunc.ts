import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { addTodo, getTodos, toggleTodo, deleteTodo }

async function getTodos() {
  const todos = await prisma.todo.findMany()
  return todos
}

async function addTodo({ title, content }: { title: string; content: string }) {
  await prisma.todo.create({
    data: {
      title,
      content,
      completed: false,
    },
  })
}

async function toggleTodo(id: number) {
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

async function deleteTodo(id: number) {
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
