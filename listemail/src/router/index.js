import { createRouter, createWebHistory } from 'vue-router'
import TableView from '../views/TableView.vue'
import LoginViewVue from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/:id',
      name: 'table',
      component: TableView,
      meta: {requireAuth: true}
    },
  ]
})

export default router
