<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      &nbsp;|&nbsp;
      <router-link to="/statistics">Statistics</router-link>
    </nav>
    <router-view :changes.sync="changes" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['changes', 'fields'])
  },
  mounted () {
    for (let i = 0; i <= this.fields.length; i++) {
      this.changes.push([]);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
