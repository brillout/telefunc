<template>
  <div>
    First name: {{ person.firstName }}
    <br />
    Last name: {{ person.lastName }}
    <br />
    <NuxtLink to="/">Home</NuxtLink>
  </div>
</template>

<script>
import { getPerson } from '../person.telefunc'

export default {
  async asyncData() {
    const person = await getPerson(0)
    return { person }
  },
}
</script>
