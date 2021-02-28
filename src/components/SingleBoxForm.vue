<template>
  <input class="form-style" v-model="input" :placeholder="label"/>
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
.form-style {
    width: 100%;
}
</style>