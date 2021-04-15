<template>
  <div class="box loginForm">

    <h2>Login</h2>
    <div class="section">

      <Form @submit="login" :validation-schema="formSchema">
        <div class="inputbox">
          <Field name="username" required/>
          <label>Username</label>
          <ErrorMessage class="vee-error" name="username"/>
        </div>

        <div class="inputbox">
          <Field name="password" required type="password"/>
          <label>Password</label>
          <ErrorMessage class="vee-error" name="password"/>
        </div>

        <button>
          <div class="button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </div>
        </button>

      </Form>
    </div>

    <div class="section">
      <a v-on:click="registrationPage()" href="#" onclick="return false;">
        <div class="buttonnoanim">register</div>
      </a>

      <a v-on:click="forgotPassword()" href="#" onclick="return false;">
        <div class="buttonnoanim">forgot password</div>
      </a>
    </div>

  </div>

  <Modal v-show="isInvalid" @close="closeModal" title="Incorrect Password"
         body="The password you entered is not correct!"/>
  <Modal v-show="nonExistentUser" @close="closeModal" title="Non Existent User"
         body="A user with that username does not exist!"/>
  <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue"
         body="Unfortunately we are experiencing some issues. Please try again later!"/>
  <Modal v-show="isLoginSuccessful" @close="closeModal" title="Login Successful"
         body="You logged in successfully!"/>
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

    async login({username, password}) {
      try {
        const response = await axios.post('https://iam.netsoc.ie/v1/users/' + username + '/login', {"password": password})
        await this.$router.push({name: 'Account', params: {jwt: response.data.token}});

      } catch (err) {
        if (err.response.status === 404) this.nonExistentUser = true;
        else if (err.response.status === 401) this.isInvalid = true;
        else this.isServerIssue = true;
      }
    },

    registrationPage() {
      this.$router.push({name: 'Registration'});
    },

    forgotPassword() {
      this.$router.push({name: 'Forgot'});
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