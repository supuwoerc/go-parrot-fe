import { useRecoilValue } from 'recoil'
import useCurrentRoute from './useCurrentRoute'
import { getTargetFromTree } from '@supuwoerc/utils'
import { siderbar } from '@/store'
import { ItemType } from '@/store/module/siderbar'
const useCurrentMenu = () => {
    const { pathname } = useCurrentRoute()!
    const sidebarRoutes = useRecoilValue(siderbar.sidebarRoutes)
    const currentMenu = getTargetFromTree<ItemType>(
        sidebarRoutes,
        pathname,
        'key'
    )
    return currentMenu as ItemType & { key: string }
}

export default useCurrentMenu
