const db = require("../nedb/nedb");
const {axiosGet} = require("./http");
const {
    createClient,
} = require("oicq");
const qqAccount = 2079637306;
const platform = 3;
const password = "qq......";
const ociq = createClient(qqAccount, { platform });
ociq.login(password);
class Self{
    uin
    constructor(cb) {
    }
    /*密码登录*/
    onSystemLoginSlider(cb) {
        ociq.on('system.login.slider', cb)
    }
    /*安全登录*/
    onSystemLoginDevice(cb) {
        ociq.on('system.login.device', cb)
    }
    /* 上线*/
    onSystemLine(cb) {
        ociq.on('system.online', cb)
    }
    /*消息监听*/
    onMessage(cb) {
        ociq.on('message', cb)
    }
}
class MessageDeal{
    static type;
    static text;
    userId
    replayListLs = [];
    reply
    autoBot
    constructor(e) {
        console.log(e)
        this.autoBot = e.autoBot
        this.userId = e.user_id
        this.reply = e.reply  ? e.reply : null
        const {type,text} = e.message[0]
        this.type = type
        this.text = text
        this.replayListLs = []
        this.exeInit()

    }
    /*显示消费类型*/
    pls(){
        this.replayListLs.push("--消费类型--")
        const { consumeTypeMap } = this.staticName();
        for (let key of Object.keys(consumeTypeMap)) {
            this.replayListLs.push(`${key}：${consumeTypeMap[key]}`);
        }
    }
    /*显示存储类型*/
    sls(){
        this.replayListLs.push("--存储类型--")
        const { incomeTypeMap } = this.staticName();
        for (let key of Object.keys(incomeTypeMap)) {
            this.replayListLs.push(`${key}：${incomeTypeMap[key]}`);
        }
    }
    ls(){
        this.replayListLs.push("--命令--")
        const commandTemp = {
            pls: "消费类型",
            sls: "存储类型",
            used:'使用存款',
            als:'全部信息',
            example: "payMoney",
            "1*10*饮料*可乐咖啡": "三餐-价格-标签-备注",
            example2: "saveMoney",
            "100*8000*1500*1000": "薪资-金额-需存款-上月还款",
            "104*200*": "小金库加200",
            example3: "used",
            "ex:used 200": "使用存款200",
        };
        for (let key of Object.keys(commandTemp)) {
            this.replayListLs.push(`${key}：${commandTemp[key]}`);
        }
    }
    /*查询所有信息*/
    als(){
        this.reqServer('queryDay','*',(data)=>{
            const {
                day,
                salary,//小金库
                deposit,//需存款
                daytotal,//今日总消费
                lastMonthPayment,//上月还款
                sinceTheBeginningMonth,//本月至今总消费 每日消费 加 上月还款 包括房租
                monthPayTimes,//本月支付次数
                time,
                remainAlimony,
                alimony,//生活费 薪资-上月还款-需存款
                week,//本周消费数据
                byshxf
            } = data
            return [
                `--财政Tips--`,
                `本月总进帐：${salary}¥`,
                `本月总存款：${deposit}¥`,
                `本月总消费：${sinceTheBeginningMonth}¥`,
                `本月生活费：${alimony}¥`,
                `----------------------`,
                `本月生活消费：${byshxf}¥`,
                `本周生活消费：${week}¥`,
                `今日生活消费：${daytotal}¥`,
                `本月剩余生活费：${remainAlimony}¥`,
                `查询一时间：${time}`
            ]
        })
    }
    /*挪用存款*/
    used(){
        let price = this.text.split(' ')[1]

        if(Number(price)===0)return this.sendReplayListLs('命令无效')
        this.reqServer('useDeposit','used*'+price,(data)=>{
            const {depositNew,depositOld} = data
           return [
                '存款变化通知',
                `本次提取存款：${depositOld-depositNew}¥`,
                `本月存款余额：${depositNew}¥`,
            ]

        })
    }
    exeInit(){
        /*识别到消费或者存款*/

        if(this.text.indexOf('used')>-1 ){
            this.used()
        }
        if (this.text.split('*').length>2) {
            this.consumptionAndSavings()
        }
        switch (this.text) {
            case "pls":
                this.pls()
                break;
            case "sls":
                this.sls()
                break;
            case "ls":
                this.ls()
                break
            case 'als':
                this.als()
                break
        }
        this.sendReplayListLs()

    }
    sendReplayListLs(err=null){
        console.log("err",err)
        if(err) {
            ociq.pickFriend('1774570823').sendMsg([err]).then(r => console.log('发送成功'))
            return
        }

        if(this.replayListLs.length !==0){
            let sendMsgList = []
            this.replayListLs.map(item=>{
                sendMsgList.push(item+'\n')
            })
            ociq.pickFriend('1774570823').sendMsg(sendMsgList).then(r => console.log('发送成功'))
            // this.reply.reply(sendMsgList);
        }
    }
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
    }
    /*记账功能*/
    reqServer(action,commandStr,cb) {
        axiosGet(action, { commandStr }).then(res => {
            if (res.code === 1) {
                const testMessage = cb(res.data)
                this.replayListLs.push(...testMessage)
            }else{
                this.replayListLs.push('记录失败' + res.msg)
            }

            this.sendReplayListLs()
        }).catch(err => {
            this.sendReplayListLs('记录失败catch')
        })
    }
    consumptionAndSavings(){
        let textList = this.text.split('*')
        let commandStr = ''
        /*没备注*/
        if (textList.length === 3) {
            commandStr = this.text + "**" + this.userId
        } else if (textList.length === 4) {
            /*有备注*/
            commandStr = this.text + "*" + this.userId
        }else{
            this.sendReplayListLs('命令格式错误')
            return
        }
        /*消费*/
        if(Number(textList[0])<99){
            this.reqServer('addDay',commandStr,(data)=>{
                const { consumeTypeMap } = this.staticName()
                let { consumeType, consumeTags, price, note, cTime, countDay, countDayTimes } = data
                const testMessage = [
                    `--消费通知--`,
                    `消费类型：${consumeTypeMap[consumeType]}`,
                    `消费标签：${consumeTags}`,
                    `消费金额：${price}¥`,
                    `今日消费：${countDay}¥`,
                    `今日支付：${countDayTimes}次`,
                    `记录时间：${cTime}`,
                ]
                if (note) testMessage.push(`备注:${note}`)
                return testMessage
            })
        }
        /*每月存款*/
        if(Number(textList[0])>99){
            this.reqServer('setMonthSalary',commandStr,(data)=>{
                const { incomeTypeMap } = this.staticName()
                let { salary, incomeType,deposit, lastMonthPayment, cTime,remain } = data
                return [
                    `--存款通知--`,
                    `存款类型：${incomeTypeMap[incomeType]}`,
                    `存款金额：${salary}¥`,
                    `当月应存：${deposit}¥`,
                    `上月还款：${lastMonthPayment}¥`,
                    `还款剩余：${remain}¥`,
                    `记录时间：${cTime}`,
                ]
            })
        }
    }
}


module.exports = {
    self:new Self(),
    MessageDeal,
    ociq
}
