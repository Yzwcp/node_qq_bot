<template>
    <el-card>
        <!-- {{profile.userInfo}} -->
        <el-table :data="allData.friendList" v-loading="allData.tableLoading" :style="{width: '100%;'}" height="900">
            <el-table-column prop="nickname" label="qq昵称" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="sex" label="性别">
                <template #default="scope">
                    {{scope.row.sex === 'female'?'女':'男' }}
                </template>
            </el-table-column>
            <el-table-column prop="user_id" label="QQ" />
        </el-table>
    </el-card>
</template>
  
<script lang="ts" setup scope>
import { reactive, getCurrentInstance } from 'vue';
import { useBot } from "@/store/auth";
const allData: any = reactive({
    friendList: [],
    tableLoading: false,

})
const profile = useBot()
const { $axios }: any = getCurrentInstance()?.appContext.config.globalProperties;

const initData = async () => {
    allData.tableLoading = true
    const { data, code } = await $axios({ url: '/client/friend', params: { uin: profile.bot.uin }, method: 'get' })
    if (code === 1) {
        allData.friendList = data
    }
    allData.tableLoading = false

}
initData()

</script>