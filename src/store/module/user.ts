import { isEqual } from 'lodash'
import { atom } from 'recoil'
import { Storage } from '@supuwoerc/utils'
import { getAppEnv } from '@/utils'

const loginStorage = new Storage<LoginState>()
export const userInfoInit = (): UserInfo => {
    return {
        avatar: '',
        birthday: 0,
        company_name: '',
        department: '',
        email: '',
        employ_type: 0,
        entry_time: 0,
        gender: 0,
        mobile: '',
        name: '',
        read_status: '',
        show_missing_tab: false,
        uid: 0,
        work_place: '',
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
