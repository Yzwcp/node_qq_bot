
let { axiosGet } = require("../network/http");
const { self ,ociq} = require("../bot/hook");
const {MessageDeal} =require("../bot/message")
const {scheduleCron} = require("../util/schedule");
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
    console.log( e.self_id,"已上线");
});
subwaySchedule()

function subwaySchedule(){
    console.log("发送定时任务成功")

    const temp = {
        message:[{type:'text',text:'5*2.7*地铁'}],
        autoBot:true,
        user_id:'1774570823'
    }
    scheduleCron('0 50 8,17 * * 1,2,3,4,5',()=>{
        console.log("发送定时任务成功")
        // 定时任务
        new MessageDeal(temp)
    })
    function newIntervel() {
        setTimeout(function () {
            const h = new Date().getHours()
            const m = new Date().getMinutes()
            console.log(h+' '+m)
            newIntervel()//调用自身
        }, 1000*60*10)
    }
    newIntervel()
}

self.onMessage(function (e) {
    new MessageDeal(e)
});
