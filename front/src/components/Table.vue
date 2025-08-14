<template>

    <div class="table-container">
        <table class="pdf-table" v-if="pdfs.length > 0">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Author</th>
                    <th>Progress</th>
                    <th>Voice</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pdf in pdfs" :key="pdf.id">
                    <td>{{ pdf.title }}</td>
                    <td>{{ pdf.status }}</td>
                    <td>{{ pdf.author }}</td>
                    <td>{{ pdf.voice }}</td>
                </tr>
            </tbody>
        </table>

    <div v-else class="sem-dados">
      Nenhum PDF enviado ainda.
    </div>
  </div>

</template>

<script setup>

import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  pdfs: {
    type: Array,
    required: true,
    default: () => []
  }
})

 function abrirPdf(id){
  router.push({ name:'reader', params: { id } })
}

</script>

<style>
.table-container {
  width: 100vw;
  margin-top: 2rem;
}

.pdf-table {
  width: 100%;
  border-collapse: collapse;
}

.pdf-table th, .pdf-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
} 

td{
  cursor: pointer;
}

.sem-dados {
  text-align: center;
  color: gray;
  margin-top: 1rem;
  font-style: italic;
}
</style>