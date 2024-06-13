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

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth)
  const token = localStorage.getItem('token')

  if (requireAuth && !token) {
    next('/')
  } else {
    next()
  }

});


export default router
