<template>

    <Menu />

    <div class="main-container">
        <div class="opts">
            <ul>
                <li>Change password</li>
                <li>Delete All books</li>
            </ul>
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Menu from '@/components/Menu.vue';
import Table from '@/components/Table.vue'

</script>

<style>

.opts{
    width: 80%;
    display: flex;
    justify-self: flex-end;
}

ul{
    list-style: none;
    cursor: default;
    font-size: 1.2rem;
    margin-top: 1rem;
}

li{
    padding: 0.4rem;
    border: 1px grey solid;
    border-radius: 5px;
    margin: 0 0 1rem 0;
}
</style>