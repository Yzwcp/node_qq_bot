import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        // component: () => import('@/components/Login/Login.vue')
        redirect: '/my/friend',
        meta: {
            title: ['设置', 'qq登录']
        }

    },
    {
        path: '/setting/qqlogin',
        component: () => import('@/components/Login/qqLogin.vue'),
        meta: {
            title: 'qq登录'
        }
    },
    {
        path: '/my/friend',
        component: () => import('@/view/Friend/Friend.vue'),
        meta: {
            title: 'qq好友'
        }
    },
    {
        path: '/my/group',
        component: () => import('@/view/Group/Group.vue'),
        meta: {
            title: 'qq群'
        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
