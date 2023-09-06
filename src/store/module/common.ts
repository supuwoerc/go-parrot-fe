import { CustomRouteObject, routes } from '@/routes/config'
import { selector } from 'recoil'
import { user } from '..'
import { cloneDeep } from 'lodash'

// 路由的过滤方法
function routesFilter(
    user: UserInfo,
    routes: CustomRouteObject[]
): CustomRouteObject[] {
    const { roles: userRoles = [] } = user
    return routes.filter(route => {
        const isDispenseRole =
            !route.meta?.auth || (route.meta.roles ?? []).length === 0
        const routeNeedRoles = route.meta?.roles ?? []
        const roleIsExist = routeNeedRoles.some(item =>
            userRoles.includes(item)
        )
        const wrapChildren = routesFilter(user, route.children ?? [])
        const existPermission =
            isDispenseRole || roleIsExist || wrapChildren.length > 0
        if (existPermission) {
            route.children = wrapChildren
        }
        return existPermission
    })
}
export const appSyncRoutes = selector<CustomRouteObject[]>({
    key: 'appSyncRoutes',
    get: ({ get }) => {
        const userInfo = get(user.userInfo)
        const syncRoutes = routesFilter(userInfo, cloneDeep(routes))
        return syncRoutes
    }
})
