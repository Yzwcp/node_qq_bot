const Router = require('koa-router')
const router = new Router()

const friend = require('./friend/index.js')
const qqLogin = require('./qqlogin/index.js')

router
    .use(friend)
    .use(qqLogin)



module.exports = router
