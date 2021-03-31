<template class="container main">

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
      <p>Already have an account? <a href="#">Sign in</a></p>
    </div>

    <AccountCreatedModal
        v-show="isAccountCreated"
        @close="closeModal"
    />
    <SystemErrorModal
        v-show="isServerIssue"
        @close="closeModal"
    />
    <TakenModal
        v-show="isTaken"
        @close="closeModal"
    />
    <InputErrorModal
        v-show="isInvalid"
        @close="closeModal"
    />
    <MissingModal
        v-show="isMissing"
        @close="closeModal"
    />
  </div>

</template>

<script>
import axios from 'axios';
import AccountCreatedModal from './accountCreatedModal.vue';
import SystemErrorModal from './systemErrorModal.vue';
import TakenModal from './takenModal.vue';
import MissingModal from './missingModal.vue';
import InputErrorModal from './inputErrorModal.vue';
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
    AccountCreatedModal,
    SystemErrorModal,
    TakenModal,
    MissingModal,
    InputErrorModal,
    Field,
    Form,
    ErrorMessage,
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
    async regSubmit({username, firstname, lastname, email, password}) {
      try {
        const res = await axios.post('https://iam.netsoc.ie/v1/users',
            {
              "username": username,
              "email": email,
              "password": password,
              "first_name": firstname,
              "last_name": lastname
            }).catch(err => {
          if (err.response.status === 409)
                this.isTaken = true;
              else if (err.response.status === 400)
                this.isMissing = true;
              else if (err.response.status === 401 || err.response.status === 403)
                this.isInvalid = true;
              else
                this.isServerIssue = true;
            }
        );

        if (res.status === 201)
          this.isAccountCreated = true;

      } catch (e) {
        console.log(e);
      }
    },
    closeModal() {
      this.isAccountCreated = false;
      this.isTaken = false;
      this.isServerIssue = false;
      this.isInvalid = false;
      this.isMissing = false;
    },
  }
};

</script>