import { matchRoutes, useLocation, useRoutes } from 'react-router-dom'
import { routes } from './config'
// import { Storage } from '@supuwoerc/utils'
import { getAppEnv } from '@/utils'
import { useMemo, useEffect, useState } from 'react'
// import { userInfoInit } from '@/store/module/user'
import { useRecoilValue } from 'recoil'
import { common } from '@/store'
// import ServerError from '@/pages/500'
import SkeletonLayout from '@/layout/skeleton'

// const loginStorage = new Storage<LoginState>()

const InitAppState: React.FC<BasicFC> = ({ children }) => {
    const [showLoading, setShowLoading] = useState(true)
    // const localtion = useLocation()
    // const tokenKey = getAppEnv().VITE_APP_TOKEN_KEY as keyof LoginState
    // const token = loginStorage.get(tokenKey)
    // const matchs = matchRoutes(routes, localtion)
    // const isNeedLogin = matchs?.some(item => {
    //     const route = item.route
    //     return Boolean(route.meta?.auth)
    // })

    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    // useEffect(() => {
    //     if (token) {
    //         if (isNeedLogin && !isLogin) {
    //             // TODO：去登录
    //         }
    //     } else {
    //         // TODO:获取账户信息
    //     }
    // }, [isNeedLogin, isLogin])
    // loading ||
    if (showLoading) {
        return <SkeletonLayout />
    }
    // if (error) {
    //     return <ServerError fullscreen />
    // }
    return <>{children}</>
}

const BeforeEach: React.FC<BasicFC> = ({ children }) => {
    const location = useLocation()
    const pageTitle = useMemo(() => {
        const matchs = matchRoutes(routes, location) ?? []
        const validMatchs = matchs.map(item => {
            return item.route.meta?.title
        })
        const [title] = validMatchs.filter(Boolean)
        return title ?? getAppEnv().VITE_APP_TITLE
    }, [location])
    useEffect(() => {
        document.title = pageTitle
        // TODO:记录pageView
    }, [pageTitle])
    return <>{children}</>
}

// 当前展示的角色内的路由
const RouteView = () => {
    const syncRoutes = useRecoilValue(common.appSyncRoutes)
    const element = useRoutes(syncRoutes)
    return element
}
// TODO:区分403和404的情况
export const AppRoutes = () => {
    return (
        <InitAppState>
            <BeforeEach>
                <RouteView />
            </BeforeEach>
        </InitAppState>
    )
}
