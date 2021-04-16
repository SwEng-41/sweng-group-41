<template>
  <div class="box">
    <h2>Account System</h2>

    <div class="section">
      <Form @submit="setNewValues($event, 'isChangeUsername')" :validation-schema="usernameSchema">
        <div class="inputbox">
          <Field name="username" required/>
          <label>New Username</label>
          <ErrorMessage class="vee-error" name="username"/>
        </div>

        <button>
          <div class="buttonnoanim">Change Username</div>
        </button>
      </Form>
    </div>

    <div class="section">
      <Form @submit="setNewValues($event, 'isChangePassword')" :validation-schema="passwordSchema">
        <div class="inputbox">
          <Field name="password" type="password" required/>
          <label>New Password</label>
          <ErrorMessage class="vee-error" name="password"/>
        </div>

        <button>
          <div class="buttonnoanim">Change Password</div>
        </button>
      </Form>
    </div>

    <div class="section">
      <Form @submit="setNewValues($event, 'isChangeEmail')" :validation-schema="emailSchema">
        <div class="inputbox">
          <Field name="email" required/>
          <label>New Email</label>
          <ErrorMessage class="vee-error" name="email"/>
        </div>

        <button>
          <div class="buttonnoanim">Change Email</div>
        </button>
      </Form>
    </div>

    <div class="section">
      <Form @submit="setNewValues($event, 'isChangeName')" :validation-schema="nameSchema">
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

        <button>
          <div class="buttonnoanim">Change Name</div>
        </button>
      </Form>
    </div>

    <div class="lastsection">
      <a v-on:click="isDelete = true;">
        <div class="buttonnoanim">
          delete account
        </div>
      </a>

      <a href="">
        <div @click="renewAccount()" class="buttonnoanim">
          renew account
        </div>
      </a>

    </div>

    <div class="section">
      <a href="">
        <div @click="logout()" class="buttonnoanim">
          Logout
        </div>
      </a>
    </div>

    <!-- Confirmation modals -->
    <Modal v-show="isDelete" @close="closeModal()" @confirm="deleteAccount()" confirmation=true
           confirm-text="Delete" close-text="Cancel" title="Delete Account"
           body="Are you sure you want to delete your account?"/>
    <Modal v-show="isChangeName" @close="closeModal();" @confirm="changeName();" confirmation=true
           title="Change Name" close-text="Cancel" confirm-text="Change"
           body="Are you sure you want to change your name?"/>
    <Modal v-show="isChangeEmail" @close="closeModal();" @confirm="changeEmail();" confirmation=true
           title="Change Email" close-text="Cancel" confirm-text="Change"
           body="Are you sure you want to change your email?"/>
    <Modal v-show="isChangePassword" @close="closeModal();" @confirm="changePassword();" confirmation=true
           title="Change Password" close-text="Cancel" confirm-text="Change"
           body="Are you sure you want to change your password?"/>
    <Modal v-show="isChangeUsername" @close="closeModal();" @confirm="changeUsername();" confirmation=true
           confirm-text="Change" close-text="Cancel" title="Change Username"
           body="Are you sure you want to change your username?"/>

    <!-- Success and Error Modals -->
    <Modal v-show="is200" @close="closeModal();" title="Success"
           body="The requested changes have been applied."/>
    <Modal v-show="is400" @close="closeModal();" title="Error"
           body="Required fields missing. Please try again!"/>
    <Modal v-show="is401" @close="closeModal();" title="Error"
           body="Authorisation error. Make sure you are logged in!"/>
    <Modal v-show="is403" @close="closeModal();" title="Error"
           body="Permission error. Make sure you are logged in!"/>
    <Modal v-show="is404" @close="closeModal();" title="Error"
           body="Username does not exist. Please try again!"/>
    <Modal v-show="is409" @close="closeModal();" title="Error"
           body="Username or email already exists. Please try again!"/>
    <Modal v-show="is500" @close="closeModal();" title="Error"
           body="Server error. Please try again later!"/>
    <Modal v-show="isGenericError" @close="closeModal();" title="Error"
           body="There was an error. Please try again!"/>
  </div>
</template>


<script>
import axios from 'axios';
import Modal from '@/components/Modal'
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
    Field,
    Modal,
    Form,
    ErrorMessage,
  },
  setup() {
    yup.setLocale({
      string: {
        matches: 'Must be a valid @tcd.ie address',
      },
    });

    const usernameSchema = yup.object({
      username: yup.string().required().label("Username"),
    });

    const passwordSchema = yup.object({
      password: yup.string().required().min(8).label("Password"),
    });

    const emailSchema = yup.object({
      email: yup.string().required().email().matches(".+@tcd.ie$").label("Email"),
    });
    const nameSchema = yup.object({
      firstname: yup.string().required().label("First Name"),
      lastname: yup.string().required().label("Last Name"),
    });

    return {
      usernameSchema: usernameSchema,
      passwordSchema: passwordSchema,
      emailSchema: emailSchema,
      nameSchema: nameSchema,
    }
  },

  data() {
    return {
      isDelete: false,
      isChangeEmail: false,
      isChangeName: false,
      isChangeUsername: false,
      isChangePassword: false,
      newValues: Object,
      is200: false,
      is400: false,
      is401: false,
      is403: false,
      is404: false,
      is409: false,
      is500: false,
      isGenericError: false,
    };
  },

  name: 'Account',

  methods: {

    setNewValues(values, modalVariable) {
      this.newValues = values;
      this[modalVariable] = true;
    },

    async errorWrapper(axiosFunction) {
      try {
        this.closeModal();
        await axiosFunction()
        this.is200 = true;
      } catch (e) {
        if (!e.errorResponse) this.isGenericError = true;
        else {
          switch (e.errorResponse.status) {
            case 400:
              this.is400 = true;
              break;
            case 401:
              this.is401 = true;
              break;
            case 403:
              this.is403 = true;
              break;
            case 404:
              this.is404 = true;
              break;
            case 409:
              this.is409 = true;
              break;
            case 500:
              this.is500 = true;
              break;
            default:
              this.isGenericError = true;
          }
        }
      }
    },

    changeUsername() {
      const token = this.$route.params.jwt;

      this.errorWrapper(
          function () {
            axios.patch('https://iam.netsoc.ie/v1/users/self', {"username": this.newValues.username}, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "text/html",
              },
            });
          }
      )
    },

    changePassword() {
      let token = this.$route.params.jwt;

      this.errorWrapper(
          function () {
            axios.patch('https://iam.netsoc.ie/v1/users/self', {"password": this.newValues.password}, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "text/html",
              },
            });
          });
    },

    changeEmail() {
      let token = this.$route.params.jwt;

      this.errorWrapper(
          function () {
            axios.patch('https://iam.netsoc.ie/v1/users/self', {"email": this.newValues.email}, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "text/html",
              },
            });
          });

    },

    changeName() {
      let token = this.$route.params.jwt;

      this.errorWrapper(
          () => {
            axios.patch('https://iam.netsoc.ie/v1/users/self', {
              "first_name": this.newValues.firstname,
              "last_name": this.newValues.lastname
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "text/html",
              },
            });
          });
    },

    async deleteAccount() {
      let token = this.$route.params.jwt;

      const res = axios.get('https://iam.netsoc.ie/v1/users/self', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let userId = '@' + res.data.username + ':netsoc.ie';

      try {
        await axios.post('https://matrix.netsoc.ie/_synapse/admin/v1/deactivate/' + userId, {"erase": true}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Matrix Account deleted!");
      } catch (error) {
        if (error.response.status === 404) console.log("Matrix Account never existed!");
        else if (error.response.status === 401) console.log("Authentication error");
        else console.log("server issue");
      }

      try {
        await axios.delete('https://webspaced.netsoc.ie/v1/webspace/self', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Webspace deleted!");
      } catch (error) {
        if (error.response.status === 404) console.log("Webspace never existed!");
        else if (error.response.status === 401) console.log("Authentication error");
        else console.log("server issue");
      }

      try {
        await axios.delete('https://iam.netsoc.ie/v1/users/self', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Account deleted!");
      } catch (error) {
        if (error.response.status === 404) console.log("Account never existed!");
        else if (error.response.status === 401) console.log("Authentication error");
        else console.log("server issue");
      }

      document.location.href = "/";

    },

    renewAccount() {
      this.$router.push({name: "Renew"});
    },

    closeModal() {
      this.isDelete = false;
      this.isChangeEmail = false;
      this.isChangeName = false;
      this.isChangeUsername = false;
      this.isChangePassword = false;
      this.is200 = false;
      this.is400 = false;
      this.is401 = false;
      this.is403 = false;
      this.is404 = false;
      this.is409 = false;
      this.is500 = false;
      this.isGenericError = false;
    },

    logout() {
      this.$router.removeRoute("Account");
    },
  }
}
</script>