import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/landing.vue'
import RegisterPage from '@/views/Register.vue'
import LoginPage from '@/views/Login.vue'
import HomePage from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
import Player from '@/views/Player.vue'
import Reader from '@/views/Reader.vue'
import axios from 'axios'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/home', name: 'home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/settings', name: 'settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/player', name: 'player', component: Player, meta: { requiresAuth: true } },
  { path: '/reader/:id', name: 'reader', component: Reader, meta: { requiresAuth: true }, props: true }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next, push) => {
  const token = localStorage.getItem('token')
  console.log(token)
  console.log(to.meta.requiresAuth)
  // Caminho protegido
  if (to.meta.requiresAuth) {
    if (!token) {
      return next('/login')
    }

    try {
      const res = await axios.get('http://localhost:3000/auth/validate-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.data.valid) {
        console.log('navegação permitida')
        return next()
      } else {
        localStorage.removeItem('token')
        console.log('navegação n permitida')
        return next('/login')
      }
    } catch (err) {
      console.log('navegação n permitida catch, ' + err )
      localStorage.removeItem('token')
      return next('/login')
    }
  }

  // Evita que usuários logados acessem login ou register
  if ((to.path === '/login' || to.path === '/register') && token) {
    try {
      const res = await axios.get('http://localhost:3000/auth/validate-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.data.valid) {
        return next('/home')
      } else {
        localStorage.removeItem('token')
        return next()
      }
    } catch {
      localStorage.removeItem('token')
      return next()
    }
  }

  return next()
})

export default router