import { defineStore } from 'pinia';
//为一个hook
export const useWebSocket = defineStore('WebSocket', {
    state: () => {
        return {
            websocket: null as any,
            wsUrl: 'ws://127.0.0.1:1126',
            websocketTimeout: 0,
            needReconnect: false
        }
    },
    getters: {

    },
    actions: {
        openSocket() {
            this.websocket = null
            this.needReconnect = true
            if (!this.websocket) {
                this.websocket = new WebSocket(this.wsUrl);
            }
            // 监听websocket
            this.websocket.onmessage = (data: any) => {
                // heartCheck.reset();
                console.log('-onmessage-收到的消息为--', data);
            }

            // 连接已准备好
            this.websocket.onopen = (data: any) => {
                // heartCheck.start();
                console.log('-onopen-连接已准备好--', data);

            }

            // 关闭连接
            this.websocket.onclose = (data: any) => {
                console.log('-onclose-关闭连接--', data);
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
