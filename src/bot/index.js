
const botMap = new Map()
const { createClient, User } = require("oicq")
const bot = createClient(1494993218, { platform: 4 })
const qs = require('qs')
const db = require('../nedb/nedb')

bot
    .on("system.login.slider", function (e) {
        
        console.log(e);
        process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
    })
    .on("system.login.qrcode", function (e) {
        // 标记已经生成登录二维码
        botMap.set('system.login.qrcode', 1)
        this.logger.mark("扫码后按Enter完成登录")
    })
    .on("system.login.error", (e) => {
        console.log(e);
    })
    .on("system.login.device", () => {
        bot.logger.mark("输入密保手机收到的短信验证码后按下回车键继续。");
        bot.sendSmsCode();
        process.stdin.once("data", (input) => {
            bot.submitSmsCode(input.toString());
            resolve();
        });
        })
    .on("system.online",async function () {
        // 你的账号已上线，你可以做任何事
        let friend = []
        let group = []
        for (const key of this.fl.keys()) {
            friend.push({
                ...this.fl.get(key)
            })
        }
        for (const key of this.gl.keys()) {
            group.push({
                ...this.gl.get(key)
            })
        }
        try {
            // 查是否有缓存好友列表、群列表
            let cacheFriend = await db('group').findOne()
            if(!cacheFriend){
                console.log(1);
                await db('group').insert(group)
            }
            let cacheGroup = await db('friend').findOne()
            if(!cacheGroup){
                console.log(2);
                await db('friend').insert(friend)
            }
        } catch (error) {
            console.log(error);
        }
        try {
            let cacheProfile = await db('profile').findOne()
            if(!cacheProfile){
                const user = new User(this, this.uin)
                const simpleInfo = await user.getSimpleInfo()
                await db('profile').insert({
                    nickname:this.nickname,
                    uin: this.uin,
                    avatarUrl: user.getAvatarUrl(),
                    ...simpleInfo
                })
            }
        } catch (error) {
            console.log(error);
        }
        botMap.set('system.online', 1)
        console.log(`来自plugin-online: 我是${this.nickname}(${this.uin})，我有${this.fl.size}个好友，${this.gl.size}个群`)
    })
    .on("internal.error.qrcode", function (e) {
        console.log(e);
    })
    .login('qq......')

const wsCallback = (conn) => {
    conn.on("text", (str) => {
        const { data, code = 'web:err' } = JSON.parse(str)
        // conn.sendText("轮训的返回值："  data) 
        switch (code) {
            case 'login.qrcode.refresh':
                (function () {
                    bot.login().then(res => {
                        let success = -1 
                        success = botMap.get('system.login.qrcode')
                        conn.sendText(`${success}:${code}`)
                    })
                }())

                break;
            case 'login':
                bot.login().then(() => {
                    setTimeout(() => {
                        let success = -1 
                        success = botMap.get('system.online')
                        conn.sendText(`${success}:${code}`)
                    }, 1000)
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