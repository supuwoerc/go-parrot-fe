import { isEqual } from 'lodash'
import { atom } from 'recoil'
import { Storage } from '@supuwoerc/utils'
import { getAppEnv } from '@/utils'

const loginStorage = new Storage<LoginState>()
export const userInfoInit = (): UserInfo => {
    return {
        avatar: '',
        email: '',
        gender: 0,
        mobile: '',
        name: '',
        uid: 0,
        roles: []
    }
}
export const userInfo = atom<UserInfo>({
    key: 'userInfo',
    default: userInfoInit(),
    effects: [
        ({ onSet }) => {
            onSet(value => {
                if (isEqual(userInfoInit(), value)) {
                    loginStorage.remove(
                        getAppEnv().VITE_APP_TOKEN_KEY as keyof LoginState
                    )
                }
            })
        }
    ]
})
