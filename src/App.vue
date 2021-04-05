<template>
  <div id="nav">
    <router-link :to="{ name: 'Login' }">Login</router-link>
    |
    <router-link :to="{ name: 'Registration' }">Registration</router-link>
    |
    <router-link :to="{ name: 'Account' }">Account</router-link>
    |
    <router-link :to="{ name: 'Success' }">Success</router-link>
    |
    <router-link :to="{ name: 'Cancellation' }">Cancellation</router-link>

  </div>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
}
</script>