<template class="container main">

  <div class="box registrationForm">
    <h2>Netsoc Registration</h2>

    <div class="section">
      <Form @submit="register" :validation-schema="formSchema">
        <div class="inputbox">
          <Field name="username" required/>
          <label>Username</label>
          <ErrorMessage class="vee-error" name="username"/>
        </div>

        <div class="inputbox">
          <Field name="firstname" required/>
          <label>First Name</label>
          <ErrorMessage class="vee-error" name="firstname"/>
        </div>

        <div class="inputbox">
          <Field name="lastname" required/>
          <label>Last Name</label>
          <ErrorMessage class="vee-error" name="lastname"/>
        </div>

        <div class="inputbox">
          <Field name="email" required/>
          <label>TCD Email</label>
          <ErrorMessage class="vee-error" name="email"/>
        </div>

        <div class="inputbox">
          <Field name="confirmEmail" required/>
          <label>Confirm Email</label>
          <ErrorMessage class="vee-error" name="confirmEmail"/>
        </div>

        <div class="inputbox">
          <Field name="password" required type="password"/>
          <label>Password</label>
          <ErrorMessage class="vee-error" name="password"/>
        </div>

        <div class="inputbox">
          <Field name="confirmPassword" required type="password" ref="password"/>
          <label>Confirm Password</label>
          <ErrorMessage class="vee-error" name="confirmPassword"/>
        </div>

        <br>

        <button>
          <div class="btn-reg button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            register
          </div>
        </button>

      </Form>
    </div>

    <div class="section">
      <h4>Already have an account?</h4>
      <a v-on:click="signIn()" href="#" onclick="return false;">
        <div class="buttonnoanim">
          sign in
        </div>
      </a>
    </div>

  </div>

  <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue"
         body="Unfortunately we are experiencing some issues. Please try again later!"/>
  <Modal v-show="isAccountCreated" @close="closeModal(); signIn();" title="Registration Successful!"
         body="Please verify your email and then log in!"/>
  <Modal v-show="isTaken" @close="closeModal" title="Invalid Details" body="The email or username is already taken!"/>
  <Modal v-show="isInvalid" @close="closeModal" title="Authorisation Error" body="You are not allowed to do that!"/>
  <Modal v-show="isMissing" @close="closeModal" title="Missing Details" body="Some required fields are missing!"/>

</template>

<script>
import axios from 'axios';
import Modal from '@/components/Modal'
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
    Modal,
    Field,
    Form,
    ErrorMessage
  },
  setup() {
    yup.setLocale({
      string: {
        matches: 'Must be a valid @tcd.ie address',
      },
    });

    const formSchema = yup.object({
      username: yup.string().required().label("Username"),
      firstname: yup.string().required().label("First Name"),
      lastname: yup.string().required().label("Last Name"),
      email: yup.string().required().email().matches(".+@tcd.ie$").label("Email"),
      confirmEmail: yup.string().oneOf([yup.ref('email'), null], 'Emails must match'),
      password: yup.string().required().min(8).label("Password"),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    return {
      formSchema: formSchema,
    }
  },

  data() {
    return {
      isAccountCreated: false,
      isServerIssue: false,
      isTaken: false,
      isMissing: false,
      isInvalid: false,
    };
  },

  methods: {
    async register({username, email, password, firstname, lastname}) {
      try {
        await axios.post('https://iam.netsoc.ie/v1/users',
            {
              "username": username,
              "email": email,
              "password": password,
              "first_name": firstname,
              "last_name": lastname
            },
            {
              headers: {
                Accept: "text/html",
              }
            },
        );

        this.isAccountCreated = true;

      } catch (err) {
        if (err.response.status === 409)
          this.isTaken = true;
        else if (err.response.status === 400)
          this.isMissing = true;
        else if (err.response.status === 401 || err.response.status === 403)
          this.isInvalid = true;
        else
          this.isServerIssue = true;
      }
    },
    closeModal() {
      this.isAccountCreated = false;
      this.isTaken = false;
      this.isServerIssue = false;
      this.isInvalid = false;
      this.isMissing = false;
    },
    signIn() {
      this.$router.push({name: 'Login'});
    }
  }
};

</script>
<style scoped>
.box {
  display: flex;
  flex-direction: column;
}

.section {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
