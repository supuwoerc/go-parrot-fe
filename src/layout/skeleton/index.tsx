import { ConfigProvider, Layout, Skeleton, theme } from 'antd'
import { GlobalStyles } from '@/components/globalStyles'
import { css } from '@emotion/react'
import { SidebarTitle } from '../default/components/Sidebar'

const { Header, Sider, Content } = Layout
const SkeletonLayout: React.FC = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    return (
        <Layout
            css={css`
                height: 100%;
            `}
        >
            <GlobalStyles />
            <Sider trigger={null} collapsible collapsed={false} width={240}>
                <SidebarTitle collapsed={false} />
                <ConfigProvider
                    theme={{
                        token: {
                            colorFill: '#ffffff',
                            colorFillContent: 'rgba(255,255,255,0.7)'
                        }
                    }}
                >
                    <Skeleton active style={{ padding: '20px' }} />
                </ConfigProvider>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 0,
                        minHeight: 280,
                        background: colorBgContainer
                    }}
                >
                    <Skeleton active />
                </Content>
            </Layout>
        </Layout>
    )
}
export default SkeletonLayout
