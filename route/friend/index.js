const Router = require('koa-router')
const mime = require('mime-types');
const router = new Router()
router.prefix('/friend')

const fs = require('fs')
const path = require('path')
function sleep() {
    return new Promise((re, rj) => {
        setTimeout(() => {
            re()
        }, 2000)
    })
}
router.get('/query', async (ctx) => {
    await sleep()
    let filePath = path.join(process.cwd(), 'data/1774570823/qrcode.png')
    let file = null;
    try {
        file = fs.readFileSync(filePath); //读取文件
    } catch (error) {
        //如果服务器不存在请求的图片，返回默认图片
        // filePath = path.join(__dirname, '/images/default.png'); //默认图片地址
        // file = fs.readFileSync(filePath); //读取文件	    
    }
    let mimeType = mime.lookup(filePath); //读取图片文件类型
    ctx.set('content-type', mimeType); //设置返回类型
    ctx.body = file


})
module.exports = router.routes()
