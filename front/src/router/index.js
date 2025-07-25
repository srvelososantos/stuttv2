import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/landing.vue'
import RegisterPage from '@/views/Register.vue'
import LoginPage from '@/views/Login.vue'
import HomePage from '@/views/Home.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router