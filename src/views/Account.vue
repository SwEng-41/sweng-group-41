<template>
  <div class="box">
    <h2>Account System</h2>

    <div class="section">
      <Form @submit="changeUsername" :validation-schema="usernameSchema">
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
      <Form @submit="changePassword" :validation-schema="passwordSchema">
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
      <Form @submit="changeEmail" :validation-schema="emailSchema">
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
      <Form @submit="changeName" :validation-schema="nameSchema">
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
      <a v-on:click="deleteAccount()" href="#">
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

  </div>
</template>


<script>
import axios from 'axios';
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
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

  name: 'Account',

  methods: {

    changeUsername({username}) {
      let token = this.$route.params.jwt;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"username": username}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changePassword({password}) {
      let token = this.$route.params.jwt;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"password": password}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });
    },

    changeEmail({email}) {
      let token = this.$route.params.jwt;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"email": email}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changeName({firstname, lastname}) {
      let token = this.$route.params.jwt;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"first_name": firstname, "last_name": lastname}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    async deleteAccount() {
      let token = this.$route.params.jwt;

      const res = await axios.get('https://iam.netsoc.ie/v1/users/self', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let userId = '@' + res.data.username + ':netsoc.ie';

      await axios.post('https://matrix.netsoc.ie/_synapse/admin/v1/deactivate/' + userId, {"erase": true}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        console.log("Matrix Account deleted!");
      }).catch(error => {
        if (error.response.status === 404) console.log("Matrix Account never existed!");
        else if (error.response.status === 401) console.log("Authentication error");
        else console.log("server issue");
      });

      await axios.delete('https://webspaced.netsoc.ie/v1/webspace/self', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        console.log("Webspace deleted!");
      }).catch(error => {
        if (error.response.status === 404) console.log("Webspace never existed!");
        else if (error.response.status === 401) console.log("Authentication error");
        else console.log("server issue");
      });

      await axios.delete('https://iam.netsoc.ie/v1/users/self', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        console.log("Account deleted!");
      }).catch(error => {
        if (error.response.status === 404) console.log("Account never existed!");
        else if (error.response.status === 401) console.log("Authentication error");
        else console.log("server issue");
      });

    },

    renewAccount() {
      this.$router.push({ name: "Renew" });
    }
  }
}
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
  width: 100px;
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
