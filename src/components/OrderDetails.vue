<template>
    <div class="flex flex-col">
        <el-row>
            <el-col :span="14">
                <div class="flex flex-col pl-10">
                    <label class="w-full text-sm">订单号：</label>
                    <p class="mt-2 mb-4 text-base font-bold">{{ order.id }}</p>

                    <label class="w-full text-sm">下单时间：</label>
                    <p class="mt-2 mb-4 text-base font-bold">{{ order.createTime }}</p>

                    <label class="w-full text-sm">接受订单时间：</label>
                    <p class="mt-2 mb-4 text-base font-bold">{{ order.acceptTime == null ? '无' : order.acceptTime }}</p>

                    <label class="w-full text-sm">芯片类型：</label>
                    <p class="mt-2 mb-4 text-base font-bold">{{ order.chipType }}</p>

                    <label class="w-full text-sm">芯片数量：</label>
                    <p class="mt-2 mb-4 text-base font-bold">{{ order.chipAmount }}</p>

                    <label class="w-full text-sm">结算时间：</label>
                    <p class="mt-2 mb-4 text-base font-bold">{{ order.tallyTime == null ? '无' : order.tallyTime }}</p>

                    <label class="w-full text-sm">备注：</label>
                    <p class="mt-2 mb-4 text-base font-bold">{{ order.attachedInfo == null ? '无' : order.attachedInfo }}</p>
                </div>
            </el-col>

            <el-col :span="10">
                <el-timeline>
                    <el-timeline-item timestamp="下单信息" placement="top">
                        <el-card>
                            <h4>{{ filterInfo(info.ordered) }}</h4>
                        </el-card>
                    </el-timeline-item>

                    <el-timeline-item timestamp="接单信息" placement="top">
                        <el-card>
                            <h4>{{ filterInfo(info.accept) }}</h4>
                        </el-card>
                    </el-timeline-item>

                    <el-timeline-item timestamp="生产信息" placement="top">
                        <el-card>
                            <h4>{{ filterInfo(info.produce) }}</h4>
                        </el-card>
                    </el-timeline-item>

                    <el-timeline-item timestamp="发货信息" placement="top">
                        <el-card>
                            <h4>{{ filterInfo(info.ship) }}</h4>
                        </el-card>
                    </el-timeline-item>

                    <el-timeline-item timestamp="结算信息" placement="top">
                        <el-card>
                            <h4>{{ filterInfo(info.tally) }}</h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator';
import { Order, parseOrderInfo, OrderInfo } from '@/utils/order';
import request from '../utils/request';

@Component({})
export default class OrderDetails extends Vue {
    @Prop() public order!: Order;
    @Provide() public info: OrderInfo = {};

    public filterInfo(str: string) {
        return str.substring(1, str.length - 1) == 'null' ? '无' : str.substring(1, str.length - 1);
    }

    private beforeMount() {
        if (this.order.produceProgress) {
            this.info = parseOrderInfo(this.order.produceProgress);
        }
    }

    get isAdmin() {
        return this.$route.name == 'admin';
    }
}
</script>

<style scoped>
p,
label {
    text-align: left !important;
}
</style>
