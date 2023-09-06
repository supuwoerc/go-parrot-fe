import { message } from 'antd'
export default [
    (config: any) => {
        return config
    },
    (error: any) => {
        if (error && error.config && error.config.showError) {
            message.error('请求错误')
        }
        return Promise.reject(error)
    }
]
