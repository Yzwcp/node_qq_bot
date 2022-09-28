
let { axiosGet } = require("../bot/http");
const { self, MessageDeal } = require("../bot/hook");
const {scheduleCron} = require("../bot/schedule");
const {
    createClient,
    User,
    Client,
    Friend,
} = require("oicq");
//监听账号密码登录
self.onSystemLoginSlider((e) => {
    process.stdin.once("data", (ticket) =>
        ociq.submitSlider(String(ticket).trim())
    );
});
//监听账号是否安全登录
// bot.logger.mark("输入密保手机收到的短信验证码后按下回车键继续。");

self.onSystemLoginDevice((e) => {
    ociq.sendSmsCode();
    process.stdin.once("data", (verificationCode) =>
        ociq.submitSmsCode(String(verificationCode).trim())
    );
});

//监听账号上线
self.onSystemLine((e) => {
    // 开启定时任务
    // 6个占位符从左到右分别代表：秒、分、时、日、月、周几 '30 * * * * *'
    // 周一至周五的上午10:15触发
    const p = {
        message:[{type:'text',text:'5*3*地铁'}],
        autoBot:true,
        user_id:'1774570823'}
    try {
        scheduleCron('0 50 8,17 ? * MON-FRI',()=>{
            new MessageDeal(p)
        })
        // scheduleCron('10 * * * * *',()=>{
        //     new MessageDeal(p)
        //
        // })
    }catch (e) {
        console.log(e)
    }
    // conso

    console.log( e.self_id,"已上线");
});

self.onMessage(function (e) {
    try {
        const msgDeal =  new MessageDeal(e)
    }catch (e) {
        console.log(e)
    }

    return
    if (e.post_type === "message") {
        const msgDeal = new MessageDeal(e);
        let { text } = e.message[0];
        //记账标识
        if (text.indexOf("*") > -1) {
            messageDeal.keepAccount(e);
        }
        if (text === "pls") {
            const replayListLs = ["--消费类型--\n"];
            const { consumeTypeMap } = self.staticName();
            for (let key of Object.keys(consumeTypeMap)) {
                replayListLs.push(`${key}：${consumeTypeMap[key]}\n`);
            }
            e.reply(replayListLs);
        }
        if (text === "sls") {
            const replayListLs = ["-存储类型-\n"];
            const { incomeTypeMap } = self.staticName();
            for (let key of Object.keys(incomeTypeMap)) {
                replayListLs.push(`${key}：${incomeTypeMap[key]}\n`);
            }
            e.reply(replayListLs);
        }
        if (text === "ls") {
            const replayListLs = ["--命令--\n"];
            const command = {
                pls: "消费类型(payMoney)",
                sls: "存储类型(saveMoney)",
                example: "",
                "1*10*饮料*可乐咖啡": "三餐-价格-标签-备注",
            };
            for (let key of Object.keys(command)) {
                replayListLs.push(`${key}：${command[key]}\n`);
            }
            e.reply(replayListLs);
        }
    }
    // await db(this.uin, 'message').insert(messageData)
});
