import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
      meta: {
        title: '登录',
        hidden: true,
      },
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/test/index.vue'),
      meta: {
        title: '测试',
        hidden: true,
      },
    },

  ],
})

export default router
