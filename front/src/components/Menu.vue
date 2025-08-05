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
      @menu-click="handleMenuClick"
    />
    <!-- <i @click="smallMenu = !smallMenu" class="material-icons">menu</i> -->
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { useRouter } from 'vue-router'

export default {
  name: 'recursive-menu',
  data: () => ({
    smallMenu: false,
    menuTree: [
      {
        label: "Home",
        icon: "home",
      },
      {
        label: "Dashboard",
        icon: "dashboard",
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
        label: "LogOut",
        icon: "logout",
      }
    ]
  }),
  components: {
    MenuItem
  },
  setup() {
    const router = useRouter()

    const handleMenuClick = (label) => {
      if (label === 'LogOut') {
        localStorage.removeItem('token')        // 🔐 Remove token JWT
        router.push('/login')                   // 🔁 Redireciona
      }
    }

    return {
      handleMenuClick
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
</style>