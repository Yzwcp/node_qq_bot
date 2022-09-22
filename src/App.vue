<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import { useWebSocket } from "./store/webSocket/webSocket";
import { ref } from "vue";
let ticket = ref("");
const webSocket = useWebSocket();
webSocket.openSocket();
</script>

<template>
    <Layout></Layout>
</template>

<style>
:root {
}
</style>
