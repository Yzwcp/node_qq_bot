<template>
    <div class="alert">
        <el-alert
            :closable="false"
            title="with description"
            type="success"
            description="This is a description."
        />
    </div>

    <div class="header-avatar">
        <div style="margin-left: 4px">{{ bot.botInfo.nickname }}</div>
        <!-- <div>{{data.user?.uin}}</div> -->
        <el-dropdown>
            <div
                class="rob_status"
                v-loading.fullscreen.lock="socket.gLoading"
                element-loading-text="请打开服务，加载中..."
            >
                <img
                    src="@/assets/bot.svg"
                    v-if="!bot.botInfo.avatarUrl"
                    alt=""
                />
                <img src="@/assets/bot_active.svg" v-else alt="" />
                <el-tag v-if="bot.botInfo.avatarUrl">• 在线</el-tag>
                <el-tag type="info" v-if="!bot.botInfo.avatarUrl">离线</el-tag>
                <img
                    :src="bot.botInfo.avatarUrl"
                    v-if="bot.botInfo.avatarUrl"
                    alt=""
                />
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-if="!bot.botInfo.avatarUrl">
                        <router-link to="/setting/qqlogin">登录</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-else @click="logout"
                        >退出登录</el-dropdown-item
                    >
                    <!-- <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item> -->
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { on } from "events";
import { ref, toRefs, reactive } from "vue";
// import { UserFilled } from '@element-plus/icons-vue';
import { useBot } from "../../store/auth/auth";
import { useWebSocket } from "../../store/webSocket/webSocket";
const socket = useWebSocket();
const bot = useBot();

const logout = () => {
    socket.send({ code: "logout" });
};
</script>

<style scoped lang="less">
.alert {
    position: absolute;
    top: 50%;
    left: 30px;
    width: 60%;
    height: 40px;
    transform: translateY(-70%);
}

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
            height: 40px;
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
