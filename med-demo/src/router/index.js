import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/patient',
            name: 'patient',
            component: () => import('../views/PatientView.vue')
        },
        {
            path: '/nurse',
            name: 'nurse',
            component: () => import('../views/NurseView.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next()
})

export default router