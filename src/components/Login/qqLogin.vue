<template>
    <!--    <el-card>-->
    <!--        <div class="qrCode">-->
    <!--            <div class="qrImg" v-show="onStatus !== 'init'">-->
    <!--                <el-icon @click="refresh()" style="cursor: pointer">-->
    <!--                    <RefreshRight color="blue" />-->
    <!--                </el-icon>-->
    <!--                <div class="refresh_img_text">刷新二维码</div>-->
    <!--                <div-->
    <!--                    ref="qrCodeRef"-->
    <!--                    class="refresh_img"-->
    <!--                    v-loading="loading.qrLoading"-->
    <!--                ></div>-->
    <!--            </div>-->
    <!--            <div style="display: flex; align-items: center">-->
    <!--                <el-button type="primary" @click="wsSend()">-->
    <!--                    {{ statusStr }}-->
    <!--                </el-button>-->
    <!--                <el-button-->
    <!--                    type="primary"-->
    <!--                    v-if="onStatus !== 'init'"-->
    <!--                    @click="wsSend(onStatusType.login)"-->
    <!--                >-->
    <!--                    扫码完成请确定-->
    <!--                </el-button>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </el-card>-->
</template>
<script lang="ts" setup>
// import { reactive, ref, } from 'vue'
// import { RefreshRight } from '@element-plus/icons-vue';
// let qrCodeRef = ref<HTMLDivElement>()
// const statusStr = ref('获取qq登录二维码')
// // 重载图片
// const reloadQrImg = () => {
//     console.log(qrCodeRef?.value?.childNodes);
//
//     if (qrCodeRef?.value?.childNodes.length) {
//         let x = qrCodeRef.value?.removeChild(qrCodeRef.value.childNodes[0])
//     }
//     var new_img = new Image(100, 100)
//     new_img.src = "http://127.0.0.1:1125/friend/query?t=" + new Date().getTime()
//     loading.qrLoading = true
//     new_img.onload = () => {
//         loading.qrLoading = false
//     }
//     qrCodeRef.value?.appendChild(new_img)
// }
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
