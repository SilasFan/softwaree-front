<template>
    <div class="p-8 flex flex-col">
        <el-input class="mb-10" v-model="userName" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        <el-input class="mb-10" v-model="companyName" placeholder="请输入您的公司名称" prefix-icon="el-icon-suitcase"></el-input>
        <el-input class="mb-10" v-model="phone" placeholder="请输入您的联系方式" prefix-icon="el-icon-phone"></el-input>
        <el-input class="mb-6" v-model="password" placeholder="请输入密码" prefix-icon="el-icon-lock" type="password"></el-input>

        <el-button type="primary" class="mb-4" @click="register">注册</el-button>

        <el-alert type="error" :title="message" center show-icon @close="close" v-show="alerShow"></el-alert>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import request from '@/utils/request';

@Component({})
export default class Register extends Vue {
    @Provide() public userName: string = '';
    @Provide() public password: string = '';
    @Provide() public companyName: string = '';
    @Provide() public phone: string = '';
    @Provide() public alerShow: boolean = false;
    @Provide() public message: string = '';
    @Provide() private myThis: any = this;

    public close() {
        this.alerShow = false;
    }

    private validate() {
        return this.userName != '' && this.password != '' && this.companyName != '' && this.phone != '';
    }

    public register() {
        if (!this.validate()) {
            this.message = '各个项目不能为空！';
            this.alerShow = true;
            return;
        }

        let data = JSON.stringify({
            userName: this.userName,
            password: this.password,
            phone: this.phone,
            companyName: this.companyName,
        });

        request('/register', 'POST', data, '').then((res: any) => {
            if (!res.ok) {
                this.message = '用户名已存在！';
                this.alerShow = true;
            } else {
                this.myThis.$message.success('注册成功！');
                this.$emit('closeRes');
            }
        });
    }
}
</script>

<style scoped></style>
