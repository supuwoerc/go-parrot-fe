import { useQuery, useQueryClient } from '@tanstack/react-query'
import ChartLoading from '@/components/chart/loading'
import ReactECharts from 'echarts-for-react'
import npmService from '@/service/npmService'
import { useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Form, Input, DatePicker, Button, Space, Drawer } from 'antd'
import dayjs from 'dayjs'
import CommonPage from '@/components/commonPage'
import { useForm } from 'antd/es/form/Form'
interface NpmStatProps {}
export interface FormFilter {
    package: string
    start?: string
    end?: string
}
interface FormValue {
    package: string
    timeRange?: Array<string>
}
const { RangePicker } = DatePicker
const pageContainer = css`
    height: 100%;
    width: 100%;
`
const formContainer = css`
    flex-shrink: 0;
    width: 360px;
    padding: 50px 10px 50px 0;
    height: 100%;
`

const NpmPackageStat: React.FC<NpmStatProps> = () => {
    const [form] = useForm<FormValue>()
    const [formValue, setFormValue] = useState<FormFilter>({
        package: 'express',
        start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD')
    })
    const generateQueryKey = (condition = formValue) => {
        return ['package', 'downloads', { condition }]
    }
    const queryKey = generateQueryKey()
    const { isFetching, isError, data } = useQuery(queryKey, () => {
        return npmService.getDownloads(formValue)
    })
    const option = useMemo(() => {
        if (data) {
            const { downloads } = data
            const dates = downloads.map(item => item.day)
            const counts = downloads.map(item => item.downloads)
            return {
                grid: {
                    x: 100,
                    y: 50,
                    x2: 100,
                    y2: 50
                },
                xAxis: {
                    data: dates
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: counts,
                        type: 'line',
                        smooth: true
                    }
                ]
            }
        }
    }, [data])
    const queryClient = useQueryClient()
    const formSubmitHandle = () => {
        const { package: name, timeRange } = form.getFieldsValue()
        const [start, end] = timeRange ?? []
        const formValues = {
            package: name,
            start: dayjs(start).format('YYYY-MM-DD'),
            end: dayjs(end).format('YYYY-MM-DD')
        }
        setFormValue(formValues)
        queryClient.invalidateQueries(generateQueryKey(formValues))
    }
    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }
    return (
        <CommonPage
            extra={
                <Space>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        设置
                    </Button>
                </Space>
            }
        >
            <Drawer
                title="设置数据来源"
                placement="top"
                closable={false}
                onClose={onClose}
                open={open}
                getContainer={false}
                maskClosable={false}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                formSubmitHandle()
                                onClose()
                            }}
                            type="primary"
                        >
                            确认
                        </Button>
                    </Space>
                }
            >
                <Form
                    name="form"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    initialValues={formValue}
                    autoComplete="off"
                    css={formContainer}
                    form={form}
                >
                    <Form.Item
                        name="package"
                        label="包名"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="timeRange"
                        label="时间"
                        initialValue={[
                            dayjs(formValue.start),
                            dayjs(formValue.end)
                        ]}
                    >
                        <RangePicker allowClear={false} />
                    </Form.Item>
                </Form>
            </Drawer>
            <div css={pageContainer}>
                {isFetching || isError ? (
                    <ChartLoading text="Parrot" />
                ) : (
                    <ReactECharts
                        style={{ height: '100%', width: '100%' }}
                        option={option}
                    />
                )}
            </div>
        </CommonPage>
    )
}
export default NpmPackageStat
