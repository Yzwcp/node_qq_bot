//fn1请求发送成功执行的函数
//fn2请求发送失败执行的函数
// axios.interceptors.request(fn1,fn2)
// axios.interceptors.response(fn1,fn2)R
import mRequest from "@/network";
import { IBotProfile } from "@/store/botLogin/types";
import { IAxiosRes } from "@/network/types";
import { FriendInfo } from "@/view/main/Friend/types";
import { GroupInfo } from "@/view/main/Group/types";
import { Ref } from "vue";
import { INormalLogin, INormalLoginRes } from "@/components/types";

type IParams = {
    uin: number;
};
export function getProfile(params: IParams): Promise<IAxiosRes<IBotProfile>> {
    return mRequest.get({
        url: "/client/profile",
        params: params,
    });
}
export function getLoginStatus(params: IParams): Promise<IAxiosRes> {
    return mRequest.get({
        url: "/client/status",
        params: params,
    });
}

export function getFriend(
    params: IParams,
    loading?: Ref<boolean>
): Promise<IAxiosRes<FriendInfo[]>> {
    return mRequest.get({
        url: "/client/friend",
        params: params,
        loading,
    });
}
export function getGroup(
    params: {
        uin: number;
    },
    loading?: Ref<boolean>
): Promise<IAxiosRes<GroupInfo[]>> {
    return mRequest.get({
        url: "/client/group",
        params: params,
        loading,
    });
}

export function getNormalLoginInfo(
    params: INormalLogin,
    loading?: Ref<boolean>
): Promise<IAxiosRes<INormalLoginRes>> {
    return mRequest.get({
        url: "/client/test",
        params: params,
        loading,
    });
}
