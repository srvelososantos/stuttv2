import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/landing.vue'
import RegisterPage from '@/views/Register.vue'
import LoginPage from '@/views/Login.vue'
import HomePage from '@/views/Home.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  {
    path: '/home',
    component: HomePage,
    meta: { requiresAuth: true } // <- proteção
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  // Evita que usuário logado vá pra login/register de novo
  if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    return next('/home')
  }

  next()
})

export default router