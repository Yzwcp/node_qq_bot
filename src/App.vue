<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import { useWebSocket } from "./store/webSocket/webSocket";
useWebSocket().openSocket();


</script>

<template>
    <Layout></Layout>
</template>

<style>
:root {
}
</style>
