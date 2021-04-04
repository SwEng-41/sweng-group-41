<template>
<html>
  <body>

  <div class="box">
    <h2>Account System</h2>

    <div class="section">

      <div class="inputbox">
        <input type="text" id="new_username" name="" required="">
        <label>New Username</label>
      </div>

      <a v-on:click="changeUsername()" href="#" onclick="return false;">

        <div class="buttonnoanim">
          change username
        </div>

      </a>

    </div>

    <div class="section">

      <div class="inputbox">
        <input type="text" id="new_password" name="" required="">
        <label>New Password</label>
      </div>

      <a v-on:click="changePassword()" href="#" onclick="return false;">

        <div class="buttonnoanim">
          change password
        </div>

      </a>

    </div>

    <div class="section">

      <div class="inputbox">
        <input type="text" id="new_email" name="" required="">
        <label>New Email</label>
      </div>

      <a v-on:click="changeEmail()" href="#" onclick="return false;">

        <div class="buttonnoanim">
          change email
        </div>

      </a>

    </div>

    <div class="section">

      <div class="inputbox">
        <input type="text" id="new_first_name" name="" required="">
        <label>First Name</label>
      </div>

      <div class="inputbox">
        <input type="text" id="new_last_name" name="" required="">
        <label>Last Name</label>
      </div>

      <a v-on:click="changeName()" href="#" onclick="return false;">

        <div class="buttonnoanim">
          change name
        </div>

      </a>

    </div>

    <div class="lastsection">

      <a v-on:click="deleteAccount()" href="#">

        <div class="buttonnoanim">
          delete account
        </div>

      </a>

      <a href="">

        <div class="buttonnoanim">
          renew account
        </div>

      </a>

    </div>

  </div>

  </body>
  </html>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Account',

  methods: {

    changeUsername() {

      let token = this.$route.params.jwt;

      alert(token);

      let new_username = document.getElementById("new_username").value;
      console.log(new_username);
      axios.patch('https://iam.netsoc.ie/v1/users/self', {"username": new_username}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changePassword() {

      let token = this.$route.params.jwt;

      let new_password = document.getElementById("new_password").value;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"password": new_password}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changeEmail() {

      let token = this.$route.params.jwt;

      let new_email = document.getElementById("new_email").value;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"email": new_email}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    changeName() {

      let token = this.$route.params.jwt;

      let new_first_name = document.getElementById("new_first_name").value;
      let new_last_name = document.getElementById("new_last_name").value;

      axios.patch('https://iam.netsoc.ie/v1/users/self', {"first_name": new_first_name, "last_name": new_last_name}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/html",
        },
      });

    },

    async deleteAccount() {
        let token = this.$route.params.jwt;
        
        const res = await axios.get('https://iam.netsoc.ie/v1/users/self',{
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });

        let userId = '@' + res.data.username +':netsoc.ie';

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

        await axios.delete('https://webspaced.netsoc.ie/v1/webspace/self',{
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

        await axios.delete('https://iam.netsoc.ie/v1/users/self',{
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

      let token = this.$route.params.jwt;

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
