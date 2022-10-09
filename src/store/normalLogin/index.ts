import { defineStore, PiniaPluginContext } from "pinia";
import { INormalLogin } from "@/components/types";
import { getNormalLoginInfo } from "@/network/http";

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
            }
        },
    },
});
