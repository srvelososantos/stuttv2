<template>
  
  <div class="main-container">
        <div class="top-left">
            <div class="logomarca">
                <img id="logo" :src="logo" alt="">
                
            </div>
            <h2>Crie, edite e gerencie seus e-Books</h2>
            <h4>Chegou o novo aplicativo para geração e reprodução de áudio, com ele
                você pode criar audiobooks a partir de e-books utilizando IA generativa,
                reproduzir conteúdos originais
            </h4>
            <div class="btns">
                
                <button type="button" @click="goToRegister" class="btn-comece">Cadastrar</button>
                <button type="button" @click="goToLogin" class="btn-ja">Logar</button>
            </div>
        </div>

        <div class="top-right">
            <img id="muie" :src="estante" alt="">
        </div>
    </div>
    
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo from '@/views/img/stuttbook_logo.png'
import estante from '@/views/img/estante_livros.png'

const router = useRouter()
const goToLogin = () => router.push('/login')
const goToRegister = () => router.push('/register')
</script>

<style scoped>

body{
    border: 0px;
    margin: 0px;
}

.main-container{
    display: flex;
}

.btns{
    display: flex;
    justify-content: space-evenly;
    
}

.top-left, .top-right{
    
    width: 50%;
    
    overflow: hidden;
}

.top-right{
    height: 100%;
}

.top-left{
    
    width: 50%;
    overflow: hidden;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 45px;
    
}

.logomarca{
    display: flex;
}

#logo{
    width: 115px;
    height: 105px;
}

#muie{
   height: 100vh;
    
}

button{
    height: 60px;
    width: 180px;
    background-color: white;
    border-radius: 5px;
}

.btn-comece{
    background-color: #4AFFC5;
}

.logomarca > h1{
    margin-top: 10px;
    padding-left: 15px;
}

</style>
