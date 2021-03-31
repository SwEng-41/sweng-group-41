<template>
  <div id="nav">
      <router-link :to="{ name: 'Login' }">Login</router-link> |
      <router-link :to="{ name: 'Registration' }">Registration</router-link>
  </div>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>