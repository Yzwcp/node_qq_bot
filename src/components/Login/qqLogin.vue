<template>
    <el-card>
        <div class="qrCode">
            <div class="qrImg" v-show='onStatus!=="init"'>
                <el-icon @click="refresh()" style="cursor: pointer;">
                    <RefreshRight color='blue' />
                </el-icon>
                <div class="refresh_img_text">刷新二维码</div>
                <div ref="qrCodeRef" class="refresh_img" v-loading="loading.qrLoading">
                </div>
            </div>
            <div style="display: flex;align-items:center">
                <el-button type="primary" @click="wsSend()">
                    {{statusStr}}
                </el-button>
                <el-button type="primary" v-if='onStatus!=="init"' @click="wsSend(onStatusType.login)">
                    扫码完成请确定
                </el-button>
            </div>
        </div>
    </el-card>

</template>
<script lang="ts" setup>

import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { affixProps, FormInstance } from 'element-plus'
import { QQLogin, WebSocketCode } from '../types';
import { RefreshRight } from '@element-plus/icons-vue';
type wsResultType = {
    code: string,
    data: Object | String,
    msg: string
}
enum onStatusType {
    loginQrcode = "login.qrcode",
    loginQrcodeRefresh = "login.qrcode.refresh",
    login = "login",
}
const ws = new WebSocket('ws://127.0.0.1:1126');
let qrCodeRef = ref<HTMLDivElement>()
const { $axios }: any = getCurrentInstance()?.appContext.config.globalProperties;
// const active = ref(0)
const statusStr = ref('获取qq登录二维码')
let onStatus = ref('init')
let wsResult = reactive<wsResultType>({
    code: '',
    data: {},
    msg: '',
})
const loading = reactive({
    qrLoading: false
})
const client = reactive({
    data: {}
})

const qq = reactive<QQLogin>({
    qqNO: '1494993218',
    ticket: '',
    phoneCode: ''
})
ws.onopen = function (e) {
    console.log("连接服务器成功");
}
ws.onclose = function (e) {
    console.log("服务器关闭");
}
ws.onmessage = function (e) {
    console.log(e);

    return
    const [success, code] = e.data.split(':')
    onStatus.value = code
    switch (code) {
        case onStatusType.loginQrcode:
            if (success == 1) {
                reloadQrImg()
            }
            //登录二维码
            break;
        case onStatusType.loginQrcodeRefresh:
            if (success == 1) {
                reloadQrImg()
            }
            break;
        case onStatusType.login:
            if (success == 1) {

            }
            break
        default:
            break;
    }

}
const refresh = () => {
    wsSend(onStatusType.loginQrcodeRefresh)
    reloadQrImg()
}
// 重载图片
const reloadQrImg = () => {
    console.log(qrCodeRef?.value?.childNodes);

    if (qrCodeRef?.value?.childNodes.length) {
        let x = qrCodeRef.value?.removeChild(qrCodeRef.value.childNodes[0])
    }
    var new_img = new Image(100, 100)
    new_img.src = "http://127.0.0.1:1125/friend/query?t=" + new Date().getTime()
    loading.qrLoading = true
    new_img.onload = () => {
        loading.qrLoading = false
    }
    qrCodeRef.value?.appendChild(new_img)
}
const wsSend = (code = onStatusType.loginQrcodeRefresh) => {
    ws.send(JSON.stringify({
        code,
        data: {}
    }))
}

</script>
<style lang="less" scoped>
.qrCode {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 200px;

    .qrImg {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 30px;

        .refresh_img_text {
            font-size: 12px;
            color: blue;
            margin-bottom: 20px;
        }

        .refresh_img {
            width: 100px;
            height: 100px;
        }

    }
}
</style>