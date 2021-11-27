<template>
  <div id="view">
    First name: {{ person.firstName }}
    <br />
    Last name: {{ person.lastName }}
    <br />
    server: {{ telefunctionWasRunInServer ? 'true' : 'false' }}
  </div>
</template>

<script>
// I'd like to see how vue devs would refactor this, as I am a React dev

export default {
  mounted: function () {
    this.$store.dispatch('person')
    this.$store.dispatch('telefunctionWasRunInServer')
  },
  computed: {
    person: function () {
      return { firstName: this.$store.state.firstName, lastName: this.$store.state.lastName }
    },
    telefunctionWasRunInServer: function () {
      return this.$store.state.telefunctionWasRunInServer
    },
  },
}
</script>
