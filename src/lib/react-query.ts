import { QueryClient, DefaultOptions } from '@tanstack/react-query'
import { message } from '@/providers/message'
const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: false,
        refetchOnWindowFocus: false,
        retry: false,
        onError(err) {
            message.error(`${err}`)
        }
    }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
