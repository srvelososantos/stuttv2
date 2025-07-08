<template>
  <form @submit.prevent="register">
    <h2>Cadastro</h2>
    <input v-model="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Senha" required />
    <button type="submit">Cadastrar</button>
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
    async register() {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      const data = await response.json();
      alert(data.message || 'Cadastro efetuado!');
    },
  },
};
</script>
