<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Layout from '@/components/Layout/Layout.vue';
import { useWebSocket } from './store/index';
import {ref} from 'vue';
let ticket = ref('')
const webSocket = useWebSocket()
webSocket.openSocket()
const send = () => {
  webSocket.websocket.send(JSON.stringify({
    data: {
      account:1494993218,
      password:'qq......'
    }, code: 'system.login.slider'
  }))
}

const login = () =>{
  webSocket.websocket.send(JSON.stringify({
    data: {
      ticket:ticket.value
    }, code: 'login'
  }))
}

webSocket.websocket.onmessage = (e:any) =>{
  const {code,data,success} = JSON.parse(e.data)
  console.log(code,data,success);
  
}
const aaa = ()=>{
  webSocket.websocket.send(JSON.stringify({
    data: {
    }, code: 'aaa'
  }))
}
</script>

<template>
  <!-- <router-view></router-view> -->
  <el-button @click="send">123</el-button>
  <el-input v-model="ticket"></el-input>
  <el-button @click="login">loggin</el-button>
  <el-button @click="aaa">aaa</el-button>

  <Layout></Layout>
</template>

<style >
:root {}
</style>
