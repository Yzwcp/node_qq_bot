import { defineStore } from 'pinia';
import { getCurrentInstance, } from 'vue';
import { service } from '@/network/axios';
import { useRouter } from 'vue-router';
import { useWebSocket } from './webSocket';

type Bot = {
    nickname: string;
    uin: number;
    avatarUrl: string;
    user_id: number;
    sex: string;
    age: number;
    area: string;
    _id: string;
}
type AxiosRes = {
    data?: Partial<Bot>
    code?: number
    msg?: string
}
interface BotPerson {
    bot: Partial<Bot>,
    status: number
}
export const useBot = defineStore('Bot', {
    state: (): BotPerson => {
        return {
            bot: {
                avatarUrl: ''
            },
            status: -1,
        }
    },
    getters: {
        botInfo: (state) => state.status > -1 ? state.bot : {}
    },
    actions: {
        async login(loginInfo: { account: number }) {
            const { data, }: AxiosRes = await service({ url: '/client/profile', params: { uin: loginInfo?.account - 0 } })
            const statusData = await service({ url: '/client/status', params: { uin: loginInfo?.account - 0 } })
            this.bot = data as Object
            this.status = statusData.data.status
            // useRouter().push({ path: '/my/friend' })
        },
        async logout(loginInfo: { account: number }) {
            // localStorage.clear()
            const { data, } = await service({ url: '/client/status', params: { uin: loginInfo?.account - 0 } })
            this.status = data.status
            this.$reset()
            // location.reload()
        }
    }
})