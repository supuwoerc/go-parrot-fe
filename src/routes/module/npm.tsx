import { Navigate } from 'react-router-dom'
import DefaultLayout from '@/layout/default/index'
import { lazy } from 'react'
import { CustomRouteObject } from '../config'
import { lazyLoad } from '../lazyLoad'

const NpmStat = lazy(() => import('@/pages/npm/index'))

const npmRoutes: CustomRouteObject[] = [
    {
        path: '/',
        meta: {
            hidden: true,
            auth: false
        },
        element: <Navigate to={'/npm/stat'} />
    },
    {
        path: '/npm',
        element: <DefaultLayout />,
        meta: {
            title: 'NPM数据分析',
            auth: false
        },
        id: 'root',
        children: [
            {
                path: '/npm/stat',
                meta: { title: '仓库下载数据', auth: false },
                element: lazyLoad(NpmStat)
            }
        ]
    }
]
export default npmRoutes
