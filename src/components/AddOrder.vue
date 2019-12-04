<template>
    <div class="w-8/12 ml-auto mr-auto max-w-4xl">
        <h2 class="font-bold text-lg mb-8">创建订单</h2>
        <el-form>
            <el-form-item label="芯片类型">
                <el-input type="text" v-model="order.chipType" />
            </el-form-item>

            <el-form-item label="芯片数量">
                <el-input v-model="order.chipAmount" />
            </el-form-item>

            <el-form-item label="备注">
                <el-input type="text" v-model="order.attachedInfo" />
            </el-form-item>

            <el-form-item label="请在下单前上传您的设计图">
                <el-upload action="http://localhost:8080/backend/order/file" :limit="1" :file-list="files" :show-file-list="false" auto-upload :headers="upHeader" :on-success="uploadSuccess">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item class="mt-10">
                <el-button type="primary" @click="getUserID">提交订单</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Order } from '@/utils/order';
import request from '../utils/request';

@Component({})
export default class AddOrder extends Vue {
    @Provide() order: Order = {};
    @Provide() files: any = [];

    get upHeader() {
        const token = localStorage.getItem('token');
        return {
            Authorization: token,
        };
    }

    public uploadSuccess(response: any, file: any, list: any) {
        this.order.edafileLocation = response.message;
        this.$message.success('上传成功！');
    }

    public createOrder() {
        if (!this.order.edafileLocation) {
            this.$message.error('没有上传文件！');
            return;
        }
        let data = JSON.stringify(this.order);

        let token = localStorage.getItem('token');
        this.order.chipAmount = Number(this.order.chipAmount);
        if (token) {
            request('/order', 'POST', data, token).then((res: any) => {
                if (!res.ok) {
                    this.$message.error(res.message);
                } else {
                    this.$message.success('创建成功！');
                    //this.$router.push('/customer');
                }
            });
        }
    }

    public getUserID() {
        const userName = localStorage.getItem('userName');
        const token = localStorage.getItem('token');

        if (userName && token) {
            request('/id/' + userName, 'GET', null, token).then((res: any) => {
                this.order.customerID = Number(res.message);
                this.createOrder();
            });
        }
    }
}
</script>

<style scoped></style>
