import createRequest from '@/lib/axios'

const getDownloads = () => createRequest().get('/api/public/npm/downloads')

export default { getDownloads }
