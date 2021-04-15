<template>
  <div class="box">
    <h2>Forgot Password</h2>

    <div class="section">
      <Form @submit="forgotSubmit" :validation-schema="formSchema">
        <div class="inputbox">
          <Field name="username" required/>
          <label>Username</label>
          <ErrorMessage class="vee-error" name="username"/>
        </div>

        <button>
          <div class="button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Reset Password
          </div>
        </button>
      </Form>
    </div>

    <Modal v-show="isResetSuccessful" @close="closeModal" title="Password Reset"
           body="Please check your email to reset your password!"/>
    <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue"
           body="Unfortunately we are experiencing some issues. Please try again later!"/>
    <Modal v-show="isInvalid" @close="closeModal" title="Incorrect Password"
           body="The password you entered is not correct!"/>
    <Modal v-show="nonExistentUser" @close="closeModal" title="Non Existent User"
           body="A user with that username does not exist!"/>

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
      nonExistentUser: false,
    };
  },
  methods: {
    async forgotSubmit({username}) {
      try {
        const res = await axios
            .put(
                "https://iam.netsoc.ie/v1/users/" + username + "/login",
                {},
                {headers: {Accept: "text/html"}}
            );
        this.isResetSuccessful = true;
        console.log("Reset Request Sent!", res)
      } catch (err) {
        if (err.response.status === 404) this.nonExistentUser = true;
        else if (err.response.status === 401) this.isInvalid = true;
        else this.isServerIssue = true;
      }
    },
    closeModal() {
      this.isResetSuccessful = false;
      this.isServerIssue = false;
      this.isInvalid = false;
      this.nonExistentUser = false;
    },
  },
};

</script>