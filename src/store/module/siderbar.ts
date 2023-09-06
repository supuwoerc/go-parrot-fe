import { atom, selector } from 'recoil'
import { Storage } from '@supuwoerc/utils'
import { CustomRouteObject } from '@/routes/config'
import { cloneDeep } from 'lodash'
import { common } from '..'
import {
    MenuDividerType,
    MenuItemGroupType,
    MenuItemType,
    SubMenuType
} from 'antd/es/menu/hooks/useItems'

export type ItemType =
    | MenuItemType
    | SubMenuType
    | MenuItemGroupType
    | MenuDividerType

const siderbarStorage = new Storage<Siderbar>({
    prefix: 'siderbar'
})
const siderbarCollapsedInit = () => {
    return siderbarStorage.get('collapsed') || false
}
// 侧边栏是否折叠
export const siderbarCollapsed = atom<boolean>({
    key: 'siderbarCollapsed',
    default: siderbarCollapsedInit(),
    effects: [
        ({ onSet }) => {
            onSet(value => {
                siderbarStorage.set('collapsed', value)
            })
        }
    ]
})

function routesFilter(routes: CustomRouteObject[]): CustomRouteObject[] {
    return routes.filter(route => {
        const hidden = Boolean(route.meta?.hidden)
        const wrapChildren = routesFilter(route.children ?? [])
        if (!hidden) {
            route.children = wrapChildren
        }
        return !hidden
    })
}

function generateMenu(
    routes: CustomRouteObject[]
): Array<ItemType & { key: string }> {
    return routes.map(item => {
        const key = `${item.path}`
        const children = generateMenu(item.children ?? [])
        return {
            label: item.meta?.title ?? '未配置菜单',
            key,
            icon: item.meta?.icon,
            children: children.length ? children : null
        }
    })
}

export const sidebarRoutes = selector<Array<ItemType & { key: string }>>({
    key: 'sidebarRoutes',
    get: ({ get }) => {
        const appSyncRoutes = get(common.appSyncRoutes)
        const routes = routesFilter(cloneDeep(appSyncRoutes))
        const menu = generateMenu(routes)
        return menu
    }
})
