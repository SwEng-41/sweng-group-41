<template>

  <form>
    <h3>Reset Password</h3>
    <div class = "form-group">
      <label>Password</label>
      <input type = "password",class="form-control",placeholder = "Password"/>
    </div>

    <div class = "form-group">
      <label>Password Confirm</label>
      <input type = "password",class="form-control",placeholder = "Password Confirm"/>
    </div>
    <button class = "btn btn-primary btn-block">Submit</button>
  </form>
</template>

</template>

<script>
import Button from "@/components/Button";
import axios from "axios";
export default {
name: "reset",
  data()
  {
    return {
      password:'',
      password_confirm:''
    }
  }
  methods:{
    async handleSubmit()
    {
      const response = await axios post('reset')
      {
        password:this.password,
            password_confirm:this.password_confirm,
          token:this,$route//need to add in router
        /*
        Need to add path in router
       { path/rset/token/,compoent:Reset}

         */
      };
      console.log(response)
      this.$router.push('/login')
    }
  }
}
</script>
