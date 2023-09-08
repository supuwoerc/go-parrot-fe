import createRequest from '@/lib/axios'

const getDownloads = (pkg: string) =>
    createRequest().get('/api/public/npm/downloads', {
        params: {
            package: pkg
        }
    })

export default { getDownloads }
