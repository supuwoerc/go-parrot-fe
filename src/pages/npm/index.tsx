import { useRef } from 'react'
interface NpmStatProps {}
const NpmStat: React.FC<NpmStatProps> = () => {
    const chartRef = useRef<HTMLDivElement>(null)
    return <div ref={chartRef}></div>
}
export default NpmStat
