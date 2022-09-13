const Router = require('koa-router')
const mime = require('mime-types');
const router = new Router()
const fs = require('fs')
const path = require('path')
router.prefix('/client')
const db = require('../../nedb/nedb')

router.get('/test', async (ctx) => {
    let data = await db('profile').find()
    ctx.body = {
        data
    }
})
router.get('/loginqrcode', async (ctx) => {
    await sleep()
    let filePath = path.join(process.cwd(), 'data/1774570823/qrcode.png')
    let file = null;
    try {
        file = fs.readFileSync(filePath); //读取文件
    } catch (error) {
        //如果服务器不存在请求的图片，返回默认图片
        // filePath = path.join(__dirname, '/images/default.png'); //默认图片地址
        // file = fs.readFileSync(filePath); //读取文件	    
        console.log(error);
    }
    let mimeType = mime.lookup(filePath); //读取图片文件类型
    ctx.set('content-type', mimeType); //设置返回类型
    ctx.body = file
})
router.get('/friend', async (ctx) => {
    let data = await db('friend').find()
    ctx.body = resultBody(data, 1)

})
router.get('/profile', async (ctx) => {
    let data = await db('profile').findOne()
    ctx.body = resultBody(data, 1)
})
function sleep() {
    return new Promise((re, rj) => {
        setTimeout(() => {
            re()
        }, 2000)
    })
}
function resultBody(data = {}, code = 1, msg = '') {
    return {
        code, data, msg
    }
}

module.exports = router.routes()
