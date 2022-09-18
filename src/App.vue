<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Layout from '@/components/Layout/Layout.vue';
import { useWebSocket } from './store/webSocket';
import { ref } from 'vue';
let ticket = ref('')
const webSocket = useWebSocket()
webSocket.openSocket()

</script>

<template>

  <Layout></Layout>
</template>

<style >
:root {}
</style>
