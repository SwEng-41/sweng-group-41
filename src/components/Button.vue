<template>
    <div class="button">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ label }}
    </div>
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

 

</style>
