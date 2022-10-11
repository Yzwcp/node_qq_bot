const Router = require('koa-router')
const mime = require('mime-types');
const router = new Router()
const fs = require('fs')
const path = require('path')
router.prefix('/client')
const DB = require('../../nedb/nedb')
const menu =  [{
    children: [
        {
            id: 100,
            name: "用户管理",
            sort: 1,
            parentId: 1,
            type: 2,
            url: "/main/system/user",
            children: [
                {
                    id: 1000,
                    name: "添加用户",
                    parentId: 100,
                    permission: 'system:user:delete',
                    sort: null,
                    type: 3,
                    url: null,
                }
            ]
        }
    ],
    icon: "el-icon-monitor",
    id: 1,
    name: "代码块",
    sort: 1,
    type: 1,
    url: "/main/system",
},{
    children: [
        {
            id: 200,
            name: "代码块",
            sort: 1,
            parentId: 2,
            type: 2,
            url: "/main/javascript/exampleBlock",
        }
    ],
    icon: "el-icon-monitor",
    id: 2,
    name: "javascript",
    sort: 1,
    type: 1,
    url: "/main/javascript",
}]
router.get('/test', async (ctx) => {
    ctx.body = {
        code: 1,
        data: {
            userInfo: ctx.query,
            token: "hesfgesl;kflse,wsadasdael2,e,a;wdaw",
            menuList: menu,
        },
        msg: ''
    }
})
router.get('/loginqrcode', async (ctx) => {
    await sleep()
    let filePath = path.join(__dirname, 'data/1774570823/qrcode.png')
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
    let data = await DB(ctx.query.uin, 'friend').find()
    ctx.body = resultBody(data, 1)

})
router.get('/profile', async (ctx) => {
    let data = await DB(ctx.query.uin, 'profile').findOne()
    ctx.body = resultBody(data, 1)
})
router.get('/group', async (ctx) => {
    let data = await DB(ctx.query.uin, 'group').find()
    ctx.body = resultBody(data, 1)
})
router.get('/message', async (ctx) => {
    let data = await DB(ctx.query.uin, 'message').find()
    ctx.body = resultBody(data, 1)
})
router.get('/status', async (ctx) => {
    let data = await DB(ctx.query.uin, 'status').findOne()
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
