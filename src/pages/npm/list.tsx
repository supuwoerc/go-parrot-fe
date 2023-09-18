import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Avatar, Button, Input, List, Modal, Space, Popconfirm } from 'antd'
import CommonPage from '@/components/commonPage'
import { useDebounce } from 'ahooks'
import { useMutation } from '@tanstack/react-query'
import { message } from '@/providers/message'
const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
}))

const NpmPackageList: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [packageName, setPackageName] = useState<string>('')
    const debouncedValue = useDebounce(packageName, { wait: 300 })
    const fetchPageageInfo = useMutation(
        (debouncedValue: string) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(12345 + debouncedValue)
                }, 3000)
            })
        },
        {
            onMutate() {
                setConfirmLoading(true)
            },
            onSuccess(data) {
                message.success(`${data}`)
            },
            onError(error) {
                message.error(`${error}`)
            },
            onSettled() {
                setConfirmLoading(false)
            }
        }
    )
    const getPackageInfo = () => {
        fetchPageageInfo.mutate(debouncedValue)
    }
    const deleteHandle = (item: any) => {
        console.log('deletehandle', item)
    }
    return (
        <CommonPage
            extra={
                <Space>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        添加
                    </Button>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        筛选
                    </Button>
                </Space>
            }
        >
            <List
                itemLayout="horizontal"
                pagination={{
                    pageSize: 10
                }}
                dataSource={data}
                style={{ margin: '0 20px 20px' }}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                key="sync"
                                type="text"
                                icon={<ReloadOutlined />}
                            >
                                同步
                            </Button>,
                            <Popconfirm
                                key="delete"
                                title="提示"
                                description="确认删除该仓库信息?"
                                onConfirm={() => deleteHandle(item)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                >
                                    删除
                                </Button>
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <Modal
                title="添加仓库"
                width={380}
                open={open}
                onOk={getPackageInfo}
                onCancel={() => {
                    setPackageName('')
                    setOpen(false)
                }}
                confirmLoading={confirmLoading}
                okButtonProps={{
                    disabled: debouncedValue.trim() === ''
                }}
            >
                <Input
                    placeholder="请输入仓库名"
                    value={packageName}
                    onChange={val => {
                        setPackageName(val.target.value)
                    }}
                />
            </Modal>
        </CommonPage>
    )
}
export default NpmPackageList
