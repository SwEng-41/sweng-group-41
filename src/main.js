import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: () => import("@/components/login.vue") },
    { path: "/home", component: () => import("@/components/home.vue") }
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");