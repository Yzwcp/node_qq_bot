/** 性别 */
export declare type Gender = "male" | "female" | "unknown";
/** 陌生人资料 */
export interface StrangerInfo {
    user_id: number;
    nickname: string;
}
/** 好友资料 */
export interface FriendInfo extends StrangerInfo {
    _id: string;
    sex: Gender;
    remark: string;
    class_id: number;
}
