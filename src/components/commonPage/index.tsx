import useCurrentRoutes from '@/hooks/useCurrentRoutes'
import { flexBetweenClass } from '@/style/display'
import { css } from '@emotion/react'
import { Breadcrumb } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { Link } from 'react-router-dom'

interface CommonPageProps {
    pageTitle?: string
    children?: React.ReactNode
}
const CommonPageCss = css`
    height: 100%;
    width: 100%;
    .page-title {
        height: 60px;
        border-bottom: 1px solid #ececec;
        padding: 0 20px;
        ${flexBetweenClass}
    }
    .container {
        height: calc(100% - 60px);
    }
`
function itemRender(
    item: ItemType,
    _: any,
    items: ItemType[],
    paths: string[]
) {
    const last = items.indexOf(item) === items.length - 1
    return last || !item.path ? (
        <span>{item.title}</span>
    ) : (
        <Link to={paths.join('/')}>{item.title}</Link>
    )
}
const CommonPage: React.FC<CommonPageProps> = ({ pageTitle, children }) => {
    const routes = useCurrentRoutes()
    const metaInfo = routes.map((item, index) => {
        return {
            title: item.route.meta?.title ?? '',
            path: item.route.path,
            active: index > 0
        }
    })
    return (
        <div css={CommonPageCss}>
            <h2 className="page-title">
                {pageTitle ? (
                    pageTitle
                ) : (
                    <Breadcrumb
                        items={metaInfo}
                        itemRender={itemRender}
                        separator=">"
                    />
                )}
            </h2>
            <div className="container">{children}</div>
        </div>
    )
}
export default CommonPage
