<template>
  <body>
    <div id="login" class="login-box">     
      <div v-if="requestSuccessful">
        Check your email to reset your password
      </div>
      <h1>Login</h1>
      <form>
        <div class="user-box">
          <input type="username" placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <a href="#" v-on:click="createPost"
          >Login
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>
        <a href="#" @click="showModal = true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Forgot Password?</a
        >
        <transition name="slide">
          <div class="modal" v-if="showModal">
              <h1>Forgot Password</h1>
              <div class="user-box">
                <input
                  type="username"
                  placeholder="Username"
                  v-model="forgotUsername"
                />
              </div>
              <a href="#" v-on:click="createPut" @click="showModal = false">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Reset Passsword
              </a>
            </div>
        </transition>
      </form>
    </div>
  </body>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
   el: '#login',
  data() {
    return {
      username: "",
      password: "",
      forgotUsername: "",
      requestSuccessful: false,
      showModal: false,
    };
  },
  methods: {
    createPost() {
      axios
        .post("https://iam.netsoc.ie/v1/users/" + this.username + "/login", {
          password: "",
        });
    },
    async createPut() {
      axios.put(
        "https://iam.netsoc.ie/v1/users/" + this.forgotUsername + "/login",
        {},
        { headers: { Accept: "text/html" } }
      ).then(()=> {this.requestSuccessful = true;});
    },
  },
};
</script>

<style scoped>
.slide-leave-active {
 transition: transform 1s;
}

.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}
</style>