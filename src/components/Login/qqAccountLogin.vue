<template>
    <el-card>
        <el-form
            label-width="100px"
            :model="formData"
            style="max-width: 800px"
            :label-suffix="':'"
        >
            <el-form-item label="登录标识" prop="account">
                <el-select
                    v-model="formData.platform"
                    class="m-2"
                    placeholder="选择"
                >
                    <el-option
                        v-for="item in platFormSelect"
                        :key="item.v"
                        :label="item.l"
                        :value="item.v"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="qq账号" prop="account">
                <el-input v-model="formData.account" style="width: 120px" />
            </el-form-item>
            <el-form-item label="qq密码" prop="account">
                <el-input v-model="formData.password" style="width: 120px" />
            </el-form-item>
            <el-form-item label="操作1">
                <el-button @click="getTicket">获取登录密钥</el-button>
                <div
                    v-if="webSocket.code === BotEvent.on.loginSlider"
                    style="margin-left: 10px; color: skyblue"
                >
                    <a :href="webSocket.data?.ticket" target="_blank"
                        >已获取:点击去提取</a
                    >
                </div>
            </el-form-item>
            <el-form-item label="密钥" prop="account" style="width: 600px">
                <el-input v-model="formData.ticket" />
            </el-form-item>
            <el-form-item label="操作2">
                <el-button @click="replyTicket">确定密钥</el-button>
            </el-form-item>
            <el-form-item
                label="验证码"
                prop="verificationCode"
                v-if="webSocket.code === 'needCode'"
            >
                <el-input
                    v-model="formData.verificationCode"
                    style="width: 200px"
                >
                    <template #append>
                        <el-button
                            @click="getVerificationCode"
                            :disabled="false"
                            type="primary"
                        >
                            {{ countdown == 60 ? "获取验证码" : countdown }}
                        </el-button>
                    </template>
                </el-input>
                <el-icon
                    size="16px"
                    style="
                        margin: 0px 4px 0 10px;
                        color: red;
                        display: inline-block;
                    "
                >
                    <Warning />
                </el-icon>
                <span style="color: red"
                    >首次登录新设备需要获取密保手机验证码(验证完以后可以直接登录)</span
                >
            </el-form-item>
            <el-form-item label="操作3" v-if="webSocket.code === 'needCode'">
                <el-button @click="replyVerificationCode" type="primary"
                    >登录</el-button
                >
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useWebSocket } from "@/store/webSocket/webSocket";
import { BotEvent, platFormSelect } from "../types";
import { Warning } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const formData = reactive({
    account: "",
    password: "",
    ticket: "",
    verificationCode: "",
    platform: 4,
});
const countdown = ref<number>(60);
const countdownTimer = ref<NodeJS.Timeout | null>();
const webSocket = useWebSocket();

const init = () => {
    let loginInfo = JSON.parse(localStorage.getItem("OCIQ_ACC") || "1");
    if (loginInfo !== 1) {
        formData.account = loginInfo.account;
        formData.password = loginInfo.password;
        formData.platform = loginInfo.platform;
    }
};
init();
// webSocket.openSocket()
const getTicket = () => {
    if (!(formData.account || formData.password)) {
        ElMessage.info("请输入账号和密码");
        return;
    }
    webSocket.send({
        code: BotEvent.on.loginSlider,
        data: {
            account: formData.account,
            password: formData.password,
            platform: formData.platform,
        },
    });
};

const replyTicket = () => {
    if (!formData.ticket) {
        ElMessage.info("请输入ticket");
        return;
    }

    webSocket.send({
        data: {
            ticket: formData.ticket,
            account: formData.account,
            password: formData.password,
            platform: formData.platform,
        },
        code: BotEvent.replay.ticket,
    });
};

// webSocket.websocket.onmessage = (e: any) => {
//     const { code, data, success } = JSON.parse(e.data)
//     console.log(code, data, success);

// }
const getVerificationCode = () => {
    webSocket.send({
        data: {},
        code: BotEvent.replay.sendCode,
    });
    countdownTimer.value = setInterval(() => {
        countdown.value--;
        if (countdown.value < 1) {
            clearInterval(countdownTimer.value as NodeJS.Timeout);
            countdown.value = 60;
        }
    }, 1000);
};
const replyVerificationCode = () => {
    if (!formData.verificationCode) {
        ElMessage.info("请输入验证码");
        return;
    }
    webSocket.send({
        data: {
            verificationCode: formData.verificationCode,
            account: formData.account,
            password: formData.password,
            platform: formData.platform,
        },
        code: BotEvent.replay.replayCode,
    });
};
</script>

<style scoped></style>
