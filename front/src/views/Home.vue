<template>
  
  <div class="main-container">
    
    <Menu />

    <Table :pdfs="pdfs"/>

  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Menu from '@/components/Menu.vue';
import Table from '@/components/Table.vue'

const pdfs = ref([])

onMounted(async () => {

  const token = localStorage.getItem('token')
  try {
    const response = await axios.get('http://localhost:3000/book/mybooks',{ 
    headers: {
      Authorization: `Bearer ${token}`
    }})
    pdfs.value = response.data
  } catch (error) {
    console.error('Erro ao buscar PDFs:', error)
  }
})

const abrirPdf = (pdf) => {
  // Lógica para abrir/visualizar o PDF
  console.log('Abrindo PDF:', pdf)
}
</script>

<style>

</style>