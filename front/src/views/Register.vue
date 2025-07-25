<template>
    <div class="main">
        <div class="top-left">

            <img :src="logo" alt="" onclick="window.location.href='/'" style="cursor: pointer;">
            <hr>
            <div class="formAndErrors">
                <form action="" id="userForm" @submit.prevent="registerUser">
                    <div class="main-container">
                
                        <label for="nome">Username</label>
                        <input class="txt" id="nome" type="text" v-model="name" required>

                        <label for="lastnome">Last Name</label>
                        <input class="txt" id="lastnome" type="text" v-model="lastName" required>
                
                        <label for="email">E-mail</label>
                        <input class="txt" id="email" type="text" v-model="email" required>    
                
                        <label for="password">Password</label>
                        <input class="txt" id="password" type="password" v-model="password" required>
            
                        <button class="btn-cadastrar" type="submit" id="buttonCadastrar">Cadastrar</button>
                    </div>
                </form>
    
                <p v-if="error" style="color: red">{{ error }}</p>
                <p v-if="success" style="color: green">{{ success }}</p>
            </div>
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
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const lastName = ref('')
const password = ref('')

const error = ref('')
const success = ref('')
const router = useRouter()

const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/user/create', {
      name: name.value,
      email: email.value,
      lastName: lastName.value,
      password: password.value
    })

    success.value = response.data.message
    error.value = ''

    // Opcional: redirecionar para login
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    error.value =
      err.response?.data?.message || 'Erro ao cadastrar usuário'
    success.value = ''
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

.main-container{
    background-color: #ffffff;
    width: 326px;
    height: 536px;
    display: flex;
    gap: 5px;
    flex-direction: column;
    border-radius: 5px;
    
    padding: 16px;
    
}

#cadastre{
    border-bottom: .5px solid black;
    height: 45px;
    font-family: "Inter", serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.txt{
    height: 30px;
    border-radius: 3px;

}

button{
    height: 38px;
    background-color: #fdff6a;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    margin-top: 3rem;
}


.top-left, .top-right{
    
    width: 50%;
    border: solid black 1px;
    overflow: hidden;
}

.top-right{
    height: 100vh;
    border: 0px;
}

.top-left{
    border: solid black 1px;
    width: 50%;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    gap: 45px;
    justify-content: center;
    align-items: center;
}

.main{
    display: flex;
    height: 100vh;
    width: 100vw;
}

#muie{
    height: 100vh;
     
}

hr{
    width: 80%;
    border: 1px solid black;
}

.top-left > img{
    width: 15%;
}

#userForm{
    display: flex;
    align-self: flex-start;
    
}

.formAndErrors{
    display: flex;
    width: 50rem;
}

#erros{
    display: flex;
    align-items: center;
    justify-content: center;
}

.showErrors{
    display: flex;
    justify-content: center;
}

#erros > ul{
    margin: 0rem 0rem 10rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

button:disabled{
    background-color: rgb(187, 187, 187);
    cursor: not-allowed;
}

@media screen and (max-width: 1366px){
    .formAndErrors{
        width: auto;
    }

    #erros > ul{
        margin: 0rem 0rem 10rem 2rem;
    }

    .top-left{
        gap: 10px;
    }

    .top-left > img{
        margin-top: 8rem;
    }
}

</style>
