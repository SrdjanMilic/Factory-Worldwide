<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|
      <router-link to="/statistics">Statistics</router-link>
    </div>
    <router-view :changesA.sync="changesA" :changesB.sync="changesB" :changesC.sync="changesC" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      changesA: [],
      changesB: [],
      changesC: []
    };
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

#nav {
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
