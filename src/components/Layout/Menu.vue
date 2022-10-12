<template>
    <el-menu :default-active="route.path" style="height: 100vh;"
        @select="select">
        <el-sub-menu :index="item.url" v-for="item in menuList" :key="item.id">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
              <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.id">
                  <div >{{subItem.name}}</div>
              </el-menu-item>
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
import {useRoute, useRouter} from 'vue-router';
import {useLogin} from "@/store/normalLogin";
import {ref} from "vue";

const normalLogin = useLogin()
const route = useRoute()
const router = useRouter()
const menuList  = ref([]);
menuList.value = normalLogin.$state.menuList

const select = (key: string, keyPath: string[]) => {
    router.push(key)
}

</script>
