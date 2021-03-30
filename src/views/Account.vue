<template>
    <html>
        <body>
            <div class="accountoptions">

                <div class="part">

                    <input v-model="username" placeholder="New Username">
                    <button v-on:click="updateUsername(username)">Update Username</button>

                </div>

                <div class="part">

                    <input v-model="password" placeholder="New Password">
                    <button v-on:click="updatePassword(password)">Update Password</button>

                </div>

                <div class="part">

                    <input v-model="email" placeholder="New Email">
                    <button v-on:click="updateEmail(email)">Update Email</button>

                </div>

                <div class="part">

                    <input v-model="first_name" placeholder="New First Name">
                    <input v-model="last_name" placeholder="New Last Name">
                    <button v-on:click="updateName(first_name, last_name)">Update Name</button>

                </div>

                <div class="part">

                    <input v-model="email" placeholder="Password">
                    <button v-on:click="updateEmail(password)">Delete Account</button>

                </div>

                <div class="part">

                    <button v-on:click="updateEmail()">Renew Account</button>

                </div>

            </div>
        </body>
    </html>
</template>


<script>
import axios from 'axios';
//import Button from "@/components/Button.vue";
//import SingleBoxForm from "@/components/SingleBoxForm.vue"

export default {
    name:'Account',

    components: {
    
    },

    methods: {
        
        async updateUsername(username) { 

            let token = "test";

            const res = axios.patch('https://iam.netsoc.ie/v1/users/self', {"username": username}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html",
                },
            });

            console.log(res.data);

        },

        async updatePassword(password) {

            let token = "test";

            const res = axios.patch('https://iam.netsoc.ie/v1/users/self', {"password": password}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html",
                },
            });

            console.log(res.data);
            
        },

        async updateEmail(email) {

            let token = "test";

            const res = axios.patch('https://iam.netsoc.ie/v1/users/self', {"email": email}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html",
                },
            });

            console.log(res.data);

        },

        async updateName(first_name, last_name) { 

            let token = "test";

            const res = axios.patch('https://iam.netsoc.ie/v1/users/self', {"first_name": first_name, "last_name": last_name}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html",
                },
            });

            console.log(res.data);

        },

        async renewAccount(){

        }
    }
}
</script>


<style>

body {
  background-color: #161828;
  height: 100%;
  display: flex;
}

.accountoptions {
    background-color: #0b0c14;
    border-radius: 15px;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
}

.part {
    padding: 20px;
}

</style>
