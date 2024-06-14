import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/service-details',
      name: 'serviceDetails',
      props: true,
      component: () => import('../views/ServiceDetails.vue')
    }
  ],
})

export default router
