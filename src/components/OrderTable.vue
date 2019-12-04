<template>
    <div class="w-full">
        <el-table :data="orders" border class="w-10/12 ml-auto mr-auto mt-10">
            <el-table-column prop="id" label="订单号"></el-table-column>
            <el-table-column prop="chipType" label="芯片类型"></el-table-column>
            <el-table-column prop="chipAmount" label="数量"></el-table-column>
            <el-table-column prop="attachedInfo" label="备注"></el-table-column>
            <el-table-column label="" width="120">
                <template slot-scope="scope">
                    <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="订单详情" :visible="detailShow" width="60%" @close="openDetails">
            <OrderDetails v-on:closeDetails="openDetails" :order="anOrder" />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator';
import { Order } from '@/utils/order';
import request from '../utils/request';
import OrderDetails from './OrderDetails.vue';

@Component({
    components: {
        OrderDetails,
    },
})
export default class OrderTable extends Vue {
    @Provide() public orders: Order[] = [];
    @Provide() public detailShow: boolean = false;
    @Provide() public anOrder: Order = {};

    public openDetails() {
        this.detailShow = !this.detailShow;
    }

    public detail(row: Order) {
        this.anOrder = row;
        this.openDetails();
    }

    public getUserID() {
        const userName = localStorage.getItem('userName');
        const token = localStorage.getItem('token');

        if (userName && token) {
            request('/id/' + userName, 'GET', null, token).then((res: any) => {
                this.getData(res.message);
            });
        }
    }

    public getData(id: string) {
        const token = localStorage.getItem('token');
        if (token) {
            request('/order/u/' + id, 'GET', null, token).then((res: any) => {
                console.log(res.message);
                this.orders = res.message;
            });
        }
    }

    private beforeMount() {
        this.getUserID();
    }
}
</script>

<style scoped></style>
