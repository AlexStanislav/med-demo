import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Detalii Cont",
            component: () => import("../views/AccountDetails.vue")
        },
        {
            path: "/requests",
            name: "Cereri",
            component: () => import("../views/RequestsView.vue")
        }
    ]
})

export default router