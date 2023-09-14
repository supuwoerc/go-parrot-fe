import { Navigate } from 'react-router-dom'
import DefaultLayout from '@/layout/default/index'
import { lazy } from 'react'
import { CustomRouteObject } from '../config'
import { lazyLoad } from '../lazyLoad'

const NpmPackageList = lazy(() => import('@/pages/npm/list'))
const NpmPackageStat = lazy(() => import('@/pages/npm/stat'))

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
        element: <DefaultLayout />,
        meta: {
            title: '数据分析',
            auth: false
        },
        id: 'root',
        children: [
            {
                path: '/npm/packages',
                meta: { title: '仓库列表', auth: false },
                element: lazyLoad(NpmPackageList)
            },
            {
                path: '/npm/stat',
                meta: { title: '仓库下载数据', auth: false },
                element: lazyLoad(NpmPackageStat)
            }
        ]
    }
]
export default npmRoutes
