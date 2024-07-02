export default Page
export { getServerSideProps }

import { GetServerSideProps } from 'next'
import React from 'react'
import { type User, getUser } from '../auth/getUser'
import { TodoList } from '../components/TodoList'
import { Todo, type TodoItem } from '../database/Todo'

type Props = {
  user: User
  todoItemsInitial: TodoItem[]
}

function Page(props: Props) {
  const title = `${props.user.name}'s to-do list`
  return (
    <>
      <h1>{title}</h1>
      <TodoList todoItemsInitial={props.todoItemsInitial} />
    </>
  )
}

const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const user = getUser(context.req)
  const todoItems = Todo.findMany({ authorId: user.id })
  return {
    props: {
      user,
      todoItemsInitial: todoItems,
    },
  }
}
