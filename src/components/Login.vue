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
      <br/>
      <br/>
      
    </Form>

    <div class="container ForgotPassword">
      <router-link to="forgot">Forgot password?</router-link>
    </div>

    <LoginSuccessfulModal
        v-show="isLoginSuccessful"
        @close="closeModal"
    />
    <SystemErrorModal
        v-show="isServerIssue"
        @close="closeModal"
    />

    <InputErrorModal
        v-show="isInvalid"
        @close="closeModal"
    />

  </div>
</template>

<script>
import axios from "axios";
import LoginSuccessfulModal from './loginSuccessfulModal.vue';
import SystemErrorModal from './systemErrorModal.vue';
import InputErrorModal from "./inputErrorModal.vue";
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    LoginSuccessfulModal,
    SystemErrorModal,
    InputErrorModal,
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
      isServerIssue: false
    };
  },
  methods: {
    async loginSubmit({username, password}) {
      try {
        const res = await axios.post("https://iam.netsoc.ie/v1/users/" + username + "/login", {"password": password});

        this.isLoginSuccessful = true;
        console.log("Successful Login!", res)

      } catch (err) {
        if (err.response.status === 401 || err.response.status === 404)
          this.isInvalid = true;
        else
          this.isServerIssue = true;
      }
    },

    closeModal() {
      this.isLoginSuccessful = false;
      this.isServerIssue = false;
      this.isInvalid = false;
    },

  },
};
</script>

<style scoped>
</style>