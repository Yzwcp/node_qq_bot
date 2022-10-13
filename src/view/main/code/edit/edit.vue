<template>
  <!--    <el-card>-->
    <div >
        <el-form :inline="true" :model="formInline" >
            <el-form-item label="模块名">
                <el-input v-model="formInline.title" placeholder="" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="formInline.region" placeholder="">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="formInline.title" placeholder="" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
        <MdEditorV3 v-model="value" class="md-editor"  ></MdEditorV3>
    </div>
  <!--    </el-card>-->
</template>

<script lang="ts" setup scope>

import {reactive, ref} from "vue";
const formInline = reactive({})
const value = ref('')
</script>

<style lang="less" scoped>
.md-editor{
  height: 600px;
}
</style>
