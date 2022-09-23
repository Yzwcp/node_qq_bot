export interface IBotProfile {
    nickname?: string;
    uin: number;
    avatarUrl?: string;
    user_id?: number;
    sex?: string;
    age?: number;
    area?: string;
    _id?: string;
}
export interface IState {
    bot: IBotProfile;
    status: number;
}
