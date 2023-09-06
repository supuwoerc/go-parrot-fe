import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import requestInterceptors from './interceptors/request'
import responseInterceptors from './interceptors/response'
import { getAppEnv } from '@/utils'
import { Storage } from '@supuwoerc/utils'
import queryString from './query-string'
const [requestResolve, requestReject] = requestInterceptors
const [responseResolve, responseReject] = responseInterceptors
interface WrapAxionsInstance extends AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
        extraConfig?: any
    ): Promise<T>
}
const setupInterceptors = (axios: AxiosInstance) => {
    axios.interceptors.request.use(requestResolve, requestReject)
    axios.interceptors.response.use(responseResolve, responseReject)
}
const loginStorage = new Storage<LoginState>()
// TODO:调整axios
const createRequest = (): WrapAxionsInstance => {
    const tokenKey = getAppEnv().VITE_APP_TOKEN_KEY as keyof LoginState
    const headers: Record<string, any> = {}
    headers['token'] = loginStorage.get(tokenKey) || ''
    const clientRequest = axios.create({
        baseURL: './',
        headers,
        paramsSerializer: function (params) {
            return queryString.stringify(params)
        }
    })
    setupInterceptors(clientRequest)
    return clientRequest
}
export default createRequest
