<template>
  <form>
    <h3>Forgot Password</h3>

    <div>
      <label> Username </label>
      <input type="username" placeholder="Username" v-model="username"/>
      <br />
      <br />
      <button v-on:click="createPut">Reset Passsword</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Forgot",
   data() {
    return {
      username: ""
    };
   },
  methods: {
    async createPut() {
      const res = await axios.put("https://iam.netsoc.ie/v1/users/" + this.username + "/login")
      alert(res.data.token);
    },
  },
};
</script>

<style>
</style>