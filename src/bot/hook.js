
const axios = require('axios');
const p = (form)=>{
    return new Promise((resolve,rejeck)=>{
        axios({
            url:'https://umep.ltd/acc',
            data:form,
            method:'post'
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            rejeck(err)
        })
    })
}
function axiosGet(action,d) {
    let body = {
        ex:{action},
        data:d
    }
    return p(body)
}
axiosGet('queryDay',{commandStr:'1*20*晚餐**1774570823'}).then(res=>{
    console.log(res)
})

module.exports = {
    axiosGet
}

const consumeTypeMap = {
    1:'三餐',
    2:'超市',
    3:'淘宝',
    4:'买菜',
    5:'交通',
    6:'转账|红包',
    7:'话费',
    8:'房租电费',
    9:'消费',
    10:'其他',
}
//
// for (const key of ) {
//     console.log(key)
//     console.log(consumeTypeMap[key])
// }
