import { createWebHistory, createRouter } from "vue-router";
import Login from './components/Login.vue'
import Forgot from './components/Forgot.vue'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
      path: "/forgot",
      name: "Forgot",
      component: Forgot,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;