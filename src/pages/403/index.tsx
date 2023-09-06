import noPermission from '@/assets/37.png'
import { errorTipsClass } from '@/style/error'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div css={errorTipsClass}>
            <img className="img" src={noPermission} alt="403.png" />
            <div>
                <div className="title">403</div>
                <div className="tips">抱歉，无权限访问该页面</div>
                <Button type="primary" onClick={() => navigate('/')}>
                    返回首页
                </Button>
            </div>
        </div>
    )
}
export default NotFound
