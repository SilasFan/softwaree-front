<template>
    <div></div>
</template>

<script>
export default {
    name: 'home',
    mounted() {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('userName') === 'Factory') {
                this.$router.push({ name: 'admin' });
            } else {
                this.$router.push({ name: 'customer' });
            }
        } else {
            this.$router.push({ name: 'login' });
        }
    },
};
</script>
