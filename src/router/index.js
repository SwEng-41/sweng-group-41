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
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: {
      allowAnonymous: true
    }
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
    component: Verify,
    meta: {
      allowAnonymous: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnonymous && !localStorage.getItem('jwt')) {
    next({
      name: 'Login',
      query: {redirect: to.fullPath}
    })
  } else {
    next()
  }
})

export default router
