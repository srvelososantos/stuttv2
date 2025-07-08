<template>
  <div class="container">
    <h1>Bem-vindo ao Meu Projeto</h1>
    <button @click="goTo('login')">Login</button>
    <button @click="goTo('register')">Cadastro</button>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(page) {
      this.$router.push(`/${page}`);
    },
  },
};
</script>