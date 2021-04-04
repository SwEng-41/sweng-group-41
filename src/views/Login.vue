<template>

<html>
  <body>

  <div class="box">

    <h2>NetSoc Login</h2>

    <div class="section">

      <div class="inputbox">
        <input type="text" id="username" name="" required="">
        <label>Username</label>
      </div>

      <div class="inputbox">
        <input type="text" id="password" name="" required="">
        <label>Password</label>
      </div>

      <a v-on:click="login()" href="#" onclick="return false;">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          login
        </div>

      </a>

    </div>

    <div class="section">


      <a v-on:click="registrationPage()" href="#" onclick="return false;">

        <div class="buttonnoanim">
          register
        </div>

      </a>

      <a v-on:click="forgotPassword()" href="#" onclick="return false;">

        <div class="buttonnoanim">
          forgot password
        </div>

      </a>

    </div>

  </div>

  <Modal v-show="isInvalid" @close="closeModal" title="Incorrect Password" body="The password you entered is not correct!"/>
  <Modal v-show="nonExistentUser" @close="closeModal" title="Non Existent User" body="A user with that username does not exist!"/>
  <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue" body="Unfortunately we are experiencing some issues. Please try again later!"/>
  <Modal v-show="isLoginSuccessful" @close="closeModal" title="Login Successful" body="You logged in successfully!"/>

  </body>
</html>
<!--
  <div id="login" class="container loginForm">

    <header class="head">
      <h1>Login</h1>
    </header>

    <Form @submit="loginSubmit" :validation-schema="formSchema">
      <Field name="username" placeholder="Username"/>
      <ErrorMessage name="username"/>

      <br/>
      <br/>

      <Field name="password" placeholder="Password" type="password"/>
      <ErrorMessage name="password"/>

      <br/>
      <br/>

      <button class="btn-reg">Login</button>

    </Form>

    <button class="btn-reg" v-on:click="registerPage">Register</button>
      <br/>

    <div class="container ForgotPassword">
      <router-link to="forgot">Forgot password?</router-link>
    </div>

    <Modal v-show="isInvalid" @close="closeModal" title="Incorrect Password"
           body="The password you entered is not correct!"/>
    <Modal v-show="nonExistentUser" @close="closeModal" title="Non Existent User"
           body="A user with that username does not exist!"/>
    <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue"
           body="Unfortunately we are experiencing some issues. Please try again later!"/>
    <Modal v-show="isLoginSuccessful" @close="closeModal" title="Login Successful" body="You logged in successfully!"/>

  </div>
  -->
</template>

<script>
import axios from "axios";
import Modal from '@/components/Modal'
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Modal,/*
    Field,
    Form,
    ErrorMessage,*/
  },

  name: "Login",

  data() {
    return {
      isLoginSuccessful: false,
      forgotUsername: "",
      requestSuccessful: false,
      isInvalid: false,
      isServerIssue: false,
      nonExistentUser: false
    };
  },

  methods: {

    login() {

      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      axios.post('https://iam.netsoc.ie/v1/users/' + username + '/login', {"password": password})
      .then(response => {
        console.log("Successful Login!");
        this.$router.push({ name: 'Account', params: { jwt : response.data.token } });
      }).catch(error => {
        if (error.response.status === 404) this.nonExistentUser = true;
        else if (error.response.status === 401) this.isInvalid = true;
        else this.isServerIssue = true;
      });

    },

    registrationPage(){
      this.$router.push({ name: 'Registration'});
    },

    forgotPassword() {
      this.$router.push({ name: 'Forgot'});
    },

    closeModal() {
      this.isLoginSuccessful = false;
      this.isServerIssue = false;
      this.isInvalid = false;
      this.nonExistentUser = false;

    },

  },
};
</script>

<style scoped>


.box {
  display: flex;
  flex-direction: column;
}

.section {
  display: inline-flex;
  flex-direction: column;
  
}

.inputbox {
  margin: 10px;
}

.box .inputbox input {
  width: 100%;
}

.button {
  margin: 5px;
  text-align: center;
}

.buttonnoanim {
  margin: 5px;
  text-align: center;
}

</style>