import { AppProvider } from '@/providers/app'
import { AppRoutes } from '@/routes'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    )
}

export default App
