<template>
    <el-card>
        {{profile.userInfo}}
        <el-table :data="data.allList" :style="{width: '100%;'}" height="900">
            <el-table-column prop="nickname" label="qq昵称" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="sex" label="性别">
                <template #default="scope">
                    {{scope.row.sex==='female'?'女':'男'}}
                </template>
            </el-table-column>
            <el-table-column prop="user_id" label="QQ" />
        </el-table>
    </el-card>
</template>
  
<script lang="ts" setup scope>
import { reactive } from 'vue';
import {useProfile} from '../../store/index';
const data: any = reactive({
    allList: []
})
// 修改值得方法
const profile = useProfile()

// 1.    
//  {{profile.userInfo}}
profile.$patch((state=>{
    state.userInfo={
        d:10
    }
}))
profile.modify()

</script>