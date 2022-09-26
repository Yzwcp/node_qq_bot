
const { createClient, User, Client, Friend,Message,segment } = require("oicq")
const db = require('../nedb/nedb')
let ociq = new WeakMap()

let {axiosGet} = require('./hook')
const self = {
    uin: '',
    test(){
        const op =createClient(1222)
        op.on('message',(e)=>{})
    },
    onSystemLoginSlider(cb) {
        ociq.on('system.login.slider', cb)
    },
    onSystemLoginDevice(cb) {
        ociq.on('system.login.device', cb)
    },
    onSystemLine(conn, data) {
        ociq.on('system.online', async function () {
            self.uin = this.uin

            let lineStatus = await db(this.uin, 'status').find()
            if (lineStatus.length === 0) {
                await db(this.uin, 'status').insert({
                    status: 1
                })
            } else {
                await db(this.uin, 'status').update({ status: -1 }, { $set: { status: 1 } })
            }
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

                let cacheFriend = await db(this.uin, 'group').find()
                if (cacheFriend.length === 0) {
                    this.logger.mark("缓存朋友列表");
                    await db(this.uin, 'group').insert(group)
                }
                let cacheGroup = await db(this.uin, 'friend').find()
                if (cacheGroup.length === 0) {
                    this.logger.mark("缓存群列表");

                    await db(this.uin, 'friend').insert(friend)
                }
            } catch (error) {
                console.log(error);
            }
            try {
                let cacheProfile = await db(this.uin, 'profile').find();
                if (cacheProfile.length === 0) {
                    const user = new User(this, this.uin)
                    const simpleInfo = await user.getSimpleInfo()
                    this.logger.mark("个人信息");
                    await db(simpleInfo.user_id, 'profile').insert({
                        nickname: this.nickname,
                        uin: this.uin,
                        avatarUrl: user.getAvatarUrl(),
                        ...simpleInfo
                    })
                }
            } catch (error) {
                console.log(error);
            }
            sendData(conn, { status: this.status, ...data }, 'loginEd')

        })
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
    staticName(){
        //1：三餐，2：超市，3：淘宝，4：买菜，5：交通，6：转账|红包，7:话费，8:房租电费，9：消费，10：其他"
        const consumeTypeMap = {
            1:'三餐',
            2:'超市',
            3:'淘宝',
            4:'买菜',
            5:'交通',
            6:'转账|红包',
            7:'话费',
            8:'房租电费',
            9:'消费',
            10:'其他',
        }

        const incomeTypeMap = {
            100:'薪资',101:'基金',102:'红包',104:'其他'
        }
        return {consumeTypeMap,incomeTypeMap}
    },
    keepAccount(e){
        let {text} = e.message[0]
        let textList = text.split('*')
        let commandStr = ''
        if(textList.length===3){
            commandStr = text+"**"+e.user_id
        }else if(textList.length===4){
            commandStr = text+"*"+e.user_id
        }
        axiosGet('addDay',{commandStr}).then(res=>{
            let data = res.data
            if(res.code===1){
                const {consumeTypeMap} = this.staticName()
                let {consumeType,consumeTags,price,note,cTime,countDay,countDayTimes} = data
                const testMessage = [
                    '\n',
                    `消费类型:${consumeTypeMap[consumeType]}\n`,
                    `消费标签:${consumeTags}\n`,
                    `消费金额:${price}¥\n`,
                    `今日消费:${countDay}¥\n`,
                    `今日支付:${countDayTimes}次\n`,
                    `记录时间:${cTime}\n`,
                ]
                if(note)testMessage.push(`备注:${note}\n`)
                e.reply(testMessage)
                return
            }
            e.reply([
                '记录失败'+ res.msg
            ])

        }).catch(err=>{
            console.log(err)
        })
        // axiosGet('queryDay',{}).then(res=>{
        //     let data = res.data
        //     if(res.code===1){
        //         let { salary, deposit,daytotal,note,cTime} = data
        //         const testMessage = [
        //             `消费类型:${consumeTypeMap[consumeType]}\n`,
        //             `消费标签:${consumeTags}\n`,
        //             `消费金额:${price}¥\n`,
        //             `记录时间:${cTime}\n`,
        //             `备注:${note}\n`,
        //         ]
        //         e.reply(testMessage)
        //         return
        //     }
        //     e.reply([
        //         '记录失败'+ res.msg
        //     ])
        //
        // }).catch(err=>{
        //     console.log(err)
        // })

        // {
        //     "_id": "633104dbd2b91200012df061",
        //     "consumeType": 1,
        //     "consumeTags": "午饭",
        //     "qqer": 1494993218,
        //     "price": 30,
        //     "createTime": 1664156896836,
        //     "updateTime": 1664156896836,
        //     "note": "1494993218",
        //     "cTime": "2022-09-26 09:48:16",
        //     "uTime": "2022-09-26 09:48:16"
        // }
    },
}
const wsCallback = (conn) => {
    conn.on("text", async (str) => {
        const { data, code = null } = JSON.parse(str)
        console.log('shou', str);

        switch (code) {
            case 'ping':
                sendData(conn, {}, 'ping')
                break;
            case 'system.login.slider':
                ociq = createClient(data.account, { platform: data.platform || 4 })
                await ociq.login(data.password)
                //监听账号密码登录
                self.onSystemLoginSlider((e) => sendData(conn, { ticket: e.url }, code))
                //监听账号是否安全登录
                self.onSystemLoginDevice((e) => sendData(conn, {}, 'needCode'))
                //监听账号上线
                self.onSystemLine(conn, data)
                //监听私聊消息
                self.onMessage( function (e) {
                    const messageData = self.formatMessage(e)
                    if(e.post_type === 'message'){
                        let {text} = e.message[0]
                        //记账标识
                        console.log(text)
                        if(text.indexOf('*')>-1){
                            self.keepAccount(e)
                        }
                        if(text.indexOf('ls')>-1){
                            console.log(1)
                            const replayListLs = [
                                '-消费类型-\n'
                            ]
                            const {consumeTypeMap} = self.staticName()
                            for (let key  of Object.keys(consumeTypeMap)) {
                                replayListLs.push(`${key}:${consumeTypeMap[key]}\n`)
                            }
                            console.log(replayListLs)
                            e.reply(replayListLs)

                        }


                    }
                    // await db(this.uin, 'message').insert(messageData)
                    sendData(conn, messageData, 'message')
                })
                break;
            case 'sendCode':
                ociq.sendSmsCode();
                break;
            case 'replayCode':
                ociq.submitSmsCode(data.verificationCode.toString());
                break
            case 'replayTicket':
                ociq.submitSlider(String(data.ticket).trim())
                break;
            case 'loginStatus':
                let lineStatus = null
                if (data.account) {
                    lineStatus = await db(data.account, 'status').findOne()
                }
                let st = lineStatus ? lineStatus.status : -1
                sendData(conn, { account: data.account, status: st }, ociq.status > 0 ? 'loginStatus' : "")
                break
            case 'logout':
                setTimeout(() => {
                    ociq.logout().then(async () => {
                        await db(self.uin, 'status').update({ status: 1 }, { $set: { status: -1 } })
                        sendData(conn, { status: -1, account: self.uin }, code)
                    })
                }, 3000)
                break;
            default:
                break;
        }
        // bot.on('message.private', function (e) {
        //     sendData(conn, '1 ')
        // })
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
    conn.on('connect', (e) => {
        console.log('connect');
        console.log(e);
    })
    conn.on("close", () => {
        console.log("关闭连接")
    });
    conn.on("error", () => {
    });
}

function sendData(c, data, code = '-1') {
    console.log('send', JSON.stringify({ data, code }));
    c.sendText(data instanceof String ? data : JSON.stringify({ data, code }))
}
module.exports = {
    wsCallback,
    self
}