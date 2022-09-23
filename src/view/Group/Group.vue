<template>
    <el-card>
        <el-table
            :data="allData.groupList"
            v-loading="tableLoading"
            :style="{ width: '100%;' }"
            height="900"
        >
            <el-table-column prop="group_name" label="群名称">
                <template #default="scope">
                    {{ scope.row.member_count }}
                    <el-tag type="info">{{ scope.row.group_id }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="owner_id" label="群主qq号" />
            <el-table-column prop="max_member_count" label="群人数">
                <template #default="scope">
                    {{ scope.row.member_count }}/{{
                        scope.row.max_member_count
                    }}
                </template>
            </el-table-column>
            <el-table-column prop="last_join_time" label="加入时间">
                <template #default="scope">
                    {{
                        new Date(
                            scope.row.last_join_time * 1000
                        ).toLocaleDateString()
                    }}
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script lang="ts" setup scope>
import { useBot } from "@/store/auth/auth";
import { reactive,ref, getCurrentInstance } from "vue";
import MRequest from "@/network";
import {getFriend, getGroup} from "@/network/http";
import {GroupInfo} from "@/view/Group/types";
type IAllData ={
    groupList:Array<GroupInfo>
}
const allData:IAllData  = reactive({
    groupList: [],
});
const tableLoading = ref(false)
const bot = useBot();
const initData = async () => {
    const p = { uin: bot.botInfo.uin }
    const { data, code } = await getGroup( p,tableLoading )
    if (code === 1) allData.groupList.push(data)
};

initData();
</script>
