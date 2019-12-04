<template>
    <div class="login h-full w-full flex-col flex justify-center">
        <div class="flex bg-white h-auto w-4/12 flex-col self-center m-0 rounded-lg shadow-xl pl-12 pr-12 pb-8 pt-8 -mt-10">
            <p>hello</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import request from '@/utils/request';

@Component({})
export default class Login extends Vue {
    @Provide() public userName: string = '';
    @Provide() public password: string = '';
}
</script>

<style scoped>
.login {
    background-image: url('/14891.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
