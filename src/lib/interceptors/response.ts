import { getAppEnv } from '@/utils'
import { Storage } from '@supuwoerc/utils'
const tokenStorage = new Storage<TokenState>()
// TODO:添加TS类型
export default [
    (response: any) => {
        const expireCode = [10000004, 10002002]
        const tokenKey = getAppEnv().VITE_APP_TOKEN_KEY as keyof TokenState
        if (!response.data.code) {
            return response.data.data !== undefined
                ? response.data.data
                : response
        } else if (expireCode.includes(response.data.code)) {
            tokenStorage.remove(tokenKey)
            return Promise.reject('请重新登录')
        } else {
            return Promise.reject(response.data.message || response.data.msg)
        }
    },
    (error: any) => {
        return Promise.reject(error.message)
    }
]
