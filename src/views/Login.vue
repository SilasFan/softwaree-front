<template>
    <div class="login h-full w-full flex-col flex justify-center">
        <div class="flex bg-white h-auto w-4/12 flex-col self-center m-0 rounded-lg shadow-xl pl-12 pr-12 pb-8 pt-8 -mt-20">
            <p class="font-mono font-bold mb-16 text-xl">用户登录</p>

            <el-input class="mb-10" v-model="userName" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
            <el-input class="mb-6" v-model="password" placeholder="请输入密码" prefix-icon="el-icon-lock" type="password"></el-input>

            <el-button type="text" class="register" @click="openRegister">还没有账户？点此注册</el-button>
            <el-button type="primary" class="mb-8" @click="login">登录</el-button>

            <el-alert type="error" title="用户名或者密码错误！" center show-icon @close="close" v-show="alerShow"></el-alert>
        </div>

        <el-dialog title="注册账号" :visible="registerShow" width="30%" @close="openRegister">
            <Register v-on:closeRes="openRegister" />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import request from '@/utils/request';
import Register from '@/components/Register.vue';

@Component({
    components: {
        Register,
    },
})
export default class Login extends Vue {
    @Provide() public userName: string = '';
    @Provide() public password: string = '';
    @Provide() public alerShow: boolean = false;
    @Provide() public registerShow: boolean = false;

    public login() {
        let res: any;

        request(
            '/login',
            'POST',
            JSON.stringify({
                userName: this.userName,
                password: this.password,
            }),
            '',
        ).then(data => {
            res = data;
            if (!res.ok) {
                this.alerShow = true;
            } else {
                localStorage.setItem('token', res.message);
                localStorage.setItem('userName', this.userName);
                this.userName = this.password = '';
                alert('login');
                // redirect
            }
        });
    }

    public close() {
        this.alerShow = false;
    }

    public openRegister() {
        this.registerShow = !this.registerShow;
    }
}
</script>

<style scoped>
.login {
    background-image: url('/14891.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.3);
}

.register {
    text-align: right;
    outline: none;
}
</style>
