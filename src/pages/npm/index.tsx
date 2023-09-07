import { useQuery } from '@tanstack/react-query'
import ChartLoading from '@/components/chart/loading'
import ReactECharts from 'echarts-for-react'
import npmService from '@/service/npmService'
import { useMemo } from 'react'
interface NpmStatProps {
    packageName: string
}

const NpmStat: React.FC<NpmStatProps> = ({ packageName }) => {
    const { isFetching, error } = useQuery(
        ['package', 'downloads', { packageName }],
        () => {
            return npmService.getDownloads()
        }
    )
    const option = useMemo(() => {
        return {
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }
            ]
        }
    }, [])
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
