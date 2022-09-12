const Koa = require('koa')
const app = new Koa()
const router = require('./route/index.js')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const ws = require('./websocket/index')



// const { bot } = require("./bot/index.js")
app.use(cors())

app.use(bodyParser())

app.use(router.routes());//启动路由
app.use(router.allowedMethods());

// app.use((ctx, next) => {
//   if (ctx.request.method === 'GET') {
//     bot
//       .on("system.login.qrcode", function (e) {
//         this.logger.mark("扫码后按Enter完成登录")
//         process.stdin.once("data", () => {
//           this.login()
//         })
//         ctx.response.body = e

//       })
//       .login()
//   }
// })
ws.listen(1126, () => { console.log('1126端口启动') })
app.listen(1125, () => { console.log('1125端口启动') })