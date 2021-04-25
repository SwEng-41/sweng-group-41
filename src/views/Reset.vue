<template>
  <div class="box">
    <h2>Reset Password</h2>

    <Form @submit="resetSubmit" :validation-schema="formSchema">
      
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

    <Modal v-show="isResetSuccessful" @close="closeModal" title="Password Reset"
           body="Your Password has been reset!"/>
    <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue"
           body="Unfortunately we are experiencing some issues. Please try again later!"/>
    <Modal v-show="isInvalid" @close="closeModal" title="Incorrect Password"
           body="The password you entered is not correct!"/>

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
      password: yup.string().required().min(8).label("Password"),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    return {
      formSchema: formSchema,
    };
  },

  name: "Reset",
  data() {
    return {
      isResetSuccessful: false,
      isServerIssue: false,
      isInvalid: false,
    };
  },
  methods: {
    async resetSubmit({password}) {
      try {
        const token = this.$route.query.token;
        const res = await axios
            .put(
                "https://iam.netsoc.ie/v1/users/self/login",
                {"password": password},
                { 
                headers: {
                 Authorization: `Bearer ${token}`,
                 },
        });
        this.isResetSuccessful = true;
        console.log("Reset Request Sent!", res)
        await this.$router.push({name: 'Login'});
      } catch (err) {
        if (err.response.status === 401) this.isInvalid = true;
        else this.isServerIssue = true;
      }
    },
    closeModal() {
      this.isResetSuccessful = false;
      this.isServerIssue = false;
      this.isInvalid = false;
    },
  },
};

</script>