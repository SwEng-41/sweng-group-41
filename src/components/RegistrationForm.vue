<template class="container main">
  <!-- MAIN START -->

  <div class="container registrationForm">
    <!-- HEAD -->
    <header class="head">
      <h1>Register</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />
    </header>
    <!-- HEAD END -->

    <!-- INPUT BOXES -->
    <input v-model="username" placeholder="username" required />
    <input v-model="firstname" placeholder="firstname" required />
    <input v-model="lastname" placeholder="lastname" required />
    <input v-model="email" placeholder="email" required />
    <input v-model="repeatemail" placeholder="repeat email" required />
    <input v-model="password" placeholder="password" required />
    <input v-model="repeatpassword" placeholder="repeat password" required />
    <!-- INPUT BOXES END -->

    <!-- BUTTON -->
    <button
      v-on:click="onClick(username, firstname, lastname, email, password)"
    >
      Register
    </button>
    <!-- BUTTON END -->

  <!-- MODAL DIALOG -->
  <transition name="slide">
    <div class="modal" v-if="showSuccess">
      <h3>Your Account has been created! Please Check your email!</h3>
      <a href="#" @click="showSuccess = false">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Close
      </a>
    </div>
  </transition>

  <transition name="slide">
    <div class="modal" v-if="showError">
      <h3>An Error has Occured</h3>
      <a href="#" @click="showSuccess = false">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Close
      </a>
    </div>
  </transition>
  <!-- MODAL DIALOG END -->

    <!-- SIGN IN -->
    <div class="container SignIn">
      <p>Already have an account? <a href="#">Sign in</a></p>
    </div>
    <!-- SIGN IN END -->

  </div>



  <!--
    <div id="Logo">
        <img src="../assets/logo.png" alt="Logo Image" height=200px width=200px>
    </div>
    -->

  <!-- MAIN END -->
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      showSuccess: false,
    };
  },
  methods: {
    async onClick(username, firstname, lastname, email, password) {
      try {
        const res = await axios.post("https://iam.netsoc.ie/v1/users", {
          username: username,
          email: email,
          password: password,
          first_name: firstname,
          last_name: lastname,
        });

        console.log(res);

        if (res.status == 201) this.showSuccess = true;
        else this.showError = true;

      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
*,
template,
html,
body {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
}
/*
    #Logo {
        display: inline;
    }
    */
.registrationForm {
  outline: none;
  display: inline;
  float: right;
  border-style: solid;
  padding: 100px;
  margin: 100px;
  margin-top: 0px;
  height: 100%;
}

input {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input:focus {
  background-color: #ddd;
  outline-color: goldenrod;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #ddd;
  margin-bottom: 25px;
}

button {
  background-color: goldenrod;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.8;
}

button:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
  text-decoration: none;
}

.SignIn {
  text-align: center;
}

.slide-leave-active {
 transition: transform 1s;
}
.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}

.modal{
    position: fixed;
    top: 50%;
    left: 150%;
    transform: translate(-50%, -50%);
    z-index: 150;
    height: 50%;
    opacity: 100%;

    width: 70%;
    max-width: 400px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    padding: 25px;
  }

</style>
