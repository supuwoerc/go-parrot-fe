import notFound from '@/assets/36.png'
import { errorTipsClass } from '@/style/error'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div css={errorTipsClass}>
            <img className="img" src={notFound} alt="404.png" />
            <div>
                <div className="title">404</div>
                <div className="tips">抱歉，你访问的页面不存在</div>
                <Button type="primary" onClick={() => navigate('/')}>
                    返回首页
                </Button>
            </div>
        </div>
    )
}
export default NotFound
