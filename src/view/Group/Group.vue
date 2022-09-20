<template>
    <el-card>
        <el-table :data="allData.groupList" v-loading="allData.tableLoading" :style="{width: '100%;'}" height="900">
            <el-table-column prop="group_name" label="群名称">
                <template #default="scope">
                    {{scope.row.group_name}} <el-tag type="info">{{scope.row.group_id}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="owner_id" label="群主qq号" />
            <el-table-column prop="max_member_count" label="群人数">
                <template #default="scope">
                    {{scope.row.member_count}}/{{scope.row.max_member_count}}
                </template>
            </el-table-column>
            <el-table-column prop="last_join_time" label="加入时间">
                <template #default="scope">
                    {{new Date(scope.row.last_join_time * 1000).toLocaleDateString()}}
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
  
<script lang="ts" setup scope>
import { useBot } from '@/store/auth';
import { reactive,getCurrentInstance  } from 'vue'
const allData: any = reactive({
    groupList: [],
    tableLoading: false,
})
const { $axios }: any = getCurrentInstance()?.appContext.config.globalProperties;
const profile = useBot()
const initData = async () => {
    allData.tableLoading = true
    const { data, code } = await $axios({ url: '/client/group', method: 'get', params: { uin: profile.bot.uin } })
    allData.tableLoading = false
    if (code === 1) {
        allData.groupList = data
    }

}

initData()

</script>