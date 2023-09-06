interface UserInfo {
    avatar: string
    email: string
    gender: number
    mobile: string
    name: string
    uid: number
    roles: Array<number>
}
interface TokenState {
    token: string
}
interface LoginState extends TokenState {
    userInfo: UserInfo
}
