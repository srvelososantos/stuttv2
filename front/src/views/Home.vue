<template>
    <h1>alou</h1>
    <button @click="logout">Sair</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
</script>