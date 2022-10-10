import { Router, useRouter } from "vue-router";
import { defineStore, PiniaPluginContext } from "pinia";
import { INormalLogin } from "@/components/types";
import { getNormalLoginInfo } from "@/network/http";
import { mapToMenuRoutes } from "@/util/map-util";
import { toRaw } from "vue";
import router from "@/router";

export const useLogin = defineStore("normalLogin", {
    state: () => {
        return {
            keepCache: true,
            userInfo: {},
            token: "",
            menuList: [],
        };
    },
    actions: {
        async login(info: INormalLogin) {
            const { data, code } = await getNormalLoginInfo(info);
            if (code === 1) {
                this.userInfo = data.userInfo;
                this.token = data.token;
                this.menuList = data.menuList;
                //拿到路由映射表
                // const router = useRouter();
            }
        },
    },
});