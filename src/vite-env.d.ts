/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
    readonly VITE_APP_TOKEN_KEY: string
    readonly VITE_APP_ENV: 'dev' | 'production'
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
