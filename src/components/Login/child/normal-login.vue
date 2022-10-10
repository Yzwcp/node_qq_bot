<template>
    <div class="normal_login">
          <el-card>
              <el-form
                      label-width="100px"
                      :model="formData"
                      style="max-width: 800px"
                      :label-suffix="':'"
                      ref="formDataRef"
              >
                  <el-form-item label="账号" prop="account">
                      <el-input v-model="formData.account" style="width: 120px" />
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="formData.password" style="width: 120px" />
                  </el-form-item>
                  <el-form-item >
                      <el-button @click="login">登录</el-button>
                  </el-form-item>
              </el-form>

          </el-card>

    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

import qqAccountLogin from "./child/qqAccountLogin.vue";
import {useLogin} from "@/store/normalLogin";
const normalLogin = useLogin()
const router = useRouter()
const formData = ref({
    account:"",
    password:""
});
const login = () =>{
     normalLogin.login(formData.value,router)
}
</script>

<style scoped></style>
