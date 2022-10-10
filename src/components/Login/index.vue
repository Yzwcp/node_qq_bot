<template>
    <div class="login">
<!--        <qqAccountLogin ref="qqAccRef">1</qqAccountLogin>-->
        <normal-login ref="refNormalLogin"></normal-login>
    </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
// import qqAccountLogin from "./child/qq-account-login.vue";
import normalLogin from "./child/normal-login.vue";

</script>

<style scoped></style>
