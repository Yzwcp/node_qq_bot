<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Layout from '@/components/Layout/Layout.vue';
import { useWebSocket } from './store/index';
const webSocket = useWebSocket()
webSocket.openSocket()
const send = () => {
  webSocket.websocket.send(JSON.stringify({
    data: {}, code: 'system.online'
  }))
}
</script>

<template>
  <!-- <router-view></router-view> -->
  <el-button @click="send">123</el-button>

  <Layout></Layout>
</template>

<style >
:root {}
</style>
