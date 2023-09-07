import { Layout, theme } from 'antd'
import { css } from '@emotion/react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import Siderbar from './components/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import CommonHeader from './components/CommonHeader'
import { GlobalStyles } from '@/components/globalStyles'
import { useRef } from 'react'

const { Content } = Layout
const lauoutCss = css`
    height: 100%;
    .fade-slide-enter {
        opacity: 0;
        transform: translateX(100%);
        z-index: 1;
    }
    .fade-slide-enter-active {
        opacity: 1;
        transform: translateX(0%);
        transition: opacity 300ms ease-in, transform 300ms ease-in;
    }
    .fade-slide-exit {
        opacity: 1;
        transform: translateX(0%);
    }
    .fade-slide-exit-active {
        opacity: 0;
        transform: translateX(-100%);
        transition: opacity 300ms ease-in, transform 300ms ease-in;
    }
`
const DefaultLayout: React.FC = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()
    const location = useLocation()
    const nodeRef = useRef(null)
    return (
        <>
            <GlobalStyles />
            <Layout css={lauoutCss}>
                <Siderbar />
                <Layout>
                    <CommonHeader />
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            overflowX: 'hidden',
                            background: colorBgContainer
                        }}
                    >
                        <SwitchTransition mode="out-in">
                            <CSSTransition
                                key={location.key}
                                timeout={300}
                                classNames="fade-slide"
                                nodeRef={nodeRef}
                            >
                                <div
                                    css={css`
                                        height: 100%;
                                    `}
                                    ref={nodeRef}
                                >
                                    <Outlet />
                                </div>
                            </CSSTransition>
                        </SwitchTransition>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default DefaultLayout
