const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')
router.prefix('/qqlogin')
const server = require('../../websocket/index')
const db = require('../../nedb/nedb')
const formatRes = (data, code = 1, msg = '') => {
    return {
        data,
        code,
        msg
    }
}
router.get('/insert', async (ctx) => {
    try {
        let data =  await db('test').insert([
            {
                name: 'yzw',
                age: 20,
                rank: 1,
                _id:1
            }
        ])
        ctx.body = {
            data:data
        }
    } catch (error) {
        console.log(error);
    }
    // fs.readFile(path.join(process.cwd(), "data/1"), () => {
    //     this.em("system.offline.kickoff", { message });
    // });

    // ctx.request.body = path.join(process.cwd())
})
router.get('/query', async (ctx) => {
    let data = await db('test').find()
    ctx.body = {
        data:data
    }
    // fs.readFile(path.join(process.cwd(), "data/1"), () => {
    //     this.em("system.offline.kickoff", { message });
    // });

    // ctx.request.body = path.join(process.cwd())
})

module.exports = router.routes()
