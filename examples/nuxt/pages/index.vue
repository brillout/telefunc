<template>
  <div id="view">
    First name: {{ firstName }}
    <br />
    Last name: {{ lastName }}
    <br />
    server: {{ isServer ? 'true' : 'false' }}
  </div>
</template>

<script>
// I'd like to see how vue devs would refactor this, as I am a React dev

export default {
  mounted: function () {
    this.$store.dispatch('fetch')
  },
  computed: {
    firstName: function () {
      return this.$store.state.firstName
    },
    lastName: function () {
      return this.$store.state.lastName
    },
    isServer: function () {
      return this.$store.state.isServer
    },
  },
}
</script>
