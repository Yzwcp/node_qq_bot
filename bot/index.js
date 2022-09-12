
const botMap = new Map()
const { createClient, User } = require("oicq")
const bot = createClient(1774570823, { platform: 3 })
const qs = require('qs')
bot
    .on("system.login.qrcode", function (e) {
        botMap.set('system.login.qrcode', 1)
        this.logger.mark("扫码后按Enter完成登录")
    })
    .on("system.login.error", (e) => {
        console.log(e);
    })
    .on("system.login.device", (e) => {
        console.log(e);

    })
    .on("system.online", function () {
        // 你的账号已上线，你可以做任何事
        let data = {}
        let fl = {}
        let gl = {}
        let classes = {}

        for (const key of this.fl.keys()) {
            fl[key] = this.fl.get(key)
        }
        for (const key of this.gl.keys()) {
            gl[key] = this.gl.get(key)
        }
        for (const key of this.classes.keys()) {
            classes[key] = this.classes.get(key)
        }
        data = {
            fl, gl, classes
        }
        const user = new User(this, this.uin)

        botMap.set('system.online', JSON.stringify({
            user: {
                nickname: this.nickname,
                uin: this.uin,
                avatarUrl: user.getAvatarUrl()
            },
            data
        }))
        console.log(`来自plugin-online: 我是${this.nickname}(${this.uin})，我有${this.fl.size}个好友，${this.gl.size}个群`)
    })
    .on("internal.error.qrcode", function (e) {
        console.log(e);
    })
    .login()

const wsCallback = (conn) => {
    conn.on("text", (str) => {
        const { data, code = '' } = JSON.parse(str)
        // conn.sendText("轮训的返回值：" + data) 
        switch (code) {
            case 'login.qrcode':
                (function () {
                    let botMapCode = botMap.get('system.login.qrcode')
                    conn.sendText(JSON.stringify({
                        code: code,
                        data: botMapCode,
                        msg: ''
                    }))
                }())
                break;
            case 'login.qrcode.refresh':
                (function () {
                    bot.login().then(res => {
                        let botMapCode = botMap.get('system.login.qrcode')
                        conn.sendText(JSON.stringify({
                            code: code,
                            data: botMapCode,
                            msg: ''
                        }))
                    })
                }())

                break;
            case 'login':

                bot.login().then(() => {
                    setTimeout(() => {
                        let botMapData = botMap.get('system.online')
                        conn.sendText(JSON.stringify({
                            code: code,
                            data: botMapData,
                            msg: ''
                        }))
                    }, 2000)
                })
                break;

            default:
                break;
        }
        // let log = JSON.stringify(bot.getLogList())
        // console.log(log);
        // setTimeout(() => {
        //     conn.sendText(JSON.stringify({
        //         code: code,
        //         data: log,
        //         msg: 'log'
        //     }))
        // }, 5000)
    })
    conn.on("close", () => {
        console.log("关闭连接")
    });
    conn.on("error", () => {
    });
}
module.exports = {
    bot,
    botMap,
    wsCallback
}