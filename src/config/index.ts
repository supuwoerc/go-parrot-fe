import { getAppEnv } from '@/utils'
import type production from './production/index'
export type GlobalConfig = typeof production
const modules = import.meta.glob('./*/*.ts', { eager: true })
const env = getAppEnv().VITE_APP_ENV
const config = modules[`./${env}/index.ts`] as {
    default: GlobalConfig
}
export default { env, config: config.default }
