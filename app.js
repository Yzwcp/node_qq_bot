const Koa = require('koa')
const app = new Koa()
const router = require('./src/route/index.js')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const ws = require('./src/websocket/index')
app.use(cors())
app.use(bodyParser())
app.use(router.routes());//启动路由
app.use(router.allowedMethods());
ws.listen(1126, () => { console.log('1126端口启动') })
app.listen(1125, () => { console.log('1125端口启动') })