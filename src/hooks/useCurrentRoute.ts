import useCurrentRoutes from './useCurrentRoutes'

const useCurrentRoute = () => {
    const matchs = useCurrentRoutes()
    return matchs[matchs.length - 1] ?? null
}

export default useCurrentRoute
