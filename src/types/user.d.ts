interface UserInfo {
    avatar: string
    birthday: number
    company_name: string
    department: string
    email: string
    employ_type: number
    entry_time: number
    gender: number
    mobile: string
    name: string
    read_status: string
    show_missing_tab: boolean
    uid: number
    work_place: string
    roles: Array<number>
}
interface TokenState {
    token: string
}
interface LoginState extends TokenState {
    userInfo: UserInfo
}
