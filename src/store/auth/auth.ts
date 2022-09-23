import { defineStore } from "pinia";
import { getFriend, getLoginStatus, getProfile } from "@/network/http";
import { IState } from "@/store/auth/types";

export const useBot = defineStore("Bot", {
    state: (): IState => {
        return {
            bot: {
                uin: -1,
            },
            status: -1,
        };
    },
    getters: {
        botInfo: (state) => state.bot,
    },
    actions: {
        async login(loginInfo: { account: number }) {
            const params = { uin: loginInfo?.account - 0 };
            const { data } = await getProfile(params);
            const {
                data: { status },
            } = await getLoginStatus(params);
            this.bot = data;
            this.status = status;
        },
        async logout(loginInfo: { account: number }) {
            const params = { uin: loginInfo?.account - 0 };
            const {
                data: { status },
            } = await getLoginStatus(params);
            this.status = status;
            this.$reset();
        },
    },
});
