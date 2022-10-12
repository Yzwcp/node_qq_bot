const Router = require('koa-router')
const router = new Router()

const client = require('./client/index.js')
const qqLogin = require('./login/index.js')

router
    .use(client)
    .use(qqLogin)
module.exports = router
