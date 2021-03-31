<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/Netsoc-Logo.png"/>


    <Button label="Darragh" @click="testButton()"></Button>
    <SingleBoxForm label="Change Name"></SingleBoxForm>
    <SingleBoxForm label="Change First Name"></SingleBoxForm>
    <SingleBoxForm label="Change Last Name"></SingleBoxForm>

  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import SingleBoxForm from '@/components/SingleBoxForm.vue';

export default {
  name: 'Home',
  components: {
    Button,
    SingleBoxForm
  },

  methods: {
    testButton() {
      alert("Button pressed!");
    }
  }
}
</script>
