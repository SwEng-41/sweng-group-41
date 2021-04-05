<template>
<html>
  <body>

  <div class="box">
    <h2>Registration System</h2>

    <div class="section">

      <div class="inputbox">
        <input type="text" id="username" name="" required="">
        <label>Username</label>
      </div>

      <div class="inputbox">
        <input type="text" id="first_name" name="" required="">
        <label>First Name</label>
      </div>

      <div class="inputbox">
        <input type="text" id="last_name" name="" required="">
        <label>Last Name</label>
      </div>

      <div class="inputbox">
        <input type="text" id="email" name="" required="">
        <label>Email</label>
      </div>

      <div class="inputbox">
        <input type="text" id="confirm_email" name="" required="">
        <label>Confirm Email</label>
      </div>

      <div class="inputbox">
        <input type="password" id="password" name="" required="">
        <label>Password</label>
      </div>

      <div class="inputbox">
        <input type="password" id="confirm_password" name="" required="">
        <label>Confirm Password</label>
      </div>

      <a v-on:click="register()" href="#" onclick="return false;">

        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          register
        </div>

      </a>

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

    <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue" body="Unfortunately we are experiencing some issues. Please try again later!"/>
    <Modal v-show="isAccountCreated" @close="closeModal(); signIn();" title="Registration Successfu!" body="Please verify your email and then log in!"/>
    <Modal v-show="isTaken" @close="closeModal" title="Invalid Details" body="The email or username is already taken!"/>
    <Modal v-show="isInvalid" @close="closeModal" title="Authorisation Error" body="You are not allowed to do that!"/>
    <Modal v-show="isMissing" @close="closeModal" title="Missing Details" body="Some required fields are missing!"/>

  </body>
  </html>
</template>

<!--<template class="container main">

  <div class="container registrationForm">
    <header class="head">
      <h1>Register</h1>
      <p>Please fill in the below form to create an account</p>
      <hr>
    </header>

    <Form @submit="regSubmit" :validation-schema="formSchema">
      <Field name="username" placeholder="Username"/>
      <ErrorMessage name="username"/>

      <Field name="firstname" placeholder="First Name"/>
      <ErrorMessage name="firstname"/>

      <Field name="lastname" placeholder="Last Name"/>
      <ErrorMessage name="lastname"/>

      <Field name="email" placeholder="TCD Email" type="email"/>
      <ErrorMessage name="email"/>

      <Field name="confirmEmail" placeholder="Confirm Email"/>
      <ErrorMessage name="confirmEmail"/>

      <Field name="password" placeholder="Password" type="password"/>
      <ErrorMessage name="password"/>

      <Field name="confirmPassword" placeholder="Confirm Password" type="password" ref="password"/>
      <ErrorMessage name="confirmPassword"/>

      <br>

      <button class="btn-reg">Register</button>
    </Form>

    <div class="container SignIn">
      <p>Already have an account?
        <router-link :to="{ name: 'Login' }">Sign in</router-link>
      </p>
    </div>

  </div>

</template>
-->

<script>
import axios from 'axios';
import Modal from '@/components/Modal'
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
    Modal,
    //Field,
    //Form,
    //ErrorMessage,
  },
/*
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
  */

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
    async register() {
      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let first_name = document.getElementById("first_name").value;
      let last_name = document.getElementById("last_name").value;
      try {
        await axios.post('https://iam.netsoc.ie/v1/users',
            {
              "username": username,
              "email": email,
              "password": password,
              "first_name": first_name,
              "last_name": last_name
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
      this.$router.push({ name: 'Login'});
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

.lastsection {
  display: inline-flex;
  justify-content: center;
  padding: 12px;
  border: solid 2px #243b55;
  border-radius: 15px;
  margin: 8px;
}


</style>
