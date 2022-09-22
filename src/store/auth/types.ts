export interface Bot {
    nickname: string;
    uin: number;
    avatarUrl: string;
    user_id: number;
    sex: string;
    age: number;
    area: string;
    _id: string;
}
export interface AxiosRes {
    data?: Partial<Bot>;
    code?: number;
    msg?: string;
}
export interface BotPerson {
    bot: Partial<Bot>;
    status: number;
}
