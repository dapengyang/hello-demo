import {getToken,setToken} from '@/utils/auth'
import {login} from '@/api/user'

const user = {
    namespaced: true,
    state: {
        token:getToken()
    },
    mutations: {
        SET_TOKEN:(state,token)=>{
            state.token=token
        }
    },

    actions: {
        userLogin({commit},userInfo){
            // console.log('userInfo: ', userInfo);
            return new Promise((resolve,reject)=>{
                login(userInfo).then(resp=>{
                    // console.log('resp: ', resp);
                    if(resp.success){
                        setToken(resp.data.token)
                        commit('SET_TOKEN',resp.data.token)
                        resolve(resp.data)
                    }
                    reject(resp.reason)
                }).catch(err=>{
                    console.log('userLogin err: ', err);
                    reject(err)
                })
            })
        }
    },
 
    getters: {
    }
}
 
export default user