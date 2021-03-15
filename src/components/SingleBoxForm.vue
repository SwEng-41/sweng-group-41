<template>
  <div class="login-box">
  <form>
    <div class="user-box">
      <input type="text" name="" required="">
      <label>{{ label }}</label>
    </div>
  </form>
</div>
</template>

<script>
export default {
    name: 'SingleBoxForm',

    props: {
        label: {
            type: String,
            default: ''
        },
    }
}
</script>

<style scoped>

html {
  height: 100%;
}
body {
  margin:0;
  padding:0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  width: 40%;
  margin: 20px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  font-variant: small-caps;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}
</style>