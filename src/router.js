import {createRouter, createWebHistory} from "vue-router";
import Login from './components/Login.vue'
import Forgot from './components/Forgot.vue'
import Registration from "@/components/Registration";

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
    },
    {
        path: "/registration",
        name: "Registration",
        component: Registration
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;