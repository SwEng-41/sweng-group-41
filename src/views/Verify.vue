<template>
  <div class="box">
    <h2>Verify Email</h2>

    <Form @submit="verifySubmit">
      <button>
        <div class="button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Verify
        </div>
      </button>
    </Form>

    <Modal v-show="isVerificationSuccessful" @close="closeModal" title="Verify Email"
           body="Your Email has been Verified"/>
    <Modal v-show="isServerIssue" @close="closeModal" title="Server Issue"
           body="Unfortunately we are experiencing some issues. Please try again later!"/>
    <Modal v-show="isInvalid" @close="closeModal" title="Invalid Credentials"
           body="Information entered is not valid!"/>
    <Modal v-show="nonExistentUser" @close="closeModal" title="Non Existent User"
           body="A user with that username does not exist!"/>

  </div>
</template>

<script>
import axios from "axios";
import Modal from '@/components/Modal'
import {Form} from "vee-validate";

export default {
  components: {
    Modal,
    Form,
  },

  name: "Verify",
  data() {
    return {
      isVerificationSuccessful: false,
      isServerIssue: false,
      isInvalid: false,
      nonExistentUser: false,
    };
  },
  methods: {
    async verifySubmit() {
      try {
        const token = this.$route.query.token;
        const res = await axios
            .patch(
                "https://iam.netsoc.ie/v1/users/self/login",
                {},
                { 
                headers: {
                 Authorization: `Bearer ${token}`,
                 },
        });
        this.isVerificationSuccessful = true;
        console.log("Verification Request Sent!", res)
        await this.$router.push({name: 'Login'});
      } catch (err) {
        if (err.response.status === 401) this.isInvalid = true;
        else if(err.response.status === 404) this.nonExistentUser = true;
        else this.isServerIssue = true;
      }
    },
    closeModal() {
      this.isVerificationSuccessful = false;
      this.isServerIssue = false;
      this.isInvalid = false;
      this.nonExistentUser = false;
    },
  },
};

</script>