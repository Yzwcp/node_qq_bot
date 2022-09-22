<template>
    <el-container>
        <el-aside width="200px">
            <Menu></Menu>
        </el-aside>
        <el-container>
            <el-header>
                <!-- <div>{{route.meta.title[0]}}</div> -->
                <!-- <div>{{route.meta?.title}}</div> -->
                <Header></Header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from "vue";
import { useRoute } from "vue-router";
import Menu from "./Menu.vue";
import Header from "./Header.vue";
import { useWebSocket } from "@/store/webSocket/webSocket";
const socket = useWebSocket();
// console.log();
</script>
