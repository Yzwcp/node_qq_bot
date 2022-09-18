import { spaceProps } from "element-plus"
import { type } from "os"

export interface QQLogin {
    qqNO: string,
    ticket: string,
    phoneCode: string
}
export interface WebSocketType {

}
export enum WebSocketCode {
    register = 1,
}
export namespace BotEvent {
    export enum replay {
        ticket = 'replayTicket',
        sendCode = 'sendCode',
        replayCode = 'replayCode'
    }
    export enum on {
        loginSlider = 'system.login.slider',
        needCode = 'needCode',
        logined = 'logined'
    }
}
export declare enum Platform {
    Android = 1,
    aPad = 2,
    Watch = 3,
    iMac = 4,
    iPad = 5
}
export const platFormSelect = [{ l: 'Android', v: 1, }, { l: 'aPad', v: 2, }, { l: 'Watch', v: 3, }, { l: 'iMac', v: 4, }, { l: 'iPad', v: 5, }]