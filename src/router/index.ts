import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteRecordRaw,
} from "vue-router";
import pinia from "../store/index";
import { useBot } from "@/store/botLogin/auth";
import { ElMessage } from "element-plus";
import { mapToMenuRoutes } from "@/util/map-util";
import { toRaw } from "vue";
import { useLogin } from "@/store/normalLogin";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        // component: () => import('@/components/Login/normal-login.vue')
        redirect: "/setting/qqlogin",
        name: "friend",
        meta: {
            title: ["设置", "qq登录"],
        },
    },
    {
        path: "/setting/qqlogin",
        component: () => import("@/components/Login/index.vue"),
        name: "login",
        meta: {
            title: "qq登录",
        },
    },
    // {
    //     path: "/my/friend",
    //     name: "friend",
    //     component: () => import("@/view/main/Friend/Friend.vue"),
    //     meta: {
    //         title: "qq好友",
    //     },
    // },
    // {
    //     name: "group",
    //     path: "/my/group",
    //     component: () => import("@/view/main/Group/Group.vue"),
    //     meta: {
    //         title: "qq群",
    //     },
    // },
    {
        name: "main",
        path: "/main",
        component: () => import("@/view/main/main.vue"),
        meta: {
            title: "qq群",
        },
    },
    {
        name: "group",
        path: "/:pathMatch(.*)*",
        component: () => import("@/components/NoFound/no-found.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
let oneRun = true; //通过oneRun变量控制 避免陷入死循环
router.beforeEach(async (to, from, next) => {
    // 判断有没有登录
    if (oneRun) {
        const menus = await mapToMenuRoutes(useLogin().menuList);
        console.log(menus);
        menus.map((item) => {
            router.addRoute("main", item);
        });
        oneRun = false;
        next(to.path);
        return;
    }
    next();
});

export default router;
