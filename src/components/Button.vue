<template>
    <button class="button"> {{ label }} </button>
</template>

<script>
 export default {
    name: 'Button',

    props: {
        label: {
            type: String,
            default: ''
        }
    }
 }
</script>

<style scoped>
 button {
  background-color: rgb(194, 116, 15);
 }
</style>
