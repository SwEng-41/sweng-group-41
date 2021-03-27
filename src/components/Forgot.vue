<template>
    <div class="container ForgotPasswordForm">
    <header class="head">
    <h3>Forgot Password</h3>
    </header>

      <Form @submit="forgotSubmit" :validation-schema="formSchema">
      
      <Field name="username" placeholder="Username"/>
      <ErrorMessage name="username"/>

      <br>

      <button  class="btn-reg">Reset Passsword</button>
      </Form>

      <ResetSuccessfulModal
        v-show="isResetSuccessful"
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

    <MissingModal
        v-show="isMissing"
        @close="closeModal"
    />

    </div>
</template>

<script>
import axios from "axios";
import SystemErrorModal from "./systemErrorModal.vue";
import ResetSuccessfulModal from "./resetSuccessfulModal.vue";
import InputErrorModal from "./inputErrorModal.vue";
import MissingModal from './missingModal.vue';
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    ResetSuccessfulModal,
    SystemErrorModal,
    InputErrorModal,
    MissingModal,
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
      isMissing: false,
    };
  },
  methods: {
    async forgotSubmit({ username }) {
      try {
        const res = await axios
          .put(
            "https://iam.netsoc.ie/v1/users/",
            {
              username: username,
            } + "/login",
            {},
            { headers: { Accept: "text/html" } }
          )
          .catch((err) => {
            if (err.response.status === 409)
             this.isTaken = true;
            else if (err.response.status === 400)
             this.isMissing = true;
            else if (err.response.status === 401 || err.response.status === 404)
              this.isInvalid = true;
            else this.isServerIssue = true;
          });

        if (res.status === 204) this.isResetSuccessful = true;
      } catch (e) {
        console.log(e);
      }
    },
        closeModal() {
      this. isResetSuccessful = false;
      this.isServerIssue = false;
      this.isInvalid = false;
      this.isMissing = false;
    },
  },
};
</script>

<style>
</style>