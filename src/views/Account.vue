<template>
    <section class="section">
        <div class="account-container">
            <Button @click="editUsername()" label="Edit Username"/>
            <SingleBoxForm id="name" label="Change Name"/>
            <SingleBoxForm id="password" label="Enter Password"/>
        </div>
    </section>
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
        async editUsername() {
            var username = document.getElementById("name").value;
            var password = document.getElementById("password").value;
            var lastName = "Vaughan";

            var path = "https://iam.netsoc.ie/v1/users/" + username;

            const res = await axios.patch(
                path,
                {
                    "last_name": lastName,
                    "first_name": firstName
                },

                {
                    
                }
            )


            // const res = await axios.post('https://iam.netsoc.ie/v1/users/' + username + '/login', {"password": password});
            alert(res.data.token);
        }
    }
}
</script>


<style scoped>
.section {
    margin-right: 30%;
    margin-left: 30%;
}

.account-container {
    display: flex;
    border: solid 1px;
    border-color: lightgrey;
    padding: 20px;
}

</style>
