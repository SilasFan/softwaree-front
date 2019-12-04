import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/customer',
        component: () => import('@/views/Customer.vue'),
        children: [
            {
                path: '/',
                name: 'customer',
                component: () => import('@/components/OrderTable.vue'),
            },
            {
                path: 'new',
                name: 'neworder',
                component: () => import('@/components/AddOrder.vue'),
            },
        ],
        beforeEnter: (to, from, next) => {
            const userName = localStorage.getItem('userName');
            if (localStorage.getItem('token') != null && userName != null && userName !== 'Factory') {
                next();
            } else {
                router.go(-1);
            }
        },
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/Admin.vue'),
        beforeEnter: (to, from, next) => {
            const userName = localStorage.getItem('userName');
            if (localStorage.getItem('token') != null && userName != null && userName === 'Factory') {
                next();
            } else {
                from();
            }
        },
    },
];

const router = new VueRouter({
    routes,
});

export default router;
