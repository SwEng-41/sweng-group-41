<template>
 <div id="TestButton">
  <input v-model="username" placeholder="username">
  <input v-model="password" placeholder="password">
  <button v-on:click="onClick(username, password)">
   Login
  </button>
 </div>
</template>

<script>
 import axios from 'axios';
 export default {

     methods: {
         async onClick(username, password) {
            const res = await axios.post('https://iam.netsoc.ie/v1/users/' + username + '/login', {"password": password});
            alert(res.data.token);
         }
     }
 };
</script>

<style scoped>
 button {
  outline: none;
  border-style: solid;
 }
</style>