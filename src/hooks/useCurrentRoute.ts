import { routes } from '@/routes/config'
import { matchRoutes, useLocation } from 'react-router-dom'

const useCurrentRoute = () => {
    const location = useLocation()
    const matchs = matchRoutes(routes, location)
    if (!matchs) {
        return null
    }
    return matchs[matchs.length - 1]
}

export default useCurrentRoute
