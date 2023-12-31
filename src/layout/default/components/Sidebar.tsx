import styled from '@emotion/styled'
import { Space, Menu, Image } from 'antd'
import React from 'react'
import Sider from 'antd/es/layout/Sider'
import { useRecoilValue } from 'recoil'
import { siderbar } from '@/store'
import useCurrentMenu from '@/hooks/useCurrentMenu'
import { useNavigate } from 'react-router-dom'
import { getParents } from '@supuwoerc/utils'
import { getAppEnv } from '@/utils'
import logo from '@/assets/logo.png'

const WrapDiv = styled.div`
    color: '#ffffff';
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    color: #ffffff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .ant-image {
        margin-bottom: 4px;
    }
`
interface SiderbarTitleProps {
    collapsed: boolean
}

export const SidebarTitle: React.FC<SiderbarTitleProps> = ({ collapsed }) => {
    const appName = getAppEnv().VITE_APP_NAME
    return (
        <WrapDiv>
            <Space size={12}>
                <Image width={42} src={logo} preview={false} />
                {!collapsed && <span>{appName}</span>}
            </Space>
        </WrapDiv>
    )
}

const Sidebar: React.FC = () => {
    const collapsed = useRecoilValue(siderbar.siderbarCollapsed)
    const sidebarRoutes = useRecoilValue(siderbar.sidebarRoutes)
    const navigate = useNavigate()
    const menu = useCurrentMenu()
    const keys = menu ? [menu.key] : []
    const routePath = getParents(sidebarRoutes, menu?.key, 'key')
    const openKeys = routePath.slice(0, -1).map(item => item.key)
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={240}>
            <SidebarTitle collapsed={collapsed} />
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={keys}
                onSelect={({ key }) => navigate(key)}
                defaultOpenKeys={openKeys}
                items={sidebarRoutes}
            />
        </Sider>
    )
}

export default Sidebar
