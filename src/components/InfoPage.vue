<template>
    <div class="h-full w-full flex flex-col justify-center bg-gray-300">
        <i class="el-icon-warning-outline" />
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator';

@Component({})
export default class InfoPage extends Vue {
    @Prop() public message!: string;
}
</script>

<style scoped></style>
