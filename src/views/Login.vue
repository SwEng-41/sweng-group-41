<template>
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
</template>

<script>
import axios from "axios";
import Modal from '@/components/Modal'
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Modal,
    Field,
    Form,
    ErrorMessage,
  },

  setup() {

    const formSchema = yup.object({
      username: yup.string().required().label("Username"),
      password: yup.string().required().min(8).label("Password"),
    });
    return {
      formSchema: formSchema,
    };
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
    async loginSubmit({username, password}) {
      try {
        const res = await axios.post("https://iam.netsoc.ie/v1/users/" + username + "/login", {"password": password});

        this.isLoginSuccessful = true;
        console.log("Successful Login!", res);
        this.$router.push({ name: 'Account', params: { jwt : res.data.token } });
        
      } catch (err) {
        if (err.response.status === 404) this.nonExistentUser = true;
        else if (err.response.status === 401) this.isInvalid = true;
        else this.isServerIssue = true;
      }
    },

    registerPage(){
      this.$router.push({ name: 'Registration'});
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
</style>