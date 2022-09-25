import { spaceProps } from "element-plus";
import { type } from "os";

export interface QQLogin {
    qqNO: string;
    ticket: string;
    phoneCode: string;
}
export enum IBotLoginEvent {
    /*获取滑块验证*/
    loginSlider = "system.login.slider",
    /*提交ticket 并登录*/
    loginTicket = "replayTicket",
    /*触发安全登录 需要密保手机发送验证码登录*/
    needSmsCodeTips = "needCode",
    /*发送验证码 60秒倒计时*/
    sendSmsCode = "sendCode",
    /*填写验证码验证登录*/
    receiveSmsCode = "replayCode",
    /*登录成功*/
    loginEd = "loginEd",
    /*退出登录*/
    loginOut = "logout",
    /*检查后台登录状态*/
    loginStatus = "loginStatus",
}
export declare enum Platform {
    Android = 1,
    aPad = 2,
    Watch = 3,
    iMac = 4,
    iPad = 5,
}
/*静态变量*/
export const staticName = {
    WEB_SOCKET_URL: import.meta.env.VITE_APP_WEB_SOCKET_URL,
    ACCOUNT_QQ: "MY_ACCOUNT_Q",
};
/*登录标识 推荐imac*/
export const platFormSelect = [
    { l: "Android", v: 1 },
    { l: "aPad", v: 2 },
    { l: "Watch", v: 3 },
    { l: "iMac", v: 4 },
    { l: "iPad", v: 5 },
];
