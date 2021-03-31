<template>
  <div class="container ForgotPasswordForm">
    <header class="head">
      <h1>Forgot Password</h1>
    </header>

    <Form @submit="forgotSubmit" :validation-schema="formSchema">
      <Field name="username" placeholder="Username" />
      <ErrorMessage name="username" />

      <br />
      <br />

      <button class="btn-reg">Reset Passsword</button>
    </Form>

    <ResetSuccessfulModal v-show="isResetSuccessful" @close="closeModal" />

    <SystemErrorModal v-show="isServerIssue" @close="closeModal" />

    <InputErrorModal v-show="isInvalid" @close="closeModal" />

  </div>
</template>

<script>
import axios from "axios";
import SystemErrorModal from "../components/systemErrorModal.vue";
import ResetSuccessfulModal from "../components/resetSuccessfulModal.vue";
import InputErrorModal from "../components/inputErrorModal.vue";
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    ResetSuccessfulModal,
    SystemErrorModal,
    InputErrorModal,
    Field,
    Form,
    ErrorMessage,
  },

  setup() {
    const formSchema = yup.object({
      username: yup.string().required().label("Username"),
    });
    return {
      formSchema: formSchema,
    };
  },

  name: "Forgot",
  data() {
    return {
      isResetSuccessful: false,
      isServerIssue: false,
      isInvalid: false,
    };
  },
  methods: {
    async forgotSubmit({ username }) {
      try {
        const res = await axios
          .put(
            "https://iam.netsoc.ie/v1/users/" +
              username
            + "/login",
            {},
            { headers: { Accept: "text/html" } }
          );
          this.isResetSuccessful = true;
        console.log("Reset Request Sent!", res)
          } catch(err) {
             if (err.response.status === 401 || err.response.status === 404)
              this.isInvalid = true;
            else this.isServerIssue = true;
          }

        
    },
        closeModal() {
      this. isResetSuccessful = false;
      this.isServerIssue = false;
      this.isInvalid = false;
    },
  },
};
</script>

<style>
</style>