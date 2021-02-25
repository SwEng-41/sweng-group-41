<template>
  <div id="app">
   <TestButton></TestButton>
  </div>
</template>

<script>
import TestButton from './components/TestButton.vue'

export default {
  name: 'App',
  components: {
    TestButton
  }
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
