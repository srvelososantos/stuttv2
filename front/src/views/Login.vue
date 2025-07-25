<template>

  <div class="main">
        <div class="top-left">
            <img :src="logo" alt="" style="cursor: pointer;" onclick="window.location.href='/'">
            <hr>

            <form action="" id="userForm" @submit.prevent="login">
                <div class="main-container">
            
                    <label for="email">E-mail</label>
                    <input class="txt" id="email" type="email" v-model="email">
        
                    <label for="password">Senha</label>
                    <input class="txt" id="password" type="password" v-model="password">
        
                    <button class="btn-logar" type="submit">Logar</button>
        
                    <p>Ainda não tem conta? <a href="/register">Cadastre-se</a></p>
                </div>
            </form>

        </div>
    
        <div class="top-right">
            <img id="muie" :src="estante" alt="">
        </div>
    </div>
    
</template>

<script setup>

import logo from '@/views/img/stuttbook_logo.png'
import estante from '@/views/img/estante_livros.png'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value
    })

    console.log('Login bem-sucedido:', response.data)
    router.push('/home') // redireciona
  } catch (err) {
    if (err.response && err.response.status === 401) {
      alert("Email ou senha incorretos")
    } else {
      error.value = 'Erro ao conectar com o servidor'
    }
  }
}
</script>

<style scoped>

body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0px;
}

label{
    font-family: "Inter", serif;
    margin: 0px;
    
}

hr{
    width: 80%;
    border: 1px solid black;
 }

.main-container{
    width: 326px;
    height: 300px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 16px;

}


.txt{
    height: 30px;
    border-radius: 3px;
    
}

button{
    height: 38px;
    background-color: #009DC0;
    color: white;
    border-radius: 5px;
    margin-top: 20px;
}

.top-left, .top-right{
    
    width: 50%;
    overflow: hidden;
}

.top-right{
    height: 100vh;
    border: 0px;
}

.top-left{
    
    width: 50%;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    gap: 49px;
    margin-top: 6rem;
    align-items: center;
}

.main{
    display: flex;
    height: 100vh;
    width: 100vw;
}

.top-left > img{
    width: 15%;
 }

 #muie{
    height: 100vh;
 }

 form{
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin-left: 6rem;
 }

 @media screen and (max-width: 1366px){

    .top-left{
        margin-top: 2rem;
        gap: 30px;
    }
}

</style>
