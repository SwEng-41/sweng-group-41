<template>
  <html>
  <body>

  <div class="login-box">
    <h2>Account System </h2>

    <div class="section">

      <div class="user-box">
        <input type="text" id="new_username" name="" required="">
        <label>New Username</label>
      </div>

      <a v-on:click="changeUsername()" href="#" onclick="return false;">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          change username
        </div>

      </a>

    </div>

    <div class="section">

      <div class="user-box">
        <input type="text" id="new_password" name="" required="">
        <label>New Password</label>
      </div>

      <a v-on:click="changePassword()" href="#" onclick="return false;">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          change password
        </div>

      </a>

    </div>

    <div class="section">

      <div class="user-box">
        <input type="text" id="new_email" name="" required="">
        <label>New Email</label>
      </div>

      <a v-on:click="changeEmail()" href="#" onclick="return false;">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          change email
        </div>

      </a>

    </div>

    <div class="section">

      <div class="user-box">
        <input type="text" id="new_first_name" name="" required="">
        <label>First Name</label>
      </div>

      <div class="user-box">
        <input type="text" id="new_last_name" name="" required="">
        <label>Last Name</label>
      </div>

      <a v-on:click="changeName()" href="#" onclick="return false;">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          change name
        </div>

      </a>

    </div>

    <div class="section">

      <a href="">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          delete account
        </div>

      </a>

    </div>

    <div class="section">

      <a href="">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          renew account
        </div>

      </a>

    </div>

  </div>

  </body>
  </html>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Account',

  props: ["jwt"],

  methods: {

    changeUsername() {

      let token = this.jwt;

      let new_username = document.getElementById("new_username").value;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"username": new_username}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changePassword() {

      let token = this.jwt;

      let new_password = document.getElementById("new_password").value;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"password": new_password}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changeEmail() {

      let token = this.jwt;

      let new_email = document.getElementById("new_email").value;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"email": new_email}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changeName() {

      let token = this.jwt;

      let new_first_name = document.getElementById("new_first_name").value;
      let new_last_name = document.getElementById("new_last_name").value;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"first_name": new_first_name, "last_name": new_last_name}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    deleteAccount() {

      let token = this.jwt;

      let username = "JohnSmith69";

      axios.post('https://iam.netsoc.ie/_synapse/admin/v1/deactivate/' + username, {"erase": true}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    },

    renewAccount() {

    }
  }
}
</script>


<style>

a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}

html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.section {
  display: inline-flex;
  justify-content: center;
  padding: 12px 0px 12px 0px;
  border: solid 2px #243b55;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}

.login-box {
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 75%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 0px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.button {
  position: relative;
  padding: 10px;
  color: #05c9d3;
  font-size: 18px;
  font-variant: small-caps;
  text-decoration: none;
  overflow: hidden;
  transition: 0.5s;
  margin: 0px;
}

.button:hover {
  background: #03e9f4;
  color: #fff;
  box-shadow: 0 0 5px #03e9f4,
  0 0 25px #03e9f4,
  0 0 50px #03e9f4,
  0 0 100px #03e9f4;
}

.button span {
  position: absolute;
  display: block;
}

.button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #05c9d3);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

.button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #05c9d3);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
}

.button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #05c9d3);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
}

.button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #05c9d3);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
}
</style>
