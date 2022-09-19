import { defineStore } from 'pinia';
import { BotEvent } from '../components/types';
import { useBot } from './auth';

type Logined = {
    account: number,
    password: string,
    platform: number,
    status: number,
}
//为一个hook
export const useWebSocket = defineStore('WebSocket', {
    state: () => {
        return {
            websocket: null as any,
            wsUrl: 'ws://127.0.0.1:1126',
            websocketTimeout: 0,
            needReconnect: true,
            code: '',
            data: {
                ticket: ''
            },
            timeout: 10000, // 定时发送socket
            timeoutSend: 0, // 发送socket延迟函数
            serverTimeoutNumber: 0, //延迟关闭连接
            loading: true,
        }
    },
    getters: {
        g_loading: (state) => state.loading
    },
    actions: {
        send(text: object | string) {
            console.log(text);

            this.websocket && this.websocket.send(text instanceof String ? text : JSON.stringify(text))
        },

        reset() {
            this.clear();
            this.start();
        },
        start() { // socket连接发送

            const self = this;
            this.timeoutSend = window.setTimeout(() => {
                // console.log(1);
                if (self.websocket) {
                    self.websocket.send(JSON.stringify({ data: { _t: new Date().getTime() }, code: 'ping' }));
                    self.serverTimeoutNumber = window.setTimeout(() => {
                        // console.log(2);
                        if (self.websocket) {
                            // console.log(3)
                            self.websocket.close()
                        }
                    }, self.timeout);
                }
            }, this.timeout);
        },
        clear() { //清除定时器
            clearTimeout(this.timeoutSend);
            clearTimeout(this.serverTimeoutNumber);
        },
        openSocket() {
            this.websocket = null
            this.needReconnect = true
            if (!this.websocket) {
                this.websocket = new WebSocket(this.wsUrl);
            }
            // 监听websocket
            this.websocket.onmessage = (e: any) => {
                console.log('在线');

                this.reset();
                let d = JSON.parse(e.data)
                //10秒ping下后台 防止掉线
                if (d.code !== 'ping') {
                    this.code = d.code
                    this.data = d.data
                }
                //已登录后
                if (d.code === 'logined') {
                    useBot().login(d.data)
                    localStorage.setItem('OCIQ_ACC', JSON.stringify(d.data))

                }
                // 查看登录状态
                if (d.code === 'loginStatus') {
                    // 小于0 就是没登录
                    if (d.data.status < 0) {
                        // 取账号密码缓存 自动登录
                        let loginInfo: Logined = JSON.parse(localStorage.getItem('OCIQ_ACC') || "[]")
                        if (loginInfo) {
                            this.send({
                                code: BotEvent.on.loginSlider,
                                data: {
                                    account: loginInfo.account,
                                    password: loginInfo.password,
                                    platform: loginInfo.platform
                                },
                            })
                        }
                    } else {
                        // 后台有登录就去取缓存数据
                        useBot().login(d.data)

                    }

                }
                if (d.code === 'logout') {
                    useBot().logout(d.data)
                }
            }

            // 连接已准备好
            this.websocket.onopen = (data: any) => {
                this.loading = false
                this.start();
                let loginInfo: Logined = JSON.parse(localStorage.getItem('OCIQ_ACC') || "[]")
                if (loginInfo) {
                    this.send({
                        code: 'loginStatus',
                        data: {
                            account: loginInfo.account,
                            password: loginInfo.password,
                            platform: loginInfo.platform
                        },
                    })
                }

                // let loginInfo: Logined = JSON.parse(localStorage.getItem('OCIQ_ACC') || "[]")
                // if (loginInfo) {
                //     this.send({
                //         code: BotEvent.on.loginSlider,
                //         data: {
                //             account: loginInfo.account,
                //             password: loginInfo.password,
                //             platform: loginInfo.platform
                //         },
                //     })
                // }

                // console.log('-onopen-连接已准备好--', data);

            }

            // 关闭连接
            this.websocket.onclose = (data: any) => {
                console.log('-onclose-关闭连接--', data);
                this.loading = true
                this.reconnect()
            }

            // 错误处理
            this.websocket.onerror = (data: any) => {
                console.log('-onerror-错误处理--', data);
            }
        },
        reconnect() {
            if (this.needReconnect) {
                this.websocketTimeout = window.setTimeout(() => {
                    console.log("重新连接");
                    this.openSocket();
                }, 1000);
            }
        }
    }
})
