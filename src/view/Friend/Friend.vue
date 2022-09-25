<template>
    <el-card>
        <!-- {{profile.userInfo}} -->
        <el-table
            :data="allData.friendList"
            v-loading="tableLoading"
            :style="{ width: '100%;' }"
            height="900"
        >
            <el-table-column prop="nickname" label="qq昵称" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="sex" label="性别">
                <template #default="scope">
                    {{ scope.row.sex === "female" ? "女" : "男" }}
                </template>
            </el-table-column>
            <el-table-column prop="user_id" label="QQ" />
        </el-table>
    </el-card>
</template>

<script lang="ts" setup scope>
import { reactive, ref } from "vue";
import { useBot } from "@/store/auth/auth";
import { getFriend } from "@/network/http";
const allData: any = reactive({
    friendList: [],
});

const bot = useBot();
const tableLoading = ref(false);
const initData = async () => {
    const p = { uin: bot.botInfo.uin };
    const { data, code } = await getFriend(p, tableLoading);
    if (code === 1) allData.friendList.push(...data);
};

initData();
</script>
