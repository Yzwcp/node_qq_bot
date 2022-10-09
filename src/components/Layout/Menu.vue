<template>
    <el-menu :default-active="route.path" @open="handleOpen" @close="handleClose" style="height: 100vh;"
        @select="select">
        <el-sub-menu :index="item.url" v-for="item in menuList" :key="item.id">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
              <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.id">
                  <router-link to="/setting/qqlogin">{{subItem.name}}</router-link>
              </el-menu-item>
        </el-sub-menu>
<!--        <el-sub-menu index="/my">-->
<!--            <template #title>-->
<!--                <el-icon>-->
<!--                    <location />-->
<!--                </el-icon>-->
<!--                <span>我的</span>-->
<!--            </template>-->
<!--            <el-menu-item index="/my/friend">-->
<!--                <router-link to="/my/friend">好友列表</router-link>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/my/group">-->
<!--                <router-link to="/my/group">群列表</router-link>-->
<!--            </el-menu-item>-->
<!--        </el-sub-menu>-->
    </el-menu>

</template>

<script lang="ts" setup>

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import {useLogin} from "@/store/normalLogin";
import {ref} from "vue";
const normalLogin = useLogin()
const route = useRoute()

const menuList  = ref([]);
menuList.value = normalLogin.$state.menuList
const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const select = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
