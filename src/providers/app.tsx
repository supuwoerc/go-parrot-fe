import { ConfigProvider } from 'antd'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '@/lib/react-query'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
import { errorTipsClass } from '@/style/error'
import pageError from '@/assets/2.png'
interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
    return (
        <div css={errorTipsClass} style={{ height: '100vh' }}>
            <img className="img" src={pageError} alt="404.png" />
            <div>
                <div className="title">Error</div>
                <div className="tips">发生错误：{error.message}</div>
            </div>
        </div>
    )
}
// TODO:自定义主题：https://ant.design/components/config-provider-cn#components-config-provider-demo-size
export const AppProvider: React.FC<BasicFC> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <ConfigProvider locale={zhCN}>
                        <BrowserRouter>{children}</BrowserRouter>
                    </ConfigProvider>
                </QueryClientProvider>
            </RecoilRoot>
        </ErrorBoundary>
    )
}
