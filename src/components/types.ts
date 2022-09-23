import { spaceProps } from "element-plus";
import { type } from "os";

export interface QQLogin {
    qqNO: string;
    ticket: string;
    phoneCode: string;
}
export interface WebSocketType {}
export enum WebSocketCode {
    register = 1,
}
export enum IBotLoginEvent {
    loginSlider = "system.login.slider",
    loginTicket = "replayTicket",
    needSmsCodeTips = "needCode",
    sendSmsCode = "sendCode",
    receiveSmsCode = "replayCode",
    loginEd = "loginEd",
    loginOut = "logout",
    loginStatus = "loginStatus",
}
export declare enum Platform {
    Android = 1,
    aPad = 2,
    Watch = 3,
    iMac = 4,
    iPad = 5,
}
export const staticName = {
    ACCOUNT_QQ: "MY_ACCOUNT_Q",
};
export const platFormSelect = [
    { l: "Android", v: 1 },
    { l: "aPad", v: 2 },
    { l: "Watch", v: 3 },
    { l: "iMac", v: 4 },
    { l: "iPad", v: 5 },
];
