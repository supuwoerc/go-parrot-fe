import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Layout, Button, theme, Avatar, Dropdown, Space } from 'antd'
import { useRecoilState } from 'recoil'
import { siderbar } from '@/store'
import type { MenuProps } from 'antd'
import { getAppEnv } from '@/utils'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const { Header } = Layout
const personalInfo = getAppEnv().VITE_APP_PERSONAL

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const UserCenter: React.FC = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={personalInfo}
                >
                    个人中心
                </a>
            )
        },
        {
            key: '2',
            icon: <LogoutOutlined />,
            label: <span>退出</span>
        }
    ]
    return (
        <FlexBox>
            <Space>
                <Avatar size={36} src={<img alt="avatar" />} />
                <Dropdown
                    menu={{ items }}
                    autoAdjustOverflow
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                    align={{ offset: [-26, 0] }}
                    css={css`
                        width: 80px;
                    `}
                >
                    <div
                        onClick={e => e.preventDefault()}
                        css={css`
                            line-height: 64px;
                            cursor: pointer;
                        `}
                    >
                        <DownOutlined />
                    </div>
                </Dropdown>
            </Space>
        </FlexBox>
    )
}

const CommonHeader: React.FC = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()
    const [collapsed, setCollapsed] = useRecoilState(siderbar.siderbarCollapsed)
    return (
        <Header
            className="custom-header"
            style={{ padding: 0, background: colorBgContainer }}
        >
            <FlexBox>
                <div>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64
                        }}
                    />
                </div>
                <UserCenter />
            </FlexBox>
        </Header>
    )
}
export default CommonHeader
