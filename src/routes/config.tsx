import { lazy } from 'react'
import DefaultLayout from '@/layout/default/index'
const NotFound = lazy(() => import('@/pages/404/index'))
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'
import npmRoutes from './module/npm'
import { lazyLoad } from './lazyLoad'
interface CustomRouteFields {
    meta?: {
        title?: string
        auth: boolean //配合roles使用
        roles?: Array<number>
        icon?: React.ReactNode
        hidden?: boolean
    }
}
type AppIndexRouteObject = IndexRouteObject & CustomRouteFields
type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
    CustomRouteFields & {
        children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
    }

export type CustomRouteObject = AppIndexRouteObject | AppNonIndexRouteObject

export const routes: CustomRouteObject[] = [
    ...npmRoutes,
    {
        path: '*',
        element: <DefaultLayout />,
        meta: {
            hidden: true,
            auth: false
        },
        children: [
            {
                path: '*',
                meta: { title: '404', auth: false },
                element: lazyLoad(NotFound)
            }
        ]
    }
]
