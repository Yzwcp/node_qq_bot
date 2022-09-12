const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')
router.prefix('/qqlogin')
const server = require('../../websocket/index')

const formatRes = (data, code = 1, msg = '') => {
    return {
        data,
        code,
        msg
    }
}
router.get('/query', async (ctx) => {

    let res = null
    // fs.readFile(path.join(process.cwd(), "data/1"), () => {
    //     this.em("system.offline.kickoff", { message });
    // });

    ctx.request.body = path.join(process.cwd())
})


module.exports = router.routes()
