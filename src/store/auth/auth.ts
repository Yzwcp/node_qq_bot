import { defineStore } from "pinia";
import { getCurrentInstance } from "vue";
import { service } from "@/network/axios";
import { useRouter } from "vue-router";
import { useWebSocket } from "../webSocket/webSocket";

export const useBot = defineStore("Bot", {
    state: () => {
        return {
            bot: {},
            status: -1,
        };
    },
    getters: {
        botInfo: (state) => (state.status > -1 ? state.bot : {}),
    },
    actions: {
        async login(loginInfo: { account: number }) {
            const { data } = await service({
                url: "/client/profile",
                params: { uin: loginInfo?.account - 0 },
            });
            const statusData = await service({
                url: "/client/status",
                params: { uin: loginInfo?.account - 0 },
            });
            this.bot = data as Object;
            this.status = statusData.data.status;
        },
        async logout(loginInfo: { account: number }) {
            const { data } = await service({
                url: "/client/status",
                params: { uin: loginInfo?.account - 0 },
            });
            this.status = data.status;
            this.$reset();
        },
    },
});
