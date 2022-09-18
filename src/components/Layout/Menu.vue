<template>
    <el-menu :default-active="route.path" @open="handleOpen" @close="handleClose" style="height: 100vh;"
        @select="select">
        <el-sub-menu index="/setting">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>设置</span>
            </template>
            <el-menu-item-group title="qq基本设置">
                <el-menu-item index="/setting/qqlogin">
                    <router-link to="/setting/qqlogin">登录</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">配置</el-menu-item>
            </el-menu-item-group>

        </el-sub-menu>
        <el-sub-menu index="/my">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>我的</span>
            </template>
            <el-menu-item-group title="基本设置">
                <el-menu-item index="/my/friend">
                    <router-link to="/my/friend">好友列表</router-link>
                </el-menu-item>
                <el-menu-item index="/my/group">
                    <router-link to="/my/group">群列表</router-link>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
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

const route = useRoute()


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
  