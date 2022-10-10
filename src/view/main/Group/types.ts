/** 群资料 */
export interface GroupInfo {
    group_id: number;
    group_name: string;
    member_count: number;
    max_member_count: number;
    owner_id: number;
    admin_flag: boolean;
    last_join_time: number;
    last_sent_time?: number;
    shutup_time_whole: number;
    shutup_time_me: number;
    create_time?: number;
    grade?: number;
    max_admin_count?: number;
    active_member_count?: number;
    update_time: number;
}
