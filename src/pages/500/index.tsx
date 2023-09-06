import errorTip from '@/assets/2.png'
import { errorTipsClass } from '@/style/error'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

interface ServerErrorProps {
    fullscreen?: boolean
}
const ServerError: React.FC<ServerErrorProps> = ({ fullscreen }) => {
    const navigate = useNavigate()
    return (
        <div
            css={errorTipsClass}
            style={{ height: fullscreen ? '100vh' : '100%' }}
        >
            <img className="img" src={errorTip} alt="500.png" />
            <div>
                <div className="title">500</div>
                <div className="tips">抱歉，服务器出错了</div>
                <Button type="primary" onClick={() => navigate('/')}>
                    返回首页
                </Button>
            </div>
        </div>
    )
}
export default ServerError
