const Koa = require('koa')
const app = new Koa()
const router = require('./src/route/index.js')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static');
const path = require("path")
require('./src/noweb/index')
// const ws = require('./src/websocket/index')
var cors = require('koa2-cors');


app.use(cors())
// process.cwd()
app.use(serve(path.join(__dirname, 'dist')))
app.use(bodyParser())
app.use(router.routes());//启动路由
app.use(router.allowedMethods());
// ws.listen(1126, () => { console.log('1126端口启动') })
app.listen(1125, () => { console.log('1125端口启动') })
