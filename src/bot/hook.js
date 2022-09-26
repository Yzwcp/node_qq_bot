
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
