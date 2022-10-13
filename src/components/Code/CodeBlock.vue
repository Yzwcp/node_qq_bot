<template>
    <el-form :inline="true" :model="formInline" >
        <el-form-item label="名称">
            <el-input v-model="formInline.title" placeholder="" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
const formInline = reactive({})
const onSubmit = () => {
}
</script>

<style scoped lang="less">

</style>
