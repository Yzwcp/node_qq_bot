const Router = require('koa-router')
const router = new Router()
const {formatRes} = require('../../util/tools')
router.prefix('/login')

router.get('/normal', async (ctx) => {
    const data = [{
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
        name: "系统管理",
        sort: 1,
        type: 1,
        url: "/main/system",
    },{
        children: [
            {
                id: 200,
                name: "javascript",
                sort: 1,
                parentId: 2,
                type: 2,
                url: "/main/javascript/block",
            }
        ],
        icon: "el-icon-monitor",
        id: 2,
        name: "代码块",
        sort: 1,
        type: 1,
        url: "/main/javascript",
    },{
        children: [
            {
                id: 300,
                name: "代码块",
                sort: 1,
                parentId: 3,
                type: 2,
                url: "/main/code/list",
            }
        ],
        icon: "el-icon-monitor",
        id: 3,
        name: "代码管理",
        sort: 1,
        type: 1,
        url: "/main/code",
    }]
    const d = {
        userInfo: ctx.query,
        token: "hesfgesl;kflse,wsadasdael2,e,a;wdaw",
        menuList: data,
    }
    ctx.body = formatRes(d)
})
module.exports = router.routes()
