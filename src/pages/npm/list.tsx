import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar, List, Space } from 'antd'
import CommonPage from '@/components/commonPage'
import { css } from '@emotion/react'

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
}))
interface IconTextProps {
    icon: React.FC
    text: string
    hoverClass?: 'theme' | 'error' | 'warn'
}
const IconText = ({ icon, text, hoverClass = 'theme' }: IconTextProps) => (
    <Space
        css={css`
            cursor: pointer;
            &:hover {
                color: var(--${hoverClass});
            }
        `}
    >
        {React.createElement(icon)}
        <span>{text}</span>
    </Space>
)

const NpmPackageList: React.FC = () => {
    return (
        <CommonPage>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText
                                icon={ReloadOutlined}
                                text="同步"
                                key="list-vertical-star-o"
                            />,
                            <IconText
                                icon={DeleteOutlined}
                                text="删除"
                                key="list-vertical-like-o"
                                hoverClass="error"
                            />
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </CommonPage>
    )
}
export default NpmPackageList
