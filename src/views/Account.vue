<template>
    <html>
        <body>
            <div class="accountoptions">
                <div class="part">
                    <SingleBoxForm label="first name"/>
                    <SingleBoxForm label="last name"/>
                    <Button @click="editUsername(first_name, last_name)" label="edit username"/>
                </div>

                <div class="part">
                    <SingleBoxForm label="new email"/>
                    <Button @click="editEmail(email)" label="edit email"/>
                </div>

                <div class="part">
                    <SingleBoxForm label="new password"/>
                    <Button @click="editPassword(password)" label="edit password"/>
                </div>

                <div class="lastpart">
                    <Button @click="renewAccount()" label="renew account"/>
                </div>

            </div>
        </body>
    </html>
</template>


<script>
import axios from 'axios';
import Button from "@/components/Button.vue";
import SingleBoxForm from "@/components/SingleBoxForm.vue"

export default {
    name:'Account',

    components: {
        Button,
        SingleBoxForm
    },

    methods: {
        async editUsername(first_name, last_name) { 

            let token = "test";

            axios.patch('https://iam.netsoc.ie/v1/users/self', {"first_name": first_name, "last_name": last_name}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html",
                },
            });

            

        },

        async editEmail(email) {

            let token = "test";

            axios.patch('https://iam.netsoc.ie/v1/users/self', {"email": email}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html",
                },
            });

            alert(email);

        },

        async editPassword(password) {

            let token = "test";

            axios.patch('https://iam.netsoc.ie/v1/users/self', {"password": password}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/html",
                },
            });

            alert(password);
            
        },

        async renewAccount(){

        }
    }
}
</script>


<style>

body {
  background-color: #161828;
  display: flex;
  justify-content: center;
  height: 100%;
}

.accountoptions {
    background-color: #0b0c14;
    border-radius: 15px;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
}

.part  {
    display: flex;
}

.lastpart {
    display: flex;
    justify-content: center;
}

</style>
