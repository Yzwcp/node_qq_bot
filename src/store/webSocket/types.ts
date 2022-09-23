export interface IState {
    websocket: WebSocket;
    needReconnect: boolean;
    websocketTimeout: number;
    code: string;
    data: any;
    timeout: number;
    timeoutSend: number;
    serverTimeoutNumber: number;
    loading: boolean;
}
export interface IWebSocketResult {
    code: string;
    data: any;
}
export interface IWebSoketReceive {
    account: number;
    password: string;
    platform: number;
    status: number;
}
