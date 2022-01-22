<template>
  <div>
    <h1>{{ userName }}'s to-do list</h1>
    <ul>
      <li v-for="item in todoItems">{{ item.text }}</li>
      <li>
        <form v-on:submit.prevent="onSubmit">
          <input type="text" v-model="text" />
          <button type="submit">Add to-do</button>
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTodoListData, onNewTodo } from './TodoList.telefunc.js'
export default {
  data: () => ({
    todoItems: [],
    text: '',
    userName: '',
  }),
  methods: {
    async onSubmit(ev) {
      const { text } = this
      this.text = ''
      const { todoItems } = await onNewTodo({ text })
      this.todoItems = todoItems
    },
  },
  async fetch() {
    const { todoItems, userName } = await getTodoListData()
    this.todoItems.push(...todoItems)
    this.userName = userName
  },
}
</script>
