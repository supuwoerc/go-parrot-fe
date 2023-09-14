import { routes } from '@/routes/config'
import { matchRoutes, useLocation } from 'react-router-dom'

const useCurrentRoutes = () => {
    const location = useLocation()
    const matchs = matchRoutes(routes, location)
    if (!matchs) {
        return []
    }
    return matchs
}
export default useCurrentRoutes
