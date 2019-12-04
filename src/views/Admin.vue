<template>
    <div class="h-full w-full flex flex-col">
        <el-container>
            <el-header style="padding: 0px;">
                <el-menu mode="horizontal" default-active="/admin" router background-color="#409EFF" text-color="#FFFFFF" active-text-color="#FFFFFF">
                    <el-menu-item index="/admin" style="margin-left: 30px;">所有订单</el-menu-item>
                    <el-menu-item class="signout">
                        <el-button type="text" style="color:#909399;" icon="el-icon-position" @click="logout">退出</el-button>
                    </el-menu-item>
                </el-menu>
            </el-header>

            <el-main>
                <AdminTable />
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import AdminTable from '@/components/AdminTable.vue';

@Component({
    components: {
        AdminTable,
    },
})
export default class Admin extends Vue {
    public logout() {
        localStorage.clear();
        this.$router.push('/login');
    }
}
</script>

<style>
.signout {
    float: right !important;
    margin-right: 10px;
}
.signout button {
    outline: none;
    color: white !important;
}

.el-icon-position {
    color: white !important;
}
</style>
