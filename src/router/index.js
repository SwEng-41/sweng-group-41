import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home'
import Account from '@/views/Account'
import About from '@/views/About.vue'
import Login from '@/views/Login'
import Forgot from '@/views/Forgot'
import Registration from '@/views/Registration'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
