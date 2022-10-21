export default Page
export { getServerSideProps }

import { getUser, type User } from '../auth/getUser'
import { TodoList } from '../components/TodoList'
import { Todo, type TodoItem } from '../database/Todo'
import React from 'react'
import { GetServerSideProps } from 'next'

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
      todoItemsInitial: todoItems
    }
  }
}
