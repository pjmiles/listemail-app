import { createRouter, createWebHistory } from 'vue-router'
import TableView from '../views/TableView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import NotFoundVue from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
      meta: {requireAuth: true}
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundVue,
    }
  ]
})

export default router
