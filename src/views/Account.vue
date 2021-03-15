<template>
    <html>
        <body>
            <div class="accountoptions">
                <SingleBoxForm label="full name"/>
                <Button @click="test()" label="edit username"/>
            </div>
        </body>
    </html>
</template>


<script>
//import axios from 'axios';
import Button from "@/components/Button.vue";
import SingleBoxForm from "@/components/SingleBoxForm.vue"

export default {
    name:'Account',

    components: {
        Button,
        SingleBoxForm
    },

    methods: {
        test() { alert("test"); }
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
    display: flex;
    justify-content: center;
    border-radius: 15px;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
}

</style>
