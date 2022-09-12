const { createClient } = require("oicq")
const onWsText = (str) => {
    const data = JSON.parse(str)
    console.log(data);
    // conn.sendText("轮训的返回值：" + data)
    if (data.bc == 1) {
        const bot = createClient(data.qqNO, { platform: 3 })
        bot
            .on("system.login.slider", function (e) {
                console.log(e);
                conn.sendText("轮训的返回值：" + JSON.stringify(this))

                // process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
            })
            .on("system.login.device", () => {
                bot.logger.mark("输入密保手机收到的短信验证码后按下回车键继续。");
                bot.sendSmsCode();
                process.stdin.once("data", (input) => {
                    bot.submitSmsCode(input.toString());
                    resolve();
                });
            })
            .on("system.online", function () {
                // 你的账号已上线，你可以做任何事
                new botSelf(this)
                console.log(`来自plugin-online: 我是${this.nickname}(${this.uin})，我有${this.fl.size}个好友，${this.gl.size}个群`)
            })
        bot.login('qq......')
    }
}
module.exports = {
    onWsText
}