<template>

    <div class="table-container">
        <table class="pdf-table" v-if="pdfs.length > 0">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Progress</th>
                    <th>Author</th>
                    <th>Voice</th>
                    <th>Audio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pdf in pdfs" :key="pdf.id" >
                    <td @click="abrirPdf(pdf.key)" style="cursor: pointer;">{{ pdf.title }}</td>
                    <td>{{ pdf.progress }} %</td>
                    <td>{{ pdf.author }}</td>
                    <td>{{ pdf.voice }}</td>
                    <td><button @click="audioOpener">🔊</button></td>
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
  },
  
})

function audioOpener(){
  router.push({ name: 'player' })
}

function abrirPdf(id){
  console.log(id)
  router.push({ name:'reader', query: { key: id } })
}

</script>

<style scoped>
.table-container {
  width: 100vw;
  margin-top: 2rem;
  display: flex;
  justify-content: end;
}

.pdf-table {
  width: 75%;
  margin-right: 1rem;
  border-collapse: collapse;
}

.pdf-table th, .pdf-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
} 



.sem-dados {
  text-align: center;
  color: gray;
  margin-top: 1rem;
  font-style: italic;
}

button{

}
</style>