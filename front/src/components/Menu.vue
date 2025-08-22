<template>
  <div class="menu" :class="{ 'small-menu': smallMenu }">
    <MenuItem
      v-for="(item, index) in menuTree"
      :key="index"
      :data="item.children"
      :label="item.label"
      :icon="item.icon"
      :depth="0"
      :smallMenu="smallMenu"
      :class="item.class"
      @menu-click="handleMenuClick"
    />
    <!-- <i @click="smallMenu = !smallMenu" class="material-icons">menu</i> -->
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { useRouter } from 'vue-router'

import axios from 'axios'

export default {
  name: 'recursive-menu',
  data: () => ({
    smallMenu: false,
    username: '',
    menuTree: [
      {
        label: "Home",
        icon: "home",
      },
      {
        label: "New File",
        icon: "upload_file",
        // children: [
        //   {
        //     label: "level 2.1",
        //   },
        //   {
        //     label: "level 2.2"
        //   },
        //   {
        //     label: "level 2.3"
        //   }
        // ]
      },
      {
        label: "Settings",
        icon: "settings"
      },
      {
        label: "Log Out",
        icon: "logout",
      },
      {
        label: "",
        icon: "account_circle",
        class: "userMenuItem"
      }
    ]
  }),
  components: {
    MenuItem
  },
  setup() {
    const router = useRouter()

    const handleMenuClick = async (label) => {
      if (label === 'Log Out') {
        localStorage.removeItem('token')        // Remove token JWT
        router.push('/login')                   // Redireciona
      }
      if(label === 'New File'){
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/pdf' // apenas PDFs
        input.onchange = async (event) => {
          const file = event.target.files[0]
          if (file) {
            try {
              const formData = new FormData()
              formData.append('file', file)

              const res = await axios.post('http://localhost:3000/book/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })

              console.log('Arquivo enviado com chave:', res.data.key);
              alert('Upload done successfully, it will be available soon')
              window.location.reload()
            } catch (err) {
              console.error('Erro no upload', err)
              alert('Erro ao enviar o arquivo')
            }
          }
        }
        input.click()
      }
      if(label === 'Settings'){
        router.push('/settings')
      }
      if(label === 'Home'){
        router.push('/home')
      }
      
      
    }

    return {
      handleMenuClick
    }
  },
  async mounted() {
    try{
      const res = await axios.get('http://localhost:3000/auth/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      this.username = res.data.username

      const accountItem = this.menuTree.find(item => item.icon === 'account_circle')
      if(accountItem){ accountItem.label = this.username }
    }catch(e){
      console.error('erro ao buscar usuario: ', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  height: 100vh;
  width: 240px;
  left: 0;
  top: 0;
  border-right: 1px solid #ececec;
  transition: all .3s ease;
  overflow: auto;
  i {
    position: fixed;
    left: 250px;
    font-size: 20px;
    top: 15px;
    user-select: none;
    cursor: pointer;
    transition: all .3s ease;
  }
  &.small-menu {
    overflow: inherit;
    width: 60px;
    padding-top: 50px;
    i {
      left: 20px;
    }
  }
}

.userMenuItem{
  margin-top: 42rem;
}

@media only screen and (max-width: 1360px){
  .userMenuItem{
    margin-top: 23rem;
  }
}
</style>