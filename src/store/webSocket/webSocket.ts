import { defineStore } from "pinia";
import { IBotLoginEvent, staticName } from "@/components/types";
import { useBot } from "../botLogin/auth";
import { IWebSocketResult } from "@/store/webSocket/types";
import util from "@/util/util";
export const useWebSocket = defineStore("WebSocket", {
    state: () => {
        return {
            websocket: new WebSocket(staticName.WEB_SOCKET_URL),
            websocketTimeout: 0,
            needReconnect: true,
            code: "",
            data: {
                ticket: "",
            },
            timeout: 10000, // 定时发送socket
            timeoutSend: 0, // 发送socket延迟函数
            serverTimeoutNumber: 0, //延迟关闭连接
            loading: true,
        };
    },
    getters: {
        gSelfData: (state) => state,
        gLoading: (state) => state.loading,
    },
    actions: {
        send(text: IWebSocketResult | string) {
            if (this.websocket.readyState !== 1) return console.log("发送失败");

            if (typeof text === "string") return this.websocket.send(text);
            this.websocket.send(JSON.stringify(text));
        },
        reset() {
            this.clear();
            this.start();
        },
        start() {
            // socket连接发送

            const self = this;
            this.timeoutSend = window.setTimeout(() => {
                self.send({ data: { _t: new Date().getTime() }, code: "ping" });
                self.serverTimeoutNumber = window.setTimeout(() => {
                    if (self.websocket) {
                        self.websocket.close();
                    }
                }, self.timeout);
            }, this.timeout);
        },
        clear() {
            //清除定时器
            clearTimeout(this.timeoutSend);
            clearTimeout(this.serverTimeoutNumber);
        },
        async callBack({ code, data }: IWebSocketResult) {
            switch (code) {
                case IBotLoginEvent.loginEd:
                    await useBot().login(data);
                    util.betterStorage(staticName.ACCOUNT_QQ).set(data);
                    break;
                case IBotLoginEvent.loginOut:
                    await useBot().logout(data);
                    break;
                case IBotLoginEvent.loginStatus:
                    await useBot().login(data);
                    break;
                default:
                    break;
            }
        },
        async openSocket() {
            if (this.websocket.readyState !== 1)
                this.websocket = new WebSocket(staticName.WEB_SOCKET_URL);
            this.needReconnect = true;
            // 连接已准备好
            this.websocket.onmessage = (e: any) => {
                console.log(e);
                this.reset();
                let d = JSON.parse(e.data);
                if (d.code !== "ping") {
                    this.code = d.code;
                    this.data = d.data;
                    this.callBack(d);
                }
                //10秒ping下后台 防止掉线
                console.log("在线");
                //已登录后
                // 查看登录状态
            };
            this.websocket.onopen = (data: any) => {
                console.log(data);
                this.loading = false;
                this.start();
                let loginInfo = util.betterStorage(staticName.ACCOUNT_QQ).get();

                if (loginInfo) {
                    this.send({
                        code: "loginStatus",
                        data: {
                            account: loginInfo.account,
                            password: loginInfo.password,
                            platform: loginInfo.platform,
                        },
                    });
                }
            };
            // 关闭连接
            this.websocket.onclose = (data: any) => {
                console.log("-onclose-关闭连接--", data);
                this.loading = true;
                this.reconnect();
            };
            // 错误处理
            this.websocket.onerror = (data: any) => {
                console.log("-onerror-错误处理--", data);
            };
        },
        reconnect() {
            if (this.needReconnect) {
                this.websocketTimeout = window.setTimeout(() => {
                    console.log("重新连接");
                    this.openSocket();
                }, 1000);
            }
        },
    },
});
