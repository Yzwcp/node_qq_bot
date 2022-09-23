import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import pinia from "../store/index";
import { useBot } from "@/store/auth/auth";
import { ElMessage } from "element-plus";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        // component: () => import('@/components/Login/Login.vue')
        redirect: "/my/friend",
        name: "friend",
        meta: {
            title: ["设置", "qq登录"],
        },
    },
    {
        path: "/setting/qqlogin",
        component: () => import("@/components/Login/Login.vue"),
        name: "login",
        meta: {
            title: "qq登录",
        },
    },
    {
        path: "/my/friend",
        name: "friend",
        component: () => import("@/view/Friend/Friend.vue"),
        meta: {
            title: "qq好友",
        },
    },
    {
        name: "group",
        path: "/my/group",
        component: () => import("@/view/Group/Group.vue"),
        meta: {
            title: "qq群",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
const bot = useBot(pinia);
router.beforeEach((to, from, next) => {
    // 判断有没有登录
    console.log(to);
    if (to.path === "/setting/qqlogin") return next();
    if (!bot.botInfo._id) {
        // ElMessage.error('请登录')
        setTimeout(() => {
            router.push({ path: "/setting/qqlogin" });
        }, 1000);
        next();
    } else {
        next();
    }
});

export default router;
