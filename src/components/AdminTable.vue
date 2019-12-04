<template>
    <div class="w-full">
        <el-table :data="orders" border class="w-10/12 ml-auto mr-auto mt-10">
            <el-table-column prop="id" label="订单号"></el-table-column>
            <el-table-column prop="chipType" label="芯片类型"></el-table-column>
            <el-table-column prop="chipAmount" label="数量"></el-table-column>
            <el-table-column prop="attachedInfo" label="备注"></el-table-column>
            <el-table-column label="" width="200" label="操作">
                <template slot-scope="scope">
                    <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="acceptOrder(scope.row)" type="text" size="small">接受</el-button>
                    <el-button @click="modify(scope.row)" type="text" size="small">更新</el-button>
                    <el-button @click="tallyOrder(scope.row)" type="text" size="small">结算</el-button>
                    <el-button @click="closeOrder(scope.row)" type="text" size="small">关闭</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="订单详情" :visible="detailShow" width="60%" @close="openDetails">
            <OrderDetails v-on:closeDetails="openDetails" :order="anOrder" />
        </el-dialog>

        <el-dialog title="更新订单情况" :visible="modifyShow" width="40%" @close="openModify">
            <ModifyInfo v-on:closeModify="openModify" :order="anOrder" />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator';
import { Order } from '@/utils/order';
import request from '../utils/request';
import OrderDetails from './OrderDetails.vue';
import ModifyInfo from './ModifyInfo.vue';

@Component({
    components: {
        OrderDetails,
        ModifyInfo,
    },
})
export default class AdminTable extends Vue {
    @Provide() public orders: Order[] = [];
    @Provide() public detailShow: boolean = false;
    @Provide() public modifyShow: boolean = false;
    @Provide() public anOrder: Order = {};

    public openDetails() {
        this.detailShow = !this.detailShow;
    }

    public openModify() {
        this.modifyShow = !this.modifyShow;
    }

    public detail(row: Order) {
        this.anOrder = row;
        this.openDetails();
    }

    public modify(row: Order) {
        this.anOrder = row;
        this.openModify();
    }

    public getData() {
        const token = localStorage.getItem('token');
        if (token) {
            request('/order/all', 'GET', null, token).then((res: any) => {
                console.log(res.message);
                this.orders = res.message;
            });
        }
    }

    public acceptOrder(row: Order) {
        const token = localStorage.getItem('token');
        if (token) {
            request('/order/accept/' + row.id, 'POST', null, token).then((res: any) => {
                if (res.ok) {
                    this.$message.success('成功接受订单！');
                    this.getData();
                } else {
                    this.$message.error(res.message);
                }
            });
        }
    }

    public tallyOrder(row: Order) {
        const token = localStorage.getItem('token');
        if (token) {
            request('/order/' + row.id, 'POST', null, token).then((res: any) => {
                if (res.ok) {
                    this.$message.success('成功结算订单！');
                    this.getData();
                } else {
                    this.$message.error(res.message);
                }
            });
        }
    }

    public closeOrder(row: Order) {
        const token = localStorage.getItem('token');
        if (token) {
            request('/order/' + row.id, 'DELETE', null, token).then((res: any) => {
                if (res.ok) {
                    this.$message.warning('订单已关闭！');
                    this.getData();
                } else {
                    this.$message.error(res.message);
                }
            });
        }
    }

    private beforeMount() {
        this.getData();
    }
}
</script>

<style scoped></style>
