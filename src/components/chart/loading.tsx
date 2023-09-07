import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { css } from '@emotion/react'
interface ChartLoadingProps {
    text: string
}
const ChartLoading: React.FC<ChartLoadingProps> = ({ text }) => {
    const [showLoading, setShowLoading] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(true), 200)
        return () => clearTimeout(timer)
    }, [])
    if (!showLoading) {
        return null
    }
    return (
        <ReactECharts
            css={css`
                height: 100%;
                height: 100%;
            `}
            option={{
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            left: 'center',
                            top: 'center',
                            style: {
                                text,
                                fontSize: 80,
                                fontWeight: 'bold',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: '#000',
                                lineWidth: 1
                            },
                            keyframeAnimation: {
                                duration: 3000,
                                loop: true,
                                keyframes: [
                                    {
                                        percent: 0.7,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0]
                                        }
                                    },
                                    {
                                        percent: 0.8,
                                        style: {
                                            fill: 'transparent'
                                        }
                                    },
                                    {
                                        percent: 1,
                                        style: {
                                            fill: 'black'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }}
        />
    )
}
export default ChartLoading
