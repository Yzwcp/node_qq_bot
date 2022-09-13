import {defineStore} from 'pinia';
//为一个hook
export  const useProfile = defineStore('profile',{
    state:()=>{
        return{
            userInfo:{d:1}
        }
    },
    getters:{

    },
    actions:{
        modify(){
            this.userInfo = {
                d:6
            }
        }
    }
})
