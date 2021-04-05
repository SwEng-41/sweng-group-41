import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home'
import Account from '@/views/Account'
import About from '@/views/About.vue'
import Login from '@/views/Login'
import Forgot from '@/views/Forgot'
import Registration from '@/views/Registration'

// Account Renewal
import Renew from '@/views/Renew'
import Success from '@/views/Checkout/Success.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
