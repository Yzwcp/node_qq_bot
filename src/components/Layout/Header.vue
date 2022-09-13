<template>
    <div class="header-avatar">
        <div>{{data.user?.nickname}}</div>
        <!-- <div>{{data.user?.uin}}</div> -->
        <el-dropdown>
            <div class="rob_status">
                <img src="@/assets/bot.svg" alt="">
                <div>未登录</div>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <router-link to="/setting/qqlogin">登录</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <!-- <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item> -->
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
// import { UserFilled } from '@element-plus/icons-vue';
const data = reactive({
    user: {
        avatarUrl: '',
        uin: '',
        nickname: '',
    }
})

</script>

<style scoped lang="less">
.header-avatar {
    display: flex;
    align-items: center;
    font-size: 14px;
    position: absolute;
    top: 50%;
    right: 30px;
    height: 40px;
    transform: translateY(-50%);

    .rob_status {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: #bfbfbf;

        img {
            width: 40px;
            border-radius: 50%;
            margin-left: 8px;
        }
    }


}

:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
    color: black;
    margin: 4px 6px;
}

:deep(.el-dropdown-menu__item) {
    padding: 10px 20px;
    margin: 4px 6px;

}
</style>