import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import eslint from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default () => {
    const base = './'
    return defineConfig({
        plugins: [
            react({
                jsxImportSource: '@emotion/react',
                babel: {
                    plugins: ['@emotion/babel-plugin']
                }
            }),
            eslint()
        ],
        base: base,
        publicDir: 'public',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        build: {
            target: 'modules',
            outDir: 'dist',
            assetsDir: 'static',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            cssCodeSplit: true,
            sourcemap: false
        },
        server: {
            host: '0.0.0.0',
            port: 8080,
            open: true,
            strictPort: false,
            cors: true,
            https: false
        }
    })
}
