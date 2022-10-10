<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import {useRouter,useRoute} from "vue-router";
import {mapToMenuRoutes} from "@/util/map-util";
import {useLogin} from "@/store/normalLogin";
import {onMounted, toRaw} from "vue";
// import { useWebSocket } from "./store/webSocket/webSocket";
// useWebSocket().openSocket();
const router = useRouter();

onMounted(async()=>{

})
</script>

<template>
    <Layout></Layout>
</template>

<style>
:root {
}
</style>
