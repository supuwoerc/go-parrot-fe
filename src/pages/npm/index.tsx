import { useQuery } from '@tanstack/react-query'
import ChartLoading from '@/components/chart/loading'
import ReactECharts from 'echarts-for-react'
import npmService from '@/service/npmService'
import { useMemo } from 'react'
interface NpmStatProps {
    packageName: string
}

const NpmStat: React.FC<NpmStatProps> = ({ packageName = 'express' }) => {
    const { isFetching, error, data } = useQuery(
        ['package', 'downloads', { packageName }],
        () => {
            return npmService.getDownloads(packageName)
        }
    )
    const option = useMemo(() => {
        if (data) {
            const { downloads } = data
            const dates = downloads.map(item => item.day)
            const counts = downloads.map(item => item.downloads)
            return {
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
    if (isFetching || error) {
        return <ChartLoading text="Parrot" />
    }
    return (
        <ReactECharts
            style={{ height: '100%', width: '100%' }}
            option={option}
        />
    )
}
export default NpmStat
