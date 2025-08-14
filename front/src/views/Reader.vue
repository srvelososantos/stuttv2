<script setup>
import { defineProps, ref, onMounted } from 'vue'
import axios from 'axios'


const props = defineProps({
  id: String
})

const pdfUrl = ref(null)

onMounted(async () => {
    const token = localStorage.getItem('token')
    console.log('token' + token)
    const res = await axios.get(`http://localhost:3000/book/${props.id}`, { responseType: 'blob' }, 
    {   headers: {
            Authorization: `Bearer ${token}`
        } 
    })
//   pdfUrl.value = URL.createObjectURL(res.data)
})
</script>

<template>
  <!-- <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600px"></iframe> -->
</template>
