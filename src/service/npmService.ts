import createRequest from '@/lib/axios'
import { FormFilter } from '@/pages/npm/stat'

const getDownloads = (payload: FormFilter) =>
    createRequest().get<NpmDownloads>('/api/public/npm/downloads', {
        params: {
            ...payload
        }
    })

export default { getDownloads }
