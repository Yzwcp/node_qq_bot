

const { createClient, User, Client, Friend, Message, segment } = require("oicq")
const qqAccount = 2079637306
const platform = 3
const password = 'qq......'
const ociq = createClient(qqAccount, { platform })
let { axiosGet } = require('../bot/hook')

ociq.login(password)

const self = {
    onSystemLoginSlider(cb) {
        ociq.on('system.login.slider', cb)
    },
    onSystemLoginDevice(cb) {
        ociq.on('system.login.device', cb)
    },
    onSystemLine(cb) {
        ociq.on('system.online', cb)
    },
    //消息
    onMessage(cb) {
        ociq.on('message', cb)
    },

    formatMessage(e) {
        try {
            return {
                post_type: e.post_type,
                message_id: e.message_id,
                user_id: e.user_id,
                time: e.time,
                seq: e.seq,
                message: e.message,
                raw_message: e.raw_message,
                message_type: e.message_type,
                sender: e.sender,
                group_id: e.group_id,
                group_name: e.group_name,
                sub_type: e.sub_type,
                atme: e.atme,
                atall: e.atall,
                from_id: e.from_id,
                auto_reply: e.auto_reply,
                self_id: e.self_id,
            }
        } catch (error) {
            console.log(error);
        }

    },
    staticName() {
        //1：三餐，2：超市，3：淘宝，4：买菜，5：交通，6：转账|红包，7:话费，8:房租电费，9：消费，10：其他"
        const consumeTypeMap = {
            1: '三餐',
            2: '超市',
            3: '淘宝',
            4: '买菜',
            5: '交通',
            6: '转账|红包',
            7: '话费',
            8: '房租电费',
            9: '消费',
            10: '其他',
        }

        const incomeTypeMap = {
            100: '薪资', 101: '基金', 102: '红包', 104: '其他'
        }
        return { consumeTypeMap, incomeTypeMap }
    },
    keepAccount(e) {
        let { text } = e.message[0]
        let textList = text.split('*')
        let commandStr = ''
        if (textList.length === 3) {
            commandStr = text + "**" + e.user_id
        } else if (textList.length === 4) {
            commandStr = text + "*" + e.user_id
        }
        axiosGet('addDay', { commandStr }).then(res => {
            let data = res.data
            if (res.code === 1) {
                const { consumeTypeMap } = this.staticName()
                let { consumeType, consumeTags, price, note, cTime, countDay, countDayTimes } = data
                const testMessage = [
                    `-消费通知-`,
                    `消费类型:${consumeTypeMap[consumeType]}\n`,
                    `消费标签:${consumeTags}\n`,
                    `消费金额:${price}¥\n`,
                    `今日消费:${countDay}¥\n`,
                    `今日支付:${countDayTimes}次\n`,
                    `记录时间:${cTime}\n`,
                ]
                if (note) testMessage.push(`备注:${note}\n`)
                e.reply(testMessage)
                return
            }
            e.reply([
                '记录失败' + res.msg
            ])

        }).catch(err => {
            console.log(err)
        })
    },
}
//监听账号密码登录
self.onSystemLoginSlider((e) => {
    process.stdin.once("data", ticket => ociq.submitSlider(String(ticket).trim()))
})
//监听账号是否安全登录
// bot.logger.mark("输入密保手机收到的短信验证码后按下回车键继续。");

self.onSystemLoginDevice((e) => {
    ociq.sendSmsCode();
    process.stdin.once("data", verificationCode => ociq.submitSmsCode(String(verificationCode).trim()))
})
//监听账号上线
self.onSystemLine(() => {
    console.log(qqAccount + '已上线');
})
//监听私聊消息
self.onMessage(function (e) {
    const messageData = self.formatMessage(e)
    if (e.post_type === 'message') {
        let { text } = e.message[0]
        //记账标识
        if (text.indexOf('*') > -1) {
            self.keepAccount(e)
        }
        if (text === 'pls') {
            const replayListLs = [
                '--消费类型--\n'
            ]
            const { consumeTypeMap } = self.staticName()
            for (let key of Object.keys(consumeTypeMap)) {
                replayListLs.push(`${key}：${consumeTypeMap[key]}\n`)
            }
            e.reply(replayListLs)

        }
        if (text === 'sls') {
            const replayListLs = [
                '-存储类型-\n'
            ]
            const { incomeTypeMap } = self.staticName()
            for (let key of Object.keys(incomeTypeMap)) {
                replayListLs.push(`${key}：${incomeTypeMap[key]}\n`)
            }
            e.reply(replayListLs)
        }
        if (text === 'ls') {
            const replayListLs = [
                '--命令--\n'
            ]
            const command = {
                "pls": '消费类型(payMoney)',
                "sls": '存储类型(saveMoney)',
                "example": '',
                "1*10*饮料*可乐咖啡": '三餐-价格-标签-备注',
            }
            for (let key of Object.keys(command)) {
                replayListLs.push(`${key}：${command[key]}\n`)
            }
            e.reply(replayListLs)
        }

    }
    // await db(this.uin, 'message').insert(messageData)
})


