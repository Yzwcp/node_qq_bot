
let { axiosGet } = require("../bot/http");
const { self, MessageDeal ,ociq} = require("../bot/hook");
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
    subwaySchedule()
    console.log( e.self_id,"已上线");
});
function subwaySchedule(){
    const temp = {
        message:[{type:'text',text:'5*3*地铁'}],
        autoBot:true,
        user_id:'1774570823'
    }
    scheduleCron('0 50 8,17 * * 1,2,3,4,5',()=>new MessageDeal(temp))
}

self.onMessage(function (e) {
    new MessageDeal(e)
});
