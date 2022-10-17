const db = require("../nedb/nedb");
const {axiosGet} = require("../network/http");
const {
    createClient,
} = require("oicq");
const qqAccount = 1774570823;
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


module.exports = {
    self:new Self(),
    ociq
}
