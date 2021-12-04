<template>
  <div id="view">
    First name: {{ person.firstName }}
    <br />
    Last name: {{ person.lastName }}
    <br />
    Telefunction ran on server: {{ telefunctionWasRunInServer ? 'true' : 'false' }}
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.$store.dispatch('loadData')
  },
  computed: {
    person: function () {
      return this.$store.state.person
    },
    telefunctionWasRunInServer: function () {
      return this.$store.state.telefunctionWasRunInServer
    },
  },
}
</script>
