<template>
  <form @submit.prevent="login">
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Senha" required />
    <button type="submit">Entrar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      const data = await response.json();
      alert(data.message || 'Login efetuado!');
    },
  },
};
</script>
