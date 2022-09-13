<template>
    <el-container>
        <el-aside width="200px">
            <Menu></Menu>
        </el-aside>
        <el-container>
            <el-header>
                <!-- <div>{{route.meta.title[0]}}</div> -->
                <!-- <div>{{route.meta?.title}}</div> -->
                <div class="header-avatar">
                    <div>{{data.user?.nickname}}</div>

                    <img :src="data.user?.avatarUrl" alt="" width="100">
                    <!-- <div>{{data.user?.uin}}</div> -->
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { useRoute, } from 'vue-router'
import Menu from './Menu.vue';
const data = reactive({
    user: {
        avatarUrl: '',
        uin: '',
        nickname: '',
    }
})
// const route = useRoute()
try {
    const cacheData = JSON.parse(localStorage.getItem('data') as string).user
data.user = cacheData
console.log(cacheData);
} catch (error) {
    
}

// console.log();

</script>

<style scoped lang="less">
.header-avatar {
    display: flex;
    align-items: center;
    font-size: 14px;
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);

    img {
        width: 40px;
        border-radius: 50%;
        margin-left: 8px;
    }
}
</style>