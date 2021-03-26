<template class="container main">

  <div class="container registrationForm">
    <header class="head">
      <h1>Register</h1>
      <p>Please fill in the below form to create an account</p>
      <hr>
    </header>

    <input v-model="username" placeholder="Username" required>
    <input v-model="firstname" placeholder="First Name" required>
    <input v-model="lastname" placeholder="Last Name" required>
    <input v-model="email" placeholder="TCD Email" required>
    <input v-model="repeatemail" placeholder="Confirm Email" required>
    <input v-model="password" placeholder="Password" required>
    <input v-model="repeatpassword" placeholder="Confirm Password" required>

    <button
        class="btn-reg"
        v-on:click="onClick(username, firstname, lastname, email, password)">
      Register
    </button>

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

    <div class="container SignIn">
      <p>Already have an account? <a href="#">Sign in</a></p>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import AccountCreatedModal from './accountCreatedModal.vue';
import SystemErrorModal from './systemErrorModal.vue';
import TakenModal from './takenModal.vue';
import MissingModal from './missingModal.vue';
import InputErrorModal from './inputErrorModal.vue';

export default {
  components: {
    AccountCreatedModal,
    SystemErrorModal,
    TakenModal,
    MissingModal,
    InputErrorModal,
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
    async onClick(username, firstname, lastname, email, password) {
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

        console.log(res.data);

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