export default [
    (config: any) => {
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
]
