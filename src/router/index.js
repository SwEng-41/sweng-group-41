import {createRouter, createWebHashHistory} from 'vue-router'
import Account from '@/views/Account'
import Login from '@/views/Login'
import Forgot from '@/views/Forgot'
import Registration from '@/views/Registration'
import Reset from '@/views/Reset'
import Verify from '@/views/Verify'

// Account Renewal
import Renew from '@/views/Renew'
import Success from '@/views/Checkout/Success.vue'
import Cancellation from '@/views/Checkout/Cancellation.vue'

const routes = [
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/renew",
    name: "Renew",
    component: Renew
  },
  {
    path: "/success",
    name: "Success",
    component: Success
  },
  {
    path: "/cancellation",
    name: "Cancellation",
    component: Cancellation
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
