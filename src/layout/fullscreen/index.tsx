import { GlobalStyles } from '@/components/globalStyles'
import { css } from '@emotion/react'
import { Layout } from 'antd'

const FullscreenLayout: React.FC<BasicFC> = ({ children }) => {
    return (
        <>
            <GlobalStyles />
            <Layout
                css={css`
                    height: 100%;
                `}
            >
                {children}
            </Layout>
        </>
    )
}
export default FullscreenLayout
