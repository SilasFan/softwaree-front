<template>
    <div class="ml-auto mr-auto max-w-4xl flex flex-col">
        <label>订单创建</label>
        <input type="text" v-model="info.ordered" />

        <label>订单接受</label>
        <input type="text" v-model="info.accept" />

        <label>订单生产</label>
        <input type="text" v-model="info.produce" />

        <label>订单发货</label>
        <input type="text" v-model="info.ship" />

        <label>订单结算</label>
        <input type="text" v-model="info.tally" />

        <el-button type="primary" class="mt-4" @click="updateOrder">更新</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator';
import { Order, parseOrderInfo, OrderInfo } from '@/utils/order';
import request from '../utils/request';

@Component({})
export default class ModifyInfo extends Vue {
    @Prop() public order!: Order;
    @Provide() public info: OrderInfo = {};
    @Provide() private myThis: any = this;

    public filterInfo(str: string | null | undefined) {
        if (str && str !== undefined) {
            return str.substring(1, str.length - 1) == 'null' ? 'non' : str.substring(1, str.length - 1);
        }
        return '';
    }

    private beforeMount() {
        if (this.order.produceProgress) {
            this.info = parseOrderInfo(this.order.produceProgress);
            this.info.accept = this.filterInfo(this.info.accept);
            this.info.tally = this.filterInfo(this.info.tally);
            this.info.produce = this.filterInfo(this.info.produce);
            this.info.ordered = this.filterInfo(this.info.ordered);
            this.info.ship = this.filterInfo(this.info.ship);
        }
    }

    public updateOrder() {
        let token = localStorage.getItem('token');
        let data = JSON.stringify(this.info);

        if (token) {
            request('/order/' + this.order.id, 'PUT', data, token).then((res: any) => {
                if (res.ok) {
                    this.myThis.$message.success('更新成功！');
                } else {
                    this.myThis.$message.error(res.message);
                }
            });
        }
    }
}
</script>

<style scoped>
label {
    text-align: left;
    margin-bottom: 5px;
}

input {
    border: 1px solid;
    padding: 3px 5px 3px 5px;
    margin-bottom: 17px;
    border-radius: 4px;
}
</style>
