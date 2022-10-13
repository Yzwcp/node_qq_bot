<template>
    <el-container>
        <el-aside width="200px">
            <MenuBody></MenuBody>
        </el-aside>
        <el-container>
            <el-header>
                <!-- <div>{{route.meta.title[0]}}</div> -->
                <!-- <div>{{route.meta?.title}}</div> -->
                <HeaderBody></HeaderBody>
            </el-header>
            <el-main>
               <el-card>
                   <MainBody></MainBody>
               </el-card>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from "vue";
import { useRoute } from "vue-router";
import MenuBody from "./Menu.vue";
import HeaderBody from "./Header.vue";
import MainBody  from "@/view/main/main.vue"
import { useWebSocket } from "@/store/webSocket/webSocket";
// const socket = useWebSocket();
// console.log();
</script>
