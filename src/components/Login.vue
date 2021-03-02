<template>
  <div id="login">
    <h1>Login</h1>
    <div v-if="requestSuccessful">
      Post Request Created
    </div>
    <input type="username" placeholder="Username" v-model="username" />
    <br />
    <br />
    <input type="password" placeholder="Password" v-model="password" />
    <br />
    <br />
    <button v-on:click="createPost">Login</button>
    <p>
      <router-link to="forgot">Forgot password?</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
      requestSuccessful: false,
    };
  },
  methods: {
    createPost() {
        axios
          .post("https://iam.netsoc.ie/v1/users/" + this.username + "/login", {
            password: this.password,
          })
          .then((response) => {
            this.requestSuccessful = true;
            alert(response.data.token);
          });
    },
  },
};
</script>

<style scoped>
</style>