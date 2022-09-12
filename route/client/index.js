const Router = require('koa-router')

const router = new Router()
router.prefix('/client')

router.get('/query', async (ctx) => {
    ctx.body = {
        a: 1
    }
})
module.exports = router.routes()
