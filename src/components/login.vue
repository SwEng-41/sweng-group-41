<template>
  <div class="login">
    <el-form class="form" :rules="rules" :model="form" ref="form">
      <h3>Log in interface</h3>
      <el-form-item label="username" label-width="80px" prop="name">
        <el-input class="item" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="password" label-width="80px" prop="password">
        <el-input
            class="item"
            type="password"
            v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">l</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: "Please enter username", trigger: "blur" },
          { min: 3, max: 10, message: "the length is from 3 to 10 character", trigger: "blur" }
        ],
        password: [
          { required: true, message: "please enter password ", trigger: "blur" },
          { min: 6, max: 12, message: "he length is from 6 to 12 character", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$router.push("/home");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  background-color: #bcdef3;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 40%;
  margin-bottom: 20vh;
  background-color: white;
  border-radius: 2px;
  padding: 5% 3%;
}
.item {
  width: 75%;
}
</style>
