<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const pdfUrl = ref('');

onMounted(async () => {
  const key = route.query.key;
  if (!key) return;
  const token = localStorage.getItem('token')

  try {
    const response = await axios.get(`http://localhost:3000/book/read?key=${key}`, { 
    headers: {
      Authorization: `Bearer ${token}`
    }});

    pdfUrl.value = response.data.url;
  } catch (err) {
    console.error('Erro ao carregar PDF', err);
  }
});
</script>

<template>
  <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600px"></iframe>
</template>
