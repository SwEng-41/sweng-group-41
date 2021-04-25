<template>
  <section>
    <div class="product">
      <div class="description">
        <h1>Netsoc Membership</h1>
      </div>
    </div>
    <div v-if="showingButton">You will be redirected automatically...</div>
    <button
      v-else
      v-on:click="createSession"
      id="checkout-button"
      class="action-button manually-renew-button"
    >
      Try again
    </button>
    <p>{{ errorResponse }}</p>
  </section>
</template>

<script>
const axios = require('axios');

export default {
  name: "Renew",
  
  data() {
    return {
      token: localStorage.getItem('jwt'),
      uid: localStorage.getItem('userID'),
      errorResponse: "",
      showingButton: false,
    };
  },

  methods: {
    // createSession()
    // Creates a Stripe Checkout Session using the user's JWT for authentication.
    // Redirects the user to the prebuilt checkout page in Stripe.
    createSession() {
      if ( this.uid.length < 1) {
        this.router.push({ name: "Login" });
      }

      else {
        let stripe = require('stripe')('pk_test_51IiIOMDLjBSYtQGtEwVijXa6nsMtKWarqGIvCOx5LMWkE0RvpC6EUM1QBDo6WXa99OcvFoPp2tvwZ7wRrleQc6Vv00G3B30mRk');
        let URL = "http://localhost:8081/create-session";
        let uid = this.uid;
        
        axios.post(URL, {uid: uid}, 
        {
          headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Content-Type": "application/json",
          }
        })
        .then((session) => {
          stripe.redirectToCheckout({ sessionId: session.data.id });
        })
        .catch((e) => {
          console.log(e);
        })
      }
    },
  },

  beforeMount() {
    if (this.token.length < 1) {
      this.$router.push({ name: "Login" });
    }
    else {
      this.createSession();
    }
    setTimeout(() => (this.showingButton = true), 5000);
  }
};
</script>

<style scoped>
.nat-logo {
  max-height: 5rem;
  padding-bottom: 1rem;
  max-width: 100%;
}

.manually-renew-button {
  background-color: rgb(70, 155, 70);
}
</style>
